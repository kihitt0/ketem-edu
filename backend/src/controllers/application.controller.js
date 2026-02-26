const db = require('../config/database');

const createApplication = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const {
      full_name,
      email,
      phone,
      country_preference,
      university,
      program_type,
      education_level,
      message
    } = req.body;

    const user_id = req.user ? req.user.id : null;

    const result = await client.query(
      `INSERT INTO applications (
        user_id, full_name, email, phone,
        country_preference, university, program_type, education_level, message
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [user_id, full_name, email, phone, country_preference, university, program_type, education_level, message]
    );

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Заявка успешно отправлена',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create application error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка создания заявки'
    });
  } finally {
    client.release();
  }
};

const getMyApplications = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await db.query(
      `SELECT * FROM applications 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [user_id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get my applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения заявок'
    });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT a.*, u.name as user_name
      FROM applications a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND a.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (search) {
      query += ` AND (a.full_name ILIKE $${paramIndex} OR a.email ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const countQuery = query.replace(
      /SELECT a\.\*, u\.name.*FROM/,
      'SELECT COUNT(*) FROM'
    );
    const countResult = await db.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    query += ` ORDER BY a.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: {
        applications: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения заявок'
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    let query = `
      SELECT a.*, u.name as user_name, u.email as user_email
      FROM applications a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.id = $1
    `;
    const params = [id];

    // Students can only see their own applications
    if (req.user.role === 'student') {
      query += ` AND a.user_id = $2`;
      params.push(user_id);
    }

    const result = await db.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Заявка не найдена'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get application by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения заявки'
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const { id } = req.params;
    const { status, admin_notes } = req.body;

    const updates = ['updated_at = CURRENT_TIMESTAMP'];
    const values = [];
    let paramIndex = 1;

    if (status) {
      updates.push(`status = $${paramIndex}`);
      values.push(status);
      paramIndex++;
    }

    if (admin_notes !== undefined) {
      updates.push(`admin_notes = $${paramIndex}`);
      values.push(admin_notes);
      paramIndex++;
    }

    values.push(id);

    const query = `
      UPDATE applications 
      SET ${updates.join(', ')} 
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Заявка не найдена'
      });
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Статус заявки обновлён',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка обновления статуса заявки'
    });
  } finally {
    client.release();
  }
};

const deleteApplication = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const { id } = req.params;

    const result = await client.query(
      'DELETE FROM applications WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Заявка не найдена'
      });
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Заявка удалена'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка удаления заявки'
    });
  } finally {
    client.release();
  }
};

module.exports = {
  createApplication,
  getMyApplications,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication
};
