# 搪瓷缸子 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把“搪瓷缸子”做成完整策展内容，并让已完成的重点内容在推荐页和全部内容页都优先展示。

**Architecture:** 在 `backend/app/services/content.py` 中新增搪瓷缸子故事常量与排序辅助函数，让特殊内容注入和优先排序复用同一处逻辑；在 `backend/app/main.py` 中同步更新旧记录的默认摘要、封面和标签。

**Tech Stack:** FastAPI, SQLAlchemy, Pydantic, SQLite

---

### Task 1: 增加搪瓷缸子故事内容

**Files:**
- Modify: `backend/app/services/content.py`

- [ ] **Step 1: 添加搪瓷缸子常量**

新增标题、封面、画廊图片和 4 段故事正文。

- [ ] **Step 2: 添加 payload 构建函数**

新增 `build_enamel_mug_story_payload()`。

- [ ] **Step 3: 接入内容响应**

在 `build_content_response()` 中对“搪瓷缸子”注入增强内容。

- [ ] **Step 4: 运行语法校验**

Run: `python -m compileall app`
Expected: `Compiling 'app\\services\\content.py'...` 且无报错

### Task 2: 统一内容优先排序

**Files:**
- Modify: `backend/app/services/content.py`

- [ ] **Step 1: 扩展重点内容顺序列表**

把钟楼、回民街、老火车站、城墙根下的早市、搪瓷缸子都加入固定顺序。

- [ ] **Step 2: 新增排序辅助函数**

新增统一函数，把重点内容排前，其余内容保留原顺序。

- [ ] **Step 3: 接入推荐和列表接口**

让 `recommend_contents()` 和 `list_contents()` 都复用同一排序逻辑。

### Task 3: 同步启动默认数据

**Files:**
- Modify: `backend/app/main.py`

- [ ] **Step 1: 导入搪瓷缸子常量**

在 `main.py` 中导入标题和封面。

- [ ] **Step 2: 添加默认配置函数**

新增 `_enamel_mug_defaults()`，定义新的摘要、封面、年代和标签。

- [ ] **Step 3: 启动时同步旧记录**

在 `_seed_data()` 中找到“搪瓷缸子”并回填默认字段。

- [ ] **Step 4: 运行语法校验**

Run: `python -m compileall app`
Expected: `Compiling 'app\\main.py'...` 且无报错

### Task 4: 验证接口与页面

**Files:**
- Verify only

- [ ] **Step 1: 重启后端**

让种子同步重新生效。

- [ ] **Step 2: 验证搪瓷缸子详情**

确认返回 `gallery=4`、`story_sections=4`。

- [ ] **Step 3: 验证推荐与列表顺序**

确认前 5 条顺序符合设计。
