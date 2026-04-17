# 老城墙下 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把“城墙根下的早市”升级成多图、多段故事的“老城墙下”策展内容，并在启动时同步旧数据。

**Architecture:** 继续沿用 `backend/app/services/content.py` 中的特殊内容注入模式，在内容响应阶段为目标条目补齐封面、画廊和故事段落；在 `backend/app/main.py` 启动种子逻辑里同步默认摘要与封面，确保已有数据库记录也能更新。

**Tech Stack:** FastAPI, SQLAlchemy, Pydantic, SQLite

---

### Task 1: 定义城墙故事内容常量

**Files:**
- Modify: `backend/app/services/content.py`

- [ ] **Step 1: 添加标题、封面、画廊和故事常量**

在 `content.py` 中新增“城墙根下的早市”对应的封面图、4 张画廊图片和 4 段故事正文，结构与钟楼、回民街、老火车站一致。

- [ ] **Step 2: 添加故事 payload 构建函数**

新增 `build_city_wall_story_payload()`，返回 `cover_image_url`、`gallery`、`story_sections` 三个字段。

- [ ] **Step 3: 接入内容响应构建逻辑**

在 `build_content_response()` 中，当 `content.title` 为“城墙根下的早市”时注入这组扩展内容。

- [ ] **Step 4: 运行语法校验**

Run: `python -m compileall app`
Expected: `Compiling 'app\\services\\content.py'...` 且无报错

### Task 2: 同步启动种子数据

**Files:**
- Modify: `backend/app/main.py`

- [ ] **Step 1: 导入城墙内容常量**

在 `main.py` 顶部导入新增的标题和封面常量。

- [ ] **Step 2: 新增默认配置函数**

添加 `_city_wall_defaults()`，定义摘要、封面、年代范围、区域、标签和情绪标签。

- [ ] **Step 3: 启动时同步更新旧记录**

在 `_seed_data()` 中查找“城墙根下的早市”，并像钟楼、回民街、老火车站一样执行字段回填。

- [ ] **Step 4: 再次运行语法校验**

Run: `python -m compileall app`
Expected: `Compiling 'app\\main.py'...` 且无报错

### Task 3: 验证内容可访问

**Files:**
- Verify only

- [ ] **Step 1: 重启后端服务**

确保生命周期逻辑重新执行种子同步。

- [ ] **Step 2: 调用内容接口验证**

确认“城墙根下的早市”详情返回：

- `gallery=4`
- `story_sections=4`
- `cover_image_url` 为新的 Wikimedia 图片

- [ ] **Step 3: 访问策展页验证可用**

确认前端策展页可以正常打开。
