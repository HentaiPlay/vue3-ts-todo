import { createI18n } from 'vue-i18n'

import ru from '@/shared/i18n/ru.json'

export type LanguageList = 'ru'
export type MessageSchema = typeof ru

export const i18n = createI18n<[MessageSchema], LanguageList>({
  locale: 'ru',
  fallbackLocale: 'ru',
  legacy: false,
  globalInjection: true,
  warnHtmlMessage: false,
  messages: {
    ru: ru
  }
})
