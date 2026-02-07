import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "OpenClaw CN",
  description: "更懂中文环境的 Local Agent 实战社区",
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.png',
    
    // 顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '关于我们', link: '/about/' },
      { text: '实战指南', link: '/guide/getting-started' },
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

      // 2. 实战指南
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
            { text: '配置 DeepSeek 大脑', link: '/guide/config-deepseek' }
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