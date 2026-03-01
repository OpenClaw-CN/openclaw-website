<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { AdItem, AdPosition } from './ad-util'
import { POSITION_OPTIONS } from './ad-util'

const DRAFT_KEY = 'openclaw-ads-draft'

const list = ref<AdItem[]>([])
const editingId = ref<string | null>(null)
const form = ref<Partial<AdItem>>(getBlankForm())

function getBlankForm(): Partial<AdItem> {
  return {
    id: '',
    advertiser: '',
    slogan: '',
    position: [],
    imageUrl: '',
    targetUrl: '',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: '',
    complianceTag: '',
    tier: 'gold'
  }
}

async function loadFromDeployed() {
  if (typeof window === 'undefined') return
  try {
    const r = await fetch('/ads.json')
    if (r.ok) {
      const j = (await r.json()) as { activeAds?: AdItem[] }
      if (Array.isArray(j?.activeAds)) {
        list.value = JSON.parse(JSON.stringify(j.activeAds))
        cancelEdit()
        return
      }
    }
  } catch {
    // fallback to build-injected
  }
  const data = window.__OPENCLAW_ADS__
  list.value = Array.isArray(data?.activeAds) ? JSON.parse(JSON.stringify(data.activeAds)) : []
  cancelEdit()
}

function loadFromDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as AdItem[]
      list.value = Array.isArray(parsed) ? parsed : []
      cancelEdit()
    }
  } catch {
    list.value = []
  }
}

function saveDraft() {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(list.value))
  } catch (e) {
    console.warn('saveDraft failed', e)
  }
}

function cancelEdit() {
  editingId.value = null
  form.value = getBlankForm()
}

function startAdd() {
  editingId.value = null
  form.value = { ...getBlankForm(), id: `ad-${Date.now()}` }
}

function startEdit(ad: AdItem) {
  editingId.value = ad.id
  const copy = JSON.parse(JSON.stringify(ad)) as AdItem
  if (!Array.isArray(copy.position)) copy.position = []
  form.value = copy
}

function remove(id: string) {
  list.value = list.value.filter((a) => a.id !== id)
  if (editingId.value === id) cancelEdit()
  saveDraft()
}

function submitForm() {
  const ad = form.value
  if (!ad?.advertiser?.trim() || !ad.targetUrl?.trim() || !ad.startDate || !ad.endDate) return
  if (!ad.position?.length) ad.position = ['SidebarBottom']
  const full: AdItem = {
    id: ad.id || `ad-${Date.now()}`,
    advertiser: ad.advertiser.trim(),
    slogan: ad.slogan?.trim() || undefined,
    position: ad.position as AdPosition[],
    imageUrl: ad.imageUrl?.trim() || undefined,
    targetUrl: ad.targetUrl.trim(),
    startDate: ad.startDate,
    endDate: ad.endDate,
    complianceTag: ad.complianceTag?.trim() || undefined,
    tier: ad.tier || 'gold'
  }
  const idx = list.value.findIndex((a) => a.id === full.id)
  if (idx >= 0) list.value[idx] = full
  else list.value.push(full)
  cancelEdit()
  saveDraft()
}

function onImageFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input?.files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = () => {
    const dataUrl = reader.result as string
    if (form.value) form.value.imageUrl = dataUrl
  }
  reader.readAsDataURL(file)
  input.value = ''
}

