import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, DollarSign, Calendar, Globe, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ChinaPage: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const universities = [
    {
      name: 'Пекинский университет (北京大学)',
      city: 'Пекин',
      tuition: '3,000 - 5,000 USD/год',
      programs: ['Инженерия', 'Бизнес', 'Медицина', 'IT'],
      ranking: '#1 в Китае',
      image: 'https://images.unsplash.com/photo-1566796096958-94dacebdcb6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZWlqaW5nJTIwdW5pdmVyc2l0eSUyMGJ1aWxkaW5nJTIwQ2hpbmF8ZW58MXx8fHwxNzY5Nzk2MjI3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Университет Цинхуа (清华大学)',
      city: 'Пекин',
      tuition: '3,500 - 6,000 USD/год',
      programs: ['Инженерия', 'Компьютерные науки', 'Архитектура'],
      ranking: '#2 в Китае',
      image: 'https://images.unsplash.com/photo-1742194801379-ca7b698656a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUc2luZ2h1YSUyMFVuaXZlcnNpdHklMjBCZWlqaW5nJTIwY2FtcHVzfGVufDF8fHx8MTc2OTc5NjIxNXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Фуданьский университет (复旦大学)',
      city: 'Шанхай',
      tuition: '3,200 - 5,500 USD/год',
      programs: ['Экономика', 'Медицина', 'Журналистика', 'Международные отношения'],
      ranking: '#3 в Китае',
      image: 'https://images.unsplash.com/photo-1664213034187-fb331960c99a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGdWRhbiUyMFVuaXZlcnNpdHklMjBTaGFuZ2hhaSUyMGNhbXB1c3xlbnwxfHx8fDE3Njk3OTYyMTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Шанхайский университет Цзяо Тун (上海交通大学)',
      city: 'Шанхай',
      tuition: '3,000 - 5,800 USD/год',
      programs: ['Инженерия', 'Бизнес', 'Медицина', 'Биотехнологии'],
      ranking: '#4 в Китае',
      image: 'https://images.unsplash.com/photo-1719704964785-64cc5da1812c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTaGFuZ2hhaSUyMEppYW8lMjBUb25nJTIwVW5pdmVyc2l0eXxlbnwxfHx8fDE3Njk3OTYyMTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Чжэцзянский университет (浙江大学)',
      city: 'Ханчжоу',
      tuition: '2,800 - 5,000 USD/год',
      programs: ['IT', 'Инженерия', 'Сельское хозяйство', 'Медицина'],
      ranking: '#5 в Китае',
      image: 'https://images.unsplash.com/photo-1732511154676-f5adfa1a00f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxaaGVqaWFuZyUyMFVuaXZlcnNpdHklMjBIYW5nemhvdSUyMENoaW5hfGVufDF8fHx8MTc2OTc5NjIxNnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Нанкинский университет (南京大学)',
      city: 'Нанкин',
      tuition: '2,500 - 4,500 USD/год',
      programs: ['Физика', 'Химия', 'Литература', 'История'],
      ranking: '#6 в Китае',
      image: 'https://images.unsplash.com/photo-1764777447643-14d5922439ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOYW5qaW5nJTIwQ2hpbmElMjBoaXN0b3JpYyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Njk3OTYyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <img 
              src="https://flagcdn.com/w320/cn.png"
              alt="Флаг Китая"
              className="w-32 h-20 mx-auto mb-6 rounded-lg shadow-2xl"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Обучение в <span className="text-orange-500">Китае</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Университеты мирового класса с низкой стоимостью обучения и богатой культурной средой
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, label: '60+ университетов', color: 'from-orange-500 to-red-500' },
              { icon: <Users className="w-6 h-6" />, label: '250+ студентов', color: 'from-red-500 to-pink-500' },
              { icon: <DollarSign className="w-6 h-6" />, label: 'От $2,500/год', color: 'from-pink-500 to-purple-500' },
              { icon: <Calendar className="w-6 h-6" />, label: 'Набор 2 раза в год', color: 'from-purple-500 to-orange-500' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                  {item.icon}
                </div>
                <p className="text-center font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Топ университеты <span className="text-orange-500">Китая</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Престижные учебные заведения с международным признанием
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.map((uni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {uni.ranking}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2">{uni.name}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm">{uni.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{uni.tuition}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600">
                      <Award className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-wrap gap-1">
                        {uni.programs.map((program, idx) => (
                          <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why China Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Почему <span className="text-orange-500">Китай?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: 'Доступная стоимость',
                description: 'Низкая плата за обучение и проживание по сравнению с Европой и США'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Мировое признание',
                description: 'Дипломы китайских вузов признаются во всём мире'
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Высокое качество',
                description: 'Множество университетов в топ-500 мирового рейтинга'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Культурный опыт',
                description: 'Погружение в одну из древнейших культур мира'
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: 'Программы на английском',
                description: 'Широкий выбор программ на английском языке'
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: 'Быстрое зачисление',
                description: 'Простой процесс поступления и получения визы'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4">Готовы начать своё обучение в Китае?</h2>
            <p className="text-xl mb-8 opacity-90">
              Наши эксперты помогут подобрать университет и программу специально для вас
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
              >
                Получить консультацию
              </Link>
              <Link
                to="/about"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                Узнать больше
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};