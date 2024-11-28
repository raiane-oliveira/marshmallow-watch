import { Locale } from "../i18n";

export class NotAllowedError extends Error {
  static async create(locale: Locale) {
    const messages = (await import(`../i18n/dictionaries/${locale}.json`)).default

    return new Error(messages.Shared.errors.notAllowed)
  }
}
