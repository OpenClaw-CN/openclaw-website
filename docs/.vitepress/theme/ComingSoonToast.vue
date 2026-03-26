<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)
const type = ref<'academy' | 'skill' | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null
let mouseListener: (() => void) | null = null

const content = {
  academy: {
    title: '养虾学院功能即将开放',
    body: '我们正在搭建人类学习养虾的学院，敬请期待',
  },
  skill: {
    title: 'Skill产品功能即将开放',
    body: '我们正在搭建基于Skill的场景产品，敬请期待',
  },
}

function close() {
  show.value = false
  type.value = null
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  if (mouseListener && typeof document !== 'undefined') {
    document.removeEventListener('mousemove', mouseListener)
    mouseListener = null
  }
}

function showToast(kind: 'academy' | 'skill') {
  if (timer) clearTimeout(timer)
  if (mouseListener && typeof document !== 'undefined') {
    document.removeEventListener('mousemove', mouseListener)
  }
  type.value = kind
  show.value = true
  timer = setTimeout(close, 7000)
  mouseListener = () => close()
  if (typeof document !== 'undefined') {
    document.addEventListener('mousemove', mouseListener)
  }
}

function checkHash() {
  if (typeof window === 'undefined') return
  const h = window.location.hash.slice(1)
  if (h === 'coming-soon-academy') showToast('academy')
  else if (h === 'coming-soon-skill') showToast('skill')
}

onMounted(() => {
  checkHash()
  window.addEventListener('hashchange', checkHash)
  window.addEventListener('open-coming-soon', onOpenComingSoon)
})

function onOpenComingSoon(e: Event) {
  const detail = (e as CustomEvent<'academy' | 'skill'>).detail
  if (detail === 'academy' || detail === 'skill') showToast(detail)
}

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  if (mouseListener && typeof document !== 'undefined') {
    document.removeEventListener('mousemove', mouseListener)
  }
  window.removeEventListener('hashchange', checkHash)
  window.removeEventListener('open-coming-soon', onOpenComingSoon)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="coming-soon-fade">
      <div
        v-if="show && type"
        class="coming-soon-toast"
        role="alert"
      >
        <p class="coming-soon-toast__title">{{ content[type].title }}</p>
        <p class="coming-soon-toast__body">{{ content[type].body }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.coming-soon-toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  max-width: 320px;
  padding: 14px 18px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-3);
  z-index: 9999;
}

.coming-soon-toast__title {
  margin: 0 0 6px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.coming-soon-toast__body {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.coming-soon-fade-enter-active,
.coming-soon-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.coming-soon-fade-enter-from,
.coming-soon-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
