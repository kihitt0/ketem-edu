const bcrypt = require('bcryptjs');
const db = require('../config/database');

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT id, email, name, role, phone, country, is_active, status, created_at 
      FROM users 
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (role) {
      query += ` AND role = $${paramIndex}`;
      params.push(role);
      paramIndex++;
    }

    if (search) {
      query += ` AND (name ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const countQuery = query.replace('SELECT id, email, name, role, phone, country, is_active, status, created_at', 'SELECT COUNT(*)');
    const countResult = await db.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: {
        users: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения пользователей'
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `SELECT id, email, name, role, phone, country, date_of_birth, 
              avatar_url, is_active, created_at 
       FROM users WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get user by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения пользователя'
    });
  }
};

const createUser = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const { email, password, name, role, phone, country, date_of_birth } = req.body;

    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Пользователь с таким email уже существует'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
      `INSERT INTO users (email, password, name, role, phone, country, date_of_birth) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, email, name, role, phone, country, created_at`,
      [email, hashedPassword, name, role || 'student', phone, country, date_of_birth]
    );

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Пользователь создан',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка создания пользователя'
    });
  } finally {
    client.release();
  }
};

const updateUser = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const { id } = req.params;
    const { email, name, role, phone, country, date_of_birth, avatar_url, is_active, status } = req.body;

    const existingUser = await client.query('SELECT id FROM users WHERE id = $1', [id]);

    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }

    // Students can only update their own data and cannot change role
    if (req.user.role === 'student') {
      if (parseInt(id) !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Недостаточно прав'
        });
      }
      // Remove role from update if student tries to change it
      delete req.body.role;
      delete req.body.is_active;
      delete req.body.status;
    }

    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (email !== undefined) {
      updates.push(`email = $${paramIndex}`);
      values.push(email);
      paramIndex++;
    }
    if (name !== undefined) {
      updates.push(`name = $${paramIndex}`);
      values.push(name);
      paramIndex++;
    }
    if (role !== undefined && req.user.role === 'admin') {
      updates.push(`role = $${paramIndex}`);
      values.push(role);
      paramIndex++;
    }
    if (phone !== undefined) {
      updates.push(`phone = $${paramIndex}`);
      values.push(phone);
      paramIndex++;
    }
    if (country !== undefined) {
      updates.push(`country = $${paramIndex}`);
      values.push(country);
      paramIndex++;
    }
    if (date_of_birth !== undefined) {
      updates.push(`date_of_birth = $${paramIndex}`);
      values.push(date_of_birth);
      paramIndex++;
    }
    if (avatar_url !== undefined) {
      updates.push(`avatar_url = $${paramIndex}`);
      values.push(avatar_url);
      paramIndex++;
    }
    if (is_active !== undefined && req.user.role === 'admin') {
      updates.push(`is_active = $${paramIndex}`);
      values.push(is_active);
      paramIndex++;
    }
    if (status !== undefined && req.user.role === 'admin') {
      updates.push(`status = $${paramIndex}`);
      values.push(status);
      paramIndex++;
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    values.push(id);

    const query = `
      UPDATE users 
      SET ${updates.join(', ')} 
      WHERE id = $${paramIndex}
      RETURNING id, email, name, role, phone, country, date_of_birth, avatar_url, is_active, status, updated_at
    `;

    const result = await client.query(query, values);

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Пользователь обновлён',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка обновления пользователя'
    });
  } finally {
    client.release();
  }
};

const deleteUser = async (req, res) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');

    const { id } = req.params;

    const existingUser = await client.query('SELECT id FROM users WHERE id = $1', [id]);

    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }

    await client.query('DELETE FROM users WHERE id = $1', [id]);

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Пользователь удалён'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка удаления пользователя'
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
