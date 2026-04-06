# Windows 原生实战

<span style="font-size: 0.875rem; color: var(--vp-c-text-2);">作者：努力向前</span>

这篇文章我就只做一件事：把 Windows 上安装 openclaw 这件事讲清楚、讲顺手。我把安装路径分成两条：一条是更稳妥的 WSL2（更接近 Linux 的官方环境，后续坑更少），另一条是原生 Windows（更快上手，但对 PowerShell 和系统环境更挑剔）。

今天主要讲原生 Windows 安装过程。

## 原生 Windows 安装

如果你不想配置 WSL，希望直接在 Windows 环境下运行，可以按照以下步骤操作：

### 第 1 步：安装 Node.js 运行环境

OpenClaw 基于 Node.js 开发，所以首先需要安装 Node.js 环境。

- 访问 Node.js 官网下载页面：https://nodejs.org/zh-cn/download/
- 下载 Windows 安装程序 (.msi)，建议选择 **长期支持版(LTS)**，目前使用 Node.js 22.x 版本就行
![图片1](/practical/windows-native/1.jpg)
- 双击下载后的 .msi 文件，按照向导提示完成安装

安装完成后，验证是否安装成功：

- 在开始菜单搜索「PowerShell」，打开 Windows PowerShell（无需管理员权限）
- 输入以下命令查看版本：

```bash
node --version
npm --version
```

如果两个命令都能正确显示版本号（如 v22.x.x，10.x.x），说明安装成功。

### 第 2 步：安装 Git

OpenClaw 的构建流程中包含了一些 Shell 脚本（如 .sh 文件），Windows 默认的 CMD 或 PowerShell 终端无法直接执行这些脚本。

- 下载 Git-2.19.1-64-bit.exe 包直接安装即可
- 安装成功后在任何一个目录下，点击鼠标右键，执行「Git Bash Here」

### 第 3 步：安装 pnpm 并配置国内镜像源

- OpenClaw 官方建议使用 pnpm 从源代码构建，在刚打开的 Git 界面执行：

```bash
npm install -g pnpm
```

- 使用 pnpm 安装 openclaw 时会下载很多依赖包，国内安装配置国内的镜像源可以保证包的下载速度：

```bash
# 设置淘宝/阿里云镜像
pnpm config set registry https://registry.npmmirror.com/
```

### 第 4 步：源码安装与启动

* 采用 OpenClaw 中国社区版维护的 openclaw-cn 版本安装，原生支持 DeepSeek，原生支持飞书通道。

```bash
# 1. 下载源码
git clone https://gitee.com/OpenClaw-CN/openclaw-cn.git
cd openclaw-cn
```

* 采用 OpenClaw 原版安装，原生支持飞书通道。

```bash
# 1. 下载源码
git clone https://github.com/openclaw/openclaw.git
cd openclaw
```

```bash
# 2. 安装依赖
pnpm install
```

```bash
# 3. 首次构建 UI 依赖
pnpm ui:build
pnpm build
```

```bash
pnpm openclaw onboard --install-daemon
```

稍等片刻就可以看到安装向导启动。

![图片5](/practical/windows-native/5.jpg)

到这里，我们就进入了安装向导环节。但是……这里出现了大问题，就是在 Git Bash 里虽然可以执行 pnpm 的所有指令，但是在图形界面时，键盘的很多操作会失效。

**原因：** Git Bash 的默认终端（MinTTY）和 Node.js 的交互式菜单（就是这种让你按上下键选择的界面）极其不兼容。Git Bash 这种模拟出来的 Linux 环境，无法正确处理 Windows 下 Node.js 发出的「光标移动」指令。

**表现就是：** 你按了箭头键，界面没反应，或者过了很久才动一下，甚至直接「死」在那里。

所以，从现在开始，我们转换成 **PowerShell**。
* 中国社区版如下图：

![图片6](/practical/windows-native/6.jpg)

* OpenClaw原版如下图：

![图片6](/practical/windows-native/6-1.png)


我们以管理员权限运行，切换到 OpenClaw 源码目录，然后执行以下命令：

```bash
pnpm openclaw onboard --install-daemon
```

![图片7](/practical/windows-native/7.jpg)

再次看到这个页面，执行 **yes**。选择**快速开始**。

![图片8](/practical/windows-native/8.jpg)

轻松通过，果然还是图形的兼容问题，这里我们选择 **DeepSeek**。选择 **API key**，然后输入正确的 key 值。选择当前模型。

![图片9](/practical/windows-native/9.jpg)

通道这里选择**暂时跳过**，等 Gateway 启动后再配置。选择 **yes**，然后选择 **pnpm**。真实的 skill 安装时，可以暂时跳过，后续再配置（使用空格键选择）。

