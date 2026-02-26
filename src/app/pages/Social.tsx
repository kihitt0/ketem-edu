import React from 'react';
import { Instagram, Youtube, MessageCircle, Sparkles, TrendingUp, Users, BookOpen, ArrowUpRight } from 'lucide-react';
import { Phone } from 'lucide-react';
import { motion } from 'motion/react';

export const Social: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-10 h-10" />,
      handle: '@ketemedu',
      followers: '25K подписчиков',
      description: 'Истории успеха студентов, советы по поступлению, жизнь за рубежом',
      color: 'from-purple-500 via-pink-500 to-rose-500',
      link: '#'
    },
    {
      name: 'WhatsApp',
      icon: <Phone className="w-10 h-10" />,
      handle: '+7 (XXX) XXX-XX-XX',
      followers: 'Быстрый ответ',
      description: 'Прямая связь с менеджерами, быстрые консультации и поддержка',
      color: 'from-green-500 to-emerald-600',
      link: '#'
    },
    {
      name: 'Telegram',
      icon: <MessageCircle className="w-10 h-10" />,
      handle: '@ketemedu_channel',
      followers: '20K подписчиков',
      description: 'Ежедневные новости, дедлайны, быстрая поддержка',
      color: 'from-blue-400 to-cyan-500',
      link: '#'
    },
    {
      name: 'YouTube',
      icon: <Youtube className="w-10 h-10" />,
      handle: 'KETEM edu',
      followers: '15K подписчиков',
      description: 'Видео-гайды, вебинары, интервью с экспертами и студентами',
      color: 'from-red-500 to-rose-600',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
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
              <Users className="w-4 h-4" />
              60K+ в сообществе
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            Мы в <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">соц. сетях</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Присоединяйтесь к нашему премиум-сообществу и получайте эксклюзивную информацию о поступлении
          </motion.p>
        </div>
      </section>

      {/* Social Networks */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${social.color} opacity-5 rounded-bl-full`}></div>
                
                <div className="relative p-8 md:p-10">
                  {/* Icon and followers */}
                  <div className="flex items-start justify-between mb-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`bg-gradient-to-br ${social.color} p-5 rounded-2xl text-white shadow-2xl`}
                    >
                      {social.icon}
                    </motion.div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <div className="text-xs text-gray-500 font-medium">Аудитория</div>
                      </div>
                      <div className="font-bold text-xl text-gray-900">{social.followers}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {social.name}
                    </h3>
                    <p className={`bg-gradient-to-r ${social.color} bg-clip-text text-transparent font-bold text-lg mb-4`}>
                      {social.handle}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {social.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 group-hover:text-orange-600 font-bold text-lg">
                      Подписаться
                    </span>
                    <motion.div
                      className="w-12 h-12 bg-orange-100 group-hover:bg-orange-500 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowUpRight className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Наше <span className="text-orange-500">сообщество</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам студентов, которые уже достигли своих целей
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'Истории успеха',
                description: 'Читайте вдохновляющие истории студентов, которые поступили в топовые университеты',
                posts: '500+ постов',
                color: 'from-orange-500 to-amber-500'
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Полезные материалы',
                description: 'Гайды, чек-листы, шаблоны для подготовки документов и эссе',
                posts: '200+ материалов',
                color: 'from-amber-500 to-yellow-500'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Живое общение',
                description: 'Участвуйте в обсуждениях, задавайте вопросы экспертам',
                posts: '1000+ обсуждений',
                color: 'from-orange-600 to-red-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{item.description}</p>
                <div className="flex items-center gap-2">
                  <div className={`h-1 w-12 bg-gradient-to-r ${item.color} rounded-full`}></div>
                  <span className="text-sm text-orange-600 font-bold">{item.posts}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white overflow-hidden">
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
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Не пропускайте <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">важное</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Подпишитесь на наши каналы и будьте в курсе всех дедлайнов и возможностей
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.slice(0, 3).map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl transition-all shadow-xl shadow-orange-500/20 inline-flex items-center gap-3 font-bold"
                >
                  {social.icon}
                  <span>Подписаться на {social.name}</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