function exportJson() {
  const json = JSON.stringify({ activeAds: list.value }, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'ads.json'
  a.click()
  URL.revokeObjectURL(a.href)
}

onMounted(() => {
  void loadFromDeployed()
})
</script>

<template>
  <div class="admin-ads-manager">
    <h3>广告投放管理</h3>
    <p class="admin-theme-hint">
      在此配置广告条目。修改后点击「下载 ads.json」，将下载的文件保存为 <strong>docs/public/ads.json</strong>（覆盖原文件），图片放到 <strong>docs/public/ads/</strong>，<strong>刷新页面</strong>即可生效，无需重新 build。也可保存到项目根目录后执行 build。
    </p>

    <div class="admin-ads-actions">
      <button type="button" class="admin-ads-btn" @click="() => loadFromDeployed()">从当前配置加载</button>
      <button type="button" class="admin-ads-btn" @click="loadFromDraft">从草稿加载</button>
      <button type="button" class="admin-ads-btn admin-ads-btn--primary" @click="saveDraft">保存草稿</button>
      <button type="button" class="admin-ads-btn admin-ads-btn--primary" @click="exportJson">下载 ads.json</button>
    </div>

    <div class="admin-ads-list">
      <div v-for="ad in list" :key="ad.id" class="admin-ads-item">
        <span class="admin-ads-item-title">{{ ad.advertiser }}</span>
        <span class="admin-ads-item-meta">{{ ad.position?.join(', ') }} · {{ ad.startDate }} ~ {{ ad.endDate }}</span>
        <button type="button" class="admin-ads-btn admin-ads-btn--small" @click="startEdit(ad)">编辑</button>
        <button type="button" class="admin-ads-btn admin-ads-btn--small admin-ads-btn--danger" @click="remove(ad.id)">删除</button>
      </div>
    </div>

    <div class="admin-ads-form-wrap">
      <template v-if="editingId || form.id">
        <h4>{{ editingId ? '编辑广告' : '新增广告' }}</h4>
        <form class="admin-ads-form" @submit.prevent="submitForm">
          <label>ID（唯一）</label>
          <input v-model="form.id" type="text" class="admin-theme-input" placeholder="如 crmeb-001" />
          <label>广告主名称</label>
          <input v-model="form.advertiser" type="text" class="admin-theme-input" required placeholder="如 CRMEB" />
          <label>标语（可选）</label>
          <input v-model="form.slogan" type="text" class="admin-theme-input" placeholder="如 高颜值开源商城系统" />
          <label>投放点位（可多选）</label>
          <div class="admin-ads-checkboxes">
            <label v-for="opt in POSITION_OPTIONS" :key="opt.value" class="admin-ads-check">
              <input
                v-model="form.position"
                type="checkbox"
                :value="opt.value"
              />
              {{ opt.label }}
            </label>
          </div>
          <label>图片链接或本地上传</label>
          <div class="admin-ads-image-row">
            <input
              v-model="form.imageUrl"
              type="text"
              class="admin-theme-input"
              placeholder="/ads/xxx.png 或完整 URL"
            />
            <input type="file" accept="image/*" class="admin-ads-file" @change="onImageFile" />
          </div>
          <p class="admin-ads-hint">选择图片后将转为内嵌数据，适合小图；大图建议放入 <code>docs/public/ads/</code> 后填 /ads/文件名</p>
          <label>跳转链接</label>
          <input v-model="form.targetUrl" type="url" class="admin-theme-input" required placeholder="https://..." />
          <label>开始日期</label>
          <input v-model="form.startDate" type="date" class="admin-theme-input" required />
          <label>结束日期</label>
          <input v-model="form.endDate" type="date" class="admin-theme-input" required />
          <label>合规标识（选填，不填则不显示小标）</label>
          <input v-model="form.complianceTag" type="text" class="admin-theme-input" placeholder="如：广告、特别赞助，留空则不显示" />
          <div class="admin-ads-form-btns">
            <button type="submit" class="admin-ads-btn admin-ads-btn--primary">保存</button>
            <button type="button" class="admin-ads-btn" @click="cancelEdit">取消</button>
          </div>
        </form>
      </template>
      <template v-else>
        <button type="button" class="admin-ads-btn admin-ads-btn--primary" @click="startAdd">+ 新增广告</button>
      </template>
    </div>

    <p class="admin-theme-config-hint">
      <strong>推荐：</strong>将下载的 <code>ads.json</code> 保存为 <code>docs/public/ads.json</code>，图片放在 <code>docs/public/ads/</code>，刷新页面即生效。<br />
      或保存到项目根目录后执行 <code>pnpm run build</code>（会同步到 public），再部署。
    </p>
  </div>
</template>
