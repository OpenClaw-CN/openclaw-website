---
title: 贡献指南
description: 如何参与 OpenClaw 中国社区的建设
---

# 🤝 贡献指南 (Contributing Guide)

感谢你对 OpenClaw 中国社区感兴趣！
我们需要你的帮助来让 Local Agent 生态在国内真正落地。无论是修复 Bug、完善文档，还是开发新插件，每一次贡献都值得铭记。

## 🌟 参与方式

### 1. 提交代码 (Pull Request)

如果你修复了代码 Bug 或开发了新功能，请遵循以下流程：

1.  **Fork 本仓库**：点击 Gitee 仓库右上角的 `Fork` 按钮。
2.  **创建分支**：
    * 功能开发：`git checkout -b feat/your-feature-name`
    * Bug 修复：`git checkout -b fix/bug-issue-id`
3.  **提交代码**：请确保代码风格整洁，并附带必要的注释。
4.  **发起 PR**：将分支推送到你的仓库，并在 Gitee 上发起 `Pull Request`。

### 2. 改进文档

文档和代码一样重要。如果你发现文档有错别字、逻辑不清，或者想补充实战案例：

* 直接点击文档页底部的 **"在 Gitee 上编辑此页"** 按钮。
* 或者直接修改 `docs/` 目录下的 Markdown 文件提交 PR。

### 3. 反馈问题 (Issue)

遇到报错或有新想法？请直接在 [Issues 列表](https://gitee.com/OpenClaw-CN/openclaw-cn/issues) 中提出。
提问时请注明：
* 使用的操作系统 (Windows/Mac)
* Node.js 版本
* 报错截图或日志

## 📝 提交规范 (Commit Convention)

为了保持 Git 历史整洁，我们推荐使用 Angular 风格的提交信息：

* `feat`: 新增功能 (Feature)
* `fix`: 修复 Bug
* `docs`: 文档变更
* `style`: 代码格式调整 (不影响逻辑)
* `refactor`: 代码重构
* `chore`: 构建工具或依赖变更

**示例：**
> `feat: 新增 DeepSeek V3 配置文件模板`
> `fix: 修复 Windows 下文件路径转义错误`

## 🛠️ 本地开发环境

如果你想参与核心代码开发，请确保本地安装了推荐的工具链：

* **pnpm** (推荐代替 npm): `npm install -g pnpm`
* **VS Code**: 推荐安装 `ESLint` 和 `Prettier` 插件。

---

**加入我们，一起构建最懂中文环境的 AI Agent 基础设施！** 🚀