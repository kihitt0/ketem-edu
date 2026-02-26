import React, { useState, useEffect, useRef } from 'react';
import { socketService } from '@/services/socket';
import { Send, MessageCircle, X, WifiOff } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'student' | 'admin';
  text: string;
  timestamp: Date;
}

interface LiveChatProps {
  currentUserId: string;
  currentUserName: string;
  currentUserRole: 'student' | 'admin';
}

export const LiveChat: React.FC<LiveChatProps> = ({
  currentUserId,
  currentUserName,
  currentUserRole,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Подключение к Socket.IO при монтировании компонента
    const socket = socketService.connect(currentUserId, currentUserRole);
    
    if (socket) {
      socket.on('connect', () => {
        console.log('✅ Chat connected');
        setIsConnected(true);
        setConnectionError(false);
      });

      socket.on('disconnect', () => {
        console.log('❌ Chat disconnected');
        setIsConnected(false);
      });

      socket.on('connect_error', () => {
        setIsConnected(false);
        setConnectionError(true);
      });

      // Подписка на новые сообщения
      socketService.onNewMessage((message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      // Подписка на событие "печатает"
      socketService.onUserTyping((data: { userId: string; userName: string }) => {
        if (data.userId !== currentUserId) {
          setTypingUser(data.userName);
          setIsTyping(true);

          // Скрыть индикатор через 3 секунды
          setTimeout(() => {
            setIsTyping(false);
            setTypingUser(null);
          }, 3000);
        }
      });
    }

    return () => {
      // Отписка от событий при размонтировании
      socketService.removeAllListeners();
    };
  }, [currentUserId, currentUserRole]);

  useEffect(() => {
    // Автоматическая прокрутка к последнему сообщению
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderRole: currentUserRole,
      text: inputValue,
      timestamp: new Date(),
    };

    socketService.sendMessage(message);
    setMessages((prev) => [...prev, message]);
    setInputValue('');
  };

  const handleTyping = () => {
    // Отправить событие "печатает" только один раз за 2 секунды
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socketService.sendTyping(currentUserId, currentUserName);

    typingTimeoutRef.current = setTimeout(() => {
      typingTimeoutRef.current = null;
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-orange-500 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-semibold">Чат поддержки</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-orange-600 rounded-full p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {connectionError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
            <div className="flex items-start space-x-3">
              <WifiOff className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-red-800 mb-1">
                  Backend сервер не запущен
                </h4>
                <p className="text-xs text-red-600 mb-2">
                  Для работы чата необходимо запустить Socket.IO сервер
                </p>
                <div className="bg-red-100 rounded p-2 text-xs font-mono text-red-800">
                  cd backend<br />
                  npm install<br />
                  npm start
                </div>
                <p className="text-xs text-red-600 mt-2">
                  📖 Откройте файл <strong>HOW_TO_START.html</strong> для подробной инструкции
                </p>
              </div>
            </div>
          </div>
        )}
        
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Начните разговор...
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === currentUserId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.senderId === currentUserId
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}
              >
                <p className="text-xs font-semibold mb-1 opacity-75">
                  {message.senderName} {message.senderRole === 'admin' ? '(Админ)' : ''}
                </p>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-60 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        {isTyping && typingUser && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-700 border border-gray-200 rounded-lg p-3 max-w-[80%]">
              <p className="text-xs italic">{typingUser} печатает...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Введите сообщение..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ''}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};