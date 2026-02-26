import { Heart, MessageCircle, Phone, Video, Calendar, Users, Shield, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function SupportPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      icon: MessageCircle,
      title: 'Онлайн-консультации',
      description: 'Индивидуальные сессии с психологом в удобное для вас время',
      features: ['Анонимность', 'Гибкий график', 'Доступные цены'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Video,
      title: 'Видео-сессии',
      description: 'Личные встречи с психологом по видеосвязи',
      features: ['Личный контакт', 'Эффективная помощь', 'Удобная платформа'],
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Users,
      title: 'Групповая терапия',
      description: 'Поддержка в группах студентов с похожими проблемами',
      features: ['Общение с другими', 'Взаимная поддержка', 'Доступная цена'],
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Phone,
      title: 'Телефон доверия',
      description: 'Круглосуточная поддержка в кризисных ситуациях',
      features: ['24/7 доступ', 'Немедленная помощь', 'Анонимно'],
      color: 'from-red-500 to-red-600',
    },
  ];

  const topics = [
    {
      title: 'Адаптация за рубежом',
      description: 'Помощь в преодолении культурного шока и адаптации к новой среде',
      common: true,
    },
    {
      title: 'Стресс и тревога',
      description: 'Работа со стрессом, связанным с учебой и экзаменами',
      common: true,
    },
    {
      title: 'Одиночество и изоляция',
      description: 'Поддержка при чувстве одиночества вдали от дома',
      common: true,
    },
    {
      title: 'Академическое давление',
      description: 'Помощь в управлении учебной нагрузкой и ожиданиями',
      common: false,
    },
    {
      title: 'Отношения и коммуникация',
      description: 'Помощь в построении отношен��й в новой культурной среде',
      common: false,
    },
    {
      title: 'Самооценка и уверенность',
      description: 'Работа над повышением уверенности в себе',
      common: false,
    },
  ];

  const whyImportant = [
    {
      icon: Shield,
      title: 'Конфиденциальность',
      description: 'Все сессии строго конфиденциальны. Ваша информация в безопасности.',
    },
    {
      icon: Users,
      title: 'Опытные специалисты',
      description: 'Психологи с опытом работы со студентами за рубежом.',
    },
    {
      icon: Clock,
      title: 'Доступность',
      description: 'Консультации в удобное для вас время, включая вечера и выходные.',
    },
    {
      icon: Heart,
      title: 'Комплексная поддержка',
      description: 'Помощь не только с психологическими, но и с адаптационными вопросами.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Heart className="h-16 w-16 text-[#FF6B35] mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-[#FF6B35]">Психологическая</span> поддержка
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Ваше ментальное здоровье — наш приоритет
            </p>
            <p className="text-lg text-gray-600">
              Обучение за рубежом — это не только академические достижения, но и эмоциональные вызовы. Мы здесь, чтобы поддержать вас на каждом этапе.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Наши <span className="text-[#FF6B35]">услуги</span>
            </h2>
            <p className="text-xl text-gray-600">Выберите удобный формат поддержки</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-8 border border-gray-100 cursor-pointer"
                onClick={() => setSelectedService(service.title)}
              >
                <div className={`bg-gradient-to-br ${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 bg-[#FF6B35] text-white py-3 rounded-lg hover:bg-[#E55A2B] transition-colors">
                  Записаться на консультацию
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              С чем мы <span className="text-[#FF6B35]">помогаем</span>
            </h2>
            <p className="text-xl text-gray-600">Наиболее частые запросы студентов</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {topic.common && (
                  <span className="inline-block bg-orange-100 text-[#FF6B35] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    Популярное
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-gray-600 text-sm">{topic.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Important */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Почему это <span className="text-[#FF6B35]">важно</span>
            </h2>
            <p className="text-xl text-gray-600">Забота о ментальном здоровье — часть успешной учебы</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyImportant.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-[#FF6B35]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: '85%', label: 'Студентов испытывают стресс за рубежом' },
              { value: '70%', label: 'Чувствуют себя лучше после терапии' },
              { value: '24/7', label: 'Доступность экстренной помощи' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <div className="text-5xl font-bold text-[#FF6B35] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Phone className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Нужна срочная помощь?</h2>
          <p className="text-xl mb-8 opacity-90">
            Наша линия поддержки доступна 24/7 для экстренных случаев
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#FF6B35] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold flex items-center justify-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Позвонить сейчас</span>
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#FF6B35] transition-all font-semibold flex items-center justify-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Записаться на консультацию</span>
            </button>
          </div>
          <p className="mt-6 text-sm opacity-75">
            Все консультации строго конфиденциальны
          </p>
        </div>
      </section>
    </div>
  );
}
