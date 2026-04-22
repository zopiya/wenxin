# 文心 (Wenxin) — Hugo 博客主题

![Hugo](https://img.shields.io/badge/Hugo-0.110%2B-blue?logo=hugo)
![License](https://img.shields.io/badge/License-MIT-green)

> 文字即界面，留白即设计，克制即力量。

文心是一个以「文心设计语言」为核心的极简 Hugo 博客主题，追求极致的阅读体验。专为中文内容设计，同时完整支持英文。

---

## 特性

- **极简设计** — 界面服务于文字，而非抢夺注意力
- **自动暗色模式** — 跟随系统偏好，无需切换按钮
- **完整响应式** — 桌面 / 平板 / 手机三端适配
- **无障碍支持** — WCAG 2.1 AA，键盘友好，屏幕阅读器兼容
- **中文优先** — 天干地支日期、完整 i18n（中英双语）
- **自托管字体** — Lora、EB Garamond、JetBrains Mono（无外部 CDN 依赖）
- **零框架** — 纯 HTML / CSS / ES6+ JavaScript
- **平滑滚动** — Lenis（桌面端）
- **PJAX 导航** — 页面切换无刷新
- **SEO 完整** — Open Graph、Twitter Card、JSON-LD、sitemap、robots.txt
- **多格式 RSS** — RSS 2.0 + Atom + Feed

---

## 快速开始

### 方式一：Git Submodule（推荐）

```bash
git submodule add https://github.com/zopiya/wenxin-hugo-theme.git themes/wenxin
```

### 方式二：Hugo Modules

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/zopiya/wenxin-hugo-theme"
```

### 方式三：直接下载

从 [Releases](https://github.com/zopiya/wenxin-hugo-theme/releases) 下载并解压到 `themes/wenxin/`。

---

## 配置

将 `exampleSite/hugo.toml` 复制到项目根目录并按需修改：

```toml
baseURL = "https://example.com/"
languageCode = "zh-CN"
title = "你的博客名"
theme = "wenxin"
defaultContentLanguage = "zh"
hasCJKLanguage = true

[params]
  author      = "你的名字"
  bio         = "你的个人简介"
  description = "站点描述（用于 SEO）"
  readTime    = true

  # OG 图片（社交分享，推荐 1200×630px）
  # og_image = "/images/og.jpg"

  # Twitter 用户名（不含 @）
  # twitter_username = "yourname"
```

### 社交链接

社交链接完全通过 `hugo.toml` 配置，支持任意平台和任意 [Phosphor 图标](https://phosphoricons.com)：

```toml
[[params.social]]
  icon  = "ph-github-logo"
  url   = "https://github.com/yourname"
  label = "GitHub"
  rel   = "noopener noreferrer"

[[params.social]]
  icon  = "ph-x-logo"
  url   = "https://x.com/yourname"
  label = "Twitter / X"
  rel   = "noopener noreferrer"

[[params.social]]
  icon  = "ph-mastodon-logo"
  url   = "https://mastodon.social/@yourname"
  label = "Mastodon"
  rel   = "noopener noreferrer me"

[[params.social]]
  icon  = "ph-envelope-simple"
  url   = "mailto:your@email.com"
  label = "发送邮件"
```

RSS 订阅按钮固定显示，无需手动配置。

### 导航菜单

```toml
[menu]
  [[menu.main]]
    identifier = "home"
    name = "文辑"
    url = "/"
    weight = 1
  [[menu.main]]
    identifier = "archive"
    name = "历往"
    url = "/archive/"
    weight = 2
  [[menu.main]]
    identifier = "about"
    name = "知我"
    url = "/about/"
    weight = 3
```

### 统计分析

```toml
[params.analytics.umami]
  websiteId = "your-umami-website-id"
  src       = "https://your-umami-instance/script.js"

# 或 Google Analytics
[params.analytics.google]
  measurementId = "G-XXXXXXXXXX"
```

---

## 内容结构

```
content/
├── about/
│   └── index.md       # 关于页面（layout: about）
├── archive/
│   └── _index.md      # 归档页面
└── post/
    ├── first-post.md
    └── ...
```

### Front Matter

```yaml
---
title: "文章标题"
date: 2025-06-18
description: "文章描述（用于 SEO 和社交分享）"
tags: ["标签1", "标签2"]
image: "/images/cover.jpg"  # 可选，用于 og:image
---
```

---

## Shortcodes

### Callout 提示块

```markdown
{{</* callout type="note" */>}}
这是一个注意提示。支持 **Markdown**。
{{</* /callout */>}}
```

类型：`note`（默认）/ `tip` / `warning`

### Pull Quote 引言

```markdown
{{</* pullquote author="作者" */>}}
核心观点放在这里。
{{</* /pullquote */>}}
```

---

## 页面布局

| 页面类型 | 模板文件 | 内容宽度 | 背景色 |
|----------|----------|----------|--------|
| 首页（列表） | `index.html` | `--width-content` (620–760px) | `--color-bg-warm` |
| 文章（阅读） | `single.html` | `--width-article` (520–640px) | `--color-bg-base` |
| 关于（展示） | `about/single.html` | `--width-showcase` (700–920px) | `--color-bg-warm` |
| 归档（列表） | `list.html` | `--width-content` | `--color-bg-warm` |

---

## 自定义

### 修改强调色

```css
:root {
  --color-accent: #8B3525;        /* 砖红（默认）*/
  --color-accent-hover: #A84030;
  --color-accent-subtle: #F5E8E5;
}
```

### 修改字体

```css
:root {
  --font-display: "Lora", serif;
  --font-body:    "EB Garamond", serif;
  --font-ui:      system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", monospace;
}
```

---

## 技术栈

| 层级 | 技术 |
|------|------|
| SSG | Hugo 0.110+ |
| 样式 | CSS3 (Custom Properties, Grid, Flexbox) |
| 脚本 | ES6+ (无框架) |
| 图标 | [Phosphor Icons](https://phosphoricons.com) (线条型) |
| 字体 | Lora, EB Garamond, JetBrains Mono (自托管 WOFF2) |
| 滚动 | [Lenis](https://lenis.darkroom.engineering) |

---

## 许可

MIT © [Zopiya](https://wenxin.blog)
