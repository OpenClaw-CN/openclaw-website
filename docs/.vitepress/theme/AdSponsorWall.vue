<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { AdItem } from './ad-util'
import { fetchAdsData, getActiveAdsForPositionFromData } from './ad-util'

const POSITION = 'HomeSponsorWall' as const
const adsData = ref<Awaited<ReturnType<typeof fetchAdsData>> | null>(null)
const ads = computed<AdItem[]>(() =>
  adsData.value ? getActiveAdsForPositionFromData(adsData.value, POSITION) : []
)

onMounted(async () => {
  adsData.value = await fetchAdsData()
})
</script>

<template>
  <div v-if="ads.length" class="ad-sponsor-wall">
    <h3 class="ad-sponsor-wall__title">铂金赞助</h3>
    <div class="ad-sponsor-wall__list">
      <a
        v-for="ad in ads"
        :key="ad.id"
        class="ad-sponsor-wall__item"
        :href="ad.targetUrl"
        target="_blank"
        rel="noopener noreferrer sponsored"
      >
        <div class="ad-sponsor-wall__logo">
          <img
            v-if="ad.imageUrl"
            :src="ad.imageUrl"
            :alt="ad.advertiser"
            width="120"
            height="36"
            loading="lazy"
            referrerpolicy="no-referrer"
          />
          <span v-else>{{ ad.advertiser }}</span>
        </div>
        <span v-if="ad.slogan" class="ad-sponsor-wall__slogan">{{ ad.slogan }}</span>
        <span v-if="ad.complianceTag" class="ad-compliance-badge">{{ ad.complianceTag }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.ad-sponsor-wall__slogan {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}
</style>
