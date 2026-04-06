<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const show = computed(() => {
  const p = route.path
  return p.startsWith('/guide/') || p.startsWith('/practical/')
})
</script>

<template>
  <a v-if="show" class="course-promo" href="/academy/lobster-breakice">
    <div class="course-promo__inner">
      <span class="course-promo__badge">🦞 实战特训</span>
      <p class="course-promo__title">龙虾破冰计划 · OpenClaw 入门实战课</p>
      <p class="course-promo__desc">
        7 次直播 · 14 节大课 · 导师答疑 · 社群陪伴 —
        从零孵化你的专属 AI 私有助理，把 OpenClaw 养到能替你干活。
      </p>
      <span class="course-promo__cta">查看课程大纲与报名信息 →</span>
    </div>
  </a>
</template>

<style scoped>
.course-promo {
  display: block;
  margin: 2.5rem 0 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-brand-soft);
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.course-promo:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}

.dark .course-promo:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.course-promo__inner {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.course-promo__badge {
  display: inline-block;
  width: fit-content;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15em 0.6em;
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  letter-spacing: 0.04em;
}

.course-promo__title {
  margin: 0.25rem 0 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.course-promo__desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}

.course-promo__cta {
  display: inline-block;
  margin-top: 0.25rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.2s ease;
}

.course-promo:hover .course-promo__cta {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

@media (max-width: 640px) {
  .course-promo {
    padding: 1rem 1.125rem;
    margin: 2rem 0 0.75rem;
  }

  .course-promo__title {
    font-size: 1rem;
  }
}
</style>
