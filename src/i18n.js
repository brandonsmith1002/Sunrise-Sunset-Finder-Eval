import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEnglish from './translations/translationEnglish';

const resources = {
  en: {
    translation: translationEnglish,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: '.', // we want to use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safe from xss
      format: (data, format, lng) => {
        if (format === 'datetime') {
          return new Intl.DateTimeFormat(lng, data.options).format(data.value);
        }
        return data.value;
      },
    },
  });

export default i18n;
