import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LANGUAGES_ALLOWED, LANGUAGE_LOCAL_STORAGE } from './conf';
import resources from './translations.json';

i18n
  .use(initReactI18next)
  .init({
    resources,
    // lng: getLanguage(),
    // lng: 'en',
    lng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    preload: LANGUAGES_ALLOWED,
  })
  .catch(() => {
    throw new Error('i18n initialization failed');
  });

// Save language in local storage
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE, lng);
  }
});

export default i18n;
