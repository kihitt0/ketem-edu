const db = require('../config/database');

const createConsultation = async (req, res) => {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const {
      date,
      time,
      topic,
      message,
      user_name,
      user_email
    } = req.body;

    const user_id = req.user?.id || null;

    const result = await client.query(
      `INSERT INTO consultations (user_id, user_name, user_email, consultation_date, consultation_time, topic, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [user_id, user_name, user_email, date, time, topic, message || '']
    );

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Консультация успешно забронирована',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create consultation error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при бронировании консультации'
    });
  } finally {
    client.release();
  }
};

const getMyConsultations = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await db.query(
      `SELECT * FROM consultations
       WHERE user_id = $1
       ORDER BY consultation_date DESC, consultation_time DESC`,
      [user_id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get my consultations error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения консультаций'
    });
  }
};

const getAllConsultations = async (req, res) => {
  try {
    const { status } = req.query;

    let query = `SELECT c.*, u.name as user_registered_name, u.email as user_registered_email
                 FROM consultations c
                 LEFT JOIN users u ON c.user_id = u.id`;
    const params = [];

    if (status) {
      query += ` WHERE c.status = $1`;
      params.push(status);
    }

    query += ` ORDER BY c.consultation_date ASC, c.consultation_time ASC`;

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get all consultations error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения консультаций'
    });
  }
};

const updateConsultationStatus = async (req, res) => {
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
      UPDATE consultations
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Консультация не найдена'
      });
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Статус консультации обновлен',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Update consultation status error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка обновления статуса'
    });
  } finally {
    client.release();
  }
};

const deleteConsultation = async (req, res) => {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const { id } = req.params;

    const result = await client.query(
      'DELETE FROM consultations WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Консультация не найдена'
      });
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Консультация удалена'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Delete consultation error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка удаления консультации'
    });
  } finally {
    client.release();
  }
};

module.exports = {
  createConsultation,
  getMyConsultations,
  getAllConsultations,
  updateConsultationStatus,
  deleteConsultation
};
