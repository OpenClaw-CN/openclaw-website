---
title: OpenClaw 卸载指南
description: 彻底卸载 OpenClaw、移除 Gateway 服务、删除本地状态目录与配置文件，适用于 macOS、Linux 和 Windows
---

# OpenClaw 卸载指南

如果你想卸载 OpenClaw、删除 Gateway 网关服务、清理本地配置，或者解决“CLI 已删但服务还在运行”的问题，可以按本文操作。

本文适用于以下场景：

- 重装 OpenClaw 前先清理旧环境
- 删除本地状态目录、工作区和配置文件
- CLI 命令已经不可用，但后台服务仍在运行
- 你是通过安装脚本、包管理器或源码方式使用 OpenClaw

::: warning 注意
卸载会删除本地状态、配置和工作区数据。执行前请确认是否需要备份 `~/.openclaw` 或你自定义的 OpenClaw 状态目录。
:::

## 推荐方式：CLI 仍然可用

如果你的机器上还能正常执行 `openclaw` 命令，优先使用内置卸载命令，这是最简单也最完整的方式。

### 直接卸载

```bash
openclaw uninstall
```

### 非交互式卸载

适合自动化脚本、远程执行或 `npx` 场景：

```bash
openclaw uninstall --all --yes --non-interactive
npx -y openclaw uninstall --all --yes --non-interactive
```

### 等价的手动步骤

如果你想手动确认每一步，可以按下面顺序执行：

1. 停止 Gateway 网关服务：

```bash
openclaw gateway stop
```

2. 卸载 Gateway 网关服务：

```bash
openclaw gateway uninstall
```

3. 删除状态目录与配置：

```bash
rm -rf "${OPENCLAW_STATE_DIR:-$HOME/.openclaw}"
```

如果你额外设置了 `OPENCLAW_CONFIG_PATH`，并且该文件不在状态目录中，也请一并删除。

4. 删除工作区（可选）：

```bash
rm -rf ~/.openclaw/workspace
```

这一步通常用于移除本地 Agent 工作目录、缓存内容和相关文件。

5. 卸载全局 CLI（按你的安装方式选择一种）：

```bash
npm rm -g openclaw
pnpm remove -g openclaw
bun remove -g openclaw
```

6. 如果你安装过 macOS 图形应用，也可以删除：

```bash
rm -rf /Applications/OpenClaw.app
```

## 手动移除服务：CLI 已删除但服务还在

如果你已经删除了 `openclaw` 命令，但系统中的 Gateway 服务仍然在后台运行，请按操作系统手动清理。

### macOS（launchd）

OpenClaw 在 macOS 上通常以 `launchd` 用户代理方式运行。默认标签通常是 `bot.molt.gateway`，如果你使用了 profile，也可能是 `bot.molt.<profile>`。

```bash
launchctl bootout gui/$UID/bot.molt.gateway
rm -f ~/Library/LaunchAgents/bot.molt.gateway.plist
rm -f ~/Library/LaunchAgents/com.openclaw.*
rm -rf ~/.openclaw
```

如果你使用了 profile，请把上面的服务标签和 plist 文件名替换为对应的 `bot.molt.<profile>`。

### Linux（systemd 用户服务）

Linux 上通常通过 `systemd --user` 注册为用户服务。默认服务名一般是 `openclaw-gateway.service`，profile 场景下可能是 `openclaw-gateway-<profile>.service`。

```bash
systemctl --user disable --now openclaw-gateway.service
rm -f ~/.config/systemd/user/openclaw-gateway.service
systemctl --user daemon-reload
rm -rf ~/.openclaw
```

如果你使用了 profile，请删除对应的服务文件和状态目录。

### Windows（任务计划程序）

Windows 上通常会通过“任务计划程序”来启动 Gateway。默认任务名称是 `OpenClaw Gateway`，如果你使用了 profile，也可能显示为 `OpenClaw Gateway (<profile>)`。

#### PowerShell

```powershell
schtasks /Delete /F /TN "OpenClaw Gateway"
Remove-Item -Force "$env:USERPROFILE\.openclaw\gateway.cmd" -ErrorAction SilentlyContinue
Remove-Item -Path "$env:USERPROFILE\.openclaw" -Recurse -Force -ErrorAction SilentlyContinue
```

#### CMD

```cmd
schtasks /Delete /F /TN "OpenClaw Gateway"
del /f /q "%USERPROFILE%\.openclaw\gateway.cmd"
rmdir /s /q "%USERPROFILE%\.openclaw"
```

如果你使用了 profile，请同时删除对应的计划任务和 `~\.openclaw-<profile>\gateway.cmd`。

## 按安装方式补充说明

### 通过安装脚本或包管理器安装

如果你是通过安装脚本、`npm`、`pnpm` 或 `bun` 安装 OpenClaw，一般只需要按上面的“推荐方式”执行即可。

常见的 CLI 卸载命令如下：

```bash
npm rm -g openclaw
pnpm remove -g openclaw
bun remove -g openclaw
```

### 通过源码仓库运行

如果你是通过源码方式使用 OpenClaw，例如：

```bash
git clone https://gitee.com/OpenClaw-CN/openclaw-cn.git
cd openclaw-cn
```

或者你是从官方仓库检出后直接运行 `openclaw` / `bun run openclaw`，建议按下面顺序处理：

1. 在删除源码目录之前，先卸载 Gateway 服务
2. 删除源码仓库目录
3. 删除状态目录、工作区和自定义配置文件

这样可以避免出现“仓库删掉了，但系统服务还在尝试启动”的残留问题。

## 多 Profile 与远程模式说明

如果你使用过 `--profile` 或设置过 `OPENCLAW_PROFILE`，你的状态目录可能不是默认的 `~/.openclaw`，而是类似：

```bash
~/.openclaw-<profile>
```

这时你需要对每个 profile 分别执行清理。

如果你使用的是远程模式，Gateway 网关服务和状态目录通常位于远端主机，因此也需要到远端机器上执行对应的卸载步骤。

## 卸载后如何确认已经清理干净

你可以通过下面几个角度确认 OpenClaw 是否已经彻底卸载：

- `openclaw` 命令已无法执行，或已被你移除
- 系统中不再存在 OpenClaw Gateway 服务、计划任务或 launchd/systemd 用户单元
- `~/.openclaw` 或对应 profile 目录已被删除
- 工作区目录与自定义配置文件已清理完成

如果你只是想“重装 OpenClaw”，通常建议先完整执行一次卸载，再重新安装，这样更容易避免历史配置导致的问题。