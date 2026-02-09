---
title: 如何卸载
description: 彻底移除 OpenClaw 及相关配置
---

# 🗑️ 如何卸载 (Uninstall)

如果你需要彻底移除 OpenClaw 服务（例如重装、清理环境），请根据你的操作系统执行以下步骤。

::: warning ⚠️ 注意
卸载操作会删除你的配置文件和本地数据，请提前备份 `~/.openclaw` 目录（如果需要保留配置）。
:::

## 🍎 macOS (launchd)

在 macOS 上，OpenClaw 通常作为 `launchd` 用户代理运行。

### 1. 停止并移除服务
打开终端 (Terminal)，执行以下命令：

```bash
# 停止当前运行的服务
launchctl bootout gui/$UID/bot.molt.gateway

# 删除服务描述文件
rm -f ~/Library/LaunchAgents/bot.molt.gateway.plist
```

### 2. 清理配置文件
```bash
# 删除本地数据与配置文件夹
rm -rf ~/.openclaw

# (可选) 清理旧版残留配置
rm -f ~/Library/LaunchAgents/com.openclaw.*
```

---

## 🐧 Linux (systemd)

在 Linux 服务器上，OpenClaw 通常作为 `systemd` 用户服务运行。

### 1. 停止服务
```bash
# 停止服务并禁止开机自启
systemctl --user disable --now openclaw-gateway.service
```

### 2. 移除服务文件
```bash
# 删除 systemd 单元文件
rm -f ~/.config/systemd/user/openclaw-gateway.service

# 重载 systemd 配置
systemctl --user daemon-reload
```

### 3. 清理数据
```bash
rm -rf ~/.openclaw
```

---

## 🪟 Windows (计划任务)

Windows 版本通常使用“任务计划程序”在后台运行。

### 方法一：使用命令行 (CMD)

请以管理员身份运行 CMD：

```cmd
REM 1. 删除计划任务
schtasks /Delete /F /TN "OpenClaw Gateway"

REM 2. 删除配置文件夹
rmdir /s /q "%USERPROFILE%\.openclaw"
```

### 方法二：使用 PowerShell

```powershell
# 1. 注销计划任务
Unregister-ScheduledTask -TaskName "OpenClaw Gateway" -Confirm:$false

# 2. 强制删除配置目录
Remove-Item -Path "$env:USERPROFILE\.openclaw" -Recurse -Force
```

---

## 🧹 额外清理 (所有平台)

如果你安装了全局 CLI 工具，也可以将其移除：

```bash
# 移除全局命令
pnpm remove -g @openclaw/cli
# 或者
npm uninstall -g @openclaw/cli
```

至此，OpenClaw 已从你的系统中彻底移除。👋