![图片10](/practical/windows-native/10.jpg)

然后一路都选择 no，最后看到网关启动，然后选择 **Open the Web UI**，你就会看到以下页面：

![图片11](/practical/windows-native/11.jpg)

这说明安装成功了！

## 常见问题

**问题 1：安装过程中网络连接失败**

- 解决方案：检查网络连接，中文社区版理论上是不需要代理的。

**问题 2：权限不足导致安装失败**

- 解决方案：确保全程使用管理员身份运行 PowerShell。对于方案 A，安装 Ubuntu 时也要用管理员 PowerShell。

**问题 3：端口冲突（18789 端口被占用）**

- 解决方案：可以修改 OpenClaw 的默认端口，或者关闭占用该端口的程序。运行以下命令查看端口占用：

```bash
# 在方案 A 的 Ubuntu 中
sudo netstat -tulpn | grep 18789
```

```powershell
# 在方案 B 的 PowerShell 中
netstat -ano | findstr 18789
```

**问题 4：杀毒软件或防火墙阻止安装**

- 解决方案：暂时关闭第三方杀毒软件（如 360、腾讯电脑管家）或 Windows Defender 防火墙，安装完成后再重新开启。

成功安装 OpenClaw 只是第一步，就像刚装好操作系统的电脑。为了让你的 AI 助手真正「活」起来，后续还需要：

- 配置 AI 大脑：连接大语言模型（如 DeepSeek、GLM 等），让 OpenClaw 能够思考
- 配置沟通渠道：接入飞书、微信等，让你能在常用工具中与 AI 对话
- 配置技能和工作流：让 AI 学会处理特定任务，如总结文档、安排日程等

## 接入智慧 AI 大脑

OpenClaw 需要连接一个 AI 大模型才能「思考」。我们刚才已经配置了 DeepSeek，所以你可以在页面和它对话。

![图片12](/practical/windows-native/12.jpg)

## 配置飞书机器人通道

最后一步，让我们能在最常用的飞书里和 AI 助手对话。

### 在飞书开放平台配置机器人

1. 浏览器访问 [飞书开放平台](https://open.feishu.cn/)，用飞书 APP 扫码登录。
2. 点击右上角「创建应用」，选择「企业自建应用」。
3. 填写应用名称（如「我的工作助手」）和描述，点击创建。
4. 进入应用后，在左侧菜单栏完成以下子步骤：
   - **添加能力：** 点击「添加能力」，启用「机器人」。
   - **配置权限：** 点击「权限管理」，搜索并添加以下三个权限：
     - im:message（获取与发送单聊、群聊消息）
     - contact:user.base:readonly（用户信息）
     - im:resource（媒体）
   - 添加后，点击「批量开通」。

现在，从飞书平台我们得到了两样东西：**App ID**、**App Secret**。

### 在 OpenClaw 中绑定飞书

回到网关窗口，

![图片13](/practical/windows-native/13.jpg)

点击**保存**。

![图片14](/practical/windows-native/14.jpg)

点击**保存**。

![图片15](/practical/windows-native/15.jpg)

填上 App ID 和 App Secret，然后配置其它参数：

```yaml
channels:
  feishu:
    enabled: true
    appId: "cli_xxxxx"
    appSecret: "secret"
    domain: "feishu"
    connectionMode: "websocket"
    dmPolicy: "pairing"   # 配对方式，最安全
    groupPolicy: "allowlist"
    requireMention: true   # 群聊是否需要 @机器人
    mediaMaxMb: 30        # 媒体文件最大大小 (MB, 默认 30)
    renderMode: "auto"     # 回复渲染模式: "auto" | "raw" | "card"
```

### 回到飞书平台配置事件监听与回调

刚才在 OpenClaw 配置了 App Id 和 App Secret 后，openclaw-cn 就会主动连接到飞书，这时才可以回到平台配置通道的事件监听与回调。

![图片16](/practical/windows-native/16.jpg)

以下监听事件均得填上：

| 事件 | 说明 |
|------|------|
| im.message.receive_v1 | 接收消息（必需） |
| im.message.message_read_v1 | 消息已读回执 |
| im.chat.member.bot.added_v1 | 机器人进群 |
| im.chat.member.bot.deleted_v1 | 机器人被移出群 |

![图片17](/practical/windows-native/17.jpg)

配置完了，别忘了**发布一版飞书应用**。

然后到手机端飞书，找到你的机器人，发送一条消息！你的手机飞书会收到一个配对的请求，把消息中要配置的 Open ID 填回到网关。

![图片18](/practical/windows-native/18.jpg)

这时才算是真正的联通，并且可以安全地和你的 OpenClaw 聊天了。
