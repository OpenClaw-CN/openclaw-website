<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'
import { getActiveTheme, setTheme, THEME_LABELS, type FestivalThemeId } from './util'

defineProps<{ inline?: boolean }>()

const { frontmatter } = useData()
const isHomeHero = computed(() => frontmatter.value?.layout === 'home')

const open = ref(false)
const current = ref<FestivalThemeId>('default')

const themes: FestivalThemeId[] = ['default', 'spring-festival', 'dragon-boat', 'mid-autumn', 'national-day']

function choose(t: FestivalThemeId) {
  setTheme(t)
  current.value = t
  open.value = false
}

onMounted(() => {
  current.value = getActiveTheme()
})
</script>

<template>
  <div class="theme-switcher-wrap" :class="{ 'theme-switcher--hero': isHomeHero, 'theme-switcher--inline': inline }">
    <template v-if="inline">
      <p class="theme-switcher-current">当前主题：<strong>{{ THEME_LABELS[current] }}</strong></p>
      <div class="theme-switcher-options-row">
        <button
          v-for="t in themes"
          :key="t"
          type="button"
          class="theme-switcher-option theme-switcher-option--block"
          :class="{ active: current === t }"
          @click="choose(t)"
        >
          {{ THEME_LABELS[t] }}
        </button>
      </div>
    </template>
    <template v-else>
      <button
        type="button"
        class="theme-switcher-btn"
        :aria-label="'节日换肤：' + THEME_LABELS[current]"
        @click.stop="open = !open"
      >
        <span class="theme-switcher-icon">🎨</span>
        <span class="theme-switcher-label">{{ THEME_LABELS[current] }}</span>
      </button>
      <div v-show="open" class="theme-switcher-dropdown" @click.stop>
        <button
          v-for="t in themes"
          :key="t"
          type="button"
          class="theme-switcher-option"
          :class="{ active: current === t }"
          @click.stop="choose(t)"
        >
          {{ THEME_LABELS[t] }}
        </button>
      </div>
    </template>
  </div>
</template>
