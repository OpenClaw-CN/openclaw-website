---
title: 火山引擎接入 OpenClaw — Volcano Engine 官方模式（推荐）
description: 使用 OpenClaw 内置的 Volcano Engine 供应商一键接入火山方舟 DeepSeek-V3 大模型，自动识别模型列表，配置更简单。新用户 19 元即享 2000 万 Tokens。
head:
  - - meta
    - name: keywords
      content: 火山引擎,Volcano Engine,方舟大模型,DeepSeek-V3,OpenClaw,官方模式,一键配置,AI Agent,大模型接入,19元特惠
---

# 火山引擎接入 OpenClaw — Volcano Engine 官方模式

<span style="font-size: 0.875rem; color: var(--vp-c-text-2);">作者：OpenClaw CN 社区</span>

OpenClaw 安装向导内置了 **Volcano Engine** 供应商选项，选择后只需输入 API Key，系统会自动拉取你账户下可用的模型列表，无需手动填写 Base URL 和 Model ID。这是接入火山方舟大模型 **最简单的方式**。

::: tip 两种接入模式对比
| 对比项 | 官方模式（本文） | [自定义模式](/practical/volcengine-llm) |
|--------|-----------------|---------------------------------------|
| 供应商选择 | Volcano Engine | Custom Provider |
| 需要填写 Base URL | 不需要 | 需要手动填写 |
| 模型选择 | 自动列出可用模型 | 手动输入 Model ID |
| 配置步骤 | 更少、更简单 | 更多、更灵活 |
| 推荐程度 | **推荐大多数用户** | 适合需要自定义端点的场景 |

如果你需要更灵活地自定义 Base URL 和 Model ID，请参考 [自定义模式教程](/practical/volcengine-llm)。
:::

## 前置准备

