# Changelog

All notable changes to the Wenxin Hugo Theme will be documented in this file.

## [Unreleased]

### Changed
- JSON-LD 站点、作者与发布者身份改由站点配置提供，不再包含任何站点专属域名或作者信息。
- 新增可配置的 Web App Manifest 输出，PWA 名称与颜色从站点配置读取。
- 默认分享图改为中性的 Wenxin 主题图。

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
