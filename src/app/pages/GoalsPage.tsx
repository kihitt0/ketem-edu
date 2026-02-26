import { Target, TrendingUp, Award, CheckCircle, Compass, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';

export function GoalsPage() {
  const goals = [
    {
      icon: Award,
      title: 'Академические достижения',
      description: 'Получите образование мирового класса в престижных университетах',
      path: [
        'Выбор специальности',
        'Поступление в топ-вуз',
        'Академическая успеваемость',
        'Получение диплома',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Карьерный рост',
      description: 'Постройте успешную международную карьеру',
      path: [
        'Определение карьерных целей',
        'Стажировки в компаниях',
        'Networking и связи',
        'Трудоустройство за рубежом',
      ],
    },
    {
      icon: Compass,
      title: 'Личностное развитие',
      description: 'Откройте новые горизонты и расширьте кругозор',
      path: [
        'Межкультурный опыт',
        'Языковая практика',
        'Самостоятельность',
        'Глобальное мышление',
      ],
    },
    {
      icon: Lightbulb,
      title: 'Профессиональные навыки',
      description: 'Приобретите востребованные компетенции',
      path: [
        'Практические навыки',
        'Критическое мышление',
        'Проектная работа',
        'Лидерство',
      ],
    },
  ];

  const steps = [
    {
      step: '1',
      title: 'Определение цели',
      description: 'Вместе определяем ваши академические и карьерные цели',
    },
    {
      step: '2',
      title: 'Построение плана',
      description: 'Создаем индивидуальный план достижения целей',
    },
    {
      step: '3',
      title: 'Выбор программы',
      description: 'Подбираем оптимальную образовательную программу',
    },
    {
      step: '4',
      title: 'Подготовка',
      description: 'Готовим документы и помогаем с поступлением',
    },
    {
      step: '5',
      title: 'Достижение',
      description: 'Сопровождаем вас на пути к успеху',
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
            <Target className="h-16 w-16 text-[#FF6B35] mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Ваши <span className="text-[#FF6B35]\">цели и путь</span>
            </h1>
            <p className="text-xl text-gray-600">
              Мы помогаем определить ваши цели и построить индивидуальный образовательный маршрут для их достижения
            </p>
          </motion.div>
        </div>
      </section>

      {/* Goals Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ваши возможные <span className="text-[#FF6B35]">цели</span>
            </h2>
            <p className="text-xl text-gray-600">Определите свой путь к успеху</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-8 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <goal.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{goal.title}</h3>
                <p className="text-gray-600 mb-6">{goal.description}</p>

                <div className="space-y-3">
                  <div className="font-semibold text-gray-900 mb-3">Ваш путь:</div>
                  {goal.path.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-[#FF6B35]">{idx + 1}</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Как мы строим <span className="text-[#FF6B35]">ваш путь</span>
            </h2>
            <p className="text-xl text-gray-600">Пошаговый процесс достижения целей</p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] transform -translate-y-1/2 z-0"></div>

            <div className="grid md:grid-cols-5 gap-8 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white rounded-xl shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-20 bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Target className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-6">Не уверены в своих целях?</h2>
          <p className="text-xl mb-8 opacity-90">
            Пройдите наш тест и мы поможем определить оптимальный образовательный путь
          </p>
          <button className="bg-white text-[#FF6B35] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold">
            Пройти тест на определение целей
          </button>
        </div>
      </section>
    </div>
  );
}
