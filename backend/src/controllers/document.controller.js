const db = require('../config/database');
const path = require('path');
const fs = require('fs');

// Get user's documents
const getMyDocuments = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT id, document_type, file_name, original_name, file_size, mime_type, status, admin_notes, created_at
       FROM user_documents
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения документов'
    });
  }
};

// Upload document
const uploadDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const { document_type } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Файл не загружен'
      });
    }

    if (!document_type) {
      return res.status(400).json({
        success: false,
        message: 'Укажите тип документа'
      });
    }

    const validTypes = ['passport', 'diploma', 'photo', 'motivation_letter', 'recommendation', 'language_certificate', 'other'];
    if (!validTypes.includes(document_type)) {
      return res.status(400).json({
        success: false,
        message: 'Неверный тип документа'
      });
    }

    const result = await db.query(
      `INSERT INTO user_documents (user_id, document_type, file_name, original_name, file_path, file_size, mime_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, document_type, file_name, original_name, file_size, mime_type, status, created_at`,
      [userId, document_type, file.filename, file.originalname, file.path, file.size, file.mimetype]
    );

    res.status(201).json({
      success: true,
      message: 'Документ успешно загружен',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Upload document error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка загрузки документа'
    });
  }
};

// Delete document
const deleteDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Check if document belongs to user
    const doc = await db.query(
      'SELECT id, file_path FROM user_documents WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (doc.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Документ не найден'
      });
    }

    // Delete file from filesystem
    const filePath = doc.rows[0].file_path;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await db.query('DELETE FROM user_documents WHERE id = $1', [id]);

    res.json({
      success: true,
      message: 'Документ удален'
    });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка удаления документа'
    });
  }
};

// Admin: Get all documents
const getAllDocuments = async (req, res) => {
  try {
    const { status, user_id } = req.query;

    let query = `
      SELECT d.*, u.name as user_name, u.email as user_email
      FROM user_documents d
      JOIN users u ON d.user_id = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND d.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (user_id) {
      query += ` AND d.user_id = $${paramIndex}`;
      params.push(user_id);
      paramIndex++;
    }

    query += ' ORDER BY d.created_at DESC';

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get all documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения документов'
    });
  }
};

// Admin: Update document status
const updateDocumentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Неверный статус'
      });
    }

    const result = await db.query(
      `UPDATE user_documents
       SET status = $1, admin_notes = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [status, admin_notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Документ не найден'
      });
    }

    res.json({
      success: true,
      message: 'Статус документа обновлен',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update document status error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка обновления статуса'
    });
  }
};

// Download document
const downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    let query = 'SELECT * FROM user_documents WHERE id = $1';
    const params = [id];

    // If not admin, only allow downloading own documents
    if (!isAdmin) {
      query += ' AND user_id = $2';
      params.push(userId);
    }

    const result = await db.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Документ не найден'
      });
    }

    const doc = result.rows[0];

    if (!fs.existsSync(doc.file_path)) {
      return res.status(404).json({
        success: false,
        message: 'Файл не найден на сервере'
      });
    }

    res.download(doc.file_path, doc.original_name);
  } catch (error) {
    console.error('Download document error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка скачивания документа'
    });
  }
};

module.exports = {
  getMyDocuments,
  uploadDocument,
  deleteDocument,
  getAllDocuments,
  updateDocumentStatus,
  downloadDocument
};
