import React from 'react';
import { CheckCircle, ArrowRight, Sparkles, Calendar, Target } from 'lucide-react';
import { motion } from 'motion/react';

export const Goals: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
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
              <Target className="w-4 h-4" />
              7 шагов к успеху
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            Ваш путь к <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">успеху</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Пошаговая премиум-программа поступления в европейские университеты
          </motion.p>
        </div>
      </section>

      {/* Journey Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Консультация и выбор направления',
                description: 'Мы проводим детальную персональную консультацию, чтобы понять ваши цели, интересы и академический профиль. Вместе определяем оптимальные страны Шенгена и университеты.',
                duration: '1-2 недели',
                tasks: [
                  'Глубокий анализ вашего профиля',
                  'Определение целевых университетов',
                  'Составление индивидуального roadmap'
                ],
                color: 'from-orange-500 to-amber-500'
              },
              {
                step: 2,
                title: 'Подготовка документов',
                description: 'Собираем и подготавливаем все необходимые документы премиум-качества: транскрипты, рекомендательные письма, мотивационные эссе мирового уровня.',
                duration: '2-4 недели',
                tasks: [
                  'Профессиональный перевод документов',
                  'Написание убедительных эссе',
                  'Получение сильных рекомендаций'
                ],
                color: 'from-amber-500 to-yellow-500'
              },
              {
                step: 3,
                title: 'Подготовка к тестам',
                description: 'Комплексная подготовка к TOEFL/IELTS, SAT/GRE и другим необходимым экзаменам с индивидуальным планом.',
                duration: '2-6 месяцев',
                tasks: [
                  'Интенсивная подготовка к языковым тестам',
                  'Академические тесты с преподавателями',
                  'Множественные пробные экзамены'
                ],
                color: 'from-orange-600 to-red-500'
              },
              {
                step: 4,
                title: 'Подача заявок',
                description: 'Профессиональное заполнение и отправка заявок в выбранные университеты, строгий контроль всех дедлайнов.',
                duration: '2-3 недели',
                tasks: [
                  'Идеальное заполнение форм',
                  'Своевременная отправка документов',
                  'Оплата всех необходимых сборов'
                ],
                color: 'from-yellow-500 to-orange-500'
              },
              {
                step: 5,
                title: 'Получение офферов',
                description: 'Постоянное отслеживание ответов от университетов и экспертная помощь с выбором лучшего предложения для вашего будущего.',
                duration: '1-3 месяца',
                tasks: [
                  'Ежедневное отслеживание статусов',
                  'Детальный анализ всех предложений',
                  'Помощь в принятии решения'
                ],
                color: 'from-orange-500 to-pink-500'
              },
              {
                step: 6,
                title: 'Визовая поддержка',
                description: 'Полное сопровождение при оформлении студенческой визы: от подготовки документов до успешного получения.',
                duration: '1-2 месяца',
                tasks: [
                  'Подготовка всех документов для визы',
                  'Запись и подготовка к интервью',
                  'Поддержка до получения визы'
                ],
                color: 'from-amber-600 to-orange-600'
              },
              {
                step: 7,
                title: 'Подготовка к отъезду',
                description: 'Комплексная помощь с организацией переезда: подбор жилья, бронирование билетов, оформление страховки.',
                duration: '2-4 недели',
                tasks: [
                  'Поиск оптимального жилья',
                  'Бронирование удобных билетов',
                  'Оформление медицинской страховки'
                ],
                color: 'from-green-500 to-emerald-500'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {index < 6 && (
                  <div className="absolute left-12 md:left-16 top-24 bottom-0 w-1 bg-gradient-to-b from-orange-500/50 to-transparent -z-10" />
                )}
                
                <div className="flex gap-6 md:gap-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
                    className="flex-shrink-0"
                  >
                    <div className={`w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-2xl relative group`}>
                      <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                      <span className="relative z-10">{item.step}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="flex-1"
                  >
                    <div className="bg-gradient-to-br from-white to-gray-50 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-orange-600 font-bold bg-orange-50 px-4 py-2 rounded-xl border border-orange-200 shadow-sm flex-shrink-0">
                          <Calendar className="w-5 h-5" />
                          <span className="text-sm md:text-base whitespace-nowrap">{item.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {item.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {item.tasks.map((task, taskIndex) => (
                          <motion.div
                            key={taskIndex}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.4 + taskIndex * 0.1 }}
                            className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm font-medium">{task}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Начните прямо сейчас
              </span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Начните свой путь <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">сегодня</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Запишитесь на бесплатную премиум-консультацию и узнайте, как поступить в университет мечты
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg font-bold rounded-xl transition-all shadow-2xl shadow-orange-500/30 inline-flex items-center gap-3"
            >
              <span>Записаться на консультацию</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
