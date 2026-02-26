import { Instagram, Facebook, Youtube, Linkedin, Twitter, MessageCircle, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export function SocialPage() {
  const socialNetworks = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@ketem_edu',
      followers: '15K подписчиков',
      description: 'Истории студентов, советы по поступлению и жизнь за рубежом',
      color: 'from-purple-500 to-pink-500',
      link: '#',
    },
    {
      icon: Facebook,
      name: 'Facebook',
      handle: 'KETEM edu',
      followers: '12K подписчиков',
      description: 'Новости образования, вебинары и мероприятия',
      color: 'from-blue-600 to-blue-700',
      link: '#',
    },
    {
      icon: Youtube,
      name: 'YouTube',
      handle: 'KETEM edu Channel',
      followers: '8K подписчиков',
      description: 'Видео-гайды, интервью с выпускниками и виртуальные туры по университетам',
      color: 'from-red-600 to-red-700',
      link: '#',
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      handle: 'KETEM Education',
      followers: '10K подписчиков',
      description: 'Профессиональные контакты, карьерные возможности и стажировки',
      color: 'from-blue-700 to-blue-800',
      link: '#',
    },
    {
      icon: Twitter,
      name: 'Twitter/X',
      handle: '@ketem_edu',
      followers: '6K подписчиков',
      description: 'Новости образования, стипендии и актуальные обновления',
      color: 'from-gray-800 to-black',
      link: '#',
    },
    {
      icon: MessageCircle,
      name: 'Telegram',
      handle: '@ketem_education',
      followers: '20K подписчиков',
      description: 'Оперативная поддержка, чат студентов и эксклюзивный контент',
      color: 'from-blue-400 to-blue-500',
      link: '#',
    },
  ];

  const communityFeatures = [
    {
      title: 'Сообщество студентов',
      description: 'Более 5000 активных участников делятся опытом и поддерживают друг друга',
      benefit: 'Найдите друзей и единомышленников',
    },
    {
      title: 'Эксклюзивный контент',
      description: 'Только для подписчиков: вебинары, гайды и закрытые мероприятия',
      benefit: 'Получите доступ к уникальным материалам',
    },
    {
      title: 'Быстрая поддержка',
      description: 'Ответы на вопросы в течение часа в рабочее время',
      benefit: 'Всегда на связи с экспертами',
    },
    {
      title: 'Истории успеха',
      description: 'Вдохновляющие истории студентов, которые уже учатся за рубежом',
      benefit: 'Мотивация и практические советы',
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
            <div className="flex justify-center space-x-4 mb-6">
              <Instagram className="h-12 w-12 text-[#FF6B35]" />
              <Facebook className="h-12 w-12 text-[#FF6B35]" />
              <Youtube className="h-12 w-12 text-[#FF6B35]" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Мы в <span className="text-[#FF6B35]">социальных сетях</span>
            </h1>
            <p className="text-xl text-gray-600">
              Присоединяйтесь к нашему сообществу и будьте в курсе всех новостей об образовании за рубежом
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Networks Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Выбирайте <span className="text-[#FF6B35]">удобную платформу</span>
            </h2>
            <p className="text-xl text-gray-600">Мы есть там, где вам удобно</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socialNetworks.map((network, index) => (
              <motion.a
                key={index}
                href={network.link}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-6 border border-gray-100 group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${network.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <network.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-1">{network.name}</h3>
                <p className="text-[#FF6B35] font-semibold mb-2">{network.handle}</p>
                <p className="text-sm text-gray-600 mb-4">{network.followers}</p>
                <p className="text-gray-700 mb-4">{network.description}</p>

                <div className="flex items-center space-x-2 text-[#FF6B35] group-hover:underline">
                  <span className="font-semibold">Подписаться</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Преимущества <span className="text-[#FF6B35]">нашего сообщес��ва</span>
            </h2>
            <p className="text-xl text-gray-600">Почему стоит подписаться?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {communityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-lg p-3 flex-shrink-0">
                    <div className="w-6 h-6 bg-[#FF6B35] rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full"></div>
                      <span className="text-sm font-semibold text-[#FF6B35]">{feature.benefit}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hashtags Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Используйте наши <span className="text-[#FF6B35]">хештеги</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['#KETEMedu', '#УчебаЗаРубежом', '#StudyAbroad', '#КЕТЕМистории', '#МойПутьКУспеху', '#Поступление2025'].map((tag, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] text-white px-6 py-3 rounded-full text-lg font-semibold hover:scale-110 transition-transform cursor-pointer"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Станьте частью нашего сообщества!</h2>
          <p className="text-xl mb-8 opacity-90">
            Подпишитесь на наши социальные сети и получите доступ к эксклюзивному контенту
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-[#FF6B35] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold flex items-center space-x-2">
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </button>
            <button className="bg-white text-[#FF6B35] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Telegram</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
