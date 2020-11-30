import Vue from 'vue'

import AppIcon from '@/components/app/AppIcon.vue'

Vue.component('AppIcon', AppIcon)

// import upperFirst from 'lodash/upperFirst'
// import camelCase from 'lodash/camelCase'

// const requireComponent = require.context(
//   '@/components/app', true, /\.vue$/
// )

// requireComponent.keys().forEach(fileName => {
//   const componentConfig = requireComponent(fileName)

//   const componentName = upperFirst(
//     camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
//   )

//   Vue.component(`${componentName}`, componentConfig.default || componentConfig)
// })
