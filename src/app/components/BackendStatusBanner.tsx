import React, { useState, useEffect } from 'react';
import { Terminal, X, CheckCircle, AlertCircle } from 'lucide-react';
import { socketService } from '@/services/socket';

export const BackendStatusBanner: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Проверка подключения к backend
    const checkConnection = () => {
      const socket = socketService.getSocket();
      
      if (socket) {
        setIsConnected(socket.connected);
        
        socket.on('connect', () => {
          setIsConnected(true);
          setHasChecked(true);
        });

        socket.on('disconnect', () => {
          setIsConnected(false);
          setHasChecked(true);
        });

        socket.on('connect_error', () => {
          setIsConnected(false);
          setHasChecked(true);
        });
      } else {
        setIsConnected(false);
        setHasChecked(true);
      }
    };

    // Проверяем через 2 секунды после загрузки
    const timer = setTimeout(checkConnection, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Не показываем баннер если:
  // 1. Пользователь закрыл его
  // 2. Соединение установлено
  // 3. Ещё не проверили соединение
  if (!showBanner || isConnected || !hasChecked) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">
                ⚠️ Backend сервер не запущен
              </h3>
              <p className="text-sm mb-3 text-red-50">
                Для работы чата в реальном времени и других функций необходимо запустить Socket.IO сервер.
                Без него основные функции приложения работать не будут.
              </p>
              
              <div className="bg-red-700 rounded-lg p-4 mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Terminal className="w-5 h-5" />
                  <span className="font-semibold text-sm">Выполните эти команды в терминале:</span>
                </div>
                <div className="bg-black bg-opacity-30 rounded p-3 font-mono text-sm">
                  <div className="text-green-300">$ cd backend</div>
                  <div className="text-green-300">$ npm install</div>
                  <div className="text-green-300">$ npm start</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <a
                  href="/HOW_TO_START.html"
                  target="_blank"
                  className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors inline-flex items-center space-x-2"
                >
                  <span>📖 Подробная инструкция</span>
                </a>
                <span className="text-red-100">
                  или откройте файл <strong>НАЧАТЬ_ЗДЕСЬ.txt</strong>
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowBanner(false)}
            className="flex-shrink-0 ml-4 p-1 hover:bg-red-700 rounded transition-colors"
            title="Закрыть (можно работать без backend, но без функций реального времени)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const BackendSuccessBanner: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const socket = socketService.getSocket();
    
    if (socket) {
      socket.on('connect', () => {
        setIsConnected(true);
        setShowBanner(true);
        
        // Автоматически скрыть через 5 секунд
        setTimeout(() => {
          setShowBanner(false);
        }, 5000);
      });
    }
  }, []);

  if (!showBanner || !isConnected) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white shadow-lg rounded-lg p-4 animate-slide-in-right">
      <div className="flex items-center space-x-3">
        <CheckCircle className="w-6 h-6" />
        <div>
          <h4 className="font-semibold">Backend подключен!</h4>
          <p className="text-sm text-green-50">Все функции реального времени работают</p>
        </div>
        <button
          onClick={() => setShowBanner(false)}
          className="ml-4 p-1 hover:bg-green-600 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
