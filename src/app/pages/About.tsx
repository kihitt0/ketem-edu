import React from 'react';
import { Target, Users, Award, Globe, Sparkles, TrendingUp, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              10+ лет на рынке
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            О <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">KETEM edu</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Мы создаем истории успеха, помогая талантливым студентам поступить в лучшие университеты Европы
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-8">
                Наша <span className="text-orange-500">миссия</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  KETEM edu была основана с целью сделать <strong className="text-gray-900">европейское образование премиум-класса</strong> доступным для талантливых студентов из России и стран СНГ.
                </p>
                <p>
                  Мы верим, что каждый амбициозный студент заслуживает возможность получить образование мирового уровня в университетах Шенгенской зоны, независимо от географического местоположения.
                </p>
                <p className="flex items-center gap-3 text-orange-600 font-semibold">
                  <TrendingUp className="w-6 h-6" />
                  За годы работы мы помогли более 5000 студентов осуществить их мечту
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: <Target className="w-12 h-12" />,
                  title: 'Индивидуальный подход',
                  description: 'К каждому студенту',
                  color: 'from-orange-500 to-amber-500'
                },
                {
                  icon: <Award className="w-12 h-12" />,
                  title: 'Успешность',
                  description: '95% поступлений',
                  color: 'from-amber-500 to-yellow-500'
                },
                {
                  icon: <Users className="w-12 h-12" />,
                  title: 'Опыт',
                  description: 'Более 10 лет',
                  color: 'from-orange-600 to-red-500'
                },
                {
                  icon: <Globe className="w-12 h-12" />,
                  title: 'География',
                  description: 'Шенген',
                  color: 'from-yellow-500 to-orange-500'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Geography Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 to-orange-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              География <span className="text-orange-500">обучения</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы специализируемся на поступлении в ведущие университеты стран Шенгенской зоны
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                country: 'Китай',
                flag: 'cn',
                universities: '60+ университетов',
                students: '250+ студентов',
                path: '/china'
              },
              {
                country: 'Италия',
                flag: 'it',
                universities: '45+ университетов',
                students: '150+ студентов',
                path: '/italy'
              },
              {
                country: 'Чехия',
                flag: 'cz',
                universities: '35+ университетов',
                students: '120+ студентов',
                path: '/czechia'
              },
              {
                country: 'Словакия',
                flag: 'sk',
                universities: '25+ университетов',
                students: '80+ студентов',
                path: '/slovakia'
              }
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link 
                  to={location.path}
                  className="block bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="mb-4 text-center relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="inline-block"
                    >
                      <img 
                        src={`https://flagcdn.com/w160/${location.flag}.png`}
                        alt={`Флаг ${location.country}`}
                        className="w-24 h-16 mx-auto object-cover rounded-lg shadow-md"
                      />
                    </motion.div>
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-center text-gray-900">{location.country}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="text-sm font-medium">{location.universities}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="text-sm font-medium">{location.students}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-orange-500 text-sm font-medium group-hover:underline">
                      Смотреть университеты →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Наш <span className="text-orange-500">офис</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Приходите к нам на персональную консультацию
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-xl"
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-900">Контактная информация</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Адрес</h4>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      г. Астана<br />
                      Проспект Улы Дала, 39
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Режим работы</h4>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Понедельник - Пятница: 9:00 - 18:00<br />
                      Суббота: 10:00 - 15:00<br />
                      Воскресенье: выходной
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Email</h4>
                    <a href="mailto:info@ketemedu.com" className="text-gray-600 hover:text-orange-500 text-lg transition-colors">
                      info@ketemedu.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Телефон</h4>
                    <a href="tel:+77172" className="text-gray-600 hover:text-orange-500 text-lg transition-colors">
                      +7 (7172) XXX-XXX
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden h-full"
            >
              <iframe
                src="https://maps.google.com/maps?q=51.099005,71.410026&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта офиса KETEM edu в Астане"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};