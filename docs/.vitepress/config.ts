import { defineConfig } from 'vitepress'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// 全站节日主题：修改此文件后重新构建/部署即可生效
const currentDir = dirname(fileURLToPath(import.meta.url))
const themeConfigPath = join(currentDir, 'theme-config.json')
const adminConfigPath = join(currentDir, 'admin-config.json')
const adsPath = join(currentDir, '..', '..', 'ads.json')
const VALID_THEMES = ['default', 'spring-festival', 'dragon-boat', 'mid-autumn', 'national-day']

function loadFestivalTheme(): string {
  try {
    const raw = readFileSync(themeConfigPath, 'utf-8')
    const data = JSON.parse(raw) as { festivalTheme?: string }
    const t = data?.festivalTheme
    return typeof t === 'string' && VALID_THEMES.includes(t) ? t : 'default'
  } catch {
    return 'default'
  }
}

function loadAdminConfig(): { adminUsername: string; adminPassword: string } | null {
  try {
    const raw = readFileSync(adminConfigPath, 'utf-8')
    const data = JSON.parse(raw) as { adminUsername?: string; adminPassword?: string }
    if (typeof data?.adminUsername === 'string' && typeof data?.adminPassword === 'string') {
      return { adminUsername: data.adminUsername, adminPassword: data.adminPassword }
    }
  } catch {
    // ignore
  }
  return null
}

function loadAds(): { activeAds?: unknown[] } {
  try {
    const raw = readFileSync(adsPath, 'utf-8')
    const data = JSON.parse(raw) as { activeAds?: unknown[] }
    return Array.isArray(data?.activeAds) ? data : { activeAds: [] }
  } catch {
    return { activeAds: [] }
  }
}

const festivalTheme = loadFestivalTheme()
const adminConfig = loadAdminConfig()
const adsData = loadAds()

// 首屏脚本：先看管理员预览(sessionStorage)，再用配置文件主题
const themeScript = `(function(){
  var ids=['default','spring-festival','dragon-boat','mid-autumn','national-day'];
  var preview=sessionStorage.getItem('openclaw-theme-preview');
  var t=(preview&&ids.indexOf(preview)>=0)?preview:(window.__OPENCLAW_DEFAULT_THEME__&&ids.indexOf(window.__OPENCLAW_DEFAULT_THEME__)>=0?window.__OPENCLAW_DEFAULT_THEME__:'default');
  var r=document.documentElement;
  ids.forEach(function(id){r.classList.remove('theme-'+id);});
  r.classList.add('theme-'+t);
})();`

const defaultThemeScript = `window.__OPENCLAW_DEFAULT_THEME__="${festivalTheme.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}";`
const adminScript = adminConfig
  ? `window.__OPENCLAW_ADMIN__=${JSON.stringify(adminConfig)};`
  : ''
const adsScript = `window.__OPENCLAW_ADS__=${JSON.stringify(adsData)};`

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "OpenClaw CN",
  description: "更懂中文环境的 Local Agent 实战社区",
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['script', {}, defaultThemeScript],
    ['script', {}, themeScript],
    ...(adminScript ? [['script', {}, adminScript]] : []),
    ['script', {}, adsScript],
  ],
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.png',

    // 顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '关于我们', link: '/about/' },
      { text: '快速开始', link: '/guide/getting-started' },
	  { text: '实战指南', link: '/practical/' },
      { text: '路线图', link: '/roadmap/' },
      { text: '插件市场', link: '/plugins/' }
    ],

    // 侧边栏配置
    sidebar: {
      // 1. 关于我们
      '/about/': [
        {
          text: '关于 OpenClaw CN',
          items: [
            { text: '源起：72小时诞生记', link: '/about/' },
            { text: '发展历程', link: '/about/history' }
          ]
        }
      ],

      '/guide/': [
        {
          text: '开始之前',
          items: [
            { text: 'OpenClaw 是什么?', link: '/guide/what-is-openclaw' }
          ]
        },
        {
          text: '快速上手',
          items: [
            { text: '保姆级安装教程', link: '/guide/getting-started' },
            { text: '配置 DeepSeek 大脑', link: '/guide/config-deepseek' },
			{ text: '如何卸载', link: '/guide/uninstall' } // ✨ 新增入口
          ]
        },
        {
          text: '常见问题',
          items: [
            { text: 'FAQ', link: '/guide/faq' }
          ]
        }
      ],

      // 3. 路线图
      '/roadmap/': [
        {
          text: '未来规划',
          items: [
            { text: '2026 Q1 路线图', link: '/roadmap/' },
            { text: '🔥 当前悬赏任务', link: '/roadmap/current-tasks' } // ✨ 悬赏任务入口
          ]
        }
      ],

      // 4. 插件生态
      '/plugins/': [
        {
          text: '生态中心',
          items: [
            { text: '插件市场首页', link: '/plugins/' },
            { text: '如何开发插件 (贡献指南)', link: '/plugins/contribution' }
          ]
        }
      ],

      // 5. 实战指南
      '/practical/': [
        {
          text: '实战指南',
          items: [
            { text: 'windows原生源码安装', link: '/practical/windows-native' },
            { text: 'Linux 源码安装', link: '/practical/linux_practical' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/OpenClaw-CN/openclaw-cn' }
    ],

    footer: {
      message: '让 AI Agent 在中国土地上生根发芽 | 基于 MIT 许可发布',
      copyright: 'Copyright © 2026 OpenClaw CN'
    }
  }
})
