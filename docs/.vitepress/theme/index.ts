import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import AdminThemePage from './AdminThemePage.vue'
import './styles/vars.css'
import './styles/themes.css'
import './styles/theme-switcher.css'
import './styles/admin.css'

export { getActiveTheme, setTheme, getAutoFestivalTheme, type FestivalThemeId } from './util'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('AdminThemePage', AdminThemePage)
  },
}
