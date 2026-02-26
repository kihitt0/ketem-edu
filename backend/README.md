# KETEM EDU Backend Server

Socket.IO сервер для функционала реального времени.

## 🚀 Быстрый старт

### 1. Установите зависимости

```bash
cd backend
npm install
```

### 2. Запустите сервер

```bash
npm start
```

Или для режима разработки с автоперезагрузкой:

```bash
npm run dev
```

### 3. Проверьте работу

Откройте в браузере: `http://localhost:3000`

Вы должны увидеть JSON ответ:
```json
{
  "status": "OK",
  "message": "KETEM EDU Socket.IO Server",
  "onlineUsers": 0,
  "messages": 0
}
```

## 📁 Структура проекта

```
/backend
  ├── server.js       # Основной файл сервера
  ├── package.json    # Зависимости
  └── README.md       # Эта инструкция
```

## 🔧 Настройка

### Изменить порт

По умолчанию используется порт `3000`. Чтобы изменить:

```bash
PORT=4000 npm start
```

Или создайте файл `.env`:

```env
PORT=3000
```

### Настроить CORS

В файле `server.js` измените строку:

```javascript
origin: 'http://localhost:5173', // Замените на URL вашего frontend
```

## 🧪 Тестирование

### Проверка подключения

Откройте frontend приложение (http://localhost:5173) и войдите в личный кабинет.

В консоли backend должны появиться сообщения:
```
✅ User connected: abc123
👤 Студент (student) подключился
```

### Проверка чата

1. Откройте два окна браузера
2. В одном войдите как студент: `student@study.com` / `student123`
3. В другом войдите как админ: `admin@study.com` / `admin123`
4. Нажмите на иконку чата в правом нижнем углу
5. Отправьте сообщение - оно должно появиться в обоих окнах

## 📊 Логирование

Сервер выводит логи всех событий:

- ✅ Подключение пользователя
- 📩 Новое сообщение в чате
- ✍️ Пользователь печатает
- 📝 Изменение статуса заявки
- ❌ Отключение пользователя

## 🔒 Production

Для production используйте:

1. **Переменные окружения**:
   ```bash
   PORT=3000
   NODE_ENV=production
   FRONTEND_URL=https://yourdomain.com
   ```

2. **Process manager** (PM2):
   ```bash
   npm install -g pm2
   pm2 start server.js --name ketem-backend
   pm2 save
   pm2 startup
   ```

3. **Nginx reverse proxy**:
   ```nginx
   location /socket.io/ {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
   }
   ```

## 🐛 Troubleshooting

### Ошибка "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Порт уже занят

```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS ошибки

Убедитесь, что в `server.js` указан правильный URL frontend:
```javascript
origin: 'http://localhost:5173', // Должен совпадать с вашим frontend
```

## 📞 Поддержка

При возникновении проблем проверьте:
1. ✅ Установлены ли все зависимости (`npm install`)
2. ✅ Запущен ли сервер (`npm start`)
3. ✅ Правильный ли порт (`3000` по умолчанию)
4. ✅ Совпадают ли CORS настройки с URL frontend
