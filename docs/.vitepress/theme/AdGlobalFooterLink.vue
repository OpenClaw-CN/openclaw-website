<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { AdItem } from './ad-util'
import { fetchAdsData, getActiveAdsForPositionFromData } from './ad-util'

const POSITION = 'GlobalFooterLink' as const
const adsData = ref<Awaited<ReturnType<typeof fetchAdsData>> | null>(null)
const ads = computed<AdItem[]>(() =>
  adsData.value ? getActiveAdsForPositionFromData(adsData.value, POSITION) : []
)

onMounted(async () => {
  adsData.value = await fetchAdsData()
})
</script>

<template>
  <div v-if="ads.length" class="ad-global-footer-link">
    <span class="ad-global-footer-label">友情链接：</span>
    <template v-for="(ad, i) in ads" :key="ad.id">
      <a
        :href="ad.targetUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="ad-global-footer-item"
      >{{ ad.advertiser }}</a>
      <span v-if="i < ads.length - 1" class="ad-global-footer-sep">|</span>
    </template>
  </div>
</template>

<style scoped>
.ad-global-footer-link {
  padding: 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-align: center;
  margin: 0;
  line-height: 1.35;
}
.ad-global-footer-label {
  margin-right: 0.5em;
}
.ad-global-footer-item {
  color: var(--vp-c-text-2);
  text-decoration: none;
}
.ad-global-footer-item:hover {
  color: var(--vp-c-brand-1);
}
.ad-global-footer-sep {
  margin: 0 0.5em;
  color: var(--vp-c-text-3);
}
</style>
