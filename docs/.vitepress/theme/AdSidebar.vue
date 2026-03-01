<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { AdPosition, AdItem } from './ad-util'
import { fetchAdsData, getActiveAdsForPositionFromData } from './ad-util'

const props = withDefaults(
  defineProps<{
    /** 广告位：左侧导航底 或 右侧 TOC 下 */
    position: 'SidebarBottom' | 'SidebarRightSticky'
  }>(),
  {}
)

const adsData = ref<Awaited<ReturnType<typeof fetchAdsData>> | null>(null)
const ads = computed<AdItem[]>(() =>
  adsData.value ? getActiveAdsForPositionFromData(adsData.value, props.position as AdPosition) : []
)

onMounted(async () => {
  adsData.value = await fetchAdsData()
})
</script>

<template>
  <div
    v-if="ads.length"
    class="ad-sidebar-wrap"
    :class="{
      'ad-sidebar-bottom': position === 'SidebarBottom',
      'ad-sidebar-right': position === 'SidebarRightSticky'
    }"
  >
    <p class="ad-sidebar-wrap__title">赞助位</p>
    <a
      v-for="ad in ads"
      :key="ad.id"
      class="ad-sidebar-unit"
      :href="ad.targetUrl"
      target="_blank"
      rel="noopener noreferrer sponsored"
    >
      <div class="ad-sidebar-unit__body">
        <div class="ad-sidebar-unit__media">
          <img
            v-if="ad.imageUrl"
            :src="ad.imageUrl"
            :alt="ad.advertiser"
            width="200"
            height="80"
            loading="lazy"
            referrerpolicy="no-referrer"
          />
          <span v-else class="ad-sidebar-unit__name">{{ ad.advertiser }}</span>
        </div>
        <span v-if="ad.slogan" class="ad-sidebar-unit__slogan">{{ ad.slogan }}</span>
      </div>
      <span v-if="ad.complianceTag" class="ad-compliance-badge">{{ ad.complianceTag }}</span>
    </a>
  </div>
</template>

<style scoped>
.ad-sidebar-wrap {
  padding: 0 4px;
}
</style>
