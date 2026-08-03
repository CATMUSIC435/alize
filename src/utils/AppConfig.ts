import { enUS, frFR, viVN, zhCN, ruRU } from '@clerk/localizations';
import type { LocalizationResource } from '@clerk/shared/types';
import type { LocalePrefixMode } from 'next-intl/routing';

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Customize this configuration for your product
/** Centralized application configuration */
export const AppConfig = {
  name: 'Nextjs Starter',
  i18n: {
    locales: ['vi', 'en', 'zh', 'fr', 'ru'],
    defaultLocale: 'vi',
    localePrefix,
  },
};

const supportedLocales: Record<string, LocalizationResource> = {
  vi: viVN,
  en: enUS,
  zh: zhCN,
  fr: frFR,
  ru: ruRU,
};

export const ClerkLocalizations = {
  defaultLocale: viVN,
  supportedLocales,
};
