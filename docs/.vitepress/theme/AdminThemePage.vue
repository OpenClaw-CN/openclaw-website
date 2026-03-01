<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import AdminAdsManager from './AdminAdsManager.vue'
import { clearThemePreview } from './util'

const ADMIN_UNLOCK_KEY = 'openclaw-admin-unlocked'

declare global {
  interface Window {
    __OPENCLAW_ADMIN__?: { adminUsername: string; adminPassword: string }
  }
}

const mounted = ref(false)
const username = ref('')
const password = ref('')
const unlocked = ref(false)
const error = ref('')
const useConfigLogin = ref(false)
const activeTab = ref<'theme' | 'ads'>('theme')

const adminCreds = computed(() => (typeof window !== 'undefined' ? window.__OPENCLAW_ADMIN__ : undefined))

function submitPassword() {
  const creds = adminCreds.value
  const envPass = import.meta.env?.VITE_ADMIN_PASSWORD
  if (!creds && !envPass) {
    unlocked.value = true
    return
  }
  if (creds) {
    if (username.value === creds.adminUsername && password.value === creds.adminPassword) {
      sessionStorage.setItem(ADMIN_UNLOCK_KEY, Date.now().toString())
      unlocked.value = true
      error.value = ''
    } else {
      error.value = '用户名或密码错误'
    }
    return
  }
  if (password.value === envPass) {
    sessionStorage.setItem(ADMIN_UNLOCK_KEY, Date.now().toString())
    unlocked.value = true
    error.value = ''
  } else {
    error.value = '密码错误'
  }
}

onMounted(() => {
  mounted.value = true
  const creds = adminCreds.value
  useConfigLogin.value = !!creds
  const envPass = import.meta.env?.VITE_ADMIN_PASSWORD
  if (!creds && !envPass) {
    unlocked.value = true
    return
  }
  const saved = sessionStorage.getItem(ADMIN_UNLOCK_KEY)
  if (saved) {
    const t = parseInt(saved, 10)
    const maxAge = 24 * 60 * 60 * 1000
    if (Date.now() - t < maxAge) unlocked.value = true
  }
})
</script>

<template>
  <div class="admin-theme-page">
    <template v-if="!mounted">
      <p class="admin-theme-hint">加载中...</p>
    </template>
    <template v-else>
      <template v-if="!unlocked">
        <h2>管理员登录</h2>
        <p class="admin-theme-hint">请输入管理员账号与密码以管理站点主题。</p>
        <form class="admin-theme-form" @submit.prevent="submitPassword">
          <input
            v-if="useConfigLogin"
            v-model="username"
            type="text"
            class="admin-theme-input"
            placeholder="管理员账号"
            autocomplete="username"
          />
          <input
            v-model="password"
            type="password"
            class="admin-theme-input"
            placeholder="管理员密码"
            autocomplete="current-password"
          />
          <button type="submit" class="admin-theme-submit">登录</button>
        </form>
        <p v-if="error" class="admin-theme-error">{{ error }}</p>
      </template>
      <template v-else>
        <h2>站点管理</h2>
        <nav class="admin-tabs">
          <button type="button" class="admin-tab" :class="{ active: activeTab === 'theme' }" @click="activeTab = 'theme'">主题管理</button>
          <button type="button" class="admin-tab" :class="{ active: activeTab === 'ads' }" @click="activeTab = 'ads'">广告管理</button>
        </nav>
        <template v-if="activeTab === 'theme'">
          <p class="admin-theme-hint">全站主题以配置文件为准。下方可预览各主题效果（仅当前会话），修改全站请编辑配置并重新部署。</p>
          <div class="admin-theme-switcher">
            <ThemeSwitcher :inline="true" />
          </div>
          <button type="button" class="admin-theme-reset" @click="() => { clearThemePreview(); window.location.reload(); }">恢复为配置文件中的主题</button>
          <p class="admin-theme-config-hint">全站主题保存在 <code>docs/.vitepress/theme-config.json</code>，修改 <code>festivalTheme</code>（可选：default / spring-festival / dragon-boat / mid-autumn / national-day）后重新构建或部署即可生效。</p>
        </template>
        <template v-else>
          <AdminAdsManager />
        </template>
      </template>
    </template>
  </div>
</template>
