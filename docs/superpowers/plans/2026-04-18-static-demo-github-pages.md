# 静态演示版 GitHub Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把前端改成打开链接即可进入策展馆的静态演示版，不再依赖登录和本地后端。

**Architecture:** 保留现有 React 路由和页面结构，在认证上下文里注入默认演示用户，在 API 层用本地 Promise mock 替代 `/api/v1/*` 请求，并让根路径直接进入策展馆。构建配置补齐 GitHub Pages 所需的基础路径与静态发布文件。

**Tech Stack:** React 18, TypeScript, Vite, React Router

---

### Task 1: 切换为演示认证模式

**Files:**
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/contexts/AuthContext.tsx`

- [ ] **Step 1: 让根路由不再跳转登录**

把应用入口改成直接进入策展馆，并移除登录、注册的强制拦截。

- [ ] **Step 2: 注入默认演示用户**

在认证上下文中提供固定演示用户和演示 token，让页面层继续通过 `useAuth()` 取用户信息。

- [ ] **Step 3: 调整退出按钮行为**

避免演示版中出现真正退出后无法继续浏览的问题，可改为无操作或清晰标示“演示版”。

### Task 2: 建立前端演示数据层

**Files:**
- Create: `frontend/src/demo/data.ts`
- Modify: `frontend/src/api/index.ts`

- [ ] **Step 1: 收敛演示数据结构**

在单独文件中提供用户、内容列表、内容详情、游戏列表、游戏题目、聊天示例和报告示例。

- [ ] **Step 2: 保持 API 方法名不变**

让 `contentApi`、`gameApi`、`chatApi`、`reportApi` 的调用方式不变，但直接返回本地 Promise 数据。

- [ ] **Step 3: 清理 401 跳转逻辑**

移除依赖 `/login` 的接口失败跳转，避免静态演示版出现错误跳转。

### Task 3: 修整页面以适配演示版

**Files:**
- Modify: `frontend/src/pages/MuseumPage.tsx`
- Modify: `frontend/src/pages/ContentDetailPage.tsx`
- Modify: `frontend/src/pages/GamePage.tsx`
- Modify: `frontend/src/pages/GamePlayPage.tsx`
- Modify: `frontend/src/pages/CompanionPage.tsx`
- Modify: `frontend/src/pages/ReportPage.tsx`

- [ ] **Step 1: 确保策展馆与详情页直接可用**

保证打开应用即可进入策展馆，详情页能正常显示本地内容。

- [ ] **Step 2: 让健脑营可本地演示**

游戏列表、题目与答题反馈改由本地演示数据支撑。

- [ ] **Step 3: 让陪伴室和报告页不依赖后端**

为聊天回复、报告内容提供本地演示返回，保证页面可看、可点、不报错。

### Task 4: 适配静态发布

**Files:**
- Modify: `frontend/package.json`
- Modify: `frontend/vite.config.ts`
- Create: `frontend/public/404.html`

- [ ] **Step 1: 配置 GitHub Pages 基础路径**

为后续仓库部署预留 `base` 配置入口。

- [ ] **Step 2: 添加路由刷新回退**

提供 `404.html` 以兼容 GitHub Pages 的前端路由刷新。

- [ ] **Step 3: 补充构建脚本**

确保静态构建后产物可直接发布。

### Task 5: 验证静态演示版

**Files:**
- Verify only

- [ ] **Step 1: 运行前端构建**

Run: `npm run build`
Expected: Vite build 成功且输出静态文件

- [ ] **Step 2: 验证打开即进入策展馆**

确认根路径进入策展馆，不再出现登录页。

- [ ] **Step 3: 验证主要页面可浏览**

至少检查策展馆、详情页、健脑营、陪伴室、报告页不报错。
