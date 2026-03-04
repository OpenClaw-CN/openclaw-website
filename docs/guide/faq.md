# 常见问题 (FAQ)

## 安装与部署

::: details Q: 为什么目前主要提供源码安装方式？
**A: 源码部署不仅是最透明的方式，也是目前 AI Agent 领域的最佳实践。**

虽然“一键安装包”看起来方便，但在 AI Agent（智能体）开发和使用场景下，源码安装具有无可比拟的优势：

1.  **环境的通用性与适配性**：
    AI 项目通常依赖复杂的环境（如 PyTorch、CUDA、npm 版本等）。源码安装允许 OpenClaw CN 完美融入您现有的开发环境（无论是 Conda、Venv 还是 Docker），避免了封装包可能带来的底层库冲突问题。无论您是 Windows、macOS 还是 Linux 用户，源码运行都能提供最原生的性能表现。

2.  **代码透明与安全**：
    作为一款能够执行操作系统的智能体，安全性至关重要。源码安装意味着每一行代码对您都是可见的。您可以清楚地知道程序在执行什么指令，没有任何“黑盒”操作，这对于企业级应用和极客用户来说是安全的底线。

3.  **便于二次开发与调试**：
    OpenClaw CN 的核心价值在于“可扩展性”。通过源码部署，您可以直接修改配置文件、调整 Prompt 甚至修改核心逻辑来适配您的具体业务场景。您离开发者只有一步之遥，这是预编译软件无法做到的。

4.  **即时获取最新特性**：
    AI 技术迭代极快。源码部署让您可以通过简单的 `git pull` 命令，瞬间同步我们最新的功能修复和模型适配（如最新的 DeepSeek 优化），无需等待漫长的发版周期。
:::

::: details Q: Windows 下运行构建命令报错 “'bash' 不是内部或外部命令”？
**A: 这是因为构建脚本依赖 Linux 环境命令，请使用 Git Bash 运行。**

![Windows构建报错示例](/win-error.png)

OpenClaw CN 的构建流程中包含了一些 Shell 脚本（如 `.sh` 文件），Windows 默认的 CMD 或 PowerShell 终端无法直接执行这些脚本。

**解决方法：**

1.  **推荐方式：使用 Git Bash**
    在项目根目录点击右键，选择 **Git Bash Here**。在弹出的 Git Bash 窗口中再次运行构建命令（如 `pnpm build`）即可。Git Bash 自带了模拟 Linux 环境，可以完美兼容这些脚本。

2.  **替代方式：配置环境变量**
    如果您坚持使用 PowerShell，需要将 Git 安装目录下的 `bin` 文件夹（包含 `bash.exe`）添加到系统的 Path 环境变量中，但这通常比第一种方法更繁琐。
:::

::: details Q: 国内安装时 node-llama-cpp 安装卡住或 CMake 下载失败怎么办？
**A: 在国内或网络受限环境下，node-llama-cpp 可能从 GitHub 下载 CMake 时卡住或超时。下面说明原因与多种无需改代码的解决方案。**

本文档面向在中国大陆或网络受限环境下安装 OpenClaw 的用户，说明安装过程中可能遇到的 **node-llama-cpp** 相关问题，以及无需修改任何代码即可采用的解决方案。

### 一、问题描述

#### 1.1 现象

在使用官方安装脚本（如 `curl -fsSL https://open-claw.org.cn/install-cn.sh | bash` 或 Windows 下的 PowerShell 脚本）安装 OpenClaw 时，安装过程可能在 **node-llama-cpp** 的安装阶段长时间无响应（例如卡住约 6～7 分钟），随后报错或需要用户手动取消。

![node-llama-cpp 安装卡住或报错示例](/node-llama-app-error.png)

#### 1.2 原因说明

- OpenClaw 依赖 **node-llama-cpp** 以支持本地运行 LLM（如 llama.cpp 模型）。
- 当当前系统没有可用的预编译二进制时，node-llama-cpp 会在安装后自动尝试「从源码构建」：
  - 从 **GitHub** 下载 **xpack 提供的 CMake** 二进制包；
  - 再使用该 CMake 编译 llama.cpp 源码。
- 在中国大陆或其它网络受限环境中，访问 GitHub 可能非常缓慢或超时，导致：
  - CMake 下载卡住或失败；
  - 整体安装时间过长或安装失败。

#### 1.3 重要说明

