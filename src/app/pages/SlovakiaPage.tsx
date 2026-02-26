import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, DollarSign, Calendar, Globe, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SlovakiaPage: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const universities = [
    {
      name: 'Университет Коменского (Univerzita Komenského)',
      city: 'Братислава',
      tuition: 'Бесплатно на словацком / €2,000-5,000 на английском',
      programs: ['Медицина', 'Право', 'Естественные науки', 'Педагогика'],
      ranking: '#1 в Словакии',
      image: 'https://images.unsplash.com/photo-1716323334534-5d88e514efd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb21lbml1cyUyMFVuaXZlcnNpdHklMjBCcmF0aXNsYXZhJTIwU2xvdmFraWF8ZW58MXx8fHwxNzY5Nzk2MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Словацкий технический университет (STU)',
      city: 'Братислава',
      tuition: 'Бесплатно на словацком / €2,500-4,500 на английском',
      programs: ['Инженерия', 'IT', 'Архитектура', 'Машиностроение'],
      ranking: '#2 в Словакии',
      image: 'https://images.unsplash.com/photo-1715929345251-90d6cc324508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCcmF0aXNsYXZhJTIwU2xvdmFraWElMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY5Nzk2MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Университет Павла Йозефа Шафарика',
      city: 'Кошице',
      tuition: 'Бесплатно на словацком / €2,000-4,000 на английском',
      programs: ['Медицина', 'Право', 'Науки', 'Философия'],
      ranking: '#3 в Словакии',
      image: 'https://images.unsplash.com/photo-1738686001611-39b03de57797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYWZhcmlrJTIwVW5pdmVyc2l0eSUyMEtvc2ljZSUyMFNsb3Zha2lhfGVufDF8fHx8MTc2OTc5NjIyMnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Технический университет Кошице (TUKE)',
      city: 'Кошице',
      tuition: 'Бесплатно на словацком / €2,200-4,200 на английском',
      programs: ['Электротехника', 'IT', 'Инженерия', 'Экономика'],
      ranking: '#4 в Словакии',
      image: 'https://images.unsplash.com/photo-1738686001611-39b03de57797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZWNobmljYWwlMjBVbml2ZXJzaXR5JTIwS29zaWNlJTIwU2xvdmFraWF8ZW58MXx8fHwxNzY5Nzk2MjIyfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Университет экономики в Братиславе',
      city: 'Братислава',
      tuition: 'Бесплатно на словацком / €3,000-5,000 на английском',
      programs: ['Экономика', 'Бизнес', 'Менеджмент', 'Финансы'],
      ranking: '#1 в экономике',
      image: 'https://images.unsplash.com/photo-1747679436612-48470dda04b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCcmF0aXNsYXZhJTIwVW5pdmVyc2l0eSUyMEVjb25vbWljcyUyMFNsb3Zha2lhfGVufDF8fHx8MTc2OTc5NjIyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Университет Матея Бела',
      city: 'Банска-Бистрица',
      tuition: 'Бесплатно на словацком / €1,800-3,500 на английском',
      programs: ['Педагогика', 'Гуманитарные науки', 'Экономика', 'Право'],
      ranking: '#5 в Словакии',
      image: 'https://images.unsplash.com/photo-1724672354075-4cc1deaadc99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYXRlaiUyMEJlbCUyMFVuaXZlcnNpdHklMjBTbG92YWtpYXxlbnwxfHx8fDE3Njk3OTYyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
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
              src="https://flagcdn.com/w320/sk.png"
              alt="Флаг Словакии"
              className="w-32 h-20 mx-auto mb-6 rounded-lg shadow-2xl"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Обучение в <span className="text-orange-500">Словакии</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Доступное европейское образование в живописной стране в центре Европы
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, label: '25+ университетов', color: 'from-blue-500 to-white' },
              { icon: <Users className="w-6 h-6" />, label: '80+ студентов', color: 'from-white to-red-500' },
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
              Топ университеты <span className="text-orange-500">Словакии</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Качественное образование по доступным ценам в сердце Европы
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

      {/* Why Slovakia Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Почему <span className="text-orange-500">Словакия?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: 'Бесплатное обучение',
                description: 'Учёба на словацком языке полностью бесплатна'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Центр Европы',
                description: 'Близость к Вене, Будапешту и другим столицам'
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Европейский диплом',
                description: 'Признается во всех странах Европейского Союза'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Низкие цены',
                description: 'Самая доступная стоимость жизни в ЕС'
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: 'Славянский язык',
                description: 'Легко учить для носителей русского языка'
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: 'Природа',
                description: 'Горы, леса и красивейшие пейзажи'
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-white to-red-600 rounded-xl flex items-center justify-center text-white mb-4">
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
            className="bg-gradient-to-r from-blue-500 via-white to-red-600 rounded-3xl p-12 text-center shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Готовы начать своё обучение в Словакии?</h2>
            <p className="text-xl mb-8 text-gray-700">
              Откройте двери в европейское будущее с бесплатным образованием!
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