<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { AdItem, AdPosition } from './ad-util'
import { fetchAdsData, getActiveAdsForPositionsFromData } from './ad-util'

const props = withDefaults(
  defineProps<{
    /** 首页：导航下/Hero上；频道页：正文上方 */
    variant: 'home' | 'doc'
  }>(),
  {}
)

const HOME_POSITIONS: AdPosition[] = ['TopBannerHome', 'TopBanner']
const DOC_POSITIONS: AdPosition[] = ['TopBannerDoc', 'TopBanner']

const adsData = ref<Awaited<ReturnType<typeof fetchAdsData>> | null>(null)
const ads = computed<AdItem[]>(() => {
  if (!adsData.value) return []
  const positions = props.variant === 'home' ? HOME_POSITIONS : DOC_POSITIONS
  return getActiveAdsForPositionsFromData(adsData.value, positions)
})
const firstAd = computed(() => ads.value[0] ?? null)
const variant = computed(() => props.variant)

onMounted(async () => {
  adsData.value = await fetchAdsData()
})
</script>

<template>
  <div v-if="firstAd" class="ad-top-banner" :class="[`ad-top-banner--${variant}`]">
    <a
      class="ad-top-banner__link"
      :href="firstAd.targetUrl"
      target="_blank"
      rel="noopener noreferrer sponsored"
    >
      <template v-if="firstAd.imageUrl">
        <div class="ad-top-banner__body">
          <div class="ad-top-banner__media">
            <img
              :src="firstAd.imageUrl"
              :alt="firstAd.advertiser"
              class="ad-top-banner__img"
              loading="eager"
              referrerpolicy="no-referrer"
            />
          </div>
          <span v-if="firstAd.slogan" class="ad-top-banner__slogan">{{ firstAd.slogan }}</span>
        </div>
      </template>
      <span v-else class="ad-top-banner__text">{{ firstAd.advertiser }}{{ firstAd.slogan ? ` - ${firstAd.slogan}` : '' }}</span>
    </a>
    <span v-if="firstAd.complianceTag" class="ad-compliance-badge ad-top-banner__badge">{{ firstAd.complianceTag }}</span>
  </div>
</template>

<style scoped>
.ad-top-banner {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 与整站主背景一致，避免突兀色块 */
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}
/* 首页：限制宽度并居中，与导航栏留出间距 */
.ad-top-banner--home {
  max-width: 1152px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.25rem;
  padding: 0 24px;
  box-sizing: border-box;
}
/* 频道页：限制宽度，并与文章标题留出间距 */
.ad-top-banner--doc {
  max-width: 1152px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5rem;
  padding: 0 24px;
  box-sizing: border-box;
}
.ad-top-banner__link {
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
  color: inherit;
}
.ad-top-banner__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60px;
}
.ad-top-banner__media {
  flex: 1 1 0;
  min-height: 50px;
  max-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.ad-top-banner__img {
  display: block;
  max-height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  object-position: center;
  vertical-align: middle;
}
.ad-top-banner__slogan {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  padding: 4px 0 8px;
  line-height: 1.3;
}
.ad-top-banner__text {
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.ad-top-banner__badge {
  position: absolute;
  right: 6px;
  bottom: 4px;
}
</style>
