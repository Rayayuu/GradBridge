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
        { text: '大二应该做什么', link: '/study/roadmap/second-year-guide' },
        { text: '大三应该做什么', link: '/study/roadmap/third-year-guide' },
        { text: '大四应该做什么', link: '/study/roadmap/fourth-year-guide' },
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
        { text: '求职路线', link: '/career/roadmap/' },
        { text: 'CS 求职时间线', link: '/career/roadmap/career-timeline' },
        { text: '第一份 CS 实习', link: '/career/roadmap/first-internship' }
      ]
    },
    {
      text: 'CV',
      collapsed: false,
      items: [
        { text: 'CV 首页', link: '/career/cv/' },
        { text: 'CS CV 完整指南', link: '/career/cv/cs-cv-guide' },
        { text: 'Project Bullet 怎么写', link: '/career/cv/project-bullets' },
        { text: 'ATS 指南', link: '/career/cv/ats-guide' }
      ]
    },
    {
      text: '面试',
      collapsed: false,
      items: [
        { text: '面试首页', link: '/career/interview/' },
        { text: 'Coding Interview', link: '/career/interview/coding-interview' },
        { text: 'Technical Interview', link: '/career/interview/technical-interview' },
        { text: 'Behavioral Interview', link: '/career/interview/behavioral-interview' }
      ]
    },
    {
      text: '澳洲求职',
      collapsed: false,
      items: [
        { text: '澳洲求职首页', link: '/career/australia/' },
        { text: 'Graduate Program', link: '/career/australia/graduate-program' },
        { text: '求职平台', link: '/career/australia/job-platforms' },
        { text: 'Networking', link: '/career/australia/networking' },
        { text: 'Work Rights', link: '/career/australia/work-rights' }
      ]
    },
    {
      text: '悉尼求职',
      collapsed: false,
      items: [
        { text: '悉尼 CS 求职首页', link: '/career/sydney/' },
        { text: '悉尼 CS 求职指南', link: '/career/sydney/sydney-cs-job-guide' }
      ]
    },
    {
      text: '国内求职',
      collapsed: false,
      items: [
        { text: '国内秋招首页', link: '/career/china/' },
        { text: '国内秋招时间线', link: '/career/china/china-recruitment-timeline' }
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
      text: 'CS Basics',
      collapsed: false,
      items: [
        { text: 'CS Basics 首页', link: '/tech/cs-basics/' },
        { text: 'URL 背后发生了什么', link: '/tech/cs-basics/dns-tcp-http' },
        { text: 'Git 与工程协作', link: '/tech/cs-basics/git-engineering-workflow' }
      ]
    },
    {
      text: 'Java',
      collapsed: false,
      items: [
        { text: 'Java 首页', link: '/tech/java/' },
        { text: 'Java OOP', link: '/tech/java/oop' }
      ]
    },
    {
      text: 'Database',
      collapsed: false,
      items: [
        { text: 'Database 首页', link: '/tech/database/' },
        { text: 'SQL · Index · Transaction', link: '/tech/database/sql-index-transaction' }
      ]
    },
    {
      text: 'Backend',
      collapsed: false,
      items: [
        { text: 'Backend 首页', link: '/tech/backend/' },
        { text: 'HTTP 与 REST API', link: '/tech/backend/http-rest-api' },
        { text: 'Session vs JWT', link: '/tech/backend/session-vs-jwt' },
        { text: 'Redis 持久化', link: '/tech/backend/redis-persistence' }
      ]
    },
    {
      text: 'Security',
      collapsed: false,
      items: [
        { text: 'Security 首页', link: '/tech/security/' },
        { text: 'XSS vs CSRF', link: '/tech/security/xss-vs-csrf' }
      ]
    },
    {
      text: '进阶方向',
      collapsed: false,
      items: [
        { text: 'AI Engineering', link: '/tech/ai/' },
        { text: 'Computer Vision', link: '/tech/computer-vision/' },
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
