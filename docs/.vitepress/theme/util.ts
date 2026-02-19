/** 节日主题 ID */
export type FestivalThemeId = 'default' | 'spring-festival' | 'dragon-boat' | 'mid-autumn' | 'national-day'

const FESTIVAL_RANGES: Record<Exclude<FestivalThemeId, 'default'>, [string, string]> = {
  'spring-festival': ['01-15', '02-25'],
  'dragon-boat': ['06-01', '06-20'],
  'mid-autumn': ['09-10', '09-25'],
  'national-day': ['09-28', '10-10'],
}

/** 管理员预览用，仅 sessionStorage，刷新后以配置文件为准 */
const PREVIEW_KEY = 'openclaw-theme-preview'

export const THEME_LABELS: Record<FestivalThemeId, string> = {
  'default': '默认',
  'spring-festival': '春节',
  'dragon-boat': '端午',
  'mid-autumn': '中秋',
  'national-day': '国庆',
}

function getMMDD(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${m}-${day}`
}

function isInRange(mmdd: string, [start, end]: [string, string]): boolean {
  return mmdd >= start && mmdd <= end
}

export function getAutoFestivalTheme(): FestivalThemeId {
  const mmdd = getMMDD(new Date())
  if (isInRange(mmdd, FESTIVAL_RANGES.national-day)) return 'national-day'
  if (isInRange(mmdd, FESTIVAL_RANGES.spring-festival)) return 'spring-festival'
  if (isInRange(mmdd, FESTIVAL_RANGES.mid-autumn)) return 'mid-autumn'
  if (isInRange(mmdd, FESTIVAL_RANGES.dragon-boat)) return 'dragon-boat'
  return 'default'
}

const THEME_IDS: FestivalThemeId[] = ['default', 'spring-festival', 'dragon-boat', 'mid-autumn', 'national-day']

function isValidTheme(t: unknown): t is FestivalThemeId {
  return typeof t === 'string' && THEME_IDS.includes(t as FestivalThemeId)
}

/** 当前生效主题：优先管理员预览(sessionStorage)，否则为构建时注入的配置( window.__OPENCLAW_DEFAULT_THEME__ ) */
export function getActiveTheme(): FestivalThemeId {
  if (typeof document === 'undefined') return 'default'
  const preview = sessionStorage.getItem(PREVIEW_KEY)
  if (preview && isValidTheme(preview)) return preview
  const config = (window as unknown as { __OPENCLAW_DEFAULT_THEME__?: string }).__OPENCLAW_DEFAULT_THEME__
  if (config && isValidTheme(config)) return config
  return 'default'
}

function clearThemeClasses(root: HTMLElement): void {
  THEME_IDS.forEach((id) => root.classList.remove(`theme-${id}`))
}

/** 应用主题；在 /admin 下会写入 sessionStorage 作为预览，刷新或关闭后以配置文件为准 */
export function setTheme(themeId: FestivalThemeId): void {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  clearThemeClasses(root)
  root.classList.add(`theme-${themeId}`)
  sessionStorage.setItem(PREVIEW_KEY, themeId)
}

/** 清除预览，恢复为配置文件中的主题 */
export function clearThemePreview(): void {
  if (typeof document === 'undefined') return
  sessionStorage.removeItem(PREVIEW_KEY)
  applyInitialTheme()
}

export function applyInitialTheme(): void {
  const root = document.documentElement
  clearThemeClasses(root)
  const theme = getActiveTheme()
  root.classList.add(`theme-${theme}`)
}
