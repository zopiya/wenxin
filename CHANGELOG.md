# Changelog

All notable changes to the Wenxin Hugo Theme will be documented in this file.

## [Unreleased]

### Changed
- JSON-LD 站点、作者与发布者身份改由站点配置提供，不再包含任何站点专属域名或作者信息。
- 新增可配置的 Web App Manifest 输出，PWA 名称与颜色从站点配置读取。
- 默认分享图改为中性的 Wenxin 主题图。
- RSS 输出收敛为单一格式，不再需要自定义 `outputFormats` 才能让 `<head>` 的 RSS 发现链接生效。

### Fixed
- 修复 `<head>` 中 RSS 自动发现链接在未自定义 `outputFormats` 时指向不存在文件的问题。
- RSS 订阅链接不再依赖 `params.social` 是否配置才显示。
- PJAX 在移动端（≤768px）现在会按文档所述正确禁用，改为整页加载。
- 农历日期显示随站点语言（`site.Language.Lang`）回退为标准公历日期，不再对所有语言强制使用天干地支格式。
- 关于页不再包含两个 `<h1>`。
- 文章缺少 `description` 时，meta description / Open Graph / Twitter Card / JSON-LD 现在会回退到 Hugo 自动摘要，而不是统一使用站点级描述。
- 侧边栏社交链接的 `target="_blank"` 现在会自动附加 `rel="noopener noreferrer"`。

## [1.0.0] - 2026-04-22

### Added
- Initial release of the Wenxin Hugo theme
- Minimalist Chinese-first design with 文心设计语言
- Automatic dark mode (follows system preference)
- Full responsive layout (desktop / tablet / mobile)
- WCAG 2.1 AA accessibility support
- Self-hosted fonts: Lora, EB Garamond, JetBrains Mono
- Phosphor line icons
- Lenis smooth scrolling (desktop)
- PJAX partial navigation
- Chinese lunar calendar date formatting with 天干地支 (Heavenly Stems & Earthly Branches)
- Print-optimized styles
- Complete i18n support (Chinese & English)
- SEO: Open Graph, Twitter Card, JSON-LD structured data, sitemap, robots.txt
- Multiple RSS feed formats (RSS 2.0, Atom)
- Configurable social links via `[[params.social]]` (any platform, any icon)
- Heading anchor links (`render-heading` hook)
- Responsive image rendering with lazy loading (`render-image` hook)
- Callout shortcode (note / tip / warning)
- Pull-quote shortcode
- Tag taxonomy support with tag cloud
- Pagination with smart ellipsis
- 404 error page
- About page (showcase layout)
- Archive page with tag filtering
