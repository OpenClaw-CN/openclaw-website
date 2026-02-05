---
title: 配置 DeepSeek
description: 源码级原生支持，开箱即用
---

# 🧠 配置 DeepSeek 大脑

得益于 OpenClaw CN 的源码改造，**DeepSeek 现已成为系统的一级公民**。
这意味着你不再需要繁琐地配置 `baseUrl` 或使用兼容模式，系统原生支持 DeepSeek-V3 / R1。

## 方法一：通过向导配置 (推荐)

这是最简单的方法。在运行 `pnpm openclaw onboard` 初始化向导时：

1.  **Select Provider**: 在列表中直接选择 👉 **`DeepSeek (Recommended for CN)`**
2.  **API Key**: 输入你的 DeepSeek Key (`sk-xxxxxxxx`)。
3.  **Model**: 系统会自动为你配置 `deepseek-chat` (V3) 为默认模型。

---

## 方法二：手动修改配置文件

如果你需要手动干预配置，请修改 `~/.openclaw/openclaw.json`。
得益于原生集成，配置文件变得非常清爽：

```json
{
  "auth": {
    "profiles": {
      "deepseek:default": {
        "provider": "deepseek",
        "mode": "api_key",
        "apiKey": "sk-你的DeepSeek-Key"
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat"
      }
    }
  }
}
```

### 🔑 为什么原生支持更好？

| 特性 | 原生模式 (DeepSeek) | 旧版兼容模式 (OpenAI Compatible) |
| :--- | :--- | :--- |
| **配置难度** | ⭐ 极简 (仅需 Key) | ⭐⭐⭐ 繁琐 (需填 BaseUrl, Model ID) |
| **稳定性** | ✅ 官方 SDK 直连 | ⚠️ 可能受代理影响 |
| **Token 计算** | ✅ 精准 | ⚠️ 可能有偏差 |

## 3. 验证连接

配置完成后，重启服务：
```bash
pnpm start
```

在命令行输入：
> **"你是谁？"**

如果它回答 **"我是 OpenClaw 智能助手..."**，说明连接成功！