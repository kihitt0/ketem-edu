import React, { useState } from 'react';
import { Instagram, Youtube, MessageCircle, Sparkles, Users, BookOpen, ArrowUpRight, Phone } from 'lucide-react';
import { motion } from 'motion/react';
 
export const Social: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
 
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-7 h-7" />,
      handle: '@ketem.education',
      followers: '13.5K',
      description: 'Истории успеха, лайфхаки по поступлению, жизнь студентов за рубежом',
      link: 'https://www.instagram.com/ketem.education?igsh=MWJwdTZzMjB5ZGdrYw==',
      emoji: '📸',
    },
    {
      name: 'WhatsApp',
      icon: <Phone className="w-7 h-7" />,
      handle: '+7 775 883 7090',
      followers: '24/7',
      description: 'Пиши прямо сейчас — ответим мгновенно и поможем с любым вопросом',
      link: 'https://wa.me/87758837090',
      emoji: '💬',
    },
    {
      name: 'Telegram',
      icon: <MessageCircle className="w-7 h-7" />,
      handle: '@ketemedu_channel',
      followers: '20K',
      description: 'Новости, дедлайны, секретные фишки поступления — каждый день',
      link: '#',
      emoji: '✈️',
    },
    {
      name: 'YouTube',
      icon: <Youtube className="w-7 h-7" />,
      handle: 'KETEM edu',
      followers: '15K',
      description: 'Видео-гайды, интервью со студентами и разборы университетов',
      link: '#',
      emoji: '🎬',
    },
  ];
 
  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
 
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#1a1a1a' }}>
        {/* Orange blobs */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <motion.div animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '10%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.25), transparent 70%)', filter: 'blur(40px)' }} />
          <motion.div animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1.2, 1, 1.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '30%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,184,0,0.2), transparent 70%)', filter: 'blur(40px)' }} />
          <motion.div animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', bottom: '10%', left: '30%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.15), transparent 70%)', filter: 'blur(40px)' }} />
        </div>
 
        {/* Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
 
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: 800, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.4)', borderRadius: 50, padding: '8px 20px', marginBottom: 28 }}>
              <span style={{ color: '#FF6B35', fontSize: 13, fontWeight: 600 }}>🔥 Подпишись и будь в курсе</span>
            </div>
          </motion.div>
 
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, lineHeight: 1.05, color: '#fff', marginBottom: 24, letterSpacing: '-2px' }}>
            Мы везде,{' '}
            <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FFB800)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              где ты
            </span>
          </motion.h1>
 
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: 20, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 48 }}>
            48K+ студентов уже с нами. Присоединяйся и получай инсайды по поступлению каждый день.
          </motion.p>
 
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[['48K+', 'Подписчиков'], ['500+', 'Поступило'], ['4', 'Платформы']].map(([v, l], i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 34, fontWeight: 900, background: 'linear-gradient(135deg, #FF6B35, #FFB800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
 
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.25)', fontSize: 24 }}>↓</motion.div>
      </section>
 
      {/* SOCIAL CARDS */}
      <section style={{ padding: '80px 20px', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 48, fontWeight: 800, color: '#1a1a1a', marginBottom: 12 }}>Выбери платформу</h2>
            <p style={{ color: '#888', fontSize: 18 }}>Мы активны на каждой из них</p>
          </motion.div>
 
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {socialLinks.map((s, i) => (
              <motion.a key={i} href={s.link} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: 'relative', display: 'block', borderRadius: 28, overflow: 'hidden',
                  border: hovered === i ? '1.5px solid #FF6B35' : '1.5px solid #ebebeb',
                  background: '#fff',
                  padding: '32px 28px', textDecoration: 'none', cursor: 'pointer',
                  transform: hovered === i ? 'translateY(-8px)' : 'none',
                  boxShadow: hovered === i ? '0 24px 64px rgba(255,107,53,0.15)' : '0 2px 16px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}>
 
                {/* Верхняя оранжевая полоска при hover */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #FF6B35, #FFB800)', borderRadius: '28px 28px 0 0', opacity: hovered === i ? 1 : 0, transition: 'opacity 0.3s' }} />
 
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Иконка + аудитория */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: 18,
                      background: hovered === i ? 'linear-gradient(135deg, #FF6B35, #FFB800)' : '#f7f7f7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: hovered === i ? '#fff' : '#999',
                      transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transform: hovered === i ? 'scale(1.12) rotate(-4deg)' : 'scale(1)',
                      boxShadow: hovered === i ? '0 12px 32px rgba(255,107,53,0.35)' : 'none',
                    }}>
                      {s.icon}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 10, color: '#ccc', marginBottom: 4, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>Аудитория</div>
                      <div style={{ fontSize: 26, fontWeight: 900, color: hovered === i ? '#FF6B35' : '#1a1a1a', transition: 'color 0.3s', letterSpacing: '-1px' }}>{s.followers}</div>
                    </div>
                  </div>
 
                  {/* Название */}
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#1a1a1a', marginBottom: 4, letterSpacing: '-0.5px' }}>{s.name}</div>
                  
                  {/* Хендл */}
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, color: hovered === i ? '#FF6B35' : '#bbb', transition: 'color 0.3s' }}>{s.handle}</div>
                  
                  {/* Описание */}
                  <p style={{ fontSize: 14, color: '#888', lineHeight: 1.65, marginBottom: 24, minHeight: 44 }}>{s.description}</p>
 
                  {/* Разделитель */}
                  <div style={{ height: 1, background: hovered === i ? 'linear-gradient(90deg, #FF6B35, transparent)' : '#f0f0f0', marginBottom: 20, transition: 'all 0.3s' }} />
 
                  {/* Кнопка */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#FF6B35', letterSpacing: 0.3 }}>
                      {hovered === i ? 'Открыть →' : 'Перейти →'}
                    </span>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: hovered === i ? 'linear-gradient(135deg, #FF6B35, #FFB800)' : '#f5f5f5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transform: hovered === i ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: hovered === i ? '0 4px 16px rgba(255,107,53,0.4)' : 'none',
                    }}>
                      <ArrowUpRight style={{ width: 18, height: 18, color: hovered === i ? '#fff' : '#999' }} />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
 
 {/* Community */}
      <section style={{ padding: "80px 40px", background: "#111" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10" style={{ color: "#fff" }}>
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#fff" }}>Наше <span className="text-orange-500">сообщество</span></h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>Тысячи студентов уже с нами</p>
          </motion.div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { icon: <Sparkles className="w-9 h-9" />, title: 'Истории успеха', description: 'Вдохновляющие истории студентов из топовых университетов', color: 'from-orange-500 to-amber-500' },
              { icon: <BookOpen className="w-9 h-9" />, title: 'Полезные материалы', description: 'Гайды, чек-листы и шаблоны для подготовки документов', color: 'from-amber-500 to-yellow-500' },
              { icon: <Users className="w-9 h-9" />, title: 'Живое общение', description: 'Участвуйте в обсуждениях, задавайте вопросы экспертам', color: 'from-orange-600 to-red-500' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300">
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-2xl mb-4 text-white">{item.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed">{item.description}</p>
                <div className={`h-0.5 w-10 bg-gradient-to-r ${item.color} rounded-full mt-5`} />
              </motion.div>
            ))}
          </div>
 
          
        </div>
      </section>
    </div>
  );
};