| 项目 | 说明 |
|------|------|
| 火山云账号 | 前往 [火山引擎官网](https://www.volcengine.com/) 注册 |
| OpenClaw 安装环境 | Linux / macOS / Windows 均可，参考 [实战指南首页](/practical/) 选择适合你的安装方式 |

## 第 1 步：注册火山云账号

前往 [火山引擎官网](https://www.volcengine.com/) 注册一个账号并完成实名认证。如果你已有账号，直接登录即可。

## 第 2 步：购买方舟大模型特惠套餐

1. 进入 [方舟大模型特惠活动页](https://www.volcengine.com/activity/ark)。
2. 在 **秒杀专区** 选择 **DeepSeek-V3** 或其它你需要的模型，完成支付。

::: warning 价格说明
- **新客专享**：19 元 / 月 / 2000 万 Tokens
- **老客价格**：50 元 / 月 / 2000 万 Tokens

请先确认你的账号是否为新客，活动详情以页面实际显示为准。
:::

## 第 3 步：创建方舟大模型专用 API Key

购买成功后，需要创建一个方舟平台专用的 API Key：

1. 点击页面右上角 **用户头像** → **权限与安全** → **API 访问密钥**。
2. 在密钥页面点击 **「方舟大模型专用 API Key」**，进入专属 API Key 创建页面。

![进入 API 访问密钥页面，选择方舟大模型专用 API Key](/practical/volcengine-llm/apikey-create.png)

3. 点击 **「+ 创建 API Key」** 按钮，创建并 **妥善保存** 你的 API Key。

![在方舟 API Key 管理页面点击创建](/practical/volcengine-llm/apikey-create1.png)

::: tip 官方模式优势
使用 Volcano Engine 官方模式，你只需要准备 **API Key** 这一项信息即可。不需要提前查找 Base URL 和 Model ID，向导会自动处理。
:::

## 第 4 步：安装 OpenClaw 并接入火山方舟

执行一键安装命令：

::: code-group

```bash [Linux / macOS]
curl -fsSL https://openclaw.ai/install.sh | bash
```

```powershell [Windows]
iwr -useb https://openclaw.ai/install.ps1 | iex
```

:::

安装向导启动后，按以下步骤配置。

### 4.1 确认使用协议

提示：*I understand this is personal-by-default and shared/multi-user use requires lock-down. Continue?*

选择 **Yes**。

![确认使用协议，选择 Yes](/practical/volcengine-llm/s-1.png)

### 4.2 选择安装模式

Onboarding mode → 选择 **QuickStart**。

![选择 QuickStart 快速开始](/practical/volcengine-llm/s-2.png)

### 4.3 选择模型供应商

Model/auth provider → 选择 **Volcano Engine (API key)**。

![选择 Volcano Engine 官方供应商](/practical/volcengine-llm/2-3.png)

### 4.4 输入 API Key

提示：*Enter Volcano Engine API key*

粘贴第 3 步创建的方舟专用 API Key。

![输入火山引擎 API Key](/practical/volcengine-llm/2-4.png)

### 4.5 选择模型

OpenClaw 会自动拉取你账户下可用的模型列表。从列表中选择你购买的模型，例如 **volcengine/deepseek-v3-2-251201 (DeepSeek V3.2 · ctx 125k)**。

列表中还包括豆包、GLM、Kimi 等其它火山方舟支持的模型，按需选择即可。

![从自动列出的模型列表中选择 DeepSeek-V3](/practical/volcengine-llm/2-5.png)

### 4.6 确认配置完成

选择模型后，系统会确认默认模型设置。看到以下输出说明配置成功：

```
volcengine/deepseek-v3-2-251201
```

![确认默认模型已设置为 DeepSeek-V3](/practical/volcengine-llm/2-6.png)

剩余的安装向导（通道、Skill 等）按照 OpenClaw 默认配置完成即可。

## 第 5 步：验证配置结果

安装完成后，进入 OpenClaw Gateway 页面 → **代理** → **Overview**，可以看到 **Primary Model** 已设置为：

```
volcengine/deepseek-v3-2-251201
```

这说明火山方舟模型已通过 Volcano Engine 官方模式成功接入 OpenClaw。

![Gateway 代理页面确认模型 volcengine/deepseek-v3-2-251201 配置成功](/practical/volcengine-llm/2-7-success.png)

## 开始与 AI 对话

打开 OpenClaw 的 **聊天** 页面，即可直接和 DeepSeek-V3 对话。页面右上角会显示 `deepseek-v3-2-251201 · volcengine`，表明请求正在通过火山方舟平台处理。

![通过 OpenClaw 与火山方舟 DeepSeek-V3 进行对话](/practical/volcengine-llm/2-8.png)

## 常见问题

### Volcano Engine 模式和 Custom Provider 模式有什么区别？

**Volcano Engine 模式**（本文）直接选择内置供应商，只需输入 API Key 即可自动获取模型列表，配置最简单。**Custom Provider 模式**需要手动填写 Base URL、Model ID 等参数，适合需要精确控制端点地址的高级用户。两种模式最终效果一致，选择适合自己的即可。

### 方舟专用 API Key 和火山引擎通用 AccessKey 有什么区别？

方舟大模型专用 API Key 是火山引擎专为大模型推理服务提供的密钥，与火山引擎通用的 AccessKey / SecretKey（用于调用 ECS、存储等云服务）不同。接入方舟模型时 **必须** 使用方舟专用 API Key。

### 模型列表中没有我购买的模型怎么办？

请确认 API Key 是否为 **方舟大模型专用 API Key**（而非通用 AccessKey）。如果确认无误但仍不显示，可能是套餐尚未生效，稍等片刻后重试。你也可以改用 [Custom Provider 自定义模式](/practical/volcengine-llm) 手动填写 Model ID。

### Tokens 用完了怎么办？

可以在 [火山方舟控制台](https://www.volcengine.com/activity/ark) 续购套餐，或切换到按量计费模式。更换模型时在 OpenClaw 的代理设置中修改即可。

### 可以同时配置多个模型吗？

可以。安装完成后，进入 OpenClaw Gateway 的代理设置页面，在 **Fallbacks** 中添加其它模型，即可实现多模型切换和容灾。
