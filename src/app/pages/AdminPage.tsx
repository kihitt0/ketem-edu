import { useAuth } from '@/app/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, FileText, TrendingUp, Settings, Bell, Search } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminPage() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/auth" />;
  }

  const students = [
    { name: 'Анна Петрова', email: 'anna@email.com', applications: 3, status: 'Активен' },
    { name: 'Дмитрий Иванов', email: 'dmitry@email.com', applications: 2, status: 'Активен' },
    { name: 'Мария Смирнова', email: 'maria@email.com', applications: 4, status: 'Активен' },
    { name: 'Алексей Козлов', email: 'alexey@email.com', applications: 1, status: 'Новый' },
  ];

  const recentApplications = [
    { student: 'Анна Петрова', university: 'MIT', program: 'CS', status: 'Ожидает проверки' },
    { student: 'Дмитрий Иванов', university: 'Oxford', program: 'Engineering', status: 'Одобрено' },
    { student: 'Мария Смирнова', university: 'Sorbonne', program: 'Arts', status: 'В процессе' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Панель администратора</h1>
              <p className="text-white/80">Управление системой KETEM edu</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-[#FF6B35] rounded-full"></span>
              </button>
              <button className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, label: 'Студенты', value: '127', change: '+12', color: 'bg-blue-500' },
            { icon: FileText, label: 'Заявки', value: '284', change: '+23', color: 'bg-green-500' },
            { icon: TrendingUp, label: 'Одобрено', value: '89%', change: '+5%', color: 'bg-purple-500' },
            { icon: Settings, label: 'В процессе', value: '45', change: '-3', color: 'bg-[#FF6B35]' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Students List */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-[#FF6B35]" />
                <h2 className="text-xl font-bold text-gray-900">Студенты</h2>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-semibold text-gray-900">Студент</th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-900">Заявки</th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-900">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-700">{student.applications}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            student.status === 'Активен'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="w-full mt-4 bg-[#FF6B35] text-white py-2 rounded-lg hover:bg-[#E55A2B] transition-colors">
              Показать всех студентов
            </button>
          </motion.div>

          {/* Recent Applications */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-[#FF6B35]" />
              <h2 className="text-xl font-bold text-gray-900">Последние заявки</h2>
            </div>

            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#FF6B35] transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{app.student}</h3>
                      <p className="text-sm text-gray-600">
                        {app.university} - {app.program}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        app.status === 'Одобрено'
                          ? 'bg-green-100 text-green-700'
                          : app.status === 'Ожидает проверки'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 bg-[#FF6B35] text-white text-sm py-2 rounded hover:bg-[#E55A2B] transition-colors">
                      Просмотр
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded hover:bg-gray-50 transition-colors">
                      Редактировать
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 border-2 border-[#FF6B35] text-[#FF6B35] py-2 rounded-lg hover:bg-[#FF6B35] hover:text-white transition-colors">
              Все заявки
            </button>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Быстрые действия</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              'Добавить студента',
              'Создать программу',
              'Управление университетами',
              'Отчеты и аналитика',
            ].map((action, index) => (
              <button
                key={index}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#FF6B35] hover:bg-orange-50 transition-all text-gray-700 hover:text-gray-900"
              >
                {action}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
