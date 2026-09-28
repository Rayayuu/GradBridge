import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {

  '/study/': [
    {
      text: '学习',
      items: [
        { text: '学习首页', link: '/study/' }
      ]
    },
    {
      text: '成长路线',
      collapsed: false,
      items: [
        { text: '海外 CS 四年成长路线', link: '/study/roadmap/four-year-roadmap' },
        { text: '大一应该做什么', link: '/study/roadmap/first-year-guide' },
        { text: '什么时候开始找实习', link: '/study/roadmap/internship-timing' },
        { text: 'WAM 与求职怎么平衡', link: '/study/roadmap/wam-vs-career' },
        { text: 'Honours 值不值得做', link: '/study/roadmap/honours-guide' }
      ]
    },
    {
      text: '学习方法',
      collapsed: false,
      items: [
        { text: '课程、项目与 LeetCode', link: '/study/method/course-project-leetcode' },
        { text: 'Group Project 指南', link: '/study/method/group-project-guide' },
        { text: '如何和 Tutor 沟通', link: '/study/method/tutor-communication' }
      ]
    }
  ],

  '/career/': [
    {
      text: '求职',
      items: [
        { text: '求职首页', link: '/career/' },
        { text: '求职路线', link: '/career/roadmap/' }
      ]
    },
    {
      text: '核心模块',
      collapsed: false,
      items: [
        { text: 'CV', link: '/career/cv/' },
        { text: '面试', link: '/career/interview/' },
        { text: '澳洲求职', link: '/career/australia/' },
        { text: '悉尼 CS 求职', link: '/career/sydney/' },
        { text: '国内秋招', link: '/career/china/' }
      ]
    }
  ],

  '/tech/': [
    {
      text: '技术知识库',
      items: [
        { text: '技术首页', link: '/tech/' }
      ]
    },
    {
      text: '基础',
      collapsed: false,
      items: [
        { text: 'CS Basics', link: '/tech/cs-basics/' },
        { text: 'Java', link: '/tech/java/' },
        { text: 'Database', link: '/tech/database/' }
      ]
    },
    {
      text: '工程方向',
      collapsed: false,
      items: [
        { text: 'Backend', link: '/tech/backend/' },
        { text: 'AI Engineering', link: '/tech/ai/' },
        { text: 'Computer Vision', link: '/tech/computer-vision/' },
        { text: 'Security', link: '/tech/security/' },
        { text: 'System Design', link: '/tech/system-design/' }
      ]
    }
  ],

  '/sydney/': [
    {
      text: '悉尼',
      items: [
        { text: '悉尼首页', link: '/sydney/' }
      ]
    },
    {
      text: '学生生活',
      collapsed: false,
      items: [
        { text: '新生落地', link: '/sydney/newcomer/' },
        { text: '租房', link: '/sydney/rent/' },
        { text: '生活', link: '/sydney/life/' },
        { text: '周末旅行', link: '/sydney/travel/' }
      ]
    }
  ]

}