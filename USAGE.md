# 使用说明

文心主题的完整配置参考。快速开始见 [README.md](README.md)。

## 完整配置示例

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

  # RSS 的 managingEditor / author 字段，可选
  # email = "you@example.com"

  # OG 图片（用于社交分享，推荐 1200×630px），可选
  # og_image = "/images/og.jpg"

  # Twitter 用户名（不含 @，用于 twitter:creator），可选
  # twitter_username = "yourname"

  [params.schema]
    # JSON-LD 的作者 / 发布者信息；不填则回退到 author 与 baseURL。
    siteType   = "Blog"
    siteID     = "https://example.com/#blog"
    authorType = "Person"
    authorURL  = "https://example.com/about/"
    authorID   = "https://example.com/about/#person"

  [params.pwa]
    shortName       = "你的博客名"
    themeColor      = "#8B3525"
    backgroundColor = "#F2F0EB"
    display         = "standalone"
    icon192         = "/web-app-manifest-192x192.png"
    icon512         = "/web-app-manifest-512x512.png"

  [params.brand]
    # 不设置时使用主题提供的中性图标。
    favicon96      = "/favicon-96x96.png"
    faviconSVG     = "/favicon.svg"
    faviconICO     = "/favicon.ico"
    appleTouchIcon = "/apple-touch-icon.png"
```

## 社交链接

通过 `hugo.toml` 配置，支持任意平台和 [Phosphor 图标](https://phosphoricons.com)：

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
  icon  = "ph-envelope-simple"
  url   = "mailto:your@email.com"
  label = "发送邮件"
```

RSS 订阅按钮固定显示，无需手动配置；受限于当前布局，仅在桌面宽屏（>1024px）下可见。

## 导航菜单

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

## 统计分析

```toml
[params.analytics.umami]
  websiteId = "your-umami-website-id"
  src       = "https://your-umami-instance/script.js"

# 或 Google Analytics
[params.analytics.google]
  measurementId = "G-XXXXXXXXXX"
```

两者默认都不启用，不配置就不会向任何第三方发起请求。

## JSON-LD 与 PWA

主题不会写入站点所属者或域名。`params.schema` 用于控制 JSON-LD 的站点、作者与发布者身份；未配置时，会使用 `params.author` 与 `baseURL` 作为通用回退。

若要生成以站点标题命名的动态 PWA manifest，请在 `hugo.toml` 中启用 Hugo 内建输出格式：

```toml
[outputs]
  home = ["HTML", "RSS", "WebAppManifest"]
```

`params.pwa` 可选配置短名称、颜色、显示模式和图标；`params.brand` 可配置页面 favicon 与 Apple 图标。未启用动态 manifest 时，主题仍提供中性名称为 Wenxin 的静态 manifest（`static/site.webmanifest`）作为回退；启用动态 manifest 后该静态文件不再被引用，可按需删除。

## 代码高亮

代码块配色由主题自身托管（`pages/post.css` 里的 `.chroma` 规则），跟随亮 / 暗色模式；这要求 Goldmark 用 class 而非内联样式输出高亮结果：

```toml
[markup.highlight]
  noClasses = false
```

漏配的话 Chroma 会退回内联样式，主题的配色规则将不生效。

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
title: "文章标题"
date: 2025-06-18
description: "文章描述（用于 SEO 和社交分享）"
tags: ["标签1", "标签2"]
image: "/images/cover.jpg" # 可选，用于 og:image
```

## 短代码

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

## 自定义

### CSS

创建 `assets/css/custom.css`（主题已预留加载 hook），文件会自动并入 base CSS bundle 末尾，可覆盖所有默认样式：

```css
/* assets/css/custom.css */
:root {
  /* 强调色 */
  --color-accent: #8b3525;
  --color-accent-hover: #a84030;
  --color-accent-subtle: #f5e8e5;

  /* 字体 */
  --font-display: "Lora", serif;
  --font-body: "EB Garamond", serif;
  --font-ui: system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  /* 背景 */
  --color-bg-base: #fafaf9;
  --color-bg-warm: #f5f3ef;

  /* 布局宽度 */
  --width-article: 640px;
  --width-content: 760px;
  --width-showcase: 920px;
}
```

暗色模式自动生效，无需额外处理。完整变量列表见 `assets/css/variables.css`。

### JavaScript

创建 `assets/js/custom.js`（主题已预留加载 hook），文件在所有主题脚本之后加载：

```js
// assets/js/custom.js
// 你的自定义脚本

// ⚠ PJAX 注意事项：
// 主题使用 PJAX 实现无刷新导航，DOM 状态在页面切换后不会保留。
// 事件监听器和库初始化需要在 PJAX 回调中重新执行：
document.addEventListener("pjax:afterPageLoad", function () {
  // 页面切换后重新初始化
});
```

PJAX 在移动端（≤768px）自动禁用，使用完整页面加载。

## 本地开发主题

在仓库根目录直接给 `exampleSite` 建一个指向当前工作树的软链接，就可以本地跑 `hugo server` 预览改动：

```bash
cd exampleSite
mkdir -p themes
ln -s .. themes/wenxin
hugo server
```

`exampleSite/themes/` 已经在 `.gitignore` 里，这个软链接不会被提交——CI（`.github/workflows/build.yml`）会在构建时自己创建一份，不依赖仓库里的任何链接。