- **node-llama-cpp** 官方**没有**提供通过环境变量指定「CMake 下载地址」的选项（例如无法将下载源改为国内镜像）。
- 因此，在不修改 node-llama-cpp 或 OpenClaw 源码的前提下，只能通过「跳过自动下载」或「改善网络环境」等方式规避问题。

### 二、解决方案概览

| 方案 | 适用场景 | 用户需要做的 | 是否需改代码 |
|------|----------|--------------|--------------|
| 方案一 | 本机可安装 CMake | 安装 CMake + 设置环境变量 | 否 |
| 方案二 | 有代理/VPN | 使用代理或 VPN 后安装 | 否 |
| 方案三 | 不需要本地 LLM | 跳过或省略 node-llama-cpp | 否（项目可仅做文档说明） |
| 方案四 | 内网/统一部署 | 在可访问 GitHub 的环境安装后拷贝或使用 Docker | 否 |
| 方案五 | 与方案一相同 | 通过系统包管理器安装 CMake | 否 |

以下逐条说明各方案的具体做法。

### 三、方案一：本机安装 CMake 并跳过自动下载（推荐）

**思路**：不让 node-llama-cpp 从 GitHub 自动下载 CMake，改为使用本机已安装的 CMake 进行从源码构建（若需要）。

#### 3.1 步骤

