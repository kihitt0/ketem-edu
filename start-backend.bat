@echo off
chcp 65001 >nul
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║          🚀 KETEM EDU Backend Setup 🚀                        ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo   Автоматическая установка и запуск Socket.IO сервера...
echo.

REM Проверка наличия Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js не установлен!
    echo.
    echo Пожалуйста, установите Node.js:
    echo 👉 https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js найден
echo ✅ npm найден
echo.

REM Переход в папку backend
echo 📁 Переход в папку backend...
if not exist "backend" (
    echo ❌ Папка backend не найдена!
    echo Убедитесь что вы в корневой папке проекта.
    pause
    exit /b 1
)
cd backend
echo ✅ В папке backend
echo.

REM Проверка наличия node_modules
if not exist "node_modules" (
    echo 📦 Установка зависимостей...
    echo    (Это может занять 1-2 минуты)
    echo.
    call npm install
    echo.
    echo ✅ Зависимости установлены
) else (
    echo ✅ Зависимости уже установлены
)
echo.

echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║  🎉 ВСЁ ГОТОВО! Запускаем сервер...                           ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo ⚠️  НЕ ЗАКРЫВАЙТЕ ЭТО ОКНО!
echo    Backend должен работать пока вы используете приложение
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Запуск сервера
npm start

pause
