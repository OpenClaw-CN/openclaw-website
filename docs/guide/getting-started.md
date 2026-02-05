---
title: 快速开始
description: 3分钟在本地启动你的第一个 AI Agent
---

# ⚡ 快速开始

欢迎来到 OpenClaw 中国社区。本指南将帮助你在 3 分钟内，在本地电脑上启动并运行一个纯净、安全的 OpenClaw Agent。

## 🛠️ 环境准备

OpenClaw CN 引入了最新的底层安全机制与构建工具，请确保环境满足以下要求：

* **Node.js**：**必须 >= v22.0.0** ([下载 Node.js v22](https://nodejs.org/zh-cn))
* **包管理器**：强制推荐使用 **pnpm** (npm 在处理依赖树时可能会卡死)
* **Git**：用于下载代码 ([下载 Git](https://git-scm.com/))

### 安装 pnpm (如果你还没有)
```bash
npm install -g pnpm
```

## 🚀 安装步骤

### 1. 下载代码
为了确保国内访问速度，请从 Gitee 镜像仓库下载：

```bash
git clone https://gitee.com/OpenClaw-CN/openclaw-cn.git
cd openclaw-cn
```

### 2. 配置国内加速 (关键！)
在安装依赖前，务必设置 pnpm 镜像源，否则下载速度会很慢：

```bash
pnpm config set registry https://registry.npmmirror.com/
```

### 3. 安装与构建
OpenClaw 是一个现代化的全栈应用，首次运行需要编译前端 UI 和后端核心：

```bash
# 安装依赖 (飞快 🚀)
pnpm install

# 构建前端界面
pnpm ui:build

# 构建核心服务
pnpm build
```

### 4. 启动初始化向导
我们提供了交互式的初始化工具，帮你一键配置 DeepSeek：

```bash
pnpm openclaw onboard --install-daemon
```

::: tip 💡 提示
在向导中，**Select Provider** 步骤请直接选择 `DeepSeek (Recommended for CN)`，系统会自动完成所有配置。
:::

## 🎯 你的第一个任务

启动成功后，你会看到一个交互式的命令行。试着给 Agent 下达第一个指令：

> **"请帮我在桌面上创建一个名为 hello_openclaw.txt 的文件，并在里面写入：大道至简，实战落地。"**

Agent 将会自动规划任务、调用文件系统 API，并完成操作。