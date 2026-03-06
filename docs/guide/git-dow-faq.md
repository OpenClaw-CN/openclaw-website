# Git 全平台极速下载与基础配置指南

在国内网络环境下，直接使用官方途径下载 Git 极易出现速度慢、断连等问题。本指南为你提供各平台最稳妥的国内加速方案。

## 💻 一、 Windows 环境实战

### 通过国内大厂镜像站手动安装（⭐ 最推荐）

1. **访问镜像站**：打开阿里云开源镜像站：`https://npmmirror.com/mirrors/git-for-windows/`
2. **选择版本**：下拉至底部，选择最新的非 RC 稳定版本（如 `v2.44.0.windows.1/`）。
3. **下载安装**：点击下载以 `64-bit.exe` 结尾的文件，双击安装，对于大多数情况，一路点击 **Next** 保持默认设置即可。

## 🐧 二、 Linux 环境实战

在 Linux 生态中，核心是确保你的系统已经配置了国内镜像源（如清华源/阿里源），然后直接使用包管理器一键安装。

### Ubuntu / Debian 系列

```bash
sudo apt update
sudo apt install git -y
```

### CentOS / RHEL / Rocky 系列

```bash
sudo yum install git -y
```

## 🍎 三、 macOS 环境实战

### 使用 Homebrew 安装（最适合开发者）

确保系统已安装 Homebrew，直接在终端执行：

```bash
brew install git
```

---

## 🛠️ 四、 初始身份与免密配置 (以 Gitee/GitHub 为例)

安装完成后，请打开终端（Windows 使用 PowerShell/Git Bash，Linux/macOS 使用 Terminal）执行以下配置：

### 1. 配置全局用户名和邮箱

这是你提交代码时的“身份标识”。

```bash
# 设置提交昵称和邮箱
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"

# 验证配置是否成功
git config --global --list
```

### 2. 生成 SSH 密钥并测试连接

配置 SSH 后，向远端仓库推送代码即可实现免密操作。

```bash
# 1. 生成基于 ed25519 算法的 SSH 密钥（连续按次回车，使用默认设置）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 查看并复制公钥内容
# 将输出的以 ssh-ed25519 开头的字符串，粘贴到 Gitee/GitHub 的 SSH 公钥设置中
cat ~/.ssh/id_ed25519.pub

# 3. 测试与远端仓库的连接 (首次连接提示 yes/no 时输入 yes)
ssh -T git@gitee.com
# 如果使用 GitHub，替换为 ssh -T git@github.com
```