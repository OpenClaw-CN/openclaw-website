---
title: 配置 DeepSeek
description: 告别 Claude，零成本接入国产最强大脑
---

# 🧠 配置 DeepSeek 大脑

原版 OpenClaw 默认依赖 Claude，这在国内不仅昂贵且难以访问。
作为中国社区，我们要将它的“大脑”替换为 **DeepSeek-V3** —— 它不仅便宜、中文能力强，而且完美兼容 OpenAI 协议。

## 1. 获取 API Key

如果你还没有 Key，请前往 [DeepSeek 开放平台](https://platform.deepseek.com/) 申请。

## 2. 修改配置文件

OpenClaw 的全局配置文件位于用户主目录下的 `~/.openclaw/openclaw.json`。

* **Windows**: `C:\Users\你的用户名\.openclaw\openclaw.json`
* **macOS/Linux**: `/Users/你的用户名/.openclaw/openclaw.json`

请使用文本编辑器打开该文件，并填入以下配置：

::: details 🔍 点击查看完整配置代码 (Copy Me)
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat",
        "embedding": "deepseek/deepseek-chat"
      }
    },
    "models": {
      "deepseek/deepseek-chat": {
        "provider": "openai-compatible",
        "model": "deepseek-chat",
        "apiBase": "https://api.deepseek.com",
        "apiKey": "sk-你的DeepSeek-Key",
        "contextWindow": 64000
      }
    }
  }
}
```
:::

### 🔑 关键参数说明

| 参数 | 值 | 说明 |
| :--- | :--- | :--- |
| **provider** | `openai-compatible` | **关键！** 必须设为兼容模式，让系统通过通用协议调用。 |
| **apiBase** | `https://api.deepseek.com` | DeepSeek 的官方接口地址。 |
| **model** | `deepseek-chat` | 对应 DeepSeek-V3 模型。 |
| **contextWindow** | `64000` | 上下文窗口限制，防止本地内存溢出。 |

## 3. 验证连接

保存文件后，重新运行 `npm run start`。
在命令行输入：

> **"你是谁？你使用的是什么模型？"**

如果它回答 **"我是由 DeepSeek 驱动的智能助手"**，恭喜你！你已经成功完成“换脑手术”！🎉