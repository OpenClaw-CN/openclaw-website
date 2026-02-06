---
title: 贡献指南
description: 如何参与 OpenClaw 中国社区的建设
---

# 🤝 贡献指南 (Contributing Guide)

感谢你对 OpenClaw 中国社区感兴趣！
我们需要你的帮助来让 Local Agent 生态在国内真正落地。无论是修复 Bug、完善文档，还是开发新插件，每一次贡献都值得铭记。

## 🌟 参与方式

### 1. 提交代码 (Pull Request)

如果你修复了代码 Bug 或开发了新功能，请务必遵循以下标准流程，这将有助于你的代码更快被合并：

1.  **Fork 本仓库**：点击 Gitee 仓库右上角的 `Fork` 按钮。
2.  **创建分支**：
    * 功能开发：`git checkout -b feat/your-feature-name`
    * Bug 修复：`git checkout -b fix/bug-issue-id`
3.  **✅ 本地验证 (必做)**：
    在提交代码前，请务必使用你的 OpenClaw 实例进行实测，并运行完整的构建与测试检查：
    ```bash
    pnpm build && pnpm check && pnpm test
    ```
    *只有当上述命令全部通过 (无报错) 时，才可进行提交。*

4.  **提交代码**：请确保代码风格整洁，并附带必要的注释。
5.  **发起 PR**：将分支推送到你的仓库，并在 Gitee 上发起 `Pull Request`。
    * **保持专注**：**一个 PR 只做一件事**。请不要在一个 PR 里既修复 Bug 又开发新功能，这会导致 Review 困难。
    * **清晰描述**：请在 PR 描述中清楚地说明 **“修改了什么内容”** 以及 **“为什么要这么修改”**。

### 2. 改进文档

文档和代码一样重要。如果你发现文档有错别字、逻辑不清，或者想补充实战案例：

* 直接点击文档页底部的 **"在 GitHub 上编辑此页"** (或 Gitee) 按钮。
* 或者直接修改 `docs/` 目录下的 Markdown 文件提交 PR。

### 3. 反馈问题 (Issue)

遇到报错或有新想法？请直接在 [Gitee Issues 列表](https://gitee.com/OpenClaw-CN/openclaw-cn/issues) 中提出。
提问时请注明：
* 使用的操作系统 (Windows/Mac)
* Node.js 版本 (必须 >= v22)
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
> `feat: 原生支持 DeepSeek V3 配置向导`
> `fix: 修复 Windows 下 pnpm install 路径报错`

## 🛠️ 本地开发环境

如果你想参与核心代码开发，请确保本地安装了推荐的工具链。**请务必使用 pnpm，否则可能导致依赖树冲突。**

* **Node.js**: `v22.0.0` 或更高
* **pnpm**: `npm install -g pnpm`
* **VS Code**: 推荐安装 `ESLint` 和 `Prettier` 插件。

---

<div style="margin-top: 4rem; padding: 2rem; border: 1px solid #fed7aa; background: linear-gradient(to bottom right, #fff7ed, #ffedd5); border-radius: 12px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
  <h2 style="margin-top: 0; border: none; color: #c2410c;">🔥 加入 OpenClaw 核心贡献群</h2>
  <p style="color: #4b5563; max-width: 600px; margin: 1rem auto; line-height: 1.6;">
    我们要寻找前 100 位核心贡献者。
    如果你想第一时间获取开发动态，或者在贡献过程中遇到任何问题，
    欢迎扫码加入我们的开发者共建群。
  </p>
  
  <div style="display: flex; justify-content: center; margin-top: 24px;">
    <div style="background: white; padding: 12px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #eee;">
      <img src="/wechat-group-qr.jpg" alt="微信扫码进群" width="160" height="160" style="display: block;">
      <p style="color: #666; font-size: 13px; margin: 8px 0 0 0; font-weight: 500;">📲 扫码加入共建群</p>
    </div>
  </div>
</div>