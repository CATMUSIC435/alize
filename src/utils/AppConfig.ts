import { enUS, viVN, zhCN } from '@clerk/localizations';
import type { LocalizationResource } from '@clerk/shared/types';
import type { LocalePrefixMode } from 'next-intl/routing';

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Customize this configuration for your product
/** Centralized application configuration */
export const AppConfig = {
  name: 'Alizé Residence',
  i18n: {
    locales: ['vi', 'en', 'zh'],
    defaultLocale: 'vi',
    localePrefix,
    localeDetection: false,
  },
};

const supportedLocales: Record<string, LocalizationResource> = {
  vi: viVN,
  en: enUS,
  zh: zhCN,
};

export const ClerkLocalizations = {
  defaultLocale: viVN,
  supportedLocales,
};
