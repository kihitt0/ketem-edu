const db = require('../config/database');

const getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, level, search } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT c.*, u.name as creator_name,
             (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) as enrolled_count
      FROM courses c
      LEFT JOIN users u ON c.created_by = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    // Only show published courses to students
    if (req.user.role === 'student') {
      query += ` AND c.is_published = true`;
    }

    if (category) {
      query += ` AND c.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (level) {
      query += ` AND c.level = $${paramIndex}`;
      params.push(level);
      paramIndex++;
    }

    if (search) {
      query += ` AND (c.title ILIKE $${paramIndex} OR c.description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const countQuery = query.replace(
      /SELECT c\.\*, u\.name as creator_name.*FROM/,
      'SELECT COUNT(*) FROM'
    ).replace(/LEFT JOIN users u ON c\.created_by = u\.id/, '');
    
    const countResult = await db.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    query += ` ORDER BY c.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: {
        courses: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения курсов'
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const courseResult = await db.query(
      `SELECT c.*, u.name as creator_name,
              (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) as enrolled_count
       FROM courses c
       LEFT JOIN users u ON c.created_by = u.id
       WHERE c.id = $1`,
      [id]
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Курс не найден'
      });
    }

    const course = courseResult.rows[0];

    // Check if student can access unpublished course
    if (req.user.role === 'student' && !course.is_published) {
      return res.status(403).json({
        success: false,
        message: 'Курс недоступен'
      });
    }

    // Get lessons
    const lessonsResult = await db.query(
      `SELECT id, title, order_index, duration_minutes, is_free, video_url
       FROM lessons 
       WHERE course_id = $1 
       ORDER BY order_index`,
      [id]
    );

    course.lessons = lessonsResult.rows;

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Get course by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения курса'
    });
  }
};

const createCourse = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const {
      title,
      description,
      category,
      level,
      duration_hours,
      price,
      thumbnail_url,
      is_published
    } = req.body;

    const result = await client.query(
      `INSERT INTO courses (
        title, description, category, level, duration_hours, 
        price, thumbnail_url, is_published, created_by
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *`,
      [
        title,
        description,
        category,
        level,
        duration_hours,
        price || 0,
        thumbnail_url,
        is_published || false,
        req.user.id
      ]
    );

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Курс создан',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка создания курса'
    });
  } finally {
    client.release();
  }
};

const updateCourse = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const { id } = req.params;
    const updates = [];
    const values = [];
    let paramIndex = 1;

    const allowedFields = [
      'title', 'description', 'category', 'level', 
      'duration_hours', 'price', 'thumbnail_url', 'is_published'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = $${paramIndex}`);
        values.push(req.body[field]);
        paramIndex++;
      }
    });

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Нет данных для обновления'
      });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE courses 
      SET ${updates.join(', ')} 
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Курс не найден'
      });
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Курс обновлён',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка обновления курса'
    });
  } finally {
    client.release();
  }
};

const deleteCourse = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const { id } = req.params;

    const result = await client.query('DELETE FROM courses WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Курс не найден'
      });
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Курс удалён'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка удаления курса'
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
