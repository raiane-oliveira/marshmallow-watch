import en from './src/shared/i18n/dictionaries/en.json'

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages { }
}
