import { MapPin, Award, Users, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

export function CountriesPage() {
  const countries = [
    {
      name: 'США',
      universities: '4000+',
      students: '1500+',
      cost: 'от $20,000/год',
      highlights: ['Топ университеты мира', 'Инновации и технологии', 'Широкие возможности'],
    },
    {
      name: 'Великобритания',
      universities: '160+',
      students: '800+',
      cost: 'от £15,000/год',
      highlights: ['Престижное образование', 'Историческое наследие', 'Отличное качество'],
    },
    {
      name: 'Канада',
      universities: '100+',
      students: '600+',
      cost: 'от CAD 15,000/год',
      highlights: ['Мультикультурность', 'Высокий уровень жизни', 'Легкая иммиграция'],
    },
    {
      name: 'Австралия',
      universities: '43+',
      students: '400+',
      cost: 'от AUD 25,000/год',
      highlights: ['Отличный климат', 'Качество жизни', 'Post-study work visa'],
    },
    {
      name: 'Германия',
      universities: '400+',
      students: '500+',
      cost: 'от €0/год',
      highlights: ['Бесплатное образование', 'Сильная экономика', 'Центр Европы'],
    },
    {
      name: 'Франция',
      universities: '300+',
      students: '300+',
      cost: 'от €3,000/год',
      highlights: ['Культурное наследие', 'Доступное образование', 'Мода и дизайн'],
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
              Страны для <span className="text-[#FF6B35]">обучения</span>
            </h1>
            <p className="text-xl text-gray-600">
              Мы работаем с ведущими образовательными учреждениями по всему миру
            </p>
          </motion.div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors">
                    {country.name}
                  </h3>
                  <MapPin className="h-8 w-8 text-[#FF6B35]" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Award className="h-4 w-4 text-[#FF6B35]" />
                      <span className="text-xs text-gray-600">Университеты</span>
                    </div>
                    <div className="font-semibold text-gray-900">{country.universities}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="h-4 w-4 text-[#FF6B35]" />
                      <span className="text-xs text-gray-600">Наши студенты</span>
                    </div>
                    <div className="font-semibold text-gray-900">{country.students}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4 p-3 bg-orange-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-[#FF6B35]" />
                  <div>
                    <div className="text-xs text-gray-600">Стоимость обучения</div>
                    <div className="font-semibold text-gray-900">{country.cost}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <ul className="space-y-2">
                    {country.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full mt-6 bg-[#FF6B35] text-white py-3 rounded-lg hover:bg-[#E55A2B] transition-colors">
                  Подробнее о {country.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Образование по всему <span className="text-[#FF6B35]">миру</span>
            </h2>
            <p className="text-xl text-gray-600">
              Работаем с партнерами в более чем 50 странах
            </p>
          </div>

          <div className="bg-white rounded-2xl p-12 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { region: 'Северная Америка', countries: '2 страны' },
                { region: 'Европа', countries: '25+ стран' },
                { region: 'Азия', countries: '15+ стран' },
              ].map((region, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl">
                  <MapPin className="h-12 w-12 text-[#FF6B35] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{region.region}</h3>
                  <p className="text-gray-600">{region.countries}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
