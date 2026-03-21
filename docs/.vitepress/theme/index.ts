import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import AdminThemePage from './AdminThemePage.vue'
import AdGlobalFooterLink from './AdGlobalFooterLink.vue'
import JoinLobsterModal from './JoinLobsterModal.vue'
import './styles/vars.css'
import './styles/themes.css'
import './styles/theme-switcher.css'
import './styles/admin.css'
import './styles/ads.css'
import './styles/academy.css'

export { getActiveTheme, setTheme, getAutoFestivalTheme, type FestivalThemeId } from './util'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('AdminThemePage', AdminThemePage)
    app.component('AdGlobalFooterLink', AdGlobalFooterLink)
    app.component('JoinLobsterModal', JoinLobsterModal)
  },
}
