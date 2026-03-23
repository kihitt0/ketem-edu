import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, DollarSign, Calendar, Globe, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CzechiaPage: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const universities = [
    {
      name: 'Карлов университет (Univerzita Karlova)',
      city: 'Прага',
      tuition: 'Бесплатно на чешском / €4,000-8,000 на английском',
      programs: ['Медицина', 'Право', 'Естественные науки', 'Гуманитарные науки'],
      ranking: '#1 в Чехии',
      image: 'https://world-study.kz/wp-content/uploads/2025/04/ryebol9.jpeg'
    },
    {
      name: 'Чешский технический университет (ČVUT)',
      city: 'Прага',
      tuition: 'Бесплатно на чешском / €3,000-7,000 на английском',
      programs: ['Инженерия', 'IT', 'Архитектура', 'Транспорт'],
      ranking: '#2 в Чехии',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__tfrtH9yn7KlXYuykXBAtNDd-Ylgj_x3Hw&s'
    },
    {
      name: 'Технический университет Брно (VUT)',
      city: 'Брно',
      tuition: 'Бесплатно на чешском / €2,500-6,000 на английском',
      programs: ['Машиностроение', 'Электротехника', 'IT', 'Бизнес'],
      ranking: '#3 в Чехии',
      image: 'https://prag-study.com/photos/1/Photos/763.jpg'
    },
    {
      name: 'Университет Масарика (Masarykova univerzita)',
      city: 'Брно',
      tuition: 'Бесплатно на чешском / €3,500-6,500 на английском',
      programs: ['Медицина', 'Право', 'Экономика', 'IT'],
      ranking: '#4 в Чехии',
      image: 'https://images.gostudy.cz/images/2014/12/Masarikov.jpg'
    },
    {
      name: 'Университет экономики в Праге (VŠE)',
      city: 'Прага',
      tuition: 'Бесплатно на чешском / €4,000-7,000 на английском',
      programs: ['Экономика', 'Бизнес', 'Менеджмент', 'Финансы'],
      ranking: '#1 в экономике',
      image: 'https://oca-praga.cz/app/uploads/2022/01/vysshaya-shkola-ekonomiki-nf.jpg'
    },
    {
      name: 'Университет Палацкого (Univerzita Palackého)',
      city: 'Оломоуц',
      tuition: 'Бесплатно на чешском / €2,000-5,000 на английском',
      programs: ['Медицина', 'Науки', 'Педагогика', 'Философия'],
      ranking: '#5 в Чехии',
      image: 'https://prag-study.com/photos/1/gallery/%D0%92%D1%83%D0%B7%D1%8B/5dbc18c3ddd48.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
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
              src="https://flagcdn.com/w320/cz.png"
              alt="Флаг Чехии"
              className="w-32 h-20 mx-auto mb-6 rounded-lg shadow-2xl"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Обучение в <span className="text-orange-500">Чехии</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Качественное европейское образование в самом сердце Европы с возможностью бесплатного обучения
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, label: '35+ университетов', color: 'from-blue-500 to-cyan-500' },
              { icon: <Users className="w-6 h-6" />, label: '120+ студентов', color: 'from-cyan-500 to-teal-500' },
              { icon: <DollarSign className="w-6 h-6" />, label: 'Бесплатно!', color: 'from-red-500 to-orange-500' },
              { icon: <Calendar className="w-6 h-6" />, label: 'Набор 1 раз в год', color: 'from-orange-500 to-amber-500' }
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
              Топ университеты <span className="text-orange-500">Чехии</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Престижные вузы с возможностью бесплатного обучения на чешском языке
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

      {/* Why Czechia Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Почему <span className="text-orange-500">Чехия?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: 'Бесплатное образование',
                description: 'Обучение на чешском языке абсолютно бесплатно'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Центр Европы',
                description: 'Легко путешествовать в соседние страны ЕС'
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Качество образования',
                description: 'Высокие стандарты европейского образования'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Доступная жизнь',
                description: 'Низкие цены на проживание и питание'
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: 'Чешский язык',
                description: 'Простой для изучения славянский язык'
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: 'Безопасность',
                description: 'Одна из самых безопасных стран в Европе'
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-white to-red-500 rounded-xl flex items-center justify-center text-white mb-4">
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
            className="bg-gradient-to-r from-blue-500 via-white to-red-500 rounded-3xl p-12 text-center shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Готовы начать своё обучение в Чехии?</h2>
            <p className="text-xl mb-8 text-gray-700">
              Получите бесплатное образование в самом сердце Европы!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg"
              >
                Получить консультацию
              </Link>
              <Link
                to="/about"
                className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all"
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