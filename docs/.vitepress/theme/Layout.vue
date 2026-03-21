<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { onMounted, onUnmounted } from 'vue'
import { applyInitialTheme } from './util'
import AdSidebar from './AdSidebar.vue'
import AdSponsorWall from './AdSponsorWall.vue'
import QualityResources from './QualityResources.vue'
import AdDocFooter from './AdDocFooter.vue'
import AdTopBanner from './AdTopBanner.vue'
import ComingSoonToast from './ComingSoonToast.vue'
const { Layout } = DefaultTheme

function handleNavClick(e: MouseEvent) {
  const a = (e.target as HTMLElement).closest?.('a')
  if (!a) return
  const text = a.textContent?.trim()
  if (text === 'Skill产品') {
    e.preventDefault()
    e.stopPropagation()
    window.dispatchEvent(new CustomEvent('open-coming-soon', { detail: 'skill' }))
  }
}

onMounted(() => {
  applyInitialTheme()
  document.addEventListener('click', handleNavClick, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleNavClick, true)
})
</script>

<template>
  <Layout>
    <!-- 首页顶部通栏：导航下、Hero 上（仅首页） -->
    <template #home-hero-before>
      <AdTopBanner variant="home" />
    </template>
    <!-- 频道页顶部通栏：正文上方（仅 doc 页） -->
    <template #doc-before>
      <AdTopBanner variant="doc" />
    </template>
    <!-- 左侧导航栏底部 -->
    <template #sidebar-nav-after>
      <AdSidebar position="SidebarBottom" />
    </template>
    <!-- 右侧文章大纲（TOC）下方 -->
    <template #aside-outline-after>
      <AdSidebar position="SidebarRightSticky" />
    </template>
    <!-- 首页优质资源 + 铂金赞助 -->
    <template #home-features-after>
      <QualityResources />
      <AdSponsorWall />
    </template>
    <!-- 正文内容底部、评论区上方的原生文字链区 -->
    <template #doc-footer-before>
      <AdDocFooter />
    </template>
  </Layout>
  <ComingSoonToast />
</template>
