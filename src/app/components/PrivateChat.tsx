import React, { useState, useEffect, useRef } from 'react';
import { socketService } from '@/services/socket';
import {
  Send,
  MessageCircle,
  X,
  WifiOff,
  Reply,
  Trash2,
  Smile,
  Search,
  ArrowLeft,
  Check,
  CheckCheck,
  MoreVertical,
  Users
} from 'lucide-react';

// Interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar_url?: string;
}

interface Reaction {
  emoji: string;
  user_id: number;
  user_name?: string;
}

interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  sender_name: string;
  sender_role: 'student' | 'admin';
  text: string;
  reply_to_id?: number;
  reply_to_text?: string;
  reply_to_sender?: string;
  is_read: boolean;
  is_deleted: boolean;
  reactions: Reaction[];
  created_at: string;
}

interface Conversation {
  id: number;
  other_user_id: number;
  other_user_name: string;
  other_user_email: string;
  other_user_role: 'student' | 'admin';
  other_user_avatar?: string;
  last_message?: string;
  last_message_at: string;
  unread_count: number;
}

interface PrivateChatProps {
  currentUserId: number;
  currentUserName: string;
  currentUserRole: 'student' | 'admin';
}

const EMOJI_LIST = ['👍', '❤️', '😂', '😮', '😢', '🔥', '👏', '🎉'];

