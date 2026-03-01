---
title: 快速开始
description: 3分钟在本地启动你的第一个 AI Agent
---

# ⚡ 快速开始

欢迎来到 OpenClaw 中国社区。本指南将帮助你在 3 分钟内，在本地电脑上启动并运行一个纯净、安全的 OpenClaw Agent。

# 安装

## 系统要求

- **Node >=22**
- macOS、Linux 或通过 WSL2 的 Windows

macOS：如果你计划构建应用，安装 Xcode / CLT。仅用于 CLI + Gateway 网关的话，Node 就足够了。
Windows：使用 **WSL2**（推荐 Ubuntu）。强烈推荐 WSL2；**原生 Windows 未经测试，问题较多，工具兼容性更差。**

## 快速安装（推荐）

使用安装器，它会设置 CLI 并运行新手引导。

### macOS、Linux 和 WSL2 三种环境：

```bash
curl -fsSL https://open-claw.org.cn/install-cn.sh | bash
```

### Windows（PowerShell）：
安装脚本不会在Windows原生环境自动下载Git，请手工安装。
* **Git**：用于下载代码 ([下载 Git](https://git-scm.com/))

```powershell
# 以管理员身份运行PowerShell，执行以下命令
iwr -useb https://open-claw.org.cn/install-cn.ps1 | iex
```


## 从源代码（贡献者/开发）

OpenClaw CN 引入了最新的底层安全机制与构建工具，请确保环境满足以下要求：

* **Node.js**：**必须 >= v22.0.0** ([下载 Node.js v22](https://nodejs.org/zh-cn))
* **包管理器**：强制推荐使用 **pnpm** (npm 在处理依赖树时可能会卡死)
* **Git**：用于下载代码 ([下载 Git](https://git-scm.com/))

### 0. 安装 pnpm (如果你还没有)
```bash
npm install -g pnpm
```

### 1. 下载代码与版本选择
为了确保国内访问速度，请从 Gitee 镜像仓库下载。
为了获得最稳定的体验，推荐切换到最新的稳定版分支：

```bash
# 1. 克隆仓库
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

# 构建前端界面，首次运行时自动安装 UI 依赖
pnpm ui:build

# 构建核心服务
pnpm build
```

::: tip 💡 提示
由于不是全局安装，所以请通过 `pnpm openclaw ...` 运行仓库命令。
:::

### 4. 启动初始化向导
我们提供了交互式的初始化工具，帮你一键配置 DeepSeek：

```bash
pnpm openclaw onboard --install-daemon
```

::: tip 💡 提示
在向导中，**Select Provider** 步骤请直接选择 `DeepSeek`，系统会自动完成所有配置。
:::

### 5. 启动服务 (初始化完成后)
初始化完成后，你可以通过以下命令再次启动网关服务（前提是网关已经关闭）：

```bash
# 启动网关 (Gateway)
pnpm openclaw gateway
```

如果你关闭了管理页面，可以通过以下命令再次打开：

```bash
# 打开仪表板 (Dashboard)
pnpm openclaw dashboard
```


## 安装后

- 快速检查：`openclaw doctor`
- 检查 Gateway 网关健康状态：`openclaw status` + `openclaw health`
- 打开仪表板：`openclaw dashboard`


## 🎯 你的第一个任务

启动成功后，进入管理面板或交互式命令行，试着给 Agent 下达第一个指令：

> **"请帮我在桌面上创建一个名为 hello_openclaw.txt 的文件，并在里面写入：大道至简，实战落地。"**

Agent 将会自动规划任务、调用文件系统 API，并完成操作。