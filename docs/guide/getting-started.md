---
title: OpenClaw 安装教程
description: 在 macOS、Linux 或 Windows 上安装 OpenClaw，支持一键脚本和源码两种方式，快速启动本地 AI Agent
---

# OpenClaw 安装教程

本文介绍如何在 macOS、Linux 和 Windows 上安装 OpenClaw 并启动你的第一个本地 AI Agent。提供一键安装脚本和源码构建两种方式，适合不同使用场景。

## 系统要求

- **Node.js >= 22**
- macOS、Linux 或 Windows（推荐通过 WSL2）

**macOS**：如果你计划构建应用，需要安装 Xcode 或 Command Line Tools。仅使用 CLI + Gateway 网关的话，Node.js 即可。

**Windows**：推荐使用 **WSL2**（Ubuntu）。WSL2 环境更接近 Linux，兼容性更好；原生 Windows 可以运行但工具链兼容性较差，遇到问题可参考 [Windows 原生源码安装实战](/practical/windows-native)。

## 一键安装（推荐）

使用官方安装脚本，自动完成 CLI 安装和初始化引导。

### macOS / Linux / WSL2

* **中国社区版：**
```bash
curl -fsSL https://open-claw.org.cn/install-cn.sh | bash
```
* **OpenClaw原版：**
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

### Windows（PowerShell）

* **中国社区版：**
安装脚本不会在Windows原生环境自动下载Git，请手工安装。**Git**：用于下载代码 ([下载 Git](https://git-scm.com/))
```powershell
# 以管理员身份运行PowerShell，执行以下命令
iwr -useb https://open-claw.org.cn/install-cn.ps1 | iex
```
* **OpenClaw原版：**
```powershell
# 以管理员身份运行PowerShell，执行以下命令
iwr -useb https://openclaw.ai/install.ps1 | iex
```

## 从源码安装 OpenClaw（开发者 / 贡献者）

如果你希望参与开发或需要定制构建，可以从源码安装。OpenClaw CN 引入了最新的底层安全机制与构建工具，请确保环境满足以下要求：

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

* **中国社区版：**
```bash
git clone https://gitee.com/OpenClaw-CN/openclaw-cn.git
cd openclaw-cn
```

* **OpenClaw原版：**
```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
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
运行交互式初始化工具，完成 AI 模型配置（支持 DeepSeek、火山引擎等国产大模型）：

```bash
pnpm openclaw onboard --install-daemon
```

::: tip 提示
在向导的 **Select Provider** 步骤中，可以直接选择 `DeepSeek`，系统会自动完成配置。如需接入火山引擎方舟等其他平台，请参考 [火山引擎大模型接入指南](/practical/volcengine-llm-2)。
:::

### 5. 启动 OpenClaw 服务
初始化完成后，可以通过以下命令启动 Gateway 网关服务：

```bash
# 启动网关 (Gateway)
pnpm openclaw gateway
```

如果你关闭了管理页面，可以通过以下命令再次打开：

```bash
# 打开仪表板 (Dashboard)
pnpm openclaw dashboard
```


## 安装后检查

安装完成后，建议执行以下命令确认 OpenClaw 运行状态：

- 环境诊断：`openclaw doctor`
- Gateway 网关状态：`openclaw status` 和 `openclaw health`
- 打开管理面板：`openclaw dashboard`

## 试一试：你的第一个 OpenClaw 任务

启动成功后，进入管理面板或交互式命令行，给 Agent 下达第一个指令：

> **"请帮我在桌面上创建一个名为 hello_openclaw.txt 的文件，并在里面写入：大道至简，实战落地。"**

OpenClaw Agent 会自动规划任务、调用文件系统工具并完成操作。

## 接下来

- 了解更多大模型接入方式：[火山引擎方舟大模型接入指南](/practical/volcengine-llm-2)
- Windows 原生环境安装：[Windows 原生源码安装实战](/practical/windows-native)
- Linux 服务器部署：[Linux 源码安装实战](/practical/linux_practical)
- 需要卸载或重装？参考 [OpenClaw 卸载指南](/guide/uninstall)