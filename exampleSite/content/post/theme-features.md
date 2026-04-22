---
title: "主题功能展示"
date: 2025-02-20
description: "展示文心主题的各项功能：Callout、标题锚点、图片等。"
tags: ["功能", "示例"]
---

本文展示文心主题的各项增强功能。

## Callout 提示块

使用 `{{</* callout */>}}` shortcode 添加提示块：

{{< callout type="note" >}}
这是一个**注意**提示块，适合补充说明。
{{< /callout >}}

{{< callout type="tip" >}}
这是一个**技巧**提示块，可以分享最佳实践。
{{< /callout >}}

{{< callout type="warning" >}}
这是一个**警告**提示块，用于重要提醒。
{{< /callout >}}

## 标题锚点

将鼠标悬停在上方的 h2/h3/h4 标题上，可以看到 `#` 锚点链接出现，点击即可复制该节的直达链接。

## 图片

使用标准 Markdown 图片语法，主题会自动添加 `loading="lazy"` 懒加载：

```markdown
![图片描述](image.jpg)
```

当图片有标题时，会自动渲染为 `<figure>` + `<figcaption>`：

```markdown
![图片描述](image.jpg "这是图片标题")
```

## Pull Quote

使用 `{{</* pullquote */>}}` shortcode 添加引言：

{{< pullquote author="文心" >}}
文字即界面，留白即设计，克制即力量。
{{< /pullquote >}}
