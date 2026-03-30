import React from 'react';
import { Heart, Shield, Sparkles, Brain, Target, Users } from 'lucide-react';
import { motion } from 'motion/react';

export const Psychology: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium backdrop-blur-sm">
              <Heart className="w-4 h-4" />
              Забота о вашем благополучии
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-8">
            <Heart className="w-20 h-20 text-orange-500 mx-auto" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-6xl md:text-7xl font-bold mb-6">
            Психологическая <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">поддержка</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Мы понимаем, что переезд и поступление — это стресс. Наши психологи помогут вам справиться с любыми трудностями
          </motion.p>
        </div>
      </section>

      {/* Why Support is Important */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Почему это <span className="text-orange-500">важно</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ментальное здоровье — основа вашего успеха в учебе и жизни</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Адаптация', description: 'Помогаем адаптироваться к новой культуре, языку и образовательной системе', icon: <Target className="w-12 h-12" />, color: 'from-orange-500 to-amber-500' },
              { title: 'Стресс', description: 'Учим справляться со стрессом от экзаменов, заявок и дедлайнов', icon: <Brain className="w-12 h-12" />, color: 'from-amber-500 to-yellow-500' },
              { title: 'Уверенность', description: 'Помогаем поверить в себя и свои силы на пути к цели', icon: <Sparkles className="w-12 h-12" />, color: 'from-orange-600 to-red-500' },
              { title: 'Мотивация', description: 'Поддерживаем мотивацию на всех этапах подготовки', icon: <Heart className="w-12 h-12" />, color: 'from-pink-500 to-rose-500' },
              { title: 'Баланс', description: 'Учим находить баланс между учебой, личной жизнью и отдыхом', icon: <Shield className="w-12 h-12" />, color: 'from-purple-500 to-pink-500' },
              { title: 'Поддержка', description: 'Всегда рядом в трудные моменты и готовы выслушать', icon: <Users className="w-12 h-12" />, color: 'from-blue-500 to-cyan-500' },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -8, scale: 1.02 }} className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform relative z-10`}>{item.icon}</div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900 relative z-10">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parents & Children Support */}
      <section className="py-24 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-500 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Семейная поддержка
            </span>
            <h2 className="text-5xl font-bold mb-4">Поддержка для <span className="text-orange-500">родителей и детей</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Поступление за рубеж — это важный шаг для всей семьи. Мы помогаем и студентам, и их родителям пройти этот путь вместе</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4"><Brain className="w-8 h-8 text-white" /></div>
                <h3 className="text-3xl font-bold text-white mb-2">Для студентов</h3>
                <p className="text-orange-100">Индивидуальная психологическая поддержка на каждом этапе</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {['Преодоление страха перед переездом и новой жизнью', 'Работа с тревогой перед экзаменами и собеседованиями', 'Адаптация к новой культуре и социальной среде', 'Борьба с ностальгией и тоской по дому', 'Развитие уверенности и самостоятельности', 'Помощь при академическом стрессе и выгорании'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><div className="w-2 h-2 bg-orange-500 rounded-full" /></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4"><Heart className="w-8 h-8 text-white" /></div>
                <h3 className="text-3xl font-bold text-white mb-2">Для родителей</h3>
                <p className="text-pink-100">Поддержка и информация для спокойствия всей семьи</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {['Как отпустить ребёнка учиться за рубеж без тревоги', 'Как поддерживать связь и не создавать лишнего давления', 'Признаки того, что ребёнку нужна помощь', 'Как правильно реагировать на трудности студента', 'Финансовое планирование и снижение стресса', 'Онлайн-консультации для родителей в любое время'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><div className="w-2 h-2 bg-pink-500 rounded-full" /></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Видео о{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                психологической поддержке
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Узнайте больше о том, как мы помогаем студентам справляться с трудностями
            </p>
          </div>

          <div className="w-full rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/VRcOn9PPyes"
              title="Психологическая поддержка"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
};
