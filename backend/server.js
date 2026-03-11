require('dotenv').config();

const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const courseRoutes = require('./src/routes/course.routes');
const lessonRoutes = require('./src/routes/lesson.routes');
const progressRoutes = require('./src/routes/progress.routes');
const applicationRoutes = require('./src/routes/application.routes');
const eventRoutes = require('./src/routes/event.routes');
const consultationRoutes = require('./src/routes/consultation.routes');
const documentRoutes = require('./src/routes/document.routes');

// Import database initialization
const { initDatabase } = require('./src/database/init');
const db = require('./src/config/database');

const app = express();

// Middleware
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map(o => o.trim());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Mount REST API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/documents', documentRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create HTTP or HTTPS server based on config
let server;
const sslEnabled = process.env.SSL_ENABLED === 'true';

if (sslEnabled) {
  const sslOptions = {
    key: fs.readFileSync(path.resolve(process.env.SSL_KEY_PATH)),
    cert: fs.readFileSync(path.resolve(process.env.SSL_CERT_PATH))
  };
  server = https.createServer(sslOptions, app);
  console.log('🔒 HTTPS enabled');
} else {
  server = http.createServer(app);
}

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Хранилище онлайн пользователей
const onlineUsers = new Map();
// Хранилище сообщений чата
const chatHistory = [];

// Базовый HTTP endpoint для проверки
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'KETEM EDU Socket.IO Server',
    onlineUsers: onlineUsers.size,
    messages: chatHistory.length
  });
});

