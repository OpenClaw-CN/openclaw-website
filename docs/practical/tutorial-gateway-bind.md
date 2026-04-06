---
title: OpenClaw Gateway 局域网配置
description: 配置 OpenClaw Gateway 的 bind 模式，从仅本机访问改为局域网可访问，支持 WSL 跨主机访问和 Nginx 反向代理场景
---

# OpenClaw Gateway 局域网配置

<span style="font-size: 0.875rem; color: var(--vp-c-text-2);">作者：努力向前</span>

本文介绍如何配置 OpenClaw Gateway 的 `gateway.bind` 参数，将网关从默认的仅本机访问（loopback）改为允许局域网设备访问（lan），适用于 WSL 跨主机访问、多设备共享 Gateway 等场景。


## 一、为什么只有本机能访问？

默认 **gateway.bind** 为 **loopback**，Gateway 只监听 **127.0.0.1**，因此：

- 在 WSL 里：本机（WSL）可访问，例如 `http://127.0.0.1:18789`
- 在 Windows 主机或其它机器：无法直接访问，因为服务未绑定到 LAN 或 0.0.0.0

若需要从 Windows 访问 WSL 内的 Gateway、或从局域网其它设备访问，需要改用 **lan** 绑定（监听所有接口）。


## 二、gateway.bind 可选值

| 取值        | 监听地址     | 典型用途 |
|-------------|--------------|----------|
| **loopback** | 127.0.0.1    | 仅本机，默认；最安全 |
| **lan**      | 0.0.0.0      | 所有网卡，本机 + LAN（含 WSL 被主机访问） |
| **tailnet**  | 机器 Tailscale IP | 仅 Tailscale 网络 |
| **auto**     | 有 tailnet 则 tailnet，否则 lan | 自动选择 |
| **custom**   | gateway.customBindHost 指定 IP | 手动指定单网卡 |

说明：文档中**没有**字面量 **all**；要实现“所有接口可访问”，使用 **lan**。


## 三、改为“所有接口可访问”（lan）

### 3.1 用 config set（推荐）

```bash
pnpm openclaw config set gateway.bind lan
```

### 3.2 编辑配置文件

编辑 `~/.openclaw/openclaw.json`（WSL 下路径为 `~/.openclaw/openclaw.json`）：

```json
{
  gateway: {
    mode: "local",
    bind: "lan",
    port: 18789,
    auth: {
      mode: "token",
      token: "你的网关令牌",
    },
  },
}
```

### 3.3 非 loopback 必须配置认证

**重要**：只要 **bind 不是 loopback**（例如设为 **lan**），OpenClaw 要求配置 **gateway.auth**（token 或 password），否则 Gateway 可能拒绝启动或 Control UI 显示未授权。

- 生成令牌：`openclaw doctor --generate-gateway-token`
- 将令牌写入 `gateway.auth.token`，或通过环境变量 `OPENCLAW_GATEWAY_TOKEN` 提供给 Gateway 进程（如 systemd 或 launchd 的环境配置）


## 四、WSL 场景：从 Windows 访问

1. 将 **gateway.bind** 设为 **lan**，并配置 **gateway.auth**（见上）。
2. 重启 Gateway：`openclaw gateway restart` 或重启对应服务。
3. 在 WSL 中查看 Gateway 所在机的 IP（例如 `hostname -I` 或 `ip addr` 中的 LAN 地址）。
4. 在 Windows 浏览器中访问：`http://<WSL的IP>:18789`（端口以你配置的 `gateway.port` 为准）。
5. 在 Control UI 的“设置/连接”中填入 **gateway.auth.token** 完成认证。

若 WSL 与 Windows 通过 NAT 互通，也可使用 WSL 的 `hostname -I` 得到的地址；若使用 WSL2 的“localhost 转发”，则 Windows 访问 `http://localhost:18789` 可能可用，具体取决于你的 WSL 与端口转发配置。


## 五、验证

```bash
# 查看当前绑定模式
pnpm openclaw config get gateway.bind
# 期望输出：lan

# 查看 Gateway 状态（bind 与端口）
openclaw gateway status
```

确认 **bind=lan**、端口正确，再从其它机器用 **LAN IP + 端口 + token** 访问 Control UI。


## 六、安全提醒

- **loopback**：仅本机，暴露面最小。
- **lan**：本机 + 局域网都可连，务必配合 **gateway.auth**（token 或 password）和防火墙，避免未授权访问。
- 若仅需在 Tailscale 内访问，可考虑 **gateway.bind: "tailnet"** 或保持 loopback + Tailscale Serve，减少对 LAN 的暴露。


## 七、参考文档（项目 docs）

| 文档       | 路径 |
|------------|------|
| 配置       | `docs/zh-CN/gateway/configuration.md` — gateway.bind 与 gateway.auth |
| FAQ        | `docs/zh-CN/help/faq.md` — “我设置了 gateway.bind: "lan" …” |
| 故障排除   | `docs/zh-CN/gateway/troubleshooting.md` — 非 loopback 绑定与认证 |
| 安全       | `docs/zh-CN/gateway/security/index.md` — 绑定与认证建议 |

按上述步骤将 **gateway.bind** 改为 **lan** 并配置 **gateway.auth** 后，即可在 WSL 外通过 LAN 正常访问 Gateway。
