<script setup lang="ts">
const resources = [
  {
    title: 'OpenClaw 官方文档',
    href: 'https://docs.openclaw.ai/zh-CN',
    tag1: '官方资源',
    tag2: '中文',
    description: '完整的安装、配置指南',
    source: 'OpenClaw',
  },
  {
    title: 'Gitee — openclaw-cn',
    href: 'https://gitee.com/OpenClaw-CN/openclaw-cn',
    tag1: '社区资源',
    tag2: '中文',
    description: '中国社区源代码、Issue跟踪',
    source: 'Gitee',
  },
  {
    title: 'GitHub — openclaw',
    href: 'https://github.com/openclaw/openclaw',
    tag1: '官方资源',
    tag2: '英文',
    description: '源代码、Issue跟踪和贡献指南',
    source: 'GitHub',
  },
  {
    title: 'ClawHub 技能市场',
    href: 'https://clawhub.ai/',
    tag1: '官方资源',
    tag2: '英文',
    description: '发现、安装各类 Skill 插件',
    source: 'ClawHub',
  },
  // 第二排：云平台部署
  {
    title: '阿里云 — 部署OpenClaw构建钉钉AI助理',
    href: 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw',
    tag1: '云平台部署',
    tag2: '中文',
    description: '应用服务器一键部署，可视化配置接入钉钉',
    source: '阿里云',
  },
  {
    title: '腾讯云 — 玩转OpenClaw，云上最全教程合辑',
    href: 'https://cloud.tencent.com/developer/article/2624973',
    tag1: '云平台部署',
    tag2: '中文',
    description: '应用服务器一键部署，可视化配置接入QQ、企业微信、钉钉等',
    source: '腾讯云',
  },
  {
    title: '百度云 — 部署OpenClaw，可视化配置千帆模型',
    href: 'https://cloud.baidu.com/doc/LS/s/6ml9f3cvl',
    tag1: '云平台部署',
    tag2: '中文',
    description: '应用服务器一键部署，支持钉钉、飞书、企业微信',
    source: '百度云',
  },
  {
    title: '火山云 — 部署OpenClaw，集成飞书AI助手',
    href: 'https://www.volcengine.com/docs/6396/2189942?lang=zh',
    tag1: '云平台部署',
    tag2: '中文',
    description: '应用服务器一键部署，接入火山模型并集成飞书应用',
    source: '火山云',
  },
]
</script>

<template>
  <!-- 与 VPFeatures 完全一致：外层响应式 padding，内层 container 1152px，items 四列无 gap、item padding 8px -->
  <div class="quality-resources">
    <div class="quality-resources__container">
      <h3 class="quality-resources__title">优质资源</h3>
      <div class="quality-resources__list">
      <a
        v-for="(r, i) in resources"
        :key="`${r.href}-${i}`"
        class="quality-resources__card"
        :class="{ 'is-placeholder': r.href === '#' }"
        :href="r.href"
        :target="r.href === '#' ? undefined : '_blank'"
        :rel="r.href === '#' ? undefined : 'noopener noreferrer'"
        :aria-label="r.href === '#' ? undefined : `${r.title}，${r.description}，打开链接`"
      >
        <div class="quality-resources__box">
          <div class="quality-resources__meta">
            <span class="quality-resources__icon" aria-hidden="true">📖</span>
            <span class="quality-resources__tag">{{ r.tag1 }}</span>
            <span class="quality-resources__lang">{{ r.tag2 }}</span>
          </div>
          <h4 class="quality-resources__card-title">{{ r.title }}</h4>
          <p class="quality-resources__card-desc">{{ r.description }}</p>
          <div class="quality-resources__footer">
            <span class="quality-resources__source">{{ r.source }}</span>
            <span class="quality-resources__visit">了解 &gt;</span>
          </div>
        </div>
      </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 与 VPFeatures 完全一致：响应式 padding，保证与上方四框左右边对齐 */
.quality-resources {
  position: relative;
  margin-top: 2rem;
  padding: 0 24px;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .quality-resources {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .quality-resources {
    padding: 0 64px;
  }
}

.quality-resources__container {
  margin: 0 auto;
  max-width: 1152px;
}

.quality-resources__title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0 0 1rem;
  letter-spacing: 0.02em;
  text-align: center;
}

/* 与 VPFeatures .items 一致：四列、item padding 8px（无 gap，列宽 = 1152/4 = 288px） */
.quality-resources__list {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.quality-resources__card {
  display: block;
  padding: 8px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
}

@media (min-width: 640px) {
  .quality-resources__card {
    width: 50%;
  }
}

@media (min-width: 960px) {
  .quality-resources__card {
    width: 25%;
  }
}

.quality-resources__card:hover .quality-resources__box {
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-bg-alt);
}

.quality-resources__card:hover .quality-resources__visit {
  color: var(--vp-c-brand-2);
}

.quality-resources__card.is-placeholder {
  pointer-events: none;
  cursor: default;
}

.quality-resources__card.is-placeholder .quality-resources__box {
  opacity: 0.7;
}

.quality-resources__card.is-placeholder:hover .quality-resources__box {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

/* 与上方 .box 同风格、同内边距，统一框高 */
.quality-resources__box {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: border-color 0.2s ease, background 0.2s ease;
}

/* 上方：图标 + 标签 + 语言，与 feature 的「图标 + 标题」层级一致 */
.quality-resources__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.quality-resources__icon {
  font-size: 1.1rem;
  line-height: 1;
}

.quality-resources__tag {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.quality-resources__lang {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.quality-resources__card-title {
  margin: 0 0 0.375rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.35;
}

.quality-resources__card-desc {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  flex: 1;
}

.quality-resources__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.quality-resources__source {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.quality-resources__visit {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  font-weight: 500;
  transition: color 0.2s ease;
}
</style>
