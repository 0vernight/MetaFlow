/**
 *
 * @param theme
 * @param reload
 */
export const changeTheme = (theme?: string, reload?: boolean): void => {
  const selectorName = 'html'
  if (!window.onloadeddata || reload) {
    const ghostShark = 'ghostShark'
    const defaultTheme = 'default'
    const localTheme = localStorage.getItem('theme')
    theme = theme || (localTheme && localTheme === 'dark' ? ghostShark : defaultTheme)
    const currentClassStr = document.querySelector(selectorName)?.getAttribute('class')
    const currentClassArr = currentClassStr?.split(' ') || []
    const lightThemeIndex = currentClassArr.indexOf(defaultTheme)
    const ghostThemeIndex = currentClassArr.indexOf(ghostShark)
    if (lightThemeIndex === -1 && ghostThemeIndex === -1) {
      currentClassArr.push(theme)
    } else if (lightThemeIndex === -1 && theme === defaultTheme) {
      currentClassArr.splice(ghostThemeIndex, 1, theme)
    } else if (ghostThemeIndex === -1 && theme === ghostShark) {
      currentClassArr.splice(lightThemeIndex, 1, theme)
    }
    const newClassStr = currentClassArr.join(' ').trim()
    if (currentClassStr?.trim() !== newClassStr && newClassStr !== '') {
      document.querySelector(selectorName)?.setAttribute('class', newClassStr)
    }
  }
}
