import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

export default defineConfig({
  lang: 'zh-CN',

  title: 'GradBridge',

  description: '海外 CS 学习、技术、求职与悉尼生活指南',

  srcDir: './docs',

  cleanUrls: true,

  themeConfig: {

    siteTitle: 'GradBridge',

    nav: [
      { text: '首页', link: '/' },
      { text: '学习', link: '/study/' },
      { text: '求职', link: '/career/' },
      { text: '技术', link: '/tech/' },
      { text: '悉尼', link: '/sydney/' },
      { text: '免费资源', link: '/free/' },
      { text: '工具', link: '/tools/' },
      { text: '升级', link: '/premium/' },
      { text: '关于', link: '/about/' }
    ],

    sidebar,

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '本页内容'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    darkModeSwitchLabel: '外观',

    sidebarMenuLabel: '目录',

    returnToTopLabel: '返回顶部',

    footer: {
      message: 'Independent student-built platform.',
      copyright: 'Copyright © 2026 GradBridge'
    }

  }
})