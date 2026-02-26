#!/bin/bash

clear

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║          🚀 KETEM EDU Backend Setup 🚀                        ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "  Автоматическая установка и запуск Socket.IO сервера..."
echo ""

# Проверка наличия Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен!"
    echo ""
    echo "Пожалуйста, установите Node.js:"
    echo "👉 https://nodejs.org/"
    echo ""
    exit 1
fi

echo "✅ Node.js найден: $(node --version)"
echo "✅ npm найден: $(npm --version)"
echo ""

# Переход в папку backend
echo "📁 Переход в папку backend..."
cd backend || {
    echo "❌ Папка backend не найдена!"
    echo "Убедитесь что вы в корневой папке проекта."
    exit 1
}
echo "✅ В папке backend"
echo ""

# Проверка наличия node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей..."
    echo "   (Это может занять 1-2 минуты)"
    echo ""
    npm install
    echo ""
    echo "✅ Зависимости установлены"
else
    echo "✅ Зависимости уже установлены"
fi
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║  🎉 ВСЁ ГОТОВО! Запускаем сервер...                           ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "⚠️  НЕ ЗАКРЫВАЙТЕ ЭТО ОКНО!"
echo "   Backend должен работать пока вы используете приложение"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Запуск сервера
npm start
