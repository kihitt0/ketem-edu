const db = require('../config/database');

const createLesson = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const {
      course_id,
      title,
      content,
      video_url,
      order_index,
      duration_minutes,
      is_free
    } = req.body;

    // Verify course exists
    const courseCheck = await client.query('SELECT id FROM courses WHERE id = $1', [course_id]);
    
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Курс не найден'
      });
    }

    const result = await client.query(
      `INSERT INTO lessons (
        course_id, title, content, video_url, 
        order_index, duration_minutes, is_free
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [course_id, title, content, video_url, order_index, duration_minutes, is_free || false]
    );

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Урок создан',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка создания урока'
    });
  } finally {
    client.release();
  }
};

const updateLesson = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const { id } = req.params;
    const updates = [];
    const values = [];
    let paramIndex = 1;

    const allowedFields = [
      'title', 'content', 'video_url', 'order_index', 'duration_minutes', 'is_free'
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
      UPDATE lessons 
      SET ${updates.join(', ')} 
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Урок не найден'
      });
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Урок обновлён',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Update lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка обновления урока'
    });
  } finally {
    client.release();
  }
};

const deleteLesson = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const { id } = req.params;

    const result = await client.query('DELETE FROM lessons WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Урок не найден'
      });
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Урок удалён'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Delete lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка удаления урока'
    });
  } finally {
    client.release();
  }
};

module.exports = {
  createLesson,
  updateLesson,
  deleteLesson
};
