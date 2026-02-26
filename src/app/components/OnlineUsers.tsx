import React, { useEffect, useState } from 'react';
import { socketService } from '@/services/socket';
import { Users, Circle } from 'lucide-react';

interface OnlineUser {
  id: string;
  name: string;
  role: 'student' | 'admin';
  lastSeen: Date;
}

export const OnlineUsers: React.FC = () => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Запрос списка онлайн пользователей
    socketService.requestOnlineUsers();

    // Подписка на обновления списка
    socketService.onOnlineUsers((users: OnlineUser[]) => {
      setOnlineUsers(users);
      setIsLoading(false);
    });

    // Обновлять список каждые 30 секунд
    const interval = setInterval(() => {
      socketService.requestOnlineUsers();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Users className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-semibold text-gray-900">Онлайн пользователи</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : onlineUsers.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Нет пользователей онлайн</p>
      ) : (
        <div className="space-y-3">
          {onlineUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <Circle className="w-3 h-3 text-green-500 fill-green-500 absolute bottom-0 right-0" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {user.role === 'admin' ? 'Администратор' : 'Студент'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Онлайн
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          Всего онлайн: <span className="font-semibold text-orange-600">{onlineUsers.length}</span>
        </p>
      </div>
    </div>
  );
};
