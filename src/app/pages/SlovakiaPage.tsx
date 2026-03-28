import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, DollarSign, Calendar, Globe, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PER_PAGE = 9;

export const SlovakiaPage: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [qsFilter, setQsFilter] = React.useState('all');
  const [profFilter, setProfFilter] = React.useState('all');
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

    const universities = [
    { name: 'Университет Коменского', city: 'Братислава', info: 'Самый престижный и крупный университет Словакии. Лидер по медицине, праву и науке.', qs: '651-700', rank: '1 место', ranking: 'QS 651-700', tuition: 'Бесплатно на словацком', programs: [], image: 'https://oca-praga.cz/app/uploads/2022/06/621001_466305453445543_818638352_o.jpg' },
    { name: 'СТУ в Братиславе (Slovak University of Technology)', city: 'Братислава', info: 'Один из лучших технических университетов страны с сильными программами в инженерии и архитектуре.', qs: '601-650', rank: '2 место', ranking: 'QS 601-650', tuition: 'Бесплатно на словацком', programs: [], image: 'https://studix.eu/wp-content/webp-express/webp-images/wp-content/uploads/2016/11/3-0ec7be29ec7a04b279e113b4b21e1b6d1d20d27e-e1513973551321.jpg.webp' },
    { name: 'Университет Павла Йозефа Шафарика (Košice)', city: 'Кошице', info: 'Один из ведущих вузов страны, особенно в медицине и естественных науках', qs: '801-1000', rank: '2 место', ranking: 'QS 801-1000', tuition: 'Бесплатно на словацком', programs: [], image: 'https://go-to-slovakia.com.ua/wp-content/uploads/2015/11/%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82-%D0%BF%D0%B0%D0%B2%D0%BB%D0%B0-%D0%B9%D0%BE%D0%B7%D0%B5%D1%84%D0%B0-%D1%88%D0%B0%D1%84%D0%B0%D1%80%D0%B8%D0%BA%D0%B0.jpg' },
    { name: 'Жилинский университет в Жилине', city: 'Жилина', info: 'Один из сильнейших технических вузов Словакии. Особенно развитые направления: транспорт, логистика, IT и инженерия. Часто выбирают студенты, которые хотят практическую профессию с перспективой работы в Европе.', qs: '1201-1400', rank: '3-5 место', ranking: 'QS 1201-1400', tuition: 'Бесплатно на словацком', programs: ['Автоматизация', 'Коммуникационные и информационные технологии', 'Мультимедийные технологии', 'Информатика', 'Информатика и управавление'], image: 'https://educate.agency/wp-content/uploads/2023/01/university-small-11.png' },
    { name: 'Технический университет в Кошице (ТУКЕ)', city: 'Кошице', info: 'Сильный технический вуз с направлениями IT, инженерии и экономики.', qs: '801-1000', rank: '3 место', ranking: 'QS 801-1000', tuition: 'Бесплатно на словацком', programs: [], image: 'https://comestudy.ua/wp-content/uploads/2024/12/technical-university-in-kosice-openpage-scaled.jpg' },
    { name: 'Аграрный университет в Нитре', city: 'Нитра', info: 'Один из ведущих вузов в сфере сельского хозяйства, экологии и биотехнологий. Часто выбирается благодаря сочетанию качества образования и лёгкого поступления.', qs: '1001-1200', rank: '5-6 место', ranking: 'QS 1001-1200', tuition: 'Бесплатно на словацком', programs: [], image: 'https://slovakstudy.com/wp-content/uploads/2025/07/spu-nitra-1.jpg' },
    { name: 'Экономический университет в Братиславе (EUBA)', city: 'Братислава', info: 'Главный вуз страны в сфере экономики, бизнеса и финансов.', qs: '1201- 1400', rank: '5-7 место', ranking: 'QS 1201- 1400', tuition: 'Бесплатно на словацком', programs: [], image: 'https://www.educationcenter.cz/assets/images/ru/blog/ekonomicheskij-universitet-v-bratislave-obzor-i-preimushhestva-obucheniya-dlya-studentov-iz-stran-sng/istoriya-i-osnovnye-fakty-EUBA.jpg' },
    { name: 'Университет Маттея Белла (Banská Bystrica)', city: 'Банска-Бистрица', info: 'Сильные программы в экономике, туризме и международных отношениях.', qs: '1001-1200', rank: '6-8 место', ranking: 'QS 1001-1200', tuition: 'Бесплатно на словацком', programs: [], image: 'https://www.postupai.com/images/university/35/35_image.jpg.webp' },
    { name: 'УКФ в Нитре (University of Constantine the Philosopher)', city: 'Нитра', info: 'Популярен среди иностранных студентов. Направления: педагогика, филология, дизайн.', qs: 'Не входит', rank: '8-12 место', ranking: '8-12 место', tuition: 'Бесплатно на словацком', programs: [], image: 'https://surl.lu/nxwikk' },
    { name: 'Прешовский университет в Прешове', city: 'Прешов', info: 'Университет с широким выбором гуманитарных и педагогических программ. Популярен среди студентов за доступность поступления и относительно невысокую нагрузку.', qs: 'Не входит', rank: '10-15 место', ranking: '10-15 место', tuition: 'Бесплатно на словацком', programs: ['Английский язык и англофонные культуры', 'Английский язык и культура (в комбинации)', 'Архивоведение', 'История', 'Медиальные исследования'], image: 'https://go-to-slovakia.com.ua/wp-content/uploads/2015/10/unipo-08.jpg' },
    { name: 'Трнавский университет', city: 'Трнава', info: 'Классический университет с направлениями права, медицины и гуманитарных наук.', qs: 'Не входит', rank: '10-12 место', ranking: '10-12 место', tuition: 'Бесплатно на словацком', programs: [], image: 'https://comestudy.ua/wp-content/uploads/2024/12/trnava-university-openpage-1024x683.jpg' },
    { name: 'Университет Кирилла и Мефодия', city: 'Трнава', info: 'Современные направления: медиа, коммуникации, менеджмент.', qs: 'Не входит', rank: '10-14 место', ranking: '10-14 место', tuition: 'Бесплатно на словацком', programs: [], image: 'https://comestudy.ua/wp-content/uploads/2024/12/10-4.jpg' },
    { name: 'Технический университет в Зволене', city: 'Зволен', info: 'Специализируется на экологии, лесном хозяйстве и природных ресурсах.', qs: 'Не входит', rank: '12- 15 место', ranking: '12- 15 место', tuition: 'Бесплатно на словацком', programs: [], image: 'https://go-to-slovakia.com.ua/wp-content/uploads/2015/11/tuzvo-02.jpg' },
    { name: 'Университет Александра Дубчека в Тренчине', city: 'Тренчин', info: 'Университет прикладных наук с программами по технологиям и менеджменту.', qs: 'Не входит', rank: '12-16 место', ranking: '12-16 место', tuition: 'Бесплатно на словацком', programs: [], image: 'https://www.postupai.com/images/university/29/29_image.jpg' },
    { name: 'Католический университет в Ружомберке', city: 'Ружомберок', info: 'Гуманитарный вуз с акцентом на педагогику, психологию и социальные науки. Подходит для студентов, ориентированных на спокойное обучение и несложное поступление.', qs: 'Не входит', rank: '15 место', ranking: '15 место', tuition: 'Бесплатно на словацком', programs: ['Англистика и американистика', 'Англистика и амереканистика - история', 'Англистика и амереканистика - философия', 'Журналистика', 'История'], image: 'https://optim.tildacdn.one/tild3831-3964-4431-b062-633930643363/-/resize/744x/-/format/webp/ku.png.webp' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <img 
              src="https://flagcdn.com/w320/sk.png"
              alt="Флаг Словакии"
              className="w-32 h-20 mx-auto mb-6 rounded-lg shadow-2xl"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Обучение в <span className="text-orange-500">Словакии</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Доступное европейское образование в живописной стране в центре Европы
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, label: '25+ университетов', color: 'from-blue-500 to-white' },
              { icon: <Users className="w-6 h-6" />, label: '80+ студентов', color: 'from-white to-red-500' },
              { icon: <DollarSign className="w-6 h-6" />, label: 'Бесплатно!', color: 'from-red-500 to-orange-500' },
              { icon: <Calendar className="w-6 h-6" />, label: 'Набор 1 раз в год', color: 'from-orange-500 to-amber-500' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                  {item.icon}
                </div>
                <p className="text-center font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Топ университеты <span className="text-orange-500">Словакии</span></h2>
            <p className="text-gray-600 text-lg">Качественное образование по доступным ценам в сердце Европы</p>
          </motion.div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">QS Рейтинг</div>
                <div className="flex flex-wrap gap-2">
                  {[{ id: 'all', label: 'Все' }, { id: 'top700', label: 'ТОП 700' }, { id: 'top1000', label: 'ТОП 1000' }, { id: 'noqs', label: 'Без QS' }].map(f => (
                    <button key={f.id} onClick={() => { setQsFilter(f.id); setPage(0); }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${qsFilter === f.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}>{f.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Направление</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'Все' }, { id: 'medicine', label: '🩺 Медицина' }, { id: 'engineering', label: '⚙️ Инженерия/IT' },
                    { id: 'business', label: '📊 Бизнес/Экономика' }, { id: 'architecture', label: '🏛️ Архитектура/Дизайн' },
                    { id: 'law', label: '⚖️ Право' }, { id: 'humanities', label: '📚 Гуманитарные' },
                  ].map(f => (
                    <button key={f.id} onClick={() => { setProfFilter(f.id); setPage(0); }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${profFilter === f.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}>{f.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Filter logic */}
          {(() => {
            const getQsNum = (qs: string): number => {
              if (qs === 'Не входит') return 9999;
              const n = parseInt(qs.replace(/[^\d]/g, ''));
              return isNaN(n) ? 9999 : n;
            };
            const profKeywords: Record<string, string[]> = {
              medicine:     ['медицин', 'фармац', 'ветерин', 'биолог'],
              engineering:  ['инженери', 'it', 'технич', 'электр', 'информатик', 'автоматиз', 'коммуникац'],
              business:     ['бизнес', 'экономик', 'финанс', 'менеджмент', 'туризм'],
              architecture: ['архитектур', 'дизайн', 'медиа', 'коммуникации'],
              law:          ['право', 'юрид'],
              humanities:   ['гуманитарн', 'педагогик', 'психолог', 'международн', 'филолог', 'журналист', 'история', 'аграрн', 'сельск'],
            };
            const filtered = universities.filter(uni => {
              const qsNum = getQsNum(uni.qs);
              if (qsFilter === 'top700'  && qsNum > 700)  return false;
              if (qsFilter === 'top1000' && qsNum > 1000) return false;
              if (qsFilter === 'noqs'   && qsNum !== 9999) return false;
              if (profFilter !== 'all') {
                const kws = profKeywords[profFilter] || [];
                const str = (uni.info + ' ' + (uni.programs || []).join(' ')).toLowerCase();
                if (!kws.some(k => str.includes(k))) return false;
              }
              return true;
            });
            const totalPages = Math.ceil(filtered.length / PER_PAGE);
            const safePage = Math.min(page, Math.max(0, totalPages - 1));
            const pageUnis = filtered.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);
            return (
              <>
                {filtered.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">Нет университетов по выбранным фильтрам</p>
                    <button onClick={() => { setQsFilter('all'); setProfFilter('all'); }} className="mt-4 text-orange-500 hover:underline text-sm">Сбросить фильтры</button>
                  </div>
                ) : (
                  <>
                    <div className="text-sm text-gray-500 mb-4">Найдено: <span className="font-semibold text-gray-900">{filtered.length}</span> университетов</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {pageUnis.map((uni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {uni.ranking}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2">{uni.name}</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm">{uni.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{uni.tuition}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm font-medium">QS: {uni.qs} · {uni.rank}</span>
                    </div>
                    {uni.programs.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {uni.programs.slice(0,4).map((p: string, i: number) => (
                          <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">{p}</span>
                        ))}
                      </div>
                    )}
                    {uni.info && (
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">{uni.info}</p>
                    )}
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
              </>
            );
          })()}
        </div>
      </section>

      {/* Why Slovakia Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Почему <span className="text-orange-500">Словакия?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: 'Бесплатное обучение',
                description: 'Учёба на словацком языке полностью бесплатна'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Центр Европы',
                description: 'Близость к Вене, Будапешту и другим столицам'
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Европейский диплом',
                description: 'Признается во всех странах Европейского Союза'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Низкие цены',
                description: 'Самая доступная стоимость жизни в ЕС'
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: 'Славянский язык',
                description: 'Легко учить для носителей русского языка'
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: 'Природа',
                description: 'Горы, леса и красивейшие пейзажи'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-white to-red-600 rounded-xl flex items-center justify-center text-white mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-500 via-white to-red-600 rounded-3xl p-12 text-center shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Готовы начать своё обучение в Словакии?</h2>
            <p className="text-xl mb-8 text-gray-700">
              Откройте двери в европейское будущее с бесплатным образованием!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg"
              >
                Получить консультацию
              </Link>
              <Link
                to="/about"
                className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all"
              >
                Узнать больше
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
