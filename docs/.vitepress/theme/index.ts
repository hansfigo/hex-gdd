import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CoreLoop from './CoreLoop.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CoreLoop', CoreLoop)
  },
} satisfies Theme
