/**
 *
 */

/* eslint-disable no-undef */
// internationalization 国际化用于
import { type LocaleMessages } from '@intlify/core-base'
import { type VueMessageType } from 'vue-i18n'

// window.localStorage 存储key
export const localeKey = 'locale'

// 默认语言
export const defaultLang = 'zh_Hans' //'zh_Hans';

/**
 * 验证语言命名规则 zh-CN
 * @returns boolen
 * @author Edward
 */
export const localeNameExp = (lang: string): boolean => {
  const localeExp = new RegExp(`^([a-z]{2})?(_[A-Za-z]{4})?$`)
  return localeExp.test(lang)
}

/**
 * 设置 html lang 属性值
 * @param lang 语言的 key
 * @author Edward
 */
export const setHtmlLang = (lang: string): void => {
  /**
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  if (!window.__POWERED_BY_QIANKUN__) {
    document.querySelector('html')?.setAttribute('lang', lang)
  }
}

/**
 * 获取当前选择的语言
 * 获取的浏览器语言默认项目中有可能不支持，所以在config/i18n.ts中要加以判断
 * @returns string
 * @author Edward
 */
export const getLocale = (): string => {
  const lang =
    typeof window.localStorage !== 'undefined' ? window.localStorage.getItem(localeKey) : ''
  const isNavigatorLanguageValid =
    typeof navigator !== 'undefined' && typeof navigator.language === 'string'
  const browserLang = isNavigatorLanguageValid ? navigator.language.split('-').join('-') : ''
  let browserLan = 'zh_Hans'
  switch (browserLang) {
    case 'zh-CN':
      browserLan = 'zh_Hans'
      break
    case 'zh-HK':
      browserLan = 'zh_Hant'
      break
    case 'en-US':
      browserLan = 'zh_Hans'
      break
    default:
      browserLan = ''
      break
  }
  return lang || browserLan || defaultLang
}

/**
 * 切换语言
 * @param lang 语言的 key
 * @param realReload 是否刷新页面，默认刷新
 * @author Edward
 */
export const setLocale = (lang: string, realReload = true, callback: () => void): void => {
  if (lang !== undefined && !localeNameExp(lang)) {
    // for reset when lang === undefined
    throw new Error('setLocale lang format error')
  }
  if (getLocale() !== lang) {
    if (!window.__POWERED_BY_QIANKUN__) {
      localStorage.setItem(localeKey, lang || '')
    }
  }
  if (realReload) {
    window.location.reload()
  } else {
    setHtmlLang(lang)
    if (typeof callback === 'function') {
      callback()
    }
  }
}

/**
 * 自动导入 框架自定义语言
 * @author Edward
 */
export function importAllLocales(): LocaleMessages<VueMessageType> {
  const modules: LocaleMessages<VueMessageType> = {}
  try {
    // 导入 @/views 下文件，包含子目录，文件名为：[/\\]locales[/\\]([a-z]{2})-?([A-Z]{2})?\.ts
    const viewsRequireContext: __WebpackModuleApi.RequireContext = require.context(
      '../views',
      true,
      /[/\\]locales[/\\]([a-z]{2})?(_[A-Za-z]{4})?\.ts$/
    )
    viewsRequireContext.keys().forEach((fileName) => {
      // 获取内容
      const modulesConent = viewsRequireContext(fileName)
      if (modulesConent.default) {
        // 获取 PascalCase 命名
        const modulesName = fileName.replace(/(.*\/)*([^.]+).*/gi, '$2')

        if (modules[modulesName]) {
          modules[modulesName] = {
            ...modules[modulesName],
            ...modulesConent.default
          }
        } else {
          modules[modulesName] = modulesConent.default
        }
      }
    })

    // 导入 @/components 下文件，包含子目录，文件名为：[/\\]locales[/\\]([a-z]{2})-?([A-Z]{2})?\.ts
    // eslint-disable-next-line no-undef
    const componentsRequireContext: __WebpackModuleApi.RequireContext = require.context(
      '../components',
      true,
      /[/\\]locales[/\\]([a-z]{2})?(_[A-Za-z]{4})?\.ts$/
    )
    componentsRequireContext.keys().forEach((fileName) => {
      // 获取内容
      const modulesConent = componentsRequireContext(fileName)
      if (modulesConent.default) {
        // 获取 PascalCase 命名
        const modulesName = fileName.replace(/(.*\/)*([^.]+).*/gi, '$2')

        if (modules[modulesName]) {
          modules[modulesName] = {
            ...modules[modulesName],
            ...modulesConent.default
          }
        } else {
          modules[modulesName] = modulesConent.default
        }
      }
    })

    // 导入 @/locales 下文件，不包含子目录，文件名为：([a-z]{2})-?([A-Z]{2})?\.ts
    const localesRequireContext: __WebpackModuleApi.RequireContext = require.context(
      '../locales',
      false,
      /([a-z]{2})?(_[A-Za-z]{4})?\.ts$/
    )
    localesRequireContext.keys().forEach((fileName) => {
      // 获取内容
      const modulesConent = localesRequireContext(fileName)
      if (modulesConent.default) {
        // 获取 PascalCase 命名
        const modulesName = fileName.replace(/(.*\/)*([^.]+).*/gi, '$2')
        if (modules[modulesName]) {
          modules[modulesName] = {
            ...modules[modulesName],
            ...modulesConent.default
          }
        } else {
          modules[modulesName] = modulesConent.default
        }
      }
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return modules
}
