<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import { applyInitialTheme } from './util'

onMounted(() => {
  applyInitialTheme()
})
</script>

<template>
  <DefaultTheme.Layout />
</template>
