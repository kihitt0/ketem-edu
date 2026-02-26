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
            className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
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
              <Heart className="w-4 h-4" />
              Забота о вашем благополучии
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Heart className="w-20 h-20 text-orange-500 mx-auto" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            Психологическая <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">поддержка</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Мы понимаем, что переезд и поступление - это стресс. Наши психологи помогут вам справиться с любыми трудностями
          </motion.p>
        </div>
      </section>

      {/* Why Support is Important */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Почему это <span className="text-orange-500">важно</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ментальное здоровье - основа вашего успеха в учебе и жизни
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Адаптация',
                description: 'Помогаем адаптироваться к новой культуре, языку и образовательной системе',
                icon: <Target className="w-12 h-12" />,
                color: 'from-orange-500 to-amber-500'
              },
              {
                title: 'Стресс',
                description: 'Учим справляться со стрессом от экзаменов, заявок и дедлайнов',
                icon: <Brain className="w-12 h-12" />,
                color: 'from-amber-500 to-yellow-500'
              },
              {
                title: 'Уверенность',
                description: 'Помогаем поверить в себя и свои силы на пути к цели',
                icon: <Sparkles className="w-12 h-12" />,
                color: 'from-orange-600 to-red-500'
              },
              {
                title: 'Мотивация',
                description: 'Поддерживаем мотивацию на всех этапах подготовки',
                icon: <Heart className="w-12 h-12" />,
                color: 'from-pink-500 to-rose-500'
              },
              {
                title: 'Баланс',
                description: 'Учим находить баланс между учебой, личной жизнью и отдыхом',
                icon: <Shield className="w-12 h-12" />,
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Поддержка',
                description: 'Всегда рядом в трудные моменты и готовы выслушать',
                icon: <Users className="w-12 h-12" />,
                color: 'from-blue-500 to-cyan-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                  {item.icon}
                </div>
                
                <h3 className="font-bold text-2xl mb-3 text-gray-900 relative z-10">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4">
              Видео о <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">психологической поддержке</span>
            </h2>
            <p className="text-xl text-gray-300">
              Узнайте больше о том, как мы помогаем студентам справляться с трудностями
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] p-6 md:p-8 rounded-3xl shadow-2xl border border-white/10">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Видео о психологической поддержке"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-xl text-gray-300 mb-8">
              Наши специалисты готовы помочь вам в любое время
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg font-bold rounded-xl transition-all shadow-2xl shadow-orange-500/30"
            >
              Записаться на консультацию
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center"
          >
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <Shield className="w-6 h-6 text-orange-400" />
              <p className="text-lg">
                Все консультации конфиденциальны и проводятся профессиональными психологами
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};