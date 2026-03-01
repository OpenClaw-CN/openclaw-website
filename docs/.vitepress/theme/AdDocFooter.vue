<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { AdItem } from './ad-util'
import { fetchAdsData, getActiveAdsForPositionFromData } from './ad-util'

const POSITION = 'ContentFooterNative' as const
const adsData = ref<Awaited<ReturnType<typeof fetchAdsData>> | null>(null)
const ads = computed<AdItem[]>(() =>
  adsData.value ? getActiveAdsForPositionFromData(adsData.value, POSITION) : []
)
const showComplianceBadge = computed(() => ads.value.some((ad) => ad.complianceTag))

onMounted(async () => {
  adsData.value = await fetchAdsData()
})
</script>

<template>
  <div v-if="ads.length" class="ad-doc-footer">
    <span class="ad-doc-footer-label">赞助链接：</span>
    <template v-for="(ad, i) in ads" :key="ad.id">
      <a
        :href="ad.targetUrl"
        target="_blank"
        rel="noopener noreferrer sponsored"
        class="ad-native-link"
      >{{ ad.advertiser }}{{ ad.slogan ? ` - ${ad.slogan}` : '' }}</a>
    </template>
    <span v-if="showComplianceBadge" class="ad-compliance-badge-inline">广告</span>
  </div>
</template>

<style scoped>
.ad-doc-footer {
  margin-top: 1rem;
  padding: 0.75rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
}
.ad-doc-footer-label {
  margin-right: 0.5em;
}
.ad-compliance-badge-inline {
  font-size: 8px;
  color: rgba(0, 0, 0, 0.4);
  margin-left: 0.5em;
}
.dark .ad-compliance-badge-inline {
  color: rgba(255, 255, 255, 0.4);
}
</style>