io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Получение информации о пользователе при подключении
  const { userId, userRole } = socket.handshake.auth;

  if (userId) {
    const userName = socket.handshake.auth.userName || 'Гость';
    
    onlineUsers.set(socket.id, {
      id: userId,
      name: userName,
      role: userRole || 'student',
      lastSeen: new Date(),
      socketId: socket.id
    });

    console.log(`👤 ${userName} (${userRole}) подключился`);

    // Отправить обновленный список онлайн пользователей всем клиентам
    io.emit('users:online', Array.from(onlineUsers.values()));

    // Отправить историю чата новому пользователю
    socket.emit('chat:history', chatHistory);
  }

  // Обработка сообщений чата
  socket.on('chat:message', (message) => {
    console.log('📩 New message:', message.senderName, '->', message.text);
    
    // Сохранить в истории
    chatHistory.push({
      ...message,
      timestamp: new Date()
    });

    // Ограничить историю последними 100 сообщениями
    if (chatHistory.length > 100) {
      chatHistory.shift();
    }

    // Отправить сообщение всем клиентам
    io.emit('chat:message', message);
  });

  // Обработка "печатает"
  socket.on('chat:typing', (data) => {
    console.log(`✍️  ${data.userName} печатает...`);
    // Отправить всем кроме отправителя
    socket.broadcast.emit('chat:typing', data);
  });

  // Обработка изменения статуса заявки
  socket.on('application:statusUpdate', (data) => {
    console.log('📝 Application status updated:', data);
    
    // Найти пользователя, которому нужно отправить уведомление
    const targetUser = Array.from(onlineUsers.values()).find(
      user => user.id === data.userId
    );

    if (targetUser) {
      // Отправить уведомление конкретному пользователю
      io.to(targetUser.socketId).emit('application:statusUpdate', data);
    }

    // Также отправить всем админам
    onlineUsers.forEach((user, socketId) => {
      if (user.role === 'admin') {
        io.to(socketId).emit('application:statusUpdate', data);
      }
    });
  });

  // Запрос списка онлайн пользователей
  socket.on('users:getOnline', () => {
    socket.emit('users:online', Array.from(onlineUsers.values()));
  });

  // Уведомление о новой заявке (для админов)
  socket.on('application:new', (application) => {
    console.log('📋 New application:', application);

    // Отправить уведомление только админам
    onlineUsers.forEach((user, socketId) => {
      if (user.role === 'admin') {
        io.to(socketId).emit('application:new', application);
      }
    });
  });

  // ============ PRIVATE CHAT HANDLERS ============

  // Get or create conversation between two users
  socket.on('chat:getConversation', async ({ recipientId, otherUserId }) => {
    try {
      const senderId = userId;
      const targetUserId = recipientId || otherUserId; // Support both parameter names
      if (!senderId || !targetUserId) return;

      // Check if conversation exists (order-independent)
      let result = await db.query(`
        SELECT * FROM chat_conversations
        WHERE (participant_1 = $1 AND participant_2 = $2)
           OR (participant_1 = $2 AND participant_2 = $1)
      `, [senderId, targetUserId]);

      let conversation;
      let isNewConversation = false;
      if (result.rows.length === 0) {
        // Create new conversation
        const newConv = await db.query(`
          INSERT INTO chat_conversations (participant_1, participant_2)
          VALUES ($1, $2)
          RETURNING *
        `, [senderId, targetUserId]);
        conversation = newConv.rows[0];
        isNewConversation = true;
      } else {
        conversation = result.rows[0];
      }

      // Get messages for this conversation with sender info and reply info
      const messages = await db.query(`
        SELECT m.*,
               u.name as sender_name,
               u.avatar_url as sender_avatar,
               rm.text as reply_text,
               ru.name as reply_sender_name
        FROM chat_messages m
        JOIN users u ON m.sender_id = u.id
        LEFT JOIN chat_messages rm ON m.reply_to_id = rm.id
        LEFT JOIN users ru ON rm.sender_id = ru.id
        WHERE m.conversation_id = $1 AND m.is_deleted = false
        ORDER BY m.created_at ASC
        LIMIT 100
      `, [conversation.id]);

      // Get reactions for all messages
      const messageIds = messages.rows.map(m => m.id);
      let reactions = { rows: [] };
      if (messageIds.length > 0) {
        reactions = await db.query(`
          SELECT r.*, u.name as user_name
          FROM message_reactions r
          JOIN users u ON r.user_id = u.id
          WHERE r.message_id = ANY($1)
        `, [messageIds]);
      }

      // Group reactions by message
      const reactionsByMessage = {};
      reactions.rows.forEach(r => {
        if (!reactionsByMessage[r.message_id]) {
          reactionsByMessage[r.message_id] = [];
        }
        reactionsByMessage[r.message_id].push(r);
      });

      // Attach reactions to messages
      const messagesWithReactions = messages.rows.map(m => ({
        ...m,
        reactions: reactionsByMessage[m.id] || []
      }));

      // Emit conversation created event (for new conversations)
      if (isNewConversation) {
        socket.emit('chat:conversationCreated', { conversationId: conversation.id });
      }

      // Emit messages in format frontend expects
      socket.emit('chat:messages', {
        conversationId: conversation.id,
        messages: messagesWithReactions
      });

      // Join room for this conversation
      socket.join(`conversation:${conversation.id}`);
    } catch (error) {
      console.error('Error getting conversation:', error);
      socket.emit('chat:error', { message: 'Ошибка загрузки переписки' });
    }
  });

  // Get all conversations for user
  socket.on('chat:getConversations', async () => {
    try {
      if (!userId) return;

      const result = await db.query(`
        SELECT c.*,
               CASE WHEN c.participant_1 = $1 THEN u2.id ELSE u1.id END as other_user_id,
               CASE WHEN c.participant_1 = $1 THEN u2.name ELSE u1.name END as other_user_name,
               CASE WHEN c.participant_1 = $1 THEN u2.avatar_url ELSE u1.avatar_url END as other_user_avatar,
               CASE WHEN c.participant_1 = $1 THEN u2.role ELSE u1.role END as other_user_role,
               (SELECT text FROM chat_messages WHERE conversation_id = c.id AND is_deleted = false ORDER BY created_at DESC LIMIT 1) as last_message,
               (SELECT COUNT(*) FROM chat_messages WHERE conversation_id = c.id AND sender_id != $1 AND is_read = false AND is_deleted = false) as unread_count
        FROM chat_conversations c
        JOIN users u1 ON c.participant_1 = u1.id
        JOIN users u2 ON c.participant_2 = u2.id
        WHERE c.participant_1 = $1 OR c.participant_2 = $1
        ORDER BY c.last_message_at DESC
      `, [userId]);

      socket.emit('chat:conversations', result.rows);
    } catch (error) {
      console.error('Error getting conversations:', error);
    }
  });

  // Send private message
  socket.on('chat:sendPrivate', async ({ conversationId, otherUserId, text, replyToId }) => {
    try {
      if (!userId || !text.trim()) return;

      let targetConversationId = conversationId;

      // If conversationId is 0 or not provided, create/get conversation first
      if (!conversationId || conversationId === 0) {
        if (!otherUserId) return; // Need otherUserId to create conversation

        // Check if conversation exists
        let convResult = await db.query(`
          SELECT * FROM chat_conversations
          WHERE (participant_1 = $1 AND participant_2 = $2)
             OR (participant_1 = $2 AND participant_2 = $1)
        `, [userId, otherUserId]);

        if (convResult.rows.length === 0) {
          // Create new conversation
          const newConv = await db.query(`
            INSERT INTO chat_conversations (participant_1, participant_2)
            VALUES ($1, $2)
            RETURNING *
          `, [userId, otherUserId]);
          targetConversationId = newConv.rows[0].id;
          // Notify about new conversation
          socket.emit('chat:conversationCreated', { conversationId: targetConversationId });
        } else {
          targetConversationId = convResult.rows[0].id;
        }
      }

      // Insert message
      const result = await db.query(`
        INSERT INTO chat_messages (conversation_id, sender_id, text, reply_to_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `, [targetConversationId, userId, text.trim(), replyToId || null]);

      const message = result.rows[0];

      // Update conversation last_message_at
      await db.query(`
        UPDATE chat_conversations SET last_message_at = CURRENT_TIMESTAMP WHERE id = $1
      `, [targetConversationId]);

      // Get sender info
      const senderResult = await db.query('SELECT name, avatar_url FROM users WHERE id = $1', [userId]);
      const sender = senderResult.rows[0];

      // Get reply info if exists
      let replyInfo = null;
      if (replyToId) {
        const replyResult = await db.query(`
          SELECT m.text, u.name as sender_name
          FROM chat_messages m
          JOIN users u ON m.sender_id = u.id
          WHERE m.id = $1
        `, [replyToId]);
        if (replyResult.rows.length > 0) {
          replyInfo = replyResult.rows[0];
        }
      }

      const fullMessage = {
        ...message,
        sender_name: sender.name,
        sender_avatar: sender.avatar_url,
        reply_text: replyInfo?.text || null,
        reply_sender_name: replyInfo?.sender_name || null,
        reactions: []
      };

      // Emit to all users in conversation room
      io.to(`conversation:${targetConversationId}`).emit('chat:newPrivate', fullMessage);

      // Also emit directly to sender (in case they're not in room yet)
      socket.emit('chat:newPrivate', fullMessage);

      // Join sender to conversation room
      socket.join(`conversation:${targetConversationId}`);

      // Also notify the other participant if they're online
      const convResult = await db.query('SELECT * FROM chat_conversations WHERE id = $1', [targetConversationId]);
      if (convResult.rows.length > 0) {
        const conv = convResult.rows[0];
        const recipientId = conv.participant_1 === userId ? conv.participant_2 : conv.participant_1;

        // Find recipient socket and emit directly + add to room
        onlineUsers.forEach((user, socketId) => {
          if (user.id === recipientId) {
            io.to(socketId).emit('chat:newPrivate', fullMessage);
            io.to(socketId).emit('chat:notification', {
              conversationId: targetConversationId,
              message: fullMessage,
              senderName: sender.name
            });
          }
        });
      }

      console.log(`💬 Private message from ${sender.name}: ${text.substring(0, 50)}...`);
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('chat:error', { message: 'Ошибка отправки сообщения' });
    }
  });

  // Add reaction to message
  socket.on('chat:addReaction', async ({ messageId, emoji }) => {
    try {
      if (!userId || !messageId || !emoji) return;

      // Check if reaction already exists
      const existing = await db.query(
        'SELECT id FROM message_reactions WHERE message_id = $1 AND user_id = $2 AND emoji = $3',
        [messageId, userId, emoji]
      );

      if (existing.rows.length > 0) {
        // Remove reaction if it exists (toggle)
        await db.query('DELETE FROM message_reactions WHERE id = $1', [existing.rows[0].id]);
      } else {
        // Add new reaction
        await db.query(
          'INSERT INTO message_reactions (message_id, user_id, emoji) VALUES ($1, $2, $3)',
          [messageId, userId, emoji]
        );
      }

      // Get all reactions for this message
      const reactions = await db.query(`
        SELECT r.*, u.name as user_name
        FROM message_reactions r
        JOIN users u ON r.user_id = u.id
        WHERE r.message_id = $1
      `, [messageId]);

      // Get conversation id for this message
      const msgResult = await db.query('SELECT conversation_id FROM chat_messages WHERE id = $1', [messageId]);
      if (msgResult.rows.length > 0) {
        const convId = msgResult.rows[0].conversation_id;
        io.to(`conversation:${convId}`).emit('chat:reactionsUpdated', {
          messageId,
          reactions: reactions.rows
        });
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  });

  // Delete message (soft delete)
  socket.on('chat:deleteMessage', async ({ messageId }) => {
    try {
      if (!userId || !messageId) return;

      // Only allow deleting own messages
      const result = await db.query(
        'UPDATE chat_messages SET is_deleted = true, deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND sender_id = $2 RETURNING conversation_id',
        [messageId, userId]
      );

      if (result.rows.length > 0) {
        const convId = result.rows[0].conversation_id;
        io.to(`conversation:${convId}`).emit('chat:messageDeleted', { messageId });
        console.log(`🗑️ Message ${messageId} deleted by user ${userId}`);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  });

  // Mark messages as read
  socket.on('chat:markRead', async ({ conversationId }) => {
    try {
      if (!userId || !conversationId) return;

      await db.query(`
        UPDATE chat_messages
        SET is_read = true
        WHERE conversation_id = $1 AND sender_id != $2 AND is_read = false
      `, [conversationId, userId]);

      // Notify the sender that messages were read
      const convResult = await db.query('SELECT * FROM chat_conversations WHERE id = $1', [conversationId]);
      if (convResult.rows.length > 0) {
        const conv = convResult.rows[0];
        const otherId = conv.participant_1 === userId ? conv.participant_2 : conv.participant_1;

        onlineUsers.forEach((user, socketId) => {
          if (user.id === otherId) {
            io.to(socketId).emit('chat:messagesRead', { conversationId, readBy: userId });
          }
        });
      }
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  });

  // Typing indicator for private chat
  socket.on('chat:typingPrivate', ({ conversationId, isTyping }) => {
    if (!userId) return;
    const user = onlineUsers.get(socket.id);
    socket.to(`conversation:${conversationId}`).emit('chat:userTyping', {
      conversationId,
      userId,
      userName: user?.name || 'Пользователь',
      isTyping
    });
  });

  // Get list of users to chat with (for starting new conversation)
  socket.on('chat:getUsers', async () => {
    try {
      if (!userId) return;

      // Get all verified users except current user
      // Include email for search functionality
      const result = await db.query(`
        SELECT id, name, email, role, avatar_url
        FROM users
        WHERE id != $1
          AND is_active = true
          AND (email_verified = true OR email_verified IS NULL OR password IS NOT NULL)
        ORDER BY role DESC, name ASC
      `, [userId]);

      socket.emit('chat:users', result.rows);
    } catch (error) {
      console.error('Error getting users:', error);
    }
  });

  // ============ END PRIVATE CHAT HANDLERS ============

  // Отключение пользователя
  socket.on('disconnect', () => {
    const user = onlineUsers.get(socket.id);
    
    if (user) {
      console.log(`❌ ${user.name} отключился`);
      onlineUsers.delete(socket.id);
      io.emit('users:online', Array.from(onlineUsers.values()));
    }
  });
});

const PORT = sslEnabled ? (process.env.HTTPS_PORT || 3443) : (process.env.PORT || 3000);
const PROTOCOL = sslEnabled ? 'https' : 'http';
const WS_PROTOCOL = sslEnabled ? 'wss' : 'ws';

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database tables
    await initDatabase();
    console.log('✅ Database initialized');

    server.listen(PORT, () => {
      console.log(`🚀 Server running on ${PROTOCOL}://localhost:${PORT}`);
      console.log(`📡 WebSocket endpoint: ${WS_PROTOCOL}://localhost:${PORT}`);
      console.log(`🔗 REST API: ${PROTOCOL}://localhost:${PORT}/api`);
      if (sslEnabled) {
        console.log('🔒 SSL/TLS encryption active');
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