export const PrivateChat: React.FC<PrivateChatProps> = ({
  currentUserId,
  currentUserName,
  currentUserRole,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);
  const [showMessageMenu, setShowMessageMenu] = useState<number | null>(null);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [unreadTotal, setUnreadTotal] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const messageMenuRef = useRef<HTMLDivElement>(null);

  // Socket connection and event handlers
  useEffect(() => {
    const socket = socketService.connect(currentUserId.toString(), currentUserRole);

    if (socket) {
      socket.on('connect', () => {
        setIsConnected(true);
        setConnectionError(false);
        socketService.getConversations();
        socketService.getChatUsers();
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
      });

      socket.on('connect_error', () => {
        setIsConnected(false);
        setConnectionError(true);
      });

      // Conversations list
      socketService.onConversations((convs) => {
        setConversations(convs);
        const total = convs.reduce((sum, c) => sum + (c.unread_count || 0), 0);
        setUnreadTotal(total);
      });

      // Conversation created (for new chats)
      socket.on('chat:conversationCreated', (data: { conversationId: number }) => {
        setSelectedConversation(prev => {
          if (prev && prev.id === 0) {
            return { ...prev, id: data.conversationId };
          }
          return prev;
        });
        socketService.getConversations();
      });

      // Messages for conversation
      socketService.onMessages((data) => {
        // Also accept messages if we have a temp conversation (id=0) for same user
        setMessages(data.messages);
        // Update conversation id if it was 0
        setSelectedConversation(prev => {
          if (prev && prev.id === 0 && data.conversationId) {
            return { ...prev, id: data.conversationId };
          }
          return prev;
        });
      });

      // New private message
      socketService.onNewPrivateMessage((message) => {
        // Check by conversation_id or by other_user_id for new conversations
        setSelectedConversation(prev => {
          if (prev) {
            const isCurrentConv = message.conversation_id === prev.id ||
              (prev.id === 0 && message.sender_id !== currentUserId);
            if (isCurrentConv) {
              setMessages(msgs => {
                // Avoid duplicate messages
                if (msgs.some(m => m.id === message.id)) return msgs;
                return [...msgs, message];
              });
              // Update conversation id if needed
              if (prev.id === 0) {
                socketService.markAsRead(message.conversation_id);
                return { ...prev, id: message.conversation_id };
              }
              socketService.markAsRead(message.conversation_id);
            }
          }
          return prev;
        });
        // Update conversations list
        socketService.getConversations();
      });

      // Reaction update
      socketService.onReaction((data) => {
        setMessages(prev => prev.map(msg => {
          if (msg.id === data.messageId) {
            const existingReactionIndex = msg.reactions.findIndex(
              r => r.emoji === data.emoji && r.user_id === data.userId
            );

            if (data.action === 'added' && existingReactionIndex === -1) {
              return {
                ...msg,
                reactions: [...msg.reactions, { emoji: data.emoji, user_id: data.userId }]
              };
            } else if (data.action === 'removed' && existingReactionIndex !== -1) {
              return {
                ...msg,
                reactions: msg.reactions.filter((_, i) => i !== existingReactionIndex)
              };
            }
          }
          return msg;
        }));
      });

      // Message deleted
      socketService.onMessageDeleted((data) => {
        setMessages(prev => prev.map(msg =>
          msg.id === data.messageId
            ? { ...msg, is_deleted: true, text: 'Сообщение удалено' }
            : msg
        ));
      });

      // Typing indicator
      socketService.onPrivateTyping((data) => {
        if (data.conversationId === selectedConversation?.id && data.userId !== currentUserId) {
          setTypingUser(data.userName);
          setTimeout(() => setTypingUser(null), 3000);
        }
      });

      // Users list
      socketService.onChatUsers((usersList) => {
        setUsers(usersList.filter(u => u.id !== currentUserId));
      });
    }

    return () => {
      socketService.removeAllListeners();
    };
  }, [currentUserId, currentUserRole, selectedConversation?.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close emoji picker and menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(null);
      }
      if (messageMenuRef.current && !messageMenuRef.current.contains(event.target as Node)) {
        setShowMessageMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setShowUserList(false);
    socketService.getConversation(conv.other_user_id);
    socketService.markAsRead(conv.id);
  };

  const handleStartNewChat = (user: User) => {
    socketService.getConversation(user.id);
    setShowUserList(false);

    // Create temporary conversation for UI
    const tempConv: Conversation = {
      id: 0,
      other_user_id: user.id,
      other_user_name: user.name,
      other_user_email: user.email,
      other_user_role: user.role,
      other_user_avatar: user.avatar_url,
      last_message_at: new Date().toISOString(),
      unread_count: 0
    };
    setSelectedConversation(tempConv);
    setMessages([]);

    // Listen for conversation creation
    const socket = socketService.getSocket();
    if (socket) {
      socket.once('chat:conversationCreated', (data: { conversationId: number }) => {
        setSelectedConversation(prev => prev ? { ...prev, id: data.conversationId } : null);
        socketService.getConversations();
      });
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !selectedConversation) return;

    socketService.sendPrivateMessage({
      conversationId: selectedConversation.id,
      otherUserId: selectedConversation.other_user_id, // For new conversations
      text: inputValue.trim(),
      replyToId: replyTo?.id
    });

    setInputValue('');
    setReplyTo(null);
  };

  const handleTyping = () => {
    if (!selectedConversation) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socketService.sendPrivateTyping(selectedConversation.id);

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

  const handleAddReaction = (messageId: number, emoji: string) => {
    socketService.toggleReaction(messageId, emoji);
    setShowEmojiPicker(null);
  };

  const handleDeleteMessage = (messageId: number) => {
    socketService.deleteMessage(messageId);
    setShowMessageMenu(null);
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    }
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    u.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredConversations = conversations.filter(c =>
    c.other_user_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Chat button (when closed)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50"
      >
        <MessageCircle className="w-6 h-6" />
        {unreadTotal > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unreadTotal > 9 ? '9+' : unreadTotal}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[420px] h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-orange-500 text-white p-4 flex items-center justify-between">
        {selectedConversation ? (
          <>
            <button
              onClick={() => setSelectedConversation(null)}
              className="hover:bg-orange-600 rounded-full p-1 transition-colors mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-9 h-9 bg-orange-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-orange-700 font-semibold">
                  {selectedConversation.other_user_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{selectedConversation.other_user_name}</h3>
                <p className="text-xs text-orange-100 truncate">
                  {selectedConversation.other_user_role === 'admin' ? 'Администратор' : 'Студент'}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold">Сообщения</h3>
            </div>
            <button
              onClick={() => setShowUserList(!showUserList)}
              className="hover:bg-orange-600 rounded-full p-2 transition-colors"
              title="Новый чат"
            >
              <Users className="w-5 h-5" />
            </button>
          </>
        )}
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-orange-600 rounded-full p-1 transition-colors ml-2"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Connection Error */}
      {connectionError && (
        <div className="bg-red-50 border-b border-red-200 p-3">
          <div className="flex items-start space-x-2">
            <WifiOff className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-red-800">Сервер недоступен</p>
              <p className="text-red-600">Запустите backend: cd backend && npm start</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {!selectedConversation ? (
        // Conversations list or User list
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={showUserList ? "Поиск пользователей..." : "Поиск..."}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {showUserList ? (
              // Users list for starting new chat
              filteredUsers.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">Пользователи не найдены</p>
              ) : (
                filteredUsers.map(user => (
                  <div
                    key={user.id}
                    onClick={() => handleStartNewChat(user)}
                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-orange-600 font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.role === 'admin' ? 'Администратор' : 'Студент'} • {user.email}
                      </p>
                    </div>
                  </div>
                ))
              )
            ) : (
              // Conversations list
              filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <MessageCircle className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-gray-500 text-sm text-center">
                    Нет активных диалогов
                  </p>
                  <button
                    onClick={() => setShowUserList(true)}
                    className="mt-3 text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    Начать новый чат
                  </button>
                </div>
              ) : (
                filteredConversations.map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                      conv.unread_count > 0 ? 'bg-orange-50' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-orange-600 font-semibold text-lg">
                        {conv.other_user_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 truncate">{conv.other_user_name}</p>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                          {formatTime(conv.last_message_at)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-sm text-gray-500 truncate">
                          {conv.last_message || 'Нет сообщений'}
                        </p>
                        {conv.unread_count > 0 && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                            {conv.unread_count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      ) : (
        // Chat view
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                Начните разговор...
              </div>
            ) : (
              messages.map((message, index) => {
                const isOwn = message.sender_id === currentUserId;
                const showDate = index === 0 ||
                  formatDate(messages[index - 1].created_at) !== formatDate(message.created_at);

                return (
                  <React.Fragment key={message.id}>
                    {showDate && (
                      <div className="flex justify-center my-3">
                        <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                          {formatDate(message.created_at)}
                        </span>
                      </div>
                    )}
                    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} group`}>
                      <div className={`relative max-w-[75%] ${isOwn ? 'order-2' : ''}`}>
                        {/* Reply preview */}
                        {message.reply_to_id && message.reply_to_text && (
                          <div className={`text-xs mb-1 p-2 rounded border-l-2 ${
                            isOwn
                              ? 'bg-orange-100 border-orange-400 text-orange-700'
                              : 'bg-gray-100 border-gray-400 text-gray-600'
                          }`}>
                            <span className="font-semibold">{message.reply_to_sender}</span>
                            <p className="truncate">{message.reply_to_text}</p>
                          </div>
                        )}

                        {/* Message bubble */}
                        <div
                          className={`rounded-2xl p-3 ${
                            message.is_deleted
                              ? 'bg-gray-200 text-gray-500 italic'
                              : isOwn
                                ? 'bg-orange-500 text-white'
                                : 'bg-white text-gray-900 border border-gray-200'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                          <div className={`flex items-center justify-end space-x-1 mt-1 ${
                            isOwn ? 'text-orange-100' : 'text-gray-400'
                          }`}>
                            <span className="text-xs">{formatTime(message.created_at)}</span>
                            {isOwn && !message.is_deleted && (
                              message.is_read
                                ? <CheckCheck className="w-3.5 h-3.5" />
                                : <Check className="w-3.5 h-3.5" />
                            )}
                          </div>
                        </div>

                        {/* Reactions */}
                        {!message.is_deleted && message.reactions && message.reactions.length > 0 && (
                          <div className={`flex flex-wrap gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            {Object.entries(
                              message.reactions.reduce((acc, r) => {
                                acc[r.emoji] = (acc[r.emoji] || 0) + 1;
                                return acc;
                              }, {} as Record<string, number>)
                            ).map(([emoji, count]) => (
                              <button
                                key={emoji}
                                onClick={() => handleAddReaction(message.id, emoji)}
                                className={`text-xs px-1.5 py-0.5 rounded-full border ${
                                  message.reactions.some(r => r.emoji === emoji && r.user_id === currentUserId)
                                    ? 'bg-orange-100 border-orange-300'
                                    : 'bg-white border-gray-200'
                                }`}
                              >
                                {emoji} {count > 1 && count}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Message actions */}
                        {!message.is_deleted && (
                          <div className={`absolute top-0 ${isOwn ? 'left-0 -translate-x-full pr-2' : 'right-0 translate-x-full pl-2'} opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1`}>
                            <button
                              onClick={() => setReplyTo(message)}
                              className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
                              title="Ответить"
                            >
                              <Reply className="w-3.5 h-3.5 text-gray-500" />
                            </button>
                            <div className="relative" ref={emojiPickerRef}>
                              <button
                                onClick={() => setShowEmojiPicker(showEmojiPicker === message.id ? null : message.id)}
                                className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
                                title="Реакция"
                              >
                                <Smile className="w-3.5 h-3.5 text-gray-500" />
                              </button>
                              {showEmojiPicker === message.id && (
                                <div className={`absolute bottom-full mb-2 ${isOwn ? 'right-0' : 'left-0'} bg-white rounded-lg shadow-lg border p-2 flex space-x-1 z-10`}>
                                  {EMOJI_LIST.map(emoji => (
                                    <button
                                      key={emoji}
                                      onClick={() => handleAddReaction(message.id, emoji)}
                                      className="hover:bg-gray-100 p-1 rounded text-lg"
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            {isOwn && (
                              <div className="relative" ref={messageMenuRef}>
                                <button
                                  onClick={() => setShowMessageMenu(showMessageMenu === message.id ? null : message.id)}
                                  className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
                                >
                                  <MoreVertical className="w-3.5 h-3.5 text-gray-500" />
                                </button>
                                {showMessageMenu === message.id && (
                                  <div className={`absolute bottom-full mb-2 ${isOwn ? 'right-0' : 'left-0'} bg-white rounded-lg shadow-lg border py-1 z-10 min-w-[120px]`}>
                                    <button
                                      onClick={() => handleDeleteMessage(message.id)}
                                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      <span>Удалить</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            )}
            {typingUser && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-500 border border-gray-200 rounded-2xl px-4 py-2">
                  <span className="text-sm italic">{typingUser} печатает...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply preview */}
          {replyTo && (
            <div className="px-4 py-2 bg-orange-50 border-t border-orange-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0">
                <Reply className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-orange-600">{replyTo.sender_name}</p>
                  <p className="text-xs text-gray-600 truncate">{replyTo.text}</p>
                </div>
              </div>
              <button
                onClick={() => setReplyTo(null)}
                className="p-1 hover:bg-orange-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-end space-x-2">
              <textarea
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  handleTyping();
                }}
                onKeyPress={handleKeyPress}
                placeholder="Написать сообщение..."
                rows={1}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 max-h-24"
                style={{ minHeight: '40px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center h-10"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
