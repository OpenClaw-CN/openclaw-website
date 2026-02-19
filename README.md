# 📚 OpenClaw CN 官方文档站

这里是 [OpenClaw 中国社区](https://openclaw.org.cn) 的官方文档源代码仓库。
本项目基于 **VitePress** 构建，旨在为国内开发者提供清晰、可实战的 Local Agent 使用指南。

## 🛠️ 本地开发 (Local Development)

如果你想在本地预览文档或参与贡献，请按照以下步骤操作：

### 1. 克隆仓库
```bash
git clone https://gitee.com/OpenClaw-CN/openclaw-website.git
cd openclaw-website/docs
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动预览服务器
```bash
npm run docs:dev
```
启动后，浏览器访问 `http://localhost:5173` 即可实时预览修改效果。

## 📂 目录结构

* `docs/`: 所有的 Markdown 文档源文件
* `docs/.vitepress/`: 网站配置 (导航、侧边栏、主题配置等)
* `docs/.vitepress/theme-config.json`: **全站节日主题配置文件**，改此处后重新构建/部署即生效
* `docs/guide/`: 实战指南相关文章
* `docs/plugins/`: 插件市场相关文章

## 🎨 全站节日主题（配置文件）

站点支持节日主题：**默认 / 春节 / 端午 / 中秋 / 国庆**。全站主题保存在配置文件中，无需数据库或 API。

1. **修改全站主题**：编辑 `docs/.vitepress/theme-config.json`，将 `festivalTheme` 改为以下之一：`default`、`spring-festival`、`dragon-boat`、`mid-autumn`、`national-day`。保存后**重新构建或重新部署**，所有访客即可看到新主题。
2. **管理员预览**：访问 `/admin` 可预览各主题效果（仅当前会话）；「恢复为配置文件中的主题」可清除预览。永久生效仍以修改 `theme-config.json` 并部署为准。

## 🤝 如何贡献

我们非常欢迎社区伙伴参与文档的改进！
你可以直接提交 PR 修复错别字、补充实战案例，或者翻译原版文档。

---
<div align="center">
  <sub>OpenClaw-CN Community © 2026</sub>
</div>