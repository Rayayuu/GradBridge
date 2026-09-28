# Contributing to GradBridge

感谢你愿意参与 GradBridge。

GradBridge 希望建立一个长期维护、信息可靠、真正帮助海外 CS 学生从大学走向技术工作的开放知识库。

你不需要是资深工程师才能参与。学生、Graduate、Software Engineer、Backend Engineer、AI Engineer、Researcher 以及有真实海外学习和求职经验的人都可以贡献。

---

## 可以贡献什么

### 内容贡献

- 修正文档中的错误或过时信息
- 补充学习方法与课程规划经验
- 分享 Internship / Graduate 求职经验
- 完善 CV、面试和技术知识内容
- 补充澳洲 CS 求职信息
- 更新悉尼租房、交通和学生生活信息
- 分享悉尼周末旅行与实用生活经验

### 技术贡献

- 修复网站 Bug
- 改善 VitePress 页面体验
- 优化搜索与导航
- 改善移动端体验
- 改善 Accessibility
- 开发未来的 Job Tracker 等工具

---

## 内容原则

所有贡献应尽量遵循以下原则。

### 1. 实用优先

每篇内容都应该解决一个明确问题，而不是为了增加文章数量。

### 2. 真实经验优先

如果内容来自个人经历，请明确说明适用背景、时间和限制。

不要把个人经历写成适用于所有人的绝对结论。

### 3. 时效信息必须谨慎

以下内容可能快速变化：

- 招聘
- Graduate / Internship Deadline
- Visa
- 租房
- 交通
- 学校政策
- 公司招聘流程

涉及这些内容时，应尽可能提供：

- Last Updated
- 官方来源
- 信息适用地区或年份

### 4. 区分事实、经验与观点

建议尽量明确区分：

- 官方事实
- 个人经验
- 社区经验
- 作者建议

### 5. 尊重 Academic Integrity

GradBridge 不接受：

- 当前 Assignment 的直接答案
- Quiz / Exam 答案
- 未授权课程材料
- 绕过学校 Academic Integrity 要求的内容

可以讨论学习方法、知识点、公开练习题与通用技术。

---

## 文档风格

GradBridge 的目标不是写教材，而是让学生快速理解并真正使用信息。

推荐结构：

```text
问题是什么
↓
为什么重要
↓
应该怎么做
↓
实际例子
↓
常见错误
↓
下一步
```

写作时尽量做到：

- 标题清晰
- 段落不要过长
- 避免没有解释的术语堆砌
- 技术内容尽量提供实际使用场景
- 求职内容尽量提供具体行动
- 不为了 SEO 重复关键词

---

## 修改项目

Fork 或 Clone 仓库后：

```bash
pnpm install
```

启动本地开发环境：

```bash
pnpm exec vitepress dev
```

提交前建议运行：

```bash
pnpm exec vitepress build
```

确保网站可以正常构建。

---

## Git Commit

推荐使用简洁清楚的提交信息。

例如：

```text
docs: add backend learning roadmap
docs: update Sydney renting guide
fix: correct broken career navigation
feat: add job tracker prototype
style: improve mobile article layout
```

---

## Pull Request

提交 Pull Request 时，请尽量说明：

1. 修改了什么
2. 为什么需要修改
3. 信息来源或个人经验背景
4. 是否涉及具有时效性的内容
5. 是否完成本地构建检查

如果修改 UI，可以附上截图。

---

## Issue

你可以通过 Issue：

- 报告错误
- 提交内容建议
- 提议新功能
- 报告过时信息
- 推荐新的技术主题
- 推荐新的悉尼生活主题

请尽量提供足够上下文，方便维护者快速理解问题。

---

## Review

GradBridge 会优先检查：

- 信息是否准确
- 是否真正有帮助
- 是否存在明显时效风险
- 是否符合项目内容定位
- 是否存在版权或 Academic Integrity 问题
- 是否影响现有网站结构

内容被修改或暂时不合并并不代表贡献没有价值，很多时候只是需要进一步核实或调整表达。

---

## 一起建设 GradBridge

GradBridge 希望最终形成一个由学生、工程师、贡献者和 Mentor 共同维护的海外 CS 成长平台。

如果你发现一个问题，哪怕只是一个错字，也欢迎提交贡献。

**From CS Student to Software Engineer.**
