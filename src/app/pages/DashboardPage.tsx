import { useAuth } from '@/app/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { BookOpen, FileText, Calendar, Award, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export function DashboardPage() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'student') {
    return <Navigate to="/auth" />;
  }

  const applications = [
    {
      university: 'MIT',
      country: 'США',
      program: 'Computer Science',
      status: 'В процессе',
      deadline: '15 марта 2026',
    },
    {
      university: 'Oxford',
      country: 'Великобритания',
      program: 'Engineering',
      status: 'Документы отправлены',
      deadline: '20 февраля 2026',
    },
  ];

  const upcomingTasks = [
    { task: 'Подготовить мотивационное письмо', date: '28 января 2026' },
    { task: 'Пройти языковой тест IELTS', date: '5 февраля 2026' },
    { task: 'Отправить рекомендательные письма', date: '10 февраля 2026' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-2xl p-8 text-white mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Добро пожаловать, {user.name}!</h1>
          <p className="text-white/90">Ваш путь к образованию мечты продолжается</p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: FileText, label: 'Заявки', value: '2', color: 'bg-blue-500' },
            { icon: Calendar, label: 'Задачи', value: '3', color: 'bg-green-500' },
            { icon: Award, label: 'Достижения', value: '5', color: 'bg-purple-500' },
            { icon: TrendingUp, label: 'Прогресс', value: '60%', color: 'bg-[#FF6B35]' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Applications */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="h-6 w-6 text-[#FF6B35]" />
              <h2 className="text-xl font-bold text-gray-900">Мои заявки</h2>
            </div>

            <div className="space-y-4">
              {applications.map((app, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#FF6B35] transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{app.university}</h3>
                      <p className="text-sm text-gray-600">{app.country}</p>
                    </div>
                    <span className="bg-orange-100 text-[#FF6B35] text-xs px-3 py-1 rounded-full">
                      {app.status}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{app.program}</p>
                  <p className="text-sm text-gray-500">Дедлайн: {app.deadline}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 bg-[#FF6B35] text-white py-2 rounded-lg hover:bg-[#E55A2B] transition-colors">
              Создать новую заявку
            </button>
          </motion.div>

          {/* Tasks */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="h-6 w-6 text-[#FF6B35]" />
              <h2 className="text-xl font-bold text-gray-900">Предстоящие задачи</h2>
            </div>

            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 text-[#FF6B35] rounded focus:ring-[#FF6B35]"
                  />
                  <div className="flex-1">
                    <p className="text-gray-900">{task.task}</p>
                    <p className="text-sm text-gray-500">{task.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 border-2 border-[#FF6B35] text-[#FF6B35] py-2 rounded-lg hover:bg-[#FF6B35] hover:text-white transition-colors">
              Добавить задачу
            </button>
          </motion.div>
        </div>

        {/* Resources */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Полезные материалы</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'Как написать мотивационное письмо',
              'Подготовка к IELTS/TOEFL',
              'Получение студенческой визы',
            ].map((resource, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#FF6B35] transition-colors group"
              >
                <FileText className="h-6 w-6 text-gray-400 group-hover:text-[#FF6B35]" />
                <span className="text-gray-700 group-hover:text-gray-900">{resource}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
