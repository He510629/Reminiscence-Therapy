# Clocktower Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing "钟楼旧影" museum entry into a story-driven, multi-era experience with real images and long-form nostalgic copy.

**Architecture:** Keep "钟楼旧影" as a single content item, extend content payloads with optional structured story metadata, and render that metadata only in the detail page while preserving current list behavior. Store the upgraded story in backend seed/sync logic so the running database is updated consistently.

**Tech Stack:** FastAPI, SQLAlchemy, React, TypeScript, Vite, SQLite

---

### Task 1: Add structured story metadata to content responses

**Files:**
- Modify: `E:\codex\Reminiscence Therapy\backend\app\schemas\content.py`
- Modify: `E:\codex\Reminiscence Therapy\backend\app\services\content.py`

- [ ] Step 1: Add optional story metadata schemas to `content.py`.
- [ ] Step 2: Return parsed story metadata from content responses without breaking existing list/detail consumers.
- [ ] Step 3: Verify the backend can still serialize normal content items.

### Task 2: Add seed/sync logic for the upgraded "钟楼旧影" item

**Files:**
- Modify: `E:\codex\Reminiscence Therapy\backend\app\main.py`
- Modify: `E:\codex\Reminiscence Therapy\backend\yiwangkailai.db` (runtime data update)

- [ ] Step 1: Add a helper that builds the upgraded "钟楼旧影" content payload with cover image, gallery, and story sections.
- [ ] Step 2: During startup, update the existing "钟楼旧影" row if it already exists; otherwise create it.
- [ ] Step 3: Keep the rest of the seed data unchanged.

### Task 3: Render real cover images in the museum list

**Files:**
- Modify: `E:\codex\Reminiscence Therapy\frontend\src\pages\MuseumPage.tsx`

- [ ] Step 1: Replace the placeholder block with a real image when `thumbnail_url` or `media_url` is present.
- [ ] Step 2: Keep the fallback icon for entries that still have no image.
- [ ] Step 3: Verify the list card remains readable on mobile widths.

### Task 4: Render multi-era story sections in the content detail page

**Files:**
- Modify: `E:\codex\Reminiscence Therapy\frontend\src\pages\ContentDetailPage.tsx`

- [ ] Step 1: Extend the detail page type definitions to accept optional gallery and story sections.
- [ ] Step 2: Render a cover image, sectioned story content, and supporting images in reading order.
- [ ] Step 3: Make the朗读 button read the full story text when structured sections exist.
- [ ] Step 4: Keep backward compatibility for ordinary content items.

### Task 5: Verify running behavior end to end

**Files:**
- Verify: `E:\codex\Reminiscence Therapy\frontend`
- Verify: `E:\codex\Reminiscence Therapy\backend`

- [ ] Step 1: Restart backend so the upgraded content sync runs.
- [ ] Step 2: Open the front-end museum page and confirm "钟楼旧影" shows a real image.
- [ ] Step 3: Open the detail page and confirm multiple images plus long-form story content appear.
- [ ] Step 4: Confirm the app still logs in and the museum section remains navigable.
