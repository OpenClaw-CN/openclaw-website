---
title: 快速开始
description: 3分钟在本地启动你的第一个 AI Agent
---

# ⚡ 快速开始

欢迎来到 OpenClaw 中国社区。本指南将帮助你在 3 分钟内，在本地电脑上启动并运行一个纯净、安全的 OpenClaw Agent。

## 🛠️ 环境准备

在开始之前，请确保你的电脑满足以下条件：

* **操作系统**：Windows / macOS / Linux
* **Node.js**：**版本需 >= v22.0.0** ([下载 Node.js v22](https://nodejs.org/zh-cn))
* **Git**：用于下载代码 ([下载 Git](https://git-scm.com/))

::: tip 💡 为什么要用 Node.js v22?
OpenClaw 引入了最新的底层安全机制，必须配合 Node.js 22 或更高版本才能正常运行，旧版本会直接报错。
:::

## 🚀 安装步骤

### 1. 下载社区纯净版代码

为了确保国内访问速度及代码安全性，请直接从我们的 Gitee 镜像仓库下载：

```bash
# 克隆仓库
git clone https://gitee.com/OpenClaw-CN/openclaw-cn.git

# 进入目录
cd openclaw-cn
```

### 2. 安装依赖 (使用国内源)

我们推荐使用淘宝镜像源，以防止安装卡顿：

```bash
npm install --registry=https://registry.npmmirror.com
```

### 3. 启动 Agent

安装完成后，直接运行以下命令启动：

```bash
npm run start
```

::: warning ⚠️ 首次启动注意
首次启动时，程序会自动创建一个 `~/.openclaw` 配置目录。如果提示找不到 API Key，请参考下一章 [配置 DeepSeek 大脑](./config-deepseek.md)。
:::

## 🎯 你的第一个任务

启动成功后，你会看到一个交互式的命令行。试着给 Agent 下达第一个指令：

> **"请帮我在桌面上创建一个名为 hello_openclaw.txt 的文件，并在里面写入：大道至简，实战落地。"**

Agent 将会自动规划任务、调用文件系统 API，并完成操作。去你的桌面看看，奇迹发生了吗？✨