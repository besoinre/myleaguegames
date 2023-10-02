import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './client/App';
import './client/assets/style.scss';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './client/locales/en.json';
import frTranslation from './client/locales/fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation }
    },
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Fallback to English if a translation is missing
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
