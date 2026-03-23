import React from 'react';
import { Instagram, Youtube, MessageCircle, Sparkles, TrendingUp, Users, BookOpen, ArrowUpRight } from 'lucide-react';
import { Phone } from 'lucide-react';
import { motion } from 'motion/react';

export const SocialPage: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6" />,
      handle: '@ketem.education',
      followers: '13.5K',
      description: 'Истории успеха, советы по поступлению, жизнь за рубежом',
      color: 'from-purple-500 via-pink-500 to-rose-500',
      bg: '#fdf2f8',
      accent: '#ec4899',
      link: 'https://www.instagram.com/ketem.education?igsh=MWJwdTZzMjB5ZGdrYw=='
    },
    {
      name: 'WhatsApp',
      icon: <Phone className="w-6 h-6" />,
      handle: '+7 775 883 7090',
      followers: 'Онлайн',
      description: 'Прямая связь с менеджерами и быстрые консультации',
      color: 'from-green-500 to-emerald-600',
      bg: '#f0fdf4',
      accent: '#22c55e',
      link: 'https://wa.me/87758837090'
    },
    {
      name: 'Telegram',
      icon: <MessageCircle className="w-6 h-6" />,
      handle: '@ketemedu_channel',
      followers: '20K',
      description: 'Ежедневные новости, дедлайны и быстрая поддержка',
      color: 'from-blue-400 to-cyan-500',
      bg: '#eff6ff',
      accent: '#3b82f6',
      link: '#'
    },
    {
      name: 'YouTube',
      icon: <Youtube className="w-6 h-6" />,
      handle: 'KETEM edu',
      followers: '15K',
      description: 'Видео-гайды, интервью с экспертами и студентами',
      color: 'from-red-500 to-rose-600',
      bg: '#fff1f2',
      accent: '#ef4444',
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
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            Мы в <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">соц. сетях</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Присоединяйтесь к нашему сообществу и получайте эксклюзивную информацию о поступлении
          </motion.p>
        </div>
      </section>

      {/* Social Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
                style={{ background: social.bg }}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}
                >
                  {social.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-gray-900 text-base">{social.name}</span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${social.accent}18`, color: social.accent }}
                    >
                      {social.followers} {social.name === 'WhatsApp' ? '' : 'подп.'}
                    </span>
                  </div>
                  <div className="text-sm font-medium mb-1" style={{ color: social.accent }}>{social.handle}</div>
                  <p className="text-gray-500 text-xs leading-relaxed truncate">{social.description}</p>
                </div>

                {/* Arrow */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: `${social.accent}18` }}
                >
                  <ArrowUpRight className="w-4 h-4" style={{ color: social.accent }} />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 mt-8 p-6 bg-gray-50 rounded-2xl"
          >
            {[
              { value: '48K+', label: 'Подписчиков', icon: '👥' },
              { value: '500+', label: 'Студентов поступило', icon: '🎓' },
              { value: '24/7', label: 'Поддержка', icon: '💬' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold mb-3">
              Наше <span className="text-orange-500">сообщество</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: 'Истории успеха',
                description: 'Вдохновляющие истории студентов из топовых университетов',
                color: 'from-orange-500 to-amber-500'
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: 'Полезные материалы',
                description: 'Гайды, чек-листы и шаблоны для подготовки документов',
                color: 'from-amber-500 to-yellow-500'
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Живое общение',
                description: 'Участвуйте в обсуждениях, задавайте вопросы экспертам',
                color: 'from-orange-600 to-red-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white mb-4 shadow group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                <div className={`h-0.5 w-10 bg-gradient-to-r ${item.color} rounded-full mt-4`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
