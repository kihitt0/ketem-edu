import { GraduationCap, Clock, DollarSign, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export function ProgramsPage() {
  const programs = [
    {
      title: 'Бакалавриат',
      duration: '4 года',
      price: 'от $20,000/год',
      description: 'Получите степень бакалавра в лучших университетах мира',
      features: ['Широкий выбор специальностей', 'Стипендии до 100%', 'Программы обмена'],
    },
    {
      title: 'Магистратура',
      duration: '1-2 года',
      price: 'от $25,000/год',
      description: 'Углубленная подготовка по выбранной специальности',
      features: ['Исследовательские проекты', 'Стажировки', 'Международные сертификаты'],
    },
    {
      title: 'MBA',
      duration: '1-2 года',
      price: 'от $50,000/год',
      description: 'Программы делового администрирования в топ-школах',
      features: ['Networking', 'Кейс-методики', 'Карьерная поддержка'],
    },
    {
      title: 'Докторантура',
      duration: '3-5 лет',
      price: 'от $15,000/год',
      description: 'Исследовательские программы PhD',
      features: ['Полное финансирование', 'Научные публикации', 'Академическая карьера'],
    },
    {
      title: 'Языковые курсы',
      duration: '1-12 месяцев',
      price: 'от $1,000/мес',
      description: 'Интенсивное изучение иностранных языков',
      features: ['Подготовка к экзаменам', 'Погружение в среду', 'Сертификаты'],
    },
    {
      title: 'Foundation',
      duration: '1 год',
      price: 'от $18,000/год',
      description: 'Подготовительные программы для поступления',
      features: ['Академическая подготовка', 'Языковая практика', 'Гарантия поступления'],
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Наши <span className="text-[#FF6B35]">программы</span>
            </h1>
            <p className="text-xl text-gray-600">
              Выберите программу обучения, которая подходит именно вам
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Clock className="h-4 w-4 text-[#FF6B35]" />
                    <span className="text-sm">{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <DollarSign className="h-4 w-4 text-[#FF6B35]" />
                    <span className="text-sm">{program.price}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                        <BookOpen className="h-4 w-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full mt-6 bg-[#FF6B35] text-white py-3 rounded-lg hover:bg-[#E55A2B] transition-colors">
                  Узнать больше
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Не нашли подходящую программу?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Свяжитесь с нами, и мы подберем идеальный вариант для вас
          </p>
          <button className="bg-[#FF6B35] text-white px-8 py-4 rounded-lg hover:bg-[#E55A2B] transition-colors">
            Получить консультацию
          </button>
        </div>
      </section>
    </div>
  );
}
