import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Award, Users, BookOpen, CheckCircle, Star } from 'lucide-react';
import { motion } from 'motion/react';

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-gray-50 to-orange-50 py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Обучение за рубежом —<br />
              <span className="text-[#FF6B35]">ваше будущее начинается здесь</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Мы помогаем студентам поступить в лучшие университеты мира. Более 5000 успешных историй.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/goals"
                className="bg-[#FF6B35] text-white px-8 py-4 rounded-lg hover:bg-[#E55A2B] transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Выбрать программу</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/support"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg border-2 border-gray-300 hover:border-[#FF6B35] transition-all flex items-center justify-center"
              >
                Получить консультацию
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '5000+', label: 'Студентов' },
              { icon: Globe, value: '50+', label: 'Стран' },
              { icon: Award, value: '200+', label: 'Университетов' },
              { icon: BookOpen, value: '15+', label: 'Лет опыта' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-12 w-12 text-[#FF6B35] mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Наши <span className="text-[#FF6B35]">преимущества</span>
            </h2>
            <p className="text-xl text-gray-600">Почему выбирают нас?</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Индивидуальный подход',
                description: 'Подбираем программу и университет под ваши цели, интересы и бюджет',
              },
              {
                title: 'Полное сопровождение',
                description: 'От выбора программы до получения визы и адаптации в новой стране',
              },
              {
                title: 'Гарантия поступления',
                description: 'Работаем до результата. Возврат средств при отказе университета',
              },
              {
                title: 'Опытные консультанты',
                description: 'Наша команда — выпускники зарубежных университетов',
              },
              {
                title: 'Помощь с финансами',
                description: 'Консультируем по стипендиям и грантам. Помогаем снизить стоимость',
              },
              {
                title: 'Поддержка 24/7',
                description: 'Всегда на связи, готовы помочь на любом этапе обучения',
              },
            ].map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle className="h-8 w-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Отзывы <span className="text-[#FF6B35]">студентов</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Анна Петрова',
                university: 'MIT, США',
                text: 'Благодаря команде KETEM edu я поступила в университет мечты! Полное сопровождение и поддержка на каждом этапе.',
              },
              {
                name: 'Дмитрий Иванов',
                university: 'Oxford, Великобритания',
                text: 'Профессиональная помощь в подготовке документов. Получил стипендию покрывающую 80% стоимости обучения!',
              },
              {
                name: 'Мария Смирнова',
                university: 'Sorbonne, Франция',
                text: 'Индивидуальный подход и внимание к деталям. Сэкономила много времени и нервов. Рекомендую!',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#FF6B35] fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.university}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы начать свое путешествие?</h2>
          <p className="text-xl mb-8 opacity-90">
            Запишитесь на бесплатную консультацию и узнайте о возможностях обучения за рубежом
          </p>
          <Link
            to="/support"
            className="inline-flex items-center space-x-2 bg-white text-[#FF6B35] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            <span className="font-semibold">Получить консультацию</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}