import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CoreLoop from './CoreLoop.vue'
import Wireframe from './Wireframe.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CoreLoop', CoreLoop)
    app.component('Wireframe', Wireframe)
  },
} satisfies Theme
