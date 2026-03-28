import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, DollarSign, Calendar, Globe, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PER_PAGE = 9;

export const CzechiaPage: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rankFilter, setRankFilter] = React.useState('all');
  const [profFilter, setProfFilter] = React.useState('all');
  const [langFilter, setLangFilter] = React.useState('all');
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const universities = [
    { name: 'Карлов университет (Univerzita Karlova)', city: 'Прага', tuition: 'Бесплатно на чешском / €4,000–8,000 на английском', programs: ['Медицина', 'Право', 'Естественные науки', 'Гуманитарные науки'], ranking: '#1 в Чехии', rank: 1, lang: 'both', image: 'https://world-study.kz/wp-content/uploads/2025/04/ryebol9.jpeg' },
    { name: 'Чешский технический университет (ČVUT)', city: 'Прага', tuition: 'Бесплатно на чешском / €3,000–7,000 на английском', programs: ['Инженерия', 'IT', 'Архитектура', 'Транспорт'], ranking: '#2 в Чехии', rank: 2, lang: 'both', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__tfrtH9yn7KlXYuykXBAtNDd-Ylgj_x3Hw&s' },
    { name: 'Технический университет Брно (VUT)', city: 'Брно', tuition: 'Бесплатно на чешском / €2,500–6,000 на английском', programs: ['Инженерия', 'Электротехника', 'IT', 'Бизнес'], ranking: '#3 в Чехии', rank: 3, lang: 'both', image: 'https://prag-study.com/photos/1/Photos/763.jpg' },
    { name: 'Университет Масарика (Masarykova univerzita)', city: 'Брно', tuition: 'Бесплатно на чешском / €3,500–6,500 на английском', programs: ['Медицина', 'Право', 'Экономика', 'IT'], ranking: '#4 в Чехии', rank: 4, lang: 'both', image: 'https://images.gostudy.cz/images/2014/12/Masarikov.jpg' },
    { name: 'Университет экономики в Праге (VŠE)', city: 'Прага', tuition: 'Бесплатно на чешском / €4,000–7,000 на английском', programs: ['Экономика', 'Бизнес', 'Менеджмент', 'Финансы'], ranking: '#1 в экономике', rank: 1, lang: 'both', image: 'https://oca-praga.cz/app/uploads/2022/01/vysshaya-shkola-ekonomiki-nf.jpg' },
    { name: 'Университет Палацкого (Univerzita Palackého)', city: 'Оломоуц', tuition: 'Бесплатно на чешском / €2,000–5,000 на английском', programs: ['Медицина', 'Естественные науки', 'Педагогика', 'Философия'], ranking: '#5 в Чехии', rank: 5, lang: 'both', image: 'https://prag-study.com/photos/1/gallery/%D0%92%D1%83%D0%B7%D1%8B/5dbc18c3ddd48.jpg' },
    { name: 'Горно-геологический университет в Остраве (VŠB)', city: 'Острава', tuition: 'Бесплатно на чешском / €2,500–5,500 на английском', programs: ['Инженерия', 'IT', 'Экономика'], ranking: '#6 в Чехии', rank: 6, lang: 'both', image: 'https://www.eurostudy.cz/wp-content/uploads/2020/09/vsb2.jpg' },
    { name: 'Университет химической технологии Праги', city: 'Прага', tuition: 'Бесплатно на чешском / €3,000–6,000 на английском', programs: ['Химия', 'Биотехнологии', 'Инженерия'], ranking: '#7 в Чехии', rank: 7, lang: 'both', image: 'https://i.ytimg.com/vi/AlfF5m0HYVE/maxresdefault.jpg' },
  ];

  const profKeywords: Record<string, string[]> = {
    medicine:     ['медицин', 'биотехнолог'],
    engineering:  ['инженери', 'it', 'электротехник', 'химия', 'транспорт'],
    business:     ['бизнес', 'экономик', 'менеджмент', 'финанс'],
    architecture: ['архитектур'],
    law:          ['право'],
    humanities:   ['гуманитарн', 'педагогик', 'философ', 'естественн', 'науки'],
  };

  const filtered = universities.filter(uni => {
    if (rankFilter === 'top3' && uni.rank > 3) return false;
    if (rankFilter === 'top5' && uni.rank > 5) return false;
    if (langFilter === 'free' && !uni.tuition.includes('Бесплатно')) return false;
    if (profFilter !== 'all') {
      const kws = profKeywords[profFilter] || [];
      const str = uni.programs.join(' ').toLowerCase();
      if (!kws.some(k => str.includes(k))) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const safePage   = Math.min(page, Math.max(0, totalPages - 1));
  const pageUnis   = filtered.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <img src="https://flagcdn.com/w320/cz.png" alt="Флаг Чехии" className="w-32 h-20 mx-auto mb-6 rounded-lg shadow-2xl" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Обучение в <span className="text-orange-500">Чехии</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Качественное европейское образование в самом сердце Европы с возможностью бесплатного обучения</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, label: '35+ университетов', color: 'from-blue-500 to-cyan-500' },
              { icon: <Users className="w-6 h-6" />, label: '120+ студентов', color: 'from-cyan-500 to-teal-500' },
              { icon: <DollarSign className="w-6 h-6" />, label: 'Бесплатно!', color: 'from-red-500 to-orange-500' },
              { icon: <Calendar className="w-6 h-6" />, label: 'Набор 1 раз в год', color: 'from-orange-500 to-amber-500' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20">
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>{item.icon}</div>
                <p className="text-center font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Топ университеты <span className="text-orange-500">Чехии</span></h2>
            <p className="text-gray-600 text-lg">Престижные вузы с возможностью бесплатного обучения на чешском языке</p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Место в Чехии</div>
                <div className="flex flex-wrap gap-2">
                  {[{ id: 'all', label: 'Все' }, { id: 'top3', label: 'ТОП 3' }, { id: 'top5', label: 'ТОП 5' }].map(f => (
                    <button key={f.id} onClick={() => { setRankFilter(f.id); setPage(0); }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${rankFilter === f.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}>{f.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Стоимость</div>
                <div className="flex flex-wrap gap-2">
                  {[{ id: 'all', label: 'Все' }, { id: 'free', label: '🆓 Бесплатно (чешский)' }].map(f => (
                    <button key={f.id} onClick={() => { setLangFilter(f.id); setPage(0); }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${langFilter === f.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}>{f.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Направление</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'Все' }, { id: 'medicine', label: '🩺 Медицина' }, { id: 'engineering', label: '⚙️ Инженерия/IT' },
                    { id: 'business', label: '📊 Бизнес/Экономика' }, { id: 'architecture', label: '🏛️ Архитектура' },
                    { id: 'law', label: '⚖️ Право' }, { id: 'humanities', label: '📚 Гуманитарные' },
                  ].map(f => (
                    <button key={f.id} onClick={() => { setProfFilter(f.id); setPage(0); }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${profFilter === f.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}>{f.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">Нет университетов по выбранным фильтрам</p>
              <button onClick={() => { setRankFilter('all'); setProfFilter('all'); setLangFilter('all'); }} className="mt-4 text-orange-500 hover:underline text-sm">Сбросить фильтры</button>
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-500 mb-4">Найдено: <span className="font-semibold text-gray-900">{filtered.length}</span> университетов</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pageUnis.map((uni, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }} whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Star className="w-4 h-4" />{uni.ranking}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2">{uni.name}</h3>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-gray-600"><MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" /><span className="text-sm">{uni.city}</span></div>
                        <div className="flex items-center gap-2 text-gray-600"><DollarSign className="w-4 h-4 text-orange-500 flex-shrink-0" /><span className="text-sm font-medium">{uni.tuition}</span></div>
                        <div className="flex items-start gap-2 text-gray-600">
                          <Award className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div className="flex flex-wrap gap-1">{uni.programs.map((p, idx) => <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">{p}</span>)}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button onClick={() => { setPage(p => Math.max(0, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={safePage === 0}
                    className="px-4 py-2 rounded-lg bg-white shadow border border-gray-200 text-gray-600 font-medium disabled:opacity-30 hover:bg-orange-50 hover:border-orange-400 transition-all">←</button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} onClick={() => { setPage(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${safePage === i ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-orange-50 hover:border-orange-400'}`}>{i + 1}</button>
                  ))}
                  <button onClick={() => { setPage(p => Math.min(totalPages - 1, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={safePage >= totalPages - 1}
                    className="px-4 py-2 rounded-lg bg-white shadow border border-gray-200 text-gray-600 font-medium disabled:opacity-30 hover:bg-orange-50 hover:border-orange-400 transition-all">→</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Почему <span className="text-orange-500">Чехия?</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <DollarSign className="w-8 h-8" />, title: 'Бесплатное образование', description: 'Обучение на чешском языке абсолютно бесплатно' },
              { icon: <Globe className="w-8 h-8" />, title: 'Центр Европы', description: 'Легко путешествовать в соседние страны ЕС' },
              { icon: <Award className="w-8 h-8" />, title: 'Качество образования', description: 'Высокие стандарты европейского образования' },
              { icon: <Users className="w-8 h-8" />, title: 'Доступная жизнь', description: 'Низкие цены на проживание и питание' },
              { icon: <GraduationCap className="w-8 h-8" />, title: 'Чешский язык', description: 'Простой для изучения славянский язык' },
              { icon: <Calendar className="w-8 h-8" />, title: 'Безопасность', description: 'Одна из самых безопасных стран в Европе' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-white to-red-500 rounded-xl flex items-center justify-center text-white mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};
