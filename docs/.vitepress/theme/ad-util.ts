/**
 * 广告数据与日期有效性判断
 * 根目录 ads.json 在构建时注入 window.__OPENCLAW_ADS__，此处仅做类型与工具
 */

export type AdPosition =
  | 'TopBanner'        // 兼容：同时出现在首页 + 频道页
  | 'TopBannerHome'    // 仅首页顶部通栏（导航下、Hero 上）
  | 'TopBannerDoc'     // 仅频道页顶部通栏（导航下、正文上）
  | 'SidebarBottom'
  | 'SidebarRightSticky'
  | 'ContentFooterNative'
  | 'HomeSponsorWall'
  | 'GlobalFooterLink'

export interface AdItem {
  id: string
  tier?: string
  position: AdPosition[]
  advertiser: string
  slogan?: string
  imageUrl?: string
  targetUrl: string
  startDate: string
  endDate: string
  complianceTag?: string
}

export interface AdsData {
  activeAds: AdItem[]
}

/** 供管理后台使用的广告位选项 */
export const POSITION_OPTIONS: { value: AdPosition; label: string }[] = [
  { value: 'TopBanner', label: '顶部通栏（首页+频道页都显示）' },
  { value: 'TopBannerHome', label: '首页顶部通栏（仅首页导航下/Hero上）' },
  { value: 'TopBannerDoc', label: '频道页顶部通栏（仅文章页正文上方）' },
  { value: 'SidebarBottom', label: '左侧导航栏底部' },
  { value: 'SidebarRightSticky', label: '右侧 TOC 下方' },
  { value: 'ContentFooterNative', label: '正文底部原生文字链' },
  { value: 'HomeSponsorWall', label: '首页赞助商 Logo 墙' },
  { value: 'GlobalFooterLink', label: '全局页脚友情链接' }
]

declare global {
  interface Window {
    __OPENCLAW_ADS__?: AdsData
  }
}

/** 当前日期 YYYY-MM-DD */
function todayString(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * 判断广告在 startDate 与 endDate 之间是否有效（含当日）
 * 过期或未开始的广告自动隐藏，无需人工干预
 */
export function isAdActive(ad: AdItem): boolean {
  const today = todayString()
  return ad.startDate <= today && today <= ad.endDate
}

/** 从指定数据源过滤出在指定点位且当前有效的广告 */
export function getActiveAdsForPositionFromData(
  data: AdsData | null | undefined,
  position: AdPosition
): AdItem[] {
  if (!data?.activeAds?.length) return []
  return data.activeAds.filter(
    (ad) => Array.isArray(ad.position) && ad.position.includes(position) && isAdActive(ad)
  )
}

/** 从指定数据源过滤出在任一指定点位且当前有效的广告（用于顶部通栏首页/频道页可多选） */
export function getActiveAdsForPositionsFromData(
  data: AdsData | null | undefined,
  positions: AdPosition[]
): AdItem[] {
  if (!data?.activeAds?.length || !positions?.length) return []
  return data.activeAds.filter(
    (ad) =>
      Array.isArray(ad.position) &&
      isAdActive(ad) &&
      positions.some((p) => ad.position.includes(p))
  )
}

/** 从全局注入中取广告列表（同步，用于 SSR/首屏回退） */
export function getActiveAdsForPosition(position: AdPosition): AdItem[] {
  if (typeof window === 'undefined') return []
  return getActiveAdsForPositionFromData(window.__OPENCLAW_ADS__, position)
}

let adsDataPromise: Promise<AdsData> | null = null

/**
 * 运行时优先拉取 /ads.json（来自 docs/public/ads.json），失败则用构建注入的数据。
 * 这样把「下载的 ads.json」放到 docs/public/ads.json 后刷新即可生效，无需重新 build。
 */
export function fetchAdsData(): Promise<AdsData> {
  if (typeof window === 'undefined') {
    return Promise.resolve({ activeAds: [] })
  }
  if (!adsDataPromise) {
    adsDataPromise = (async () => {
      try {
        const r = await fetch('/ads.json')
        if (r.ok) {
          const j = (await r.json()) as AdsData
          if (j && Array.isArray(j.activeAds)) return j
        }
      } catch {
        // ignore
      }
      return window.__OPENCLAW_ADS__ || { activeAds: [] }
    })()
  }
  return adsDataPromise
}
