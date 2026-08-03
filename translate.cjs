const fs = require('node:fs');

const baseEn = JSON.parse(String(fs.readFileSync('./src/locales/en.json', 'utf-8')));

const translations = {
  vi: {
    meta_title: 'Bất Động Sản Cao Cấp',
    meta_description: 'Dự án bất động sản cao cấp',
    costa: 'COSTA',
    del_sol: 'DEL SOL',
    a_place: 'MỘT NƠI',
    to_return_to: 'ĐỂ TRỞ VỀ',
    by_day: 'BAN NGÀY',
    by_night: 'BAN ĐÊM',
    select_apartment: 'CHỌN CĂN HỘ',
    book_a_call: 'ĐẶT LỊCH HẸN',
    contact: 'LIÊN HỆ',
    scroll: 'CUỘN',
  },
  en: {
    meta_title: 'Premium Real Estate',
    meta_description: 'Premium real estate project',
    costa: 'COSTA',
    del_sol: 'DEL SOL',
    a_place: 'A PLACE',
    to_return_to: 'TO RETURN TO',
    by_day: 'BY DAY',
    by_night: 'BY NIGHT',
    select_apartment: 'SELECT AN APARTMENT',
    book_a_call: 'BOOK A CALL',
    contact: 'CONTACT',
    scroll: 'SCROLL',
  },
  zh: {
    meta_title: '高端房地产',
    meta_description: '优质房地产项目',
    costa: '阳光', // COSTA
    del_sol: '海岸', // DEL SOL
    a_place: '一个',
    to_return_to: '回归的地方',
    by_day: '白天',
    by_night: '夜晚',
    select_apartment: '选择公寓',
    book_a_call: '预约电话',
    contact: '联系我们',
    scroll: '滚动',
  },
  fr: {
    meta_title: 'Immobilier de luxe',
    meta_description: 'Projet immobilier de luxe',
    costa: 'COSTA',
    del_sol: 'DEL SOL',
    a_place: 'UN LIEU',
    to_return_to: 'OÙ REVENIR',
    by_day: 'LE JOUR',
    by_night: 'LA NUIT',
    select_apartment: 'CHOISIR UN APPARTEMENT',
    book_a_call: 'RÉSERVER UN APPEL',
    contact: 'CONTACT',
    scroll: 'DÉFILER',
  },
  ru: {
    meta_title: 'Элитная недвижимость',
    meta_description: 'Премиальный проект недвижимости',
    costa: 'КОСТА',
    del_sol: 'ДЕЛЬ СОЛЬ',
    a_place: 'МЕСТО',
    to_return_to: 'КУДА ВОЗВРАЩАЮТСЯ',
    by_day: 'ДНЕМ',
    by_night: 'НОЧЬЮ',
    select_apartment: 'ВЫБРАТЬ АПАРТАМЕНТЫ',
    book_a_call: 'ЗАКАЗАТЬ ЗВОНОК',
    contact: 'КОНТАКТЫ',
    scroll: 'ПРОКРУТИТЬ',
  },
};

for (const [lang, trans] of Object.entries(translations)) {
  const newJson = structuredClone(baseEn); // Deep copy base
  newJson.Index = { ...newJson.Index, ...trans };

  // Quick translation for RootLayout to avoid empty menus (just keeping English is fine, but let's be thorough if we want)
  // But keeping English for unrelated parts is totally fine for this demo.

  fs.writeFileSync(`./src/locales/${lang}.json`, JSON.stringify(newJson, null, 2));
}

console.log('Generated translation files.');
