import type { ifError } from 'assert'
import type { Model } from 'echarts'
import _, { entries } from 'lodash'
import type Module from 'module'

// 动态注册component
export default {
  install(app: any) {
    // 'globEager' is deprecated.ts(6385)
    // Negative glob patterns are also supported (prefixed with !).  '!**/bar.js'
    // Dynamic Import is like this `./dir/${file}.js`
    // const componentFiles = import.meta.globEager('./components/base/*.vue') as unknown as Module
    const componentFiles = import.meta.glob(['./components/base/*.vue', './components/*.vue'], {
      //   import: 'default',
      //   as: 'row',
      eager: true
    }) as unknown as Module

    console.log('globals:', componentFiles)
    Object.entries(componentFiles).forEach(([path, m]) => {
      console.log('entries:', path, m)
      //   一下都是lodash类库的方法
      const componentName = _.upperFirst(
        _.camelCase(
          path
            ?.split('/')
            .pop()
            ?.replace(/\.\w+$/, '')
        )
      )

      console.log('befroe com:', componentName, m.default)
      app.component(`Base${componentName}`, m.default)
    })
  }
}
