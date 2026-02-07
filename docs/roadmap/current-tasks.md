---
title: 当前悬赏任务
description: 参与 OpenClaw CN 共建，赢取核心贡献者身份
---

# 🔥 当前悬赏任务 (Bounties)

OpenClaw CN 的建设离不开每一位开发者的力量。
为了让社区生态更完善，我们现阶段急需补充以下两篇**实战级文档**。

**注意：所有教程必须基于 OpenClaw 中国社区版 (CN Version) 撰写。**
* **仓库地址**：[https://gitee.com/OpenClaw-CN/openclaw-cn](https://gitee.com/OpenClaw-CN/openclaw-cn)
* **分支建议**：建议基于最新 `main` 分支或稳定版 Tag 进行测试。

## 📋 任务列表

### 🍎 任务一：macOS 保姆级安装与避坑指南

**需求背景**：
macOS 是开发者的主力平台，但 OpenClaw CN 需要调用系统级权限（屏幕录制、辅助功能），这在 Mac 上经常会遇到安全拦截（TCC）。我们需要一篇能解决权限报错的**终极指南**。

**文档要求：**
1.  **代码源**：明确使用 `git clone https://gitee.com/OpenClaw-CN/openclaw-cn.git` 下载代码。
2.  **环境准备**：如何用 `brew` 正确安装 Node.js v22 和 Git。
3.  **权限攻坚**：手把手教用户在“安全性与隐私”中授予 Terminal/OpenClaw 屏幕录制和辅助功能权限。
4.  **配置指引**：macOS 下 DeepSeek 配置文件 (`~/.openclaw/openclaw.json`) 的修改与验证。
5.  **疑难解答**：常见的 `pnpm` 权限报错或 Xcode Command Line Tools 缺失处理。

---

### 🐧 任务二：Linux 服务器 (Headless) 部署指南

**需求背景**：
很多开发者希望将 OpenClaw CN 部署在阿里云/腾讯云上，作为 24 小时在线的超级助理。Linux 无桌面环境 (Headless) 的部署与本地完全不同，涉及远程访问配置。

**文档要求：**
1.  **代码源**：明确使用 `git clone https://gitee.com/OpenClaw-CN/openclaw-cn.git` 下载代码。
2.  **基础环境**：Ubuntu/CentOS 下安装 Node.js v22。
3.  **无头模式**：如何配置 OpenClaw 让其在无显示器的服务器上后台运行。
4.  **依赖处理**：Puppeteer 在 Linux 下运行所需的系统依赖库 (`apt-get install ...`)。
5.  **远程连接**：教用户如何通过 SSH 隧道 (Tunnel) 或 Tailscale 访问部署在云端的 Dashboard。

## 📮 投稿方式

为了降低参与门槛，我们的投稿方式。一经录用，你的名字将永久记录在 **[贡献者墙](/plugins/contribution)** 上，并受邀加入**核心贡献组**。

* **方式 **：添加社区负责人微信投稿。
    * **微信号**：`yqnlfdc2023` (请备注：OpenClaw CN投稿)
    * **格式**：接受 Markdown (`.md`) 或 Word (`.docx`) 文档。

**键盘在手，未来我有。期待你的硬核输出！** 🦞