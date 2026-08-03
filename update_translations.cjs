const fs = require('node:fs');
const path = require('node:path');

const newTranslations = {
  the_concept: 'THE CONCEPT',
  concept_title:
    'ERA RESIDENCES IS A BOUTIQUE GATED COMMUNITY OF ONLY 25 RESIDENCES, DESIGNED AROUND PRIVACY, WELLBEING AND TIMELESS MEDITERRANEAN LIVING',
  concept_desc:
    "Inspired by the atmosphere of Marbella's golden era, the project combines contemporary architecture with warm materials, natural landscaping and carefully curated spaces.",
  new_golden_mile: 'NEW GOLDEN MILE',
  spain: 'SPAIN',
  between_marbella: 'BETWEEN MARBELLA AND ESTEPONA',
  between_marbella_desc:
    'Surrounded by beaches, golf courses, wellness clubs and established lifestyle destinations, the project combines privacy with effortless connectivity to everything essential for Mediterranean living. A location designed not around movement — but around returning.',
  the_coast_wanted: 'THE COAST YOU WANTED',
  yours: 'yours',
  this_year: 'THIS YEAR',
  timeline_gibraltar: 'GIBRALTAR',
  timeline_estepona: 'ESTEPONA',
  timeline_kempinski: 'KEMPINSKI',
  timeline_puerto_banus: 'PUERTO BANUS',
  timeline_marbella: 'MARBELLA',
  timeline_malaga: 'MALAGA AIRPORT',
  min_50: '50 MIN',
  min_10: '10 MIN',
  min_5: '5 MIN',
  min_20: '20 MIN',
  min_25: '25 MIN',
  min_45: '45 MIN',
};

for (const lang of ['en', 'ru', 'vi', 'zh', 'fr']) {
  const filePath = path.join(__dirname, 'src', 'locales', `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(String(fs.readFileSync(filePath, 'utf-8')));
    data.Index ??= {};
    data.Index = { ...data.Index, ...newTranslations };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
}
