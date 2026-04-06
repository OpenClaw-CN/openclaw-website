---
title: 火山引擎接入 OpenClaw — Custom Provider 自定义模式
description: 通过 Custom Provider 自定义模式将火山引擎方舟平台的 DeepSeek-V3 模型接入 OpenClaw，手动配置 Base URL 和 Model ID，灵活对接秒杀特惠套餐。
head:
  - - meta
    - name: keywords
      content: 火山引擎,Custom Provider,方舟大模型,DeepSeek-V3,OpenClaw,自定义模式,API配置,Base URL,Model ID,AI Agent
---

# 火山引擎接入 OpenClaw — Custom Provider 自定义模式

<span style="font-size: 0.875rem; color: var(--vp-c-text-2);">作者：OpenClaw CN 社区</span>

本文介绍如何通过 **Custom Provider 自定义模式** 将 [火山引擎](https://www.volcengine.com/) 方舟大模型接入 OpenClaw。该模式需要手动填写 Base URL 和 Model ID，适合需要精确控制 API 端点的场景。

::: tip 推荐：更简单的官方模式
如果你不需要自定义 Base URL，推荐使用 **[Volcano Engine 官方模式](/practical/volcengine-llm-2)**——只需输入 API Key，系统自动列出可用模型，配置更简单。

| 对比项 | [官方模式](/practical/volcengine-llm-2)（推荐） | 自定义模式（本文） |
|--------|-----------------------------------------------|-------------------|
| 供应商选择 | Volcano Engine | Custom Provider |
| 需要填写 Base URL | 不需要 | 需要手动填写 |
| 模型选择 | 自动列出可用模型 | 手动输入 Model ID |
| 配置步骤 | 更少、更简单 | 更多、更灵活 |
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

## 第 4 步：记录关键配置信息

创建完 API Key 后，请记录以下三项信息，安装 OpenClaw 时需要用到：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| **API Key** | `你创建的 Key` | 请妥善保存，切勿泄露 |
| **Model ID** | `deepseek-v3-2-251201` | 在 [模型列表文档](https://www.volcengine.com/docs/82379/1330310?lang=zh#b318deb2) 中找到你购买的模型对应的 ID |
| **Base URL** | `https://ark.cn-beijing.volces.com/api/coding/v3` | 方舟大模型 API 地址 |

## 第 5 步：安装 OpenClaw 并接入火山方舟

执行一键安装命令：

::: code-group

```bash [Linux / macOS]
curl -fsSL https://openclaw.ai/install.sh | bash
```

```powershell [Windows]
iwr -useb https://openclaw.ai/install.ps1 | iex
```

:::

安装向导启动后，按以下步骤逐一配置。

### 5.1 确认使用协议

提示：*I understand this is personal-by-default and shared/multi-user use requires lock-down. Continue?*

选择 **Yes**。

![确认使用协议，选择 Yes](/practical/volcengine-llm/s-1.png)

### 5.2 选择安装模式

Onboarding mode → 选择 **QuickStart**。

![选择 QuickStart 快速开始](/practical/volcengine-llm/s-2.png)

### 5.3 选择模型供应商

Model/auth provider → 选择 **Custom Provider**。

![选择 Custom Provider 自定义供应商](/practical/volcengine-llm/s-3.png)

::: tip 为什么选 Custom Provider？
虽然列表中有 Volcano Engine 选项，但选择 Custom Provider 可以自定义填写方舟平台的 Base URL 和 Model ID，确保精准对接你购买的秒杀套餐模型。
:::

### 5.4 填写 API Base URL

输入方舟大模型的 API 地址：

```
https://ark.cn-beijing.volces.com/api/coding/v3
```

![输入方舟 API Base URL](/practical/volcengine-llm/s-4.png)

### 5.5 选择 API Key 提供方式

提示：*How do you want to provide this API key?*

选择 **Paste API key now**。

![选择 Paste API key now](/practical/volcengine-llm/s-5.png)

### 5.6 粘贴 API Key

将第 3 步创建的方舟专用 API Key 粘贴到输入框中。

![粘贴方舟大模型 API Key](/practical/volcengine-llm/s-6.png)

### 5.7 选择兼容模式

Endpoint compatibility → 选择 **OpenAI-compatible**。

![选择 OpenAI-compatible 兼容模式](/practical/volcengine-llm/s-7.png)

### 5.8 填写 Model ID

输入你购买的模型 ID：

```
deepseek-v3-2-251201
```

![填写 Model ID](/practical/volcengine-llm/s-8.png)

### 5.9 验证模型连接

OpenClaw 会自动检验你的模型配置。看到 **Verification successful** 后，系统会输出一个 **Endpoint ID**，保持默认值不要修改。

![验证成功并获得 Endpoint ID](/practical/volcengine-llm/s-9.png)

### 5.10 模型别名（可选）

Model alias (optional) → 直接回车跳过。

![跳过模型别名设置](/practical/volcengine-llm/s-10.png)

### 5.11 确认配置完成

出现以下提示说明火山方舟模型已成功配置：

```
Configured custom provider: custom-ark-cn-beijing-volces-com/deepseek-v3-2-251201
```

![模型配置成功提示](/practical/volcengine-llm/s-11.png)

剩余的安装向导（通道、Skill 等）按照 OpenClaw 默认配置完成即可。

## 第 6 步：验证配置结果

安装完成后，进入 OpenClaw Gateway 页面 → **代理** → **Overview**，可以看到 **Primary Model** 已设置为：

```
custom-ark-cn-beijing-volces-com/deepseek-v3-2-251201
```

这说明火山方舟模型已成功接入 OpenClaw。

![Gateway 代理页面确认模型配置成功](/practical/volcengine-llm/s-12-success.png)

## 开始与 AI 对话

打开 OpenClaw 的 **聊天** 页面，即可直接和 DeepSeek-V3 对话。页面右上角会显示当前使用的模型 `deepseek-v3-2-251201 · custom-ark-cn-beiji...`，表明请求正在通过火山方舟平台处理。

![通过 OpenClaw 与火山方舟 DeepSeek-V3 进行对话](/practical/volcengine-llm/kuozhan.png)

![AI 展示完整的核心架构与工作能力](/practical/volcengine-llm/kuozhan-1.png)

## 常见问题

### 方舟专用 API Key 和火山引擎通用 AccessKey 有什么区别？

方舟大模型专用 API Key 是火山引擎专为大模型推理服务提供的密钥，与火山引擎通用的 AccessKey / SecretKey（用于调用 ECS、存储等云服务）不同。接入方舟模型时 **必须** 使用方舟专用 API Key。

### 为什么选择 Custom Provider 而不是 Volcano Engine？

OpenClaw 向导中的 Volcano Engine 选项适用于通用场景。选择 Custom Provider 可以自定义 Base URL 和 Model ID，能更灵活地适配秒杀特惠套餐对应的模型端点。

### Tokens 用完了怎么办？

可以在 [火山方舟控制台](https://www.volcengine.com/activity/ark) 续购套餐，或切换到按量计费模式。更换模型时只需在 OpenClaw 配置中修改 Model ID 即可。

### 可以同时配置多个模型吗？

可以。安装完成后，进入 OpenClaw Gateway 的代理设置页面，在 **Fallbacks** 中添加其它模型，即可实现多模型切换和容灾。