1. **在本机安装 CMake**  
   - 若尚未安装，请先通过系统包管理器或 [CMake 官网](https://cmake.org/download/) 安装与 node-llama-cpp 兼容的 CMake 版本（一般 3.26+ 可参考官方要求）。
2. **设置环境变量后再执行安装**  
   - Linux / macOS（bash/zsh）：
     ```bash
     export NODE_LLAMA_CPP_SKIP_DOWNLOAD=true
     # 然后再执行你的安装命令，例如：
     # curl -fsSL https://open-claw.org.cn/install-cn.sh | bash
     ```
   - Windows（PowerShell）：
     ```powershell
     $env:NODE_LLAMA_CPP_SKIP_DOWNLOAD = "true"
     # 然后再执行你的安装命令
     ```
3. **执行 OpenClaw 的安装脚本或 `npm install`**（与平时一致）。

#### 3.2 效果与注意

- node-llama-cpp 将**不会**从 GitHub 下载 xpack 的 CMake，若需要从源码构建，会使用本机已安装的 CMake。
- 若本机已有兼容的预编译二进制，则不会触发从源码构建，安装会更快。
- 若仍需从源码构建 llama.cpp，则可能仍会从 GitHub 拉取 llama.cpp 相关资源；若网络仍不稳定，可结合方案二（代理）或方案四（在其它环境构建后拷贝）。

### 四、方案二：使用代理或 VPN

**思路**：让安装过程能正常访问 GitHub，按 node-llama-cpp 默认流程完成 CMake 与源码下载。

#### 4.1 步骤

1. 开启可访问 GitHub 的代理或 VPN。
2. 在**同一终端会话**中设置代理（示例为 `http://127.0.0.1:7890`，请按实际替换）：
   - Linux / macOS：
     ```bash
     export https_proxy=http://127.0.0.1:7890
     export http_proxy=http://127.0.0.1:7890
     ```
   - Windows（PowerShell）：
     ```powershell
     $env:https_proxy = "http://127.0.0.1:7890"
     $env:http_proxy  = "http://127.0.0.1:7890"
     ```
3. 在该终端中执行 OpenClaw 的安装命令。

#### 4.2 效果与注意

- 安装过程可正常从 GitHub 下载 xpack CMake 和 llama.cpp 相关资源，无需改任何代码。
- 需保证代理/VPN 在安装期间稳定可用。

### 五、方案三：不需要本地 LLM 时跳过 node-llama-cpp

**思路**：若你**不使用** OpenClaw 的「本机运行 LLM」能力，可避免安装或触发 node-llama-cpp，从而完全避免 CMake 下载问题。

#### 5.1 做法（取决于项目是否将 node-llama-cpp 设为可选）

- 若 OpenClaw 将 node-llama-cpp 列为 **optionalDependencies**：  
  安装时使用 `npm install --omit=optional` 或等价方式，可跳过可选依赖，不安装 node-llama-cpp。
- 若为普通依赖：  
  则需项目方在依赖与文档上做区分（例如文档中说明「不需要本地 LLM 时的最小安装方式」），用户按文档操作，**无需改社区网站或安装脚本代码**，仅阅读文档即可。

#### 5.2 效果

- 不安装 node-llama-cpp，自然不会触发其 CMake 下载与从源码构建。
- 无法使用依赖 node-llama-cpp 的本地 LLM 功能，其它功能不受影响（以项目实际功能划分为准）。

### 六、方案四：在可访问 GitHub 的环境安装后拷贝或使用 Docker

**思路**：在能正常访问 GitHub 的机器或 CI 中完成「完整安装」，再把结果拷贝到目标环境，或构建 Docker 镜像在目标环境运行。

#### 6.1 做法示例

1. **在能访问 GitHub 的机器上**执行完整安装（含 node-llama-cpp 的 postinstall），等待 CMake 下载与编译完成。
2. **拷贝整个项目目录**（含 `node_modules` 及其中编译好的二进制、xpack 的 store/cache）到目标机器使用；或  
3. **在该环境构建 Docker 镜像**，在目标环境只拉取镜像并运行，不再在目标环境执行 `npm install`。

#### 6.2 效果与注意

- 目标机器（如内网、无外网）不需要从 GitHub 下载 CMake，只需能运行已编译好的二进制或镜像。
- 适合企业内网、统一由运维/CI 构建再分发的场景。

### 七、方案五：通过系统包管理器安装 CMake（与方案一配合）

**思路**：与方案一相同，只是强调通过系统包管理器安装 CMake，便于在文档中写「安装前准备」。

#### 7.1 示例命令

- **Ubuntu / Debian**：`sudo apt update && sudo apt install -y cmake`
- **macOS**：`brew install cmake`
- **Windows**：使用 [Chocolatey](https://chocolatey.org/) 执行 `choco install cmake`，或从 [CMake 官网](https://cmake.org/download/) 安装。

安装完成后，按**方案一**设置 `NODE_LLAMA_CPP_SKIP_DOWNLOAD=true` 再执行 OpenClaw 安装。

### 八、推荐使用顺序（文档可引用）

在社区网站或安装文档中，可建议用户按以下顺序尝试：

1. **优先**：本机安装 CMake + 设置 `NODE_LLAMA_CPP_SKIP_DOWNLOAD=true` 后安装（方案一 / 方案五）。
2. **可选**：若有代理或 VPN，可直接使用代理后安装（方案二）。
3. **若不需要本地 LLM**：参考项目文档，跳过或省略 node-llama-cpp（方案三）。
4. **高级 / 内网**：在可访问 GitHub 的环境构建后拷贝或使用 Docker（方案四）。

### 九、环境变量速查

| 变量名 | 含义 | 常用值 |
|--------|------|--------|
| `NODE_LLAMA_CPP_SKIP_DOWNLOAD` | 跳过自动下载 CMake / 从源码构建 | `true`（跳过） |

设置后需在**同一终端会话**中执行安装命令方可生效。

### 十、参考链接

- node-llama-cpp 官方文档（从源码构建）：<https://withcatai.github.io/node-llama-cpp/guide/building-from-source>
- node-llama-cpp 入门（含 `NODE_LLAMA_CPP_SKIP_DOWNLOAD` 说明）：<https://node-llama-cpp.withcat.ai/guide/>
- xpack CMake（MIT 协议）：<https://github.com/xpack-dev-tools/cmake-xpack>

*本 FAQ 仅涉及使用方式与文档建议，不修改任何 OpenClaw 或 node-llama-cpp 的代码，可直接用于中国社区网站供用户参考。*
:::

---

## 版本与更新

::: details Q: OpenClaw CN 与 OpenClaw 原版是什么关系？更新频率如何？
**A: 我们是 OpenClaw 的本地化增强版本，保持与其核心同步，但更懂中文环境。**

我们与上游（原版 OpenClaw）保持着紧密的“软分叉（Soft Fork）”关系：

1.  **同步策略（Keep Upstream）**：
    我们制定了严格的代码合并机制。原则上，我们会**每周进行 1-2 次**与原版 `release` 分支的合并操作。这意味着，原版 OpenClaw 所有的底层能力提升、Bug 修复和新特性（如新的沙箱机制、新的工具接口），CN 版本都会第一时间同步拥有。

2.  **差异化功能（Unique Features）**：
    在保持内核同步的基础上，我们维护了一套独立的“本地化补丁集”。这些功能是原版不具备，但对国内用户至关重要的：
    * **模型支持**：原生集成 DeepSeek等国内主流大模型，无需繁琐配置。
    * **生态集成**：未来将深度集成飞书、钉钉、企业微信等国内特有平台的工具集。
    * **网络适配**：优化了对国内网络环境的支持。

简单来说，使用 OpenClaw CN，您既能享受到全球开源社区的智慧，又能拥有开箱即用的本地化体验。
:::