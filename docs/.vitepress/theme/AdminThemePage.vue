<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { clearThemePreview } from './util'

const ADMIN_UNLOCK_KEY = 'openclaw-admin-unlocked'

const mounted = ref(false)
const password = ref('')
const unlocked = ref(false)
const error = ref('')

function submitPassword() {
  const expected = import.meta.env?.VITE_ADMIN_PASSWORD
  if (!expected) {
    unlocked.value = true
    return
  }
  if (password.value === expected) {
    sessionStorage.setItem(ADMIN_UNLOCK_KEY, Date.now().toString())
    unlocked.value = true
    error.value = ''
  } else {
    error.value = '密码错误'
  }
}

onMounted(() => {
  mounted.value = true
  const expected = import.meta.env?.VITE_ADMIN_PASSWORD
  if (!expected) {
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
        <p class="admin-theme-hint">请输入管理员密码以管理站点主题。</p>
        <form class="admin-theme-form" @submit.prevent="submitPassword">
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
        <h2>站点主题管理</h2>
        <p class="admin-theme-hint">全站主题以配置文件为准。下方可预览各主题效果（仅当前会话），修改全站请编辑配置并重新部署。</p>
        <div class="admin-theme-switcher">
          <ThemeSwitcher :inline="true" />
        </div>
        <button type="button" class="admin-theme-reset" @click="() => { clearThemePreview(); window.location.reload(); }">恢复为配置文件中的主题</button>
        <p class="admin-theme-config-hint">全站主题保存在 <code>docs/.vitepress/theme-config.json</code>，修改 <code>festivalTheme</code>（可选：default / spring-festival / dragon-boat / mid-autumn / national-day）后重新构建或部署即可生效。</p>
      </template>
    </template>
  </div>
</template>
