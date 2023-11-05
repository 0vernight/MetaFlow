/**
 * 国际化 入口
 * @author Edward
 */

import { createI18n } from 'vue-i18n'
import { getLocale, setLocale, importAllLocales } from '@/utils/i18n'

/**
 * 框架 多语言 配置
 */
export const messages = importAllLocales()
const sysLocale = getLocale()
const i18n = createI18n({
  legacy: false,
  locale: sysLocale,
  message: '',
  datetime: Date(),
  number: 0
})

/**
 * 设置语言
 * @param locale
 */
export function setI18nLanguage(locale: string, realReload = false): void {
  setLocale(locale, realReload, () => {
    i18n.global.locale.value = locale
  })
}

export default i18n
