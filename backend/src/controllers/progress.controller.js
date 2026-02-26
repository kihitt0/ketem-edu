const db = require('../config/database');

const enrollCourse = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const { course_id } = req.body;
    const user_id = req.user.id;

    // Check if course exists and is published
    const courseCheck = await client.query(
      'SELECT id, is_published FROM courses WHERE id = $1',
      [course_id]
    );

    if (courseCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Курс не найден'
      });
    }

    if (!courseCheck.rows[0].is_published && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Курс недоступен для записи'
      });
    }

    // Check if already enrolled
    const enrollmentCheck = await client.query(
      'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [user_id, course_id]
    );

    if (enrollmentCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Вы уже записаны на этот курс'
      });
    }

    const result = await client.query(
      `INSERT INTO enrollments (user_id, course_id) 
       VALUES ($1, $2) 
       RETURNING *`,
      [user_id, course_id]
    );

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Вы успешно записались на курс',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Enroll course error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка записи на курс'
    });
  } finally {
    client.release();
  }
};

const getMyEnrollments = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await db.query(
      `SELECT 
        e.*,
        c.title as course_title,
        c.description as course_description,
        c.thumbnail_url,
        c.duration_hours,
        (SELECT COUNT(*) FROM lessons WHERE course_id = c.id) as total_lessons,
        (SELECT COUNT(*) FROM lesson_progress WHERE course_id = c.id AND user_id = e.user_id AND completed = true) as completed_lessons
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = $1
      ORDER BY e.enrolled_at DESC`,
      [user_id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get my enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения курсов'
    });
  }
};

const markLessonComplete = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const { lesson_id } = req.body;
    const user_id = req.user.id;

    // Get lesson and course info
    const lessonCheck = await client.query(
      'SELECT id, course_id FROM lessons WHERE id = $1',
      [lesson_id]
    );

    if (lessonCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Урок не найден'
      });
    }

    const { course_id } = lessonCheck.rows[0];

    // Check if user is enrolled
    const enrollmentCheck = await client.query(
      'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [user_id, course_id]
    );

    if (enrollmentCheck.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Вы не записаны на этот курс'
      });
    }

    // Mark lesson as complete
    const result = await client.query(
      `INSERT INTO lesson_progress (user_id, lesson_id, course_id, completed, completed_at)
       VALUES ($1, $2, $3, true, CURRENT_TIMESTAMP)
       ON CONFLICT (user_id, lesson_id) 
       DO UPDATE SET completed = true, completed_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [user_id, lesson_id, course_id]
    );

    // Update course progress percentage
    const progressCalc = await client.query(
      `SELECT 
        COUNT(*) FILTER (WHERE lp.completed = true) as completed,
        COUNT(*) as total
      FROM lessons l
      LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id AND lp.user_id = $1
      WHERE l.course_id = $2`,
      [user_id, course_id]
    );

    const { completed, total } = progressCalc.rows[0];
    const progressPercentage = Math.round((completed / total) * 100);

    await client.query(
      `UPDATE enrollments 
       SET progress_percentage = $1,
           completed_at = CASE WHEN $1 = 100 THEN CURRENT_TIMESTAMP ELSE NULL END
       WHERE user_id = $2 AND course_id = $3`,
      [progressPercentage, user_id, course_id]
    );

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Урок отмечен как пройденный',
      data: {
        lesson_progress: result.rows[0],
        course_progress: progressPercentage
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Mark lesson complete error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка обновления прогресса'
    });
  } finally {
    client.release();
  }
};

const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user_id = req.user.id;

    const result = await db.query(
      `SELECT 
        l.id as lesson_id,
        l.title as lesson_title,
        l.order_index,
        COALESCE(lp.completed, false) as completed,
        lp.completed_at,
        lp.time_spent_minutes
      FROM lessons l
      LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id AND lp.user_id = $1
      WHERE l.course_id = $2
      ORDER BY l.order_index`,
      [user_id, courseId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get course progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения прогресса'
    });
  }
};

const getAllProgress = async (req, res) => {
  try {
    const { page = 1, limit = 10, user_id, course_id } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        e.*,
        u.name as student_name,
        u.email as student_email,
        c.title as course_title
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (user_id) {
      query += ` AND e.user_id = $${paramIndex}`;
      params.push(user_id);
      paramIndex++;
    }

    if (course_id) {
      query += ` AND e.course_id = $${paramIndex}`;
      params.push(course_id);
      paramIndex++;
    }

    const countQuery = query.replace(
      /SELECT e\.\*, u\.name.*FROM/,
      'SELECT COUNT(*) FROM'
    );
    const countResult = await db.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    query += ` ORDER BY e.enrolled_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: {
        progress: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения прогресса'
    });
  }
};

module.exports = {
  enrollCourse,
  getMyEnrollments,
  markLessonComplete,
  getCourseProgress,
  getAllProgress
};
