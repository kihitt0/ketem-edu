import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, DollarSign, Calendar, Globe, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PER_PAGE = 9;

export const ItalyPage: React.FC = () => {
  const [page, setPage] = React.useState(0);
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

    const universities = [
    { name: 'Университет Болоньи (University of Bologna)', city: 'Болонья', info: 'Старейший университет Европы и один из самых престижных в Италии. Сильные направления: право, экономика, международные отношения.', qs: '154', rank: '1-2место', ranking: 'QS 154', tuition: '€2,600–3,000/год', programs: [], image: 'https://world.uz/files/fotto_689432sj.jpg' },
    { name: 'Политехнический университет Милана (Politecnico di Milano)', city: 'Милан', info: 'Лучший технический вуз Италии. Особенно силён в архитектуре, дизайне и инженерии.', qs: '123', rank: '1 место в тех', ranking: 'QS 123', tuition: '€3,900–4,200/год', programs: [], image: 'https://studiareinitalia.ru/upload/iblock/79f/15g4ay0jsgsi1vd919poj1appo4zg1xw.jpg' },
    { name: 'Университет LUISS (Rome)', city: 'Рим', info: 'Частный университет с сильным уклоном в бизнес, право и международные отношения.', qs: '601 -650', rank: '1-3 место среди частных', ranking: 'QS 601 -650', tuition: '€15,000–18,000/год', programs: [], image: 'https://keystoneacademic-res.cloudinary.com/image/upload/c_limit,w_1920/dpr_auto/f_auto/q_auto/v1/element/17/173600_Ranking.jpeg' },
    { name: 'Сапиенца — Университет Рима (Sapienza University of Rome)', city: 'Рим', info: 'Один из крупнейших университетов Европы. Сильные направления: медицина, гуманитарные науки, архитектура.', qs: '134', rank: '2-3 место', ranking: 'QS 134', tuition: '€1,500–2,500/год', programs: [], image: 'https://rustudy.uz/wp-content/uploads/2024/12/sapienza-2-e1575024831253.jpg' },
    { name: 'Политехнический университет Турина (Politecnico di Torino)', city: 'Турин', info: 'Один из лучших инженерных вузов Италии. Подходит для IT, инженерии и архитектуры.', qs: '252', rank: '2-3 в тех', ranking: 'QS 252', tuition: '€2,700–3,500/год', programs: [], image: 'https://cdn.globaldialog.ru/files/651/6707a1ff61/politecnico-di-torino-1_r720x570.jpeg' },
    { name: 'Университет Падуи (University of Padua)', city: 'Падуя', info: 'Один из старейших вузов Италии с высоким уровнем образования. Сильные направления: медицина, биология, психология.', qs: '219', rank: '3-4 место', ranking: 'QS 219', tuition: '€1,500–2,700/год', programs: [], image: 'https://surl.li/dbtqjz' },
    { name: 'Университет Милана (University of Milan)', city: 'Милан', info: 'Сильный государственный университет с упором на медицину, науку и фармацевтику.', qs: '276', rank: '4-5 место', ranking: 'QS 276', tuition: '€1,000–3,000/год', programs: [], image: 'https://keystoneacademic-res.cloudinary.com/image/upload/element/23/235900_UniMi_cover.jpg' },
    { name: 'Университет Пизы (University of Pisa)', city: 'Пиза', info: 'Один из сильных научных вузов Италии. Известен математикой, физикой и IT.', qs: '349', rank: '5-7 место', ranking: 'QS 349', tuition: '€900–2,500/год', programs: [], image: 'https://excourse.kz/56.jpg' },
    { name: 'Университет Флоренции (University of Florence)', city: 'Флоренция', info: 'Классический университет с сильными программами в архитектуре, искусстве и гуманитарных науках.', qs: '358', rank: '6 - 8 место', ranking: 'QS 358', tuition: '€1,000–2,700/год', programs: [], image: 'https://smapse.ru/storage/2019/10/f1-5.jpg' },
    { name: 'Университет Венеции IUAV (IUAV University of Venice)', city: 'Венеция', info: 'Узкоспециализированный вуз по архитектуре, дизайну и урбанистике.', qs: '151-20 по архитектуре', rank: '6-10 место', ranking: 'QS 151-20 по архитектуре', tuition: '€1,200–2,500/год', programs: [], image: 'https://sapereambiente.it/sa/wp-content/uploads/2025/03/Sede-Iuav_Cotonificio.jpg' },
    { name: 'Университет Рима Тор Вергата (University of Rome Tor Vergata)', city: 'Рим', info: 'Один из сильных государственных вузов Рима. Направления: экономика, медицина, инженерия.', qs: '489', rank: '6-10 место', ranking: 'QS 489', tuition: '€1,000–2,500/год', programs: [], image: 'https://globalstudy.ua/wp-content/uploads/2025/02/tor-vergata-1.webp' },
    { name: 'Университет Турина (University of Turin)', city: 'Турин', info: 'Хороший баланс качества и доступности. Сильные направления: экономика, право, психология.', qs: '364', rank: '7-9 место', ranking: 'QS 364', tuition: '€900–2,500/год', programs: [], image: 'https://eit-masters.innoenergy.com/wp-content/uploads/2025/05/AdobeStock_13226249_polito-scaled.jpeg' },
    { name: 'Университет Тренто (University of Trento)', city: 'Тренто', info: 'Современный университет с сильными программами в IT, инженерии и социальных науках.', qs: '429', rank: '8-10 место', ranking: 'QS 429', tuition: '€1,000–2,800/год', programs: [], image: 'https://www.ucalgary.ca/sites/default/files/styles/ucws_hero_cta_desktop/public/2019-08/Trento2.png?itok=srZ0IVVD' },
    { name: 'Университет Неаполя Федерико II (University of Naples Federico II)', city: 'Неаполь', info: 'Крупный государственный университет с широким выбором программ.', qs: '392', rank: '8-12 место', ranking: 'QS 392', tuition: '€900–2,500/год', programs: [], image: 'https://smapse.ru/storage/2018/10/the-university-of-naples-federico-ii-is-maybe-the-oldest-university1.jpg' },
    { name: 'Университет Ка’ Фоскари Венеция (Ca’ Foscari University of Venice)', city: 'Венеция', info: 'Очень популярный вуз среди иностранцев. Сильные направления: бизнес, экономика, языки, международные отношения.', qs: '611-620', rank: '8-12 место', ranking: 'QS 611-620', tuition: '€1,400–2,800/год', programs: [], image: 'https://world.uz/files/-%D0%B2-%D0%B8%D1%82%D0%B0%D0%BB%D0%B8%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%B8%D0%BD%D0%BE%D1%81%D1%82%D1%80%D0%B0%D0%BD%D1%86%D0%B5%D0%B2_047523ej.jpg' },
    { name: 'Университет Боккони (Bocconi University)', city: 'Милан', info: 'Один из лучших частных университетов Европы в сфере бизнеса и экономики.', qs: '511', rank: 'ТОП 10 по миру и в Италии', ranking: 'QS 511', tuition: '€13,000–15,000/год', programs: [], image: 'https://www.itecgroup.ru/uploads/Institution/315/bocconi1_basic.jpeg' },
    { name: 'Университет Генуи (University of Genoa)', city: 'Генуя', info: 'Сильные направления: инженерия, морские технологии, архитектура.', qs: '651- 700', rank: '10-12 место', ranking: 'QS 651- 700', tuition: '€900–2,200/год', programs: [], image: 'https://d1bvpoagx8hqbg.cloudfront.net/originals/erasmus-experience-genoa-italy-by-filipa-137602e77d3701e6834276c04fe64b62.jpg' },
    { name: 'Университет Сиены (University of Siena)', city: 'Сиена', info: 'Один из старейших вузов Италии. Сильные направления: экономика, медицина, право. Подходит для студентов, кто хочет классическое образование в небольшом городе.', qs: '731-740', rank: '10-15 место', ranking: 'QS 731-740', tuition: '€800–2,000/год', programs: [], image: 'https://www.spotteron.net/media/k2/items/cache/755a09762452d6eb5c314d532540d319_XL.jpg' },
    { name: 'Университет Павии (University of Pavia)', city: 'Павия', info: 'Престижный университет с сильной медициной и научными направлениями. Часто рассматривается как альтернатива Милану.', qs: '440', rank: '10-13 место', ranking: 'QS 440', tuition: '€1,000–2,500/год', programs: [], image: 'https://world-study.kz/wp-content/uploads/2025/04/pavia.jpeg' },
    { name: 'Университет Рима Тре (Roma Tre University)', city: 'Рим', info: 'Популярный университет среди иностранцев. Сильные направления: экономика, право, архитектура.', qs: '801-1000', rank: '10-15 место', ranking: 'QS 801-1000', tuition: '€900–2,200/год', programs: [], image: 'https://grant-study.com/sites/default/files/styles/large/public/2019-07/1527871221_rettoratoretro_crop.jpg?itok=Z4okQJu3' },
    { name: 'Университет Пармы (University of Parma)', city: 'Парма', info: 'Спокойный университет с качественными программами в медицине и экономике.', qs: '801 - 1000', rank: '12-15 место', ranking: 'QS 801 - 1000', tuition: '€800–2,000/год', programs: [], image: 'https://worldofeducation.ru/ozarub/high-edu/obrazovanie-v-italii/Parma%201.jpeg' },
    { name: 'Университет Вероны (University of Verona)', city: 'Верона', info: 'Современный университет с сильными программами в медицине, экономике и IT.', qs: '651 - 700', rank: '12 - 15 место', ranking: 'QS 651 - 700', tuition: '€900–2,200/год', programs: [], image: 'https://smapse.ru/storage/2019/01/logo462999.jpg' },
    { name: 'Университет Модены и Реджо-Эмилии (University of Modena and Reggio Emilia)', city: 'Модена', info: 'Сильные технические и медицинские программы. Хорошая база для инженерии.', qs: '801-1000', rank: '12-16 место', ranking: 'QS 801-1000', tuition: '€800–2,000/год', programs: [], image: 'https://www.parexstudy.it/wp-content/uploads/2023/12/shutterstock_2342940951.jpg' },
    { name: 'Университет Триеста (University of Trieste)', city: 'Триест', info: 'Известен научными исследованиями и программами по международным отношениям.', qs: '651-700', rank: '12-16 место', ranking: 'QS 651-700', tuition: '€800–2,000/год', programs: [], image: 'https://api.apply-italy.com/media/universities/Tiesta_University_image.jpg' },
    { name: 'Университет Катании (University of Catania)', city: 'Катания', info: 'Крупный университет на юге Италии. Доступное обучение и широкий выбор программ.', qs: '801 - 1000', rank: '15-20 место', ranking: 'QS 801 - 1000', tuition: '€700–1,800/год', programs: [], image: 'https://smapse.ru/storage/2019/03/universita-degli-studi-di-catania-unict-3.jpg' },
    { name: 'Университет Бари (University of Bari)', city: 'Бари', info: 'Популярный государственный вуз с направлениями экономики, права и медицины.', qs: '801 - 1000', rank: '15-20 место', ranking: 'QS 801 - 1000', tuition: '€700–1,800/год', programs: [], image: 'https://excourse.kz/image.jpg' },
    { name: 'Университет Бергамо (University of Bergamo)', city: 'Бергамо', info: 'Хороший вариант для бизнеса, экономики и менеджмента. Часто выбирают иностранные студенты.', qs: 'Не входит', rank: '15-18 место', ranking: 'Не входит в QS', tuition: '€800–2,000/год', programs: [], image: 'https://ru.uni24k.com/media/CACHE/images/unis/building_schools_u5a6d86a0_d5de141e/5d38ec5e4d9e3c5c7f29505b0dda1ce5.jpg' },
    { name: 'Университет Феррары (University of Ferrara)', city: 'Феррара', info: 'Старый университет с сильной медициной, архитектурой и инженерией. Спокойный город, подходит для комфортного обучения.', qs: '801-1000', rank: '15-20 место', ranking: 'QS 801-1000', tuition: '€800–2,000/год', programs: [], image: 'https://pavaedu.com/wp-content/uploads/2018/12/ferrara-universitesi.jpg' },
    { name: 'Университет Перуджи (University of Perugia)', city: 'Перуджа', info: 'Популярен среди иностранцев. Сильные направления: медицина, ветеринария, гуманитарные науки.', qs: '751-800', rank: '15-18 место', ranking: 'QS 751-800', tuition: '€700–1,800/год', programs: [], image: 'https://pavaedu.com/wp-content/uploads/2020/12/Perugia.jpg' },
    { name: 'Университет Марке (Polytechnic University of Marche)', city: 'Анкона', info: 'Специализация: инженерия, экономика, медицина. Хороший баланс качества и требований.', qs: '801-1000', rank: '15-20 место', ranking: 'QS 801-1000', tuition: '€800–2,000/год', programs: [], image: 'https://smapse.ru/storage/2019/02/universita-politecnica-delle-marche-univpm-7.jpg' },
    { name: 'Университет Кампании Луиджи Ванвителли (University of Campania)', city: 'Казерта', info: 'Государственный университет с сильной медициной и архитектурой.', qs: '801-1000', rank: '15-20 место', ranking: 'QS 801-1000', tuition: '€700–1,800/год', programs: [], image: 'https://api.apply-italy.com/media/universities/University_Luigi_Vanvitelli_Napoli_RDVgJtK.jpg' },
    { name: 'Университет Восточного Пьемонта (University of Eastern Piedmont)', city: 'Верчелли', info: 'Хороший вуз с акцентом на медицину и биологию. Подходит для спокойного обучения.', qs: 'Не входит', rank: '15-20 место', ranking: 'Не входит в QS', tuition: '€700–1,500/год', programs: [], image: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Universit%C3%A0_degli_studi_del_Piemonte_orientale_Sede_di_Vercelli.jpg' },
    { name: 'Университет Кьети-Пескара (University of Chieti-Pescara)', city: 'Кьети', info: 'Хороший вариант для медицины, психологии и экономики.', qs: '801-1000', rank: '15-20 место', ranking: 'QS 801-1000', tuition: '€700–1,800/год', programs: [], image: 'https://grant-study.com/sites/default/files/styles/large/public/2019-07/skyline_didattica.jpg?itok=pejv2ybA' },
    { name: 'Университет Кальяри (University of Cagliari)', city: 'Кальяри', info: 'Университет на острове Сардиния. Подходит для студентов, которые ищут более спокойную атмосферу обучения.', qs: '1001 - 1200', rank: '18-22 место', ranking: 'QS 1001 - 1200', tuition: '€700–1,500/год', programs: [], image: 'https://smapse.ru/storage/2019/10/converted/255_200_y-dij5-nlgcqpyew3uf39kotayoa-pc6.jpg' },
    { name: 'Университет Палермо (University of Palermo)', city: 'Палермо', info: 'Крупный университет на Сицилии. Доступные условия и широкий выбор программ', qs: '801-1000', rank: '18-22 место', ranking: 'QS 801-1000', tuition: '€700–1,800/год', programs: [], image: 'https://www.parexstudy.it/wp-content/uploads/2024/01/shutterstock_2224451117-scaled.jpg' },
    { name: 'Университет Калабрии (University of Calabria)', city: 'Козенца', info: 'Современный кампус, хорошие условия проживания. Направления: IT, экономика, инженерия.', qs: '801-1000', rank: '18-22место', ranking: 'QS 801-1000', tuition: '€700–1,500/год', programs: [], image: 'https://www.unical.it/media/medias/2021/unical.webp' },
    { name: 'Университет Инсубрии (University of Insubria)', city: 'Варезе', info: 'Небольшой университет на севере Италии. Сильные программы: медицина, биология, экономика.', qs: 'Не входит', rank: '18-22 место', ranking: 'Не входит в QS', tuition: '€700–1,800/год', programs: [], image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL3Zz_u7EascG0Fd9bsRiJPio0JA8-D2LnKQ&s' },
    { name: 'Университет Брешии (University of Brescia)', city: 'Брешия', info: 'Подходит для медицины, инженерии и бизнеса. Часто выбирается как альтернатива Милану.', qs: 'Не входит', rank: '18-20 место', ranking: 'Не входит в QS', tuition: '€700–1,800/год', programs: [], image: 'https://smapse.ru/storage/2019/01/universita-degli-studi-di-brescia-unibs-2.jpg' },
    { name: 'Университет Сассари (University of Sassari)', city: 'Сассари', info: 'Находится на Сардинии. Сильные направления: медицина, ветеринария, аграрные науки.', qs: 'Не входит', rank: '18-20место', ranking: 'Не входит в QS', tuition: '€600–1,500/год', programs: [], image: 'https://immagini.unionesarda.it/version/c:Y2YzOTljYTMtMjAwYy00:YTMtMjAwYy00ZTJlMDVk/image.webp?f=16:9' },
    { name: 'Университет Мессина (University of Messina)', city: 'Мессина', info: 'Крупный университет на Сицилии. Широкий выбор программ, включая медицину и право.', qs: '801-1000', rank: '18-22 место', ranking: 'QS 801-1000', tuition: '€700–1,800/год', programs: [], image: 'https://smapse.ru/storage/2019/02/universita-degli-studi-di-messina6.jpg' },
    { name: 'Университет Камерино (University of Camerino)', city: 'Камерино', info: 'Небольшой, но качественный вуз. Сильные направления: фармацевтика, ветеринария, архитектура.', qs: '801-1000', rank: '18-22 место', ranking: 'QS 801-1000', tuition: '€600–1,500/год', programs: [], image: 'https://apply-italy.com/_next/image?url=https%3A%2F%2Fapi.apply-italy.com%2Fmedia%2Funiversities%2FUniversity-of-Camerino.jpg&w=2048&q=100' },
    { name: 'Университет Фоджи (University of Foggia)', city: 'Фоджа', info: 'Подходит для аграрных и экономических направлений. Один из более доступных вариантов поступления.', qs: 'Не входит', rank: '20+', ranking: 'Не входит в QS', tuition: '€600–1,300/год', programs: [], image: 'https://pisaedu.com/wp-content/uploads/2020/01/Foggia-%C3%9Cniversitesi-feat.jpg' },
    { name: 'Университет Молизе (University of Molise)', city: 'Кампобассо', info: 'Небольшой университет с программами по экономике, IT и сельскому хозяйству. Подходит для “безопасного” поступления.', qs: 'Не входит', rank: '20+', ranking: 'Не входит в QS', tuition: '€600–1,300/год', programs: [], image: 'https://www.parexstudy.it/wp-content/uploads/2024/01/shutterstock_1736371619-scaled.jpg' },
    { name: 'Университет Базиликаты (University of Basilicata)', city: 'Потенца', info: 'Государственный вуз с направлениями инженерии, экологии и сельского хозяйства.', qs: 'Не входит', rank: '20+', ranking: 'Не входит в QS', tuition: '€600–1,300/год', programs: [], image: 'https://www.parexstudy.it/wp-content/uploads/2023/12/shutterstock_1472540375-scaled.jpg' },
    { name: 'Университет Кассино и Южного Лацио (University of Cassino)', city: 'Кассино', info: 'Подходит для инженерии, экономики и IT. Часто рассматривается как более доступная альтернатива Риму.', qs: 'Не входит', rank: '20+', ranking: 'Не входит в QS', tuition: '€600–1,300/год', programs: [], image: 'https://world.uz/files/-%D1%83%D1%87%D0%B5%D0%B1%D0%B0-%D0%B2-%D0%B8%D1%82%D0%B0%D0%BB%D0%B8%D0%B8_049599zb.jpg' },
    { name: 'Университет Сannio (University of Sannio)', city: 'Беневенто', info: 'Маленький университет с акцентом на экономику, инженерию и финансы.', qs: 'Не входит', rank: '20+', ranking: 'Не входит в QS', tuition: '€600–1,300/год', programs: [], image: 'https://pisaedu.com/wp-content/uploads/2020/06/Sannio-universitesi-content.jpg.webp' },
    { name: 'Университет Терамо (University of Teramo)', city: 'Терамо', info: 'Известен программами по праву, ветеринарии и политологии.', qs: 'Не входит', rank: '20+', ranking: 'Не входит в QS', tuition: '€600–1,300/год', programs: [], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/UniTe_facolt%C3%A0_scienze_comunicazione.jpg/1280px-UniTe_facolt%C3%A0_scienze_comunicazione.jpg' },
    { name: 'Университет IULM (Милан)', city: 'Милан', info: 'Частный вуз, специализация — медиа, маркетинг, коммуникации, PR.', qs: 'Не входит', rank: 'Средний среди частных', ranking: 'Не входит в QS', tuition: '€8,000–12,000/год', programs: [], image: 'https://api.apply-italy.com/media/universities/2.width-1920.png' },
    { name: 'Humanitas University (Милан)', city: 'Милан', info: 'Частный медицинский университет с обучением на английском языке. Высокие требования, но сильная подготовка.', qs: 'Не входит', rank: 'Топ по медицине', ranking: 'Не входит в QS', tuition: '€13,000–20,000/год', programs: [], image: 'https://keystoneacademic-res.cloudinary.com/image/upload/c_fill,w_1920,h_583,g_auto/dpr_auto/f_auto/q_auto/v1/element/24/244584_Progettosenzatitolo1.png' },
    { name: 'Università Cattolica del Sacro Cuore', city: 'Милан', info: 'Один из крупнейших частных университетов Европы. Сильные направления: медицина, бизнес, психология.', qs: '505', rank: 'Топ среди частных', ranking: 'QS 505', tuition: '€8,000–15,000/год', programs: [], image: 'https://keystoneacademic-res.cloudinary.com/image/upload/c_limit,w_1920/dpr_auto/f_auto/q_auto/v1/element/18/183568_183555_keystone_profile_setup_other_images-School-1.jpg' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
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
              src="https://flagcdn.com/w320/it.png"
              alt="Флаг Италии"
              className="w-32 h-20 mx-auto mb-6 rounded-lg shadow-2xl"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Обучение в <span className="text-orange-500">Италии</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Топовое европейское образование в стране искусства, моды и дизайна
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, label: '50+ университетов', color: 'from-green-500 to-emerald-500' },
              { icon: <Users className="w-6 h-6" />, label: '150+ студентов', color: 'from-emerald-500 to-teal-500' },
              { icon: <DollarSign className="w-6 h-6" />, label: 'до €8,000/год', color: 'from-red-500 to-orange-500' },
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Топ университеты <span className="text-orange-500">Италии</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Старейшие университеты Европы с богатой историей и традициями
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE).map((uni, index) => (
              <motion.div
                key={page * PER_PAGE + index}
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
                    {uni.info && (
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">{uni.info}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Пагинация */}
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => { setPage(p => Math.max(0, p - 1)); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              disabled={page === 0}
              className="px-4 py-2 rounded-lg bg-white shadow border border-gray-200 text-gray-600 font-medium disabled:opacity-30 hover:bg-orange-50 hover:border-orange-400 transition-all"
            >
              ←
            </button>
            {Array.from({ length: Math.ceil(universities.length / PER_PAGE) }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setPage(i); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${page === i ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-orange-50 hover:border-orange-400'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => { setPage(p => Math.min(Math.ceil(universities.length / PER_PAGE) - 1, p + 1)); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              disabled={page === Math.ceil(universities.length / PER_PAGE) - 1}
              className="px-4 py-2 rounded-lg bg-white shadow border border-gray-200 text-gray-600 font-medium disabled:opacity-30 hover:bg-orange-50 hover:border-orange-400 transition-all"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Why Italy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Почему <span className="text-orange-500">Италия?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: 'Низкая стоимость',
                description: 'Одна из самых доступных стран для обучения в ЕС'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Шенгенская виза',
                description: 'Свободное передвижение по всей Европе'
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Престижные дипломы',
                description: 'Признанные во всём мире университеты с историей 700+ лет'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Культура и искусство',
                description: 'Родина Ренессанса, мировой центр моды и дизайна'
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: 'Широкий выбор программ',
                description: 'Программы на итальянском и английском языках'
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: 'Возможность работы',
                description: 'До 20 часов в неделю во время учёбы'
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
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 via-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white mb-4">
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
            className="bg-gradient-to-r from-green-600 via-white to-red-600 rounded-3xl p-12 text-center shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Готовы начать своё обучение в Италии?</h2>
            <p className="text-xl mb-8 text-gray-700">
              Наши эксперты помогут подобрать университет и программу специально для вас
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