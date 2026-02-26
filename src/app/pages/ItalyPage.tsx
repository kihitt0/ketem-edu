import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, DollarSign, Calendar, Globe, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ItalyPage: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const universities = [
    {
      name: 'Университет Болоньи (Università di Bologna)',
      city: 'Болонья',
      tuition: '1,000 - 3,500 EUR/год',
      programs: ['Право', 'Инженерия', 'Медицина', 'Искусство'],
      ranking: '#1 в Италии',
      image: 'https://images.unsplash.com/photo-1765646846614-24b72adbaf4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb2xvZ25hJTIwSXRhbHklMjB1bml2ZXJzaXR5JTIwaGlzdG9yaWN8ZW58MXx8fHwxNzY5Nzk2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Миланский политехнический университет (Politecnico di Milano)',
      city: 'Милан',
      tuition: '900 - 3,900 EUR/год',
      programs: ['Инженерия', 'Архитектура', 'Дизайн', 'IT'],
      ranking: '#2 в Италии',
      image: 'https://images.unsplash.com/photo-1683902299114-82228e997414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNaWxhbiUyMFBvbGl0ZWNuaWNvJTIwYXJjaGl0ZWN0dXJlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY5Nzk2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Университет Сапиенца (Sapienza Università di Roma)',
      city: 'Рим',
      tuition: '1,000 - 3,000 EUR/год',
      programs: ['История', 'Философия', 'Медицина', 'Инженерия'],
      ranking: '#3 в Италии',
      image: 'https://images.unsplash.com/photo-1694206575111-761a6918afb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSb21lJTIwSXRhbHklMjB1bml2ZXJzaXR5JTIwY2xhc3NpY2FsfGVufDF8fHx8MTc2OTc5NjIzM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Университет Падуи (Università di Padova)',
      city: 'Падуя',
      tuition: '800 - 2,700 EUR/год',
      programs: ['Медицина', 'Астрономия', 'Психология', 'Биология'],
      ranking: '#4 в Италии',
      image: 'https://images.unsplash.com/photo-1652987363933-ff541486927b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYWR1YSUyMEl0YWx5JTIwaGlzdG9yaWMlMjB1bml2ZXJzaXR5fGVufDF8fHx8MTc2OTc5NjIzMHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Миланский университет (Università degli Studi di Milano)',
      city: 'Милан',
      tuition: '900 - 3,200 EUR/год',
      programs: ['Медицина', 'Право', 'Экономика', 'Науки'],
      ranking: '#5 в Италии',
      image: 'https://images.unsplash.com/photo-1657140556894-7628b12b77ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVbml2ZXJzaXR5JTIwTWlsYW4lMjBJdGFseSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2OTc5NjIxOHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Университет Пизы (Università di Pisa)',
      city: 'Пиза',
      tuition: '800 - 2,500 EUR/год',
      programs: ['Физика', 'Математика', 'Компьютерные науки', 'Инженерия'],
      ranking: '#6 в Италии',
      image: 'https://images.unsplash.com/photo-1641689853367-2fc7dd36a3e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVbml2ZXJzaXR5JTIwUGlzYSUyMEl0YWx5JTIwdG93ZXJ8ZW58MXx8fHwxNzY5Nzk2MjE4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
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
              src="https://flagcdn.com/w320/it.png"
              alt="Флаг Италии"
              className="w-32 h-20 mx-auto mb-6 rounded-lg shadow-2xl"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Обучение в <span className="text-orange-500">Италии</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Престижное европейское образование в стране искусства, моды и дизайна
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, label: '45+ университетов', color: 'from-green-500 to-emerald-500' },
              { icon: <Users className="w-6 h-6" />, label: '150+ студентов', color: 'from-emerald-500 to-teal-500' },
              { icon: <DollarSign className="w-6 h-6" />, label: 'От €800/год', color: 'from-red-500 to-orange-500' },
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
              Топ университеты <span className="text-orange-500">Италии</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Старейшие университеты Европы с богатой историей и традициями
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

      {/* Why Italy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Почему <span className="text-orange-500">Италия?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: 'Низкая стоимость',
                description: 'Одна из самых доступных стран для обучения в ЕС'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Шенгенская виза',
                description: 'Свободное передвижение по всей Европе'
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Престижные дипломы',
                description: 'Признанные во всём мире университеты с историей 700+ лет'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Культура и искусство',
                description: 'Родина Ренессанса, мировой центр моды и дизайна'
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: 'Широкий выбор программ',
                description: 'Программы на итальянском и английском языках'
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: 'Возможность работы',
                description: 'До 20 часов в неделю во время учёбы'
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
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 via-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white mb-4">
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
            className="bg-gradient-to-r from-green-600 via-white to-red-600 rounded-3xl p-12 text-center shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Готовы начать своё обучение в Италии?</h2>
            <p className="text-xl mb-8 text-gray-700">
              Наши эксперты помогут подобрать университет и программу специально для вас
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