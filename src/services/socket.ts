import { io, Socket } from 'socket.io-client';

// Конфигурация для подключения к Socket.IO серверу
// В production замените на реальный URL вашего backend
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

class SocketService {
  private socket: Socket | null = null;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  // Инициализация подключения
  connect(userId: string, userRole: 'student' | 'admin') {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    console.log('🔌 Attempting to connect to:', SOCKET_URL);

    this.socket = io(SOCKET_URL, {
      auth: {
        userId,
        userRole,
        userName: userId, // Используем email как имя для демо
      },
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: this.maxReconnectAttempts,
      timeout: 10000,
      transports: ['websocket', 'polling'], // Попробовать websocket, затем polling
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket.IO Connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket.IO Disconnected:', reason);
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      this.reconnectAttempts++;
      console.error('❌ Connection Error:', error.message);
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.warn('⚠️ Max reconnection attempts reached. Working in offline mode.');
        console.warn('💡 Tip: Make sure backend server is running on http://localhost:3000');
        console.warn('💡 Run: cd backend && npm start');
      }
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log(`🔄 Reconnected after ${attemptNumber} attempts`);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('❌ Reconnection failed. Please check if backend server is running.');
    });

    return this.socket;
  }

  // Отключение
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Получение socket instance
  getSocket(): Socket | null {
    return this.socket;
  }

  // Проверка состояния подключения
  isSocketConnected(): boolean {
    return this.isConnected && this.socket !== null;
  }

  // Отправка сообщения в чат
  sendMessage(message: {
    senderId: string;
    senderName: string;
    senderRole: 'student' | 'admin';
    text: string;
    timestamp: Date;
  }) {
    if (this.socket) {
      this.socket.emit('chat:message', message);
    }
  }

  // Подписка на новые сообщения
  onNewMessage(callback: (message: any) => void) {
    if (this.socket) {
      this.socket.on('chat:message', callback);
    }
  }

  // Отправка уведомления о том, что пользователь печатает
  sendTyping(userId: string, userName: string) {
    if (this.socket) {
      this.socket.emit('chat:typing', { userId, userName });
    }
  }

  // Подписка на событие "печатает"
  onUserTyping(callback: (data: { userId: string; userName: string }) => void) {
    if (this.socket) {
      this.socket.on('chat:typing', callback);
    }
  }

  // Обновление статуса заявки (для админа)
  updateApplicationStatus(applicationId: string, status: string, userId: string) {
    if (this.socket) {
      this.socket.emit('application:statusUpdate', {
        applicationId,
        status,
        userId,
      });
    }
  }

  // Подписка на обновления статуса заявки
  onApplicationStatusUpdate(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('application:statusUpdate', callback);
    }
  }

  // Запрос списка онлайн пользователей
  requestOnlineUsers() {
    if (this.socket) {
      this.socket.emit('users:getOnline');
    }
  }

  // Подписка на список онлайн пользователей
  onOnlineUsers(callback: (users: any[]) => void) {
    if (this.socket) {
      this.socket.on('users:online', callback);
    }
  }

  // Уведомление о новой заявке (для админа)
  onNewApplication(callback: (application: any) => void) {
    if (this.socket) {
      this.socket.on('application:new', callback);
    }
  }

  // Отписка от всех событий
  removeAllListeners() {
    if (this.socket) {
      this.socket.off('chat:message');
      this.socket.off('chat:typing');
      this.socket.off('users:online');
      this.socket.off('application:statusUpdate');
      this.socket.off('application:new');
      this.socket.off('chat:newPrivate');
      this.socket.off('chat:reaction');
      this.socket.off('chat:deleted');
      this.socket.off('chat:typingPrivate');
      this.socket.off('chat:conversations');
      this.socket.off('chat:messages');
      this.socket.off('chat:users');
      this.socket.off('chat:conversationCreated');
    }
  }

  // ==================== Private Chat Methods ====================

  // Получить список бесед
  getConversations() {
    if (this.socket) {
      this.socket.emit('chat:getConversations');
    }
  }

  // Подписка на список бесед
  onConversations(callback: (conversations: any[]) => void) {
    if (this.socket) {
      this.socket.on('chat:conversations', callback);
    }
  }

  // Получить или создать беседу с пользователем
  getConversation(otherUserId: number) {
    if (this.socket) {
      this.socket.emit('chat:getConversation', { otherUserId });
    }
  }

  // Подписка на получение сообщений беседы
  onMessages(callback: (data: { conversationId: number; messages: any[] }) => void) {
    if (this.socket) {
      this.socket.on('chat:messages', callback);
    }
  }

  // Отправить личное сообщение
  sendPrivateMessage(data: {
    conversationId: number;
    otherUserId?: number; // For new conversations when conversationId is 0
    text: string;
    replyToId?: number;
  }) {
    if (this.socket) {
      this.socket.emit('chat:sendPrivate', data);
    }
  }

  // Подписка на новое личное сообщение
  onNewPrivateMessage(callback: (message: any) => void) {
    if (this.socket) {
      this.socket.on('chat:newPrivate', callback);
    }
  }

  // Добавить/убрать реакцию
  toggleReaction(messageId: number, emoji: string) {
    if (this.socket) {
      this.socket.emit('chat:addReaction', { messageId, emoji });
    }
  }

  // Подписка на обновление реакции
  onReaction(callback: (data: { messageId: number; emoji: string; userId: number; action: 'added' | 'removed' }) => void) {
    if (this.socket) {
      this.socket.on('chat:reaction', callback);
    }
  }

  // Удалить сообщение
  deleteMessage(messageId: number) {
    if (this.socket) {
      this.socket.emit('chat:deleteMessage', { messageId });
    }
  }

  // Подписка на удаление сообщения
  onMessageDeleted(callback: (data: { messageId: number }) => void) {
    if (this.socket) {
      this.socket.on('chat:deleted', callback);
    }
  }

  // Отметить сообщения как прочитанные
  markAsRead(conversationId: number) {
    if (this.socket) {
      this.socket.emit('chat:markRead', { conversationId });
    }
  }

  // Уведомление о печати в личном чате
  sendPrivateTyping(conversationId: number) {
    if (this.socket) {
      this.socket.emit('chat:typingPrivate', { conversationId });
    }
  }

  // Подписка на печать в личном чате
  onPrivateTyping(callback: (data: { conversationId: number; userId: number; userName: string }) => void) {
    if (this.socket) {
      this.socket.on('chat:typingPrivate', callback);
    }
  }

  // Получить список пользователей для чата
  getChatUsers() {
    if (this.socket) {
      this.socket.emit('chat:getUsers');
    }
  }

  // Подписка на список пользователей
  onChatUsers(callback: (users: any[]) => void) {
    if (this.socket) {
      this.socket.on('chat:users', callback);
    }
  }
}

export const socketService = new SocketService();