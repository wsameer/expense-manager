import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import common from '../locales/en/common.json';
import auth from '../locales/en/auth.json';
import account from '../locales/en/account.json';
import categories from '../locales/en/categories.json';
import transaction from '../locales/en/transaction.json';

export const defaultNS = 'ns1';
export const resources = {
  en: {
    common,
    auth,
    account,
    categories,
    transaction,
  },
} as const;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/resources/locales/{{lng}}/{{ns}}.json',
    },
    resources,
    defaultNS: 'common',
  });

export default i18n;
