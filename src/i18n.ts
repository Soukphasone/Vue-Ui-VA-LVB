import { createI18n } from 'vue-i18n';
import { en } from './locales/en';
import { la } from './locales/la';
import { vn } from './locales/vn';
import { ref } from 'vue';

// Manage language state with ref and localStorage
const language = ref<string>('en');

if (localStorage.getItem('language')) {
  language.value = `${localStorage.getItem('language')}`;
}

// Define messages
const messages = {
  en,
  la,
  vn,
};

// Create i18n instance
export const i18n = createI18n({
  legacy: false,
  locale: language.value, // Set initial locale
  fallbackLocale: 'en',   // Fallback locale
  messages,
});

// Export language ref to update dynamically
export const currentLanguage = language;
