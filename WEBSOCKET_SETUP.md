# WebSocket Backend Setup

Этбоот документ описывает, как настроить Socket.IO backend для раты функционала реального времени.

## Установка зависимостей

```bash
npm install socket.io express cors
```

## Пример серверного кода (server.js)

```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Укажите URL вашего frontend
    methods: ['GET', 'POST']
  }
});

// Хранилище онлайн пользователей
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Получение информации о пользователе при подключении
  const { userId, userRole } = socket.handshake.auth;

  if (userId) {
    onlineUsers.set(socket.id, {
      id: userId,
      name: socket.handshake.auth.userName || 'Unknown',
      role: userRole || 'student',
      lastSeen: new Date()
    });

    // Отправить обновленный список онлайн пользователей всем клиентам
    io.emit('users:online', Array.from(onlineUsers.values()));
  }

  // Обработка сообщений чата
  socket.on('chat:message', (message) => {
    console.log('📩 New message:', message);
    // Отправить сообщение всем клиентам
    io.emit('chat:message', message);
  });

  // Обработка "печатает"
  socket.on('chat:typing', (data) => {
    // Отправить всем кроме отправителя
    socket.broadcast.emit('chat:typing', data);
  });

  // Обработка изменения статуса заявки
  socket.on('application:statusUpdate', (data) => {
    console.log('📝 Application status updated:', data);
    // Отправить обновление конкретному пользователю или всем
    io.emit('application:statusUpdate', data);
  });

  // Запрос списка онлайн пользователей
  socket.on('users:getOnline', () => {
    socket.emit('users:online', Array.from(onlineUsers.values()));
  });

  // Уведомление о новой заявке (для админов)
  socket.on('application:new', (application) => {
    console.log('📋 New application:', application);
    // Отправить уведомление только админам
    io.emit('application:new', application);
  });

  // Отключение пользователя
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    onlineUsers.delete(socket.id);
    io.emit('users:online', Array.from(onlineUsers.values()));
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on port ${PORT}`);
});
```

## Настройка Frontend

В файле `.env` добавьте:

```env
VITE_SOCKET_URL=http://localhost:3000
```

Для production замените на URL вашего реального backend сервера.

## Запуск Backend

```bash
node server.js
```

## Функционал в реальном времени

### 1. **Живой чат**
- Сообщения передаются мгновенно через WebSocket
- Индикатор "печатает..."
- История сообщений

### 2. **Онлайн пользователи**
- Список пользователей онлайн
- Обновление в реальном времени
- Роли (студент/админ)

### 3. **Уведомления**
- Обновление статуса заявки
- Новые заявки для админов

### 4. **Интеграция с существующим Backend**

Если у вас уже есть Node.js/Express backend, добавьте Socket.IO:

```javascript
// В вашем существующем server.js
const http = require('http');
const { Server } = require('socket.io');

// Создайте HTTP сервер из Express app
const server = http.createServer(app);

// Добавьте Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Добавьте обработчики событий (см. выше)

// Измените app.listen на server.listen
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Безопасность

1. **Аутентификация**: В production используйте JWT токены для аутентификации WebSocket соединений

```javascript
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (verifyToken(token)) {
    next();
  } else {
    next(new Error('Authentication error'));
  }
});
```

2. **Rate Limiting**: Ограничьте частоту отправки сообщений

3. **Валидация**: Проверяйте все входящие данные

## Масштабирование

Для production с несколькими серверами используйте Redis adapter:

```bash
npm install @socket.io/redis-adapter redis
```

```javascript
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
});
```

## Тестирование

Для тестирования без backend сервера, Socket.IO автоматически попытается подключиться.
Если сервер недоступен, в консоли браузера будут ошибки подключения, но приложение продолжит работать.

Mock-режим: В `socketService.ts` замените реальные Socket.IO вызовы на имитацию для разработки без backend.
