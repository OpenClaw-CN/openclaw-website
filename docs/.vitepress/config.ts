import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "OpenClaw CN",
  description: "更懂中文环境的 Local Agent 实战社区",
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png', // 这里引用刚才放进去的logo
    nav: [
      { text: '首页', link: '/' },
      { text: '实战指南', link: '/guide/getting-started' },
      { text: '插件市场', link: '/plugins/' }
    ],

    sidebar: [
      {
        text: '快速开始',
        items: [
          { text: '什么是 OpenClaw?', link: '/guide/what-is-openclaw' },
          { text: '保姆级安装教程', link: '/guide/getting-started' },
          { text: '配置 DeepSeek 大脑', link: '/guide/config-deepseek' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/OpenClaw-CN/openclaw-cn' } // 咱们先用Github图标代替Gitee
    ],
    
    footer: {
      message: '基于 MIT 许可发布 | OpenClaw-CN 社区维护',
      copyright: 'Copyright © 2026 OpenClaw CN'
    }
  }
})
