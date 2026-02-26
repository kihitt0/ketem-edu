const db = require('../config/database');

const getAllEvents = async (req, res) => {
  try {
    const { active_only } = req.query;

    let query = `SELECT * FROM events`;
    const params = [];

    if (active_only === 'true') {
      query += ` WHERE is_active = true AND event_date >= NOW()`;
    }

    query += ` ORDER BY event_date ASC`;

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get all events error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения событий'
    });
  }
};

const getUpcomingEvents = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const result = await db.query(
      `SELECT * FROM events
       WHERE is_active = true AND event_date >= NOW()
       ORDER BY event_date ASC
       LIMIT $1`,
      [limit]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения событий'
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      'SELECT * FROM events WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Событие не найдено'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get event by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения события'
    });
  }
};

const createEvent = async (req, res) => {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const {
      title,
      description,
      event_date,
      event_type,
      location,
      is_online,
      link
    } = req.body;

    const result = await client.query(
      `INSERT INTO events (title, description, event_date, event_type, location, is_online, link)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, description, event_date, event_type || 'webinar', location, is_online !== false, link]
    );

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Событие создано',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка создания события'
    });
  } finally {
    client.release();
  }
};

const updateEvent = async (req, res) => {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const { id } = req.params;
    const {
      title,
      description,
      event_date,
      event_type,
      location,
      is_online,
      link,
      is_active
    } = req.body;

    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramIndex}`);
      values.push(title);
      paramIndex++;
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex}`);
      values.push(description);
      paramIndex++;
    }
    if (event_date !== undefined) {
      updates.push(`event_date = $${paramIndex}`);
      values.push(event_date);
      paramIndex++;
    }
    if (event_type !== undefined) {
      updates.push(`event_type = $${paramIndex}`);
      values.push(event_type);
      paramIndex++;
    }
    if (location !== undefined) {
      updates.push(`location = $${paramIndex}`);
      values.push(location);
      paramIndex++;
    }
    if (is_online !== undefined) {
      updates.push(`is_online = $${paramIndex}`);
      values.push(is_online);
      paramIndex++;
    }
    if (link !== undefined) {
      updates.push(`link = $${paramIndex}`);
      values.push(link);
      paramIndex++;
    }
    if (is_active !== undefined) {
      updates.push(`is_active = $${paramIndex}`);
      values.push(is_active);
      paramIndex++;
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE events
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Событие не найдено'
      });
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Событие обновлено',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Update event error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка обновления события'
    });
  } finally {
    client.release();
  }
};

const deleteEvent = async (req, res) => {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const { id } = req.params;

    const result = await client.query(
      'DELETE FROM events WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Событие не найдено'
      });
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Событие удалено'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка удаления события'
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getAllEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
