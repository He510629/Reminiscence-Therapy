# Muslim Street Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing "回民街的泡馍馆" museum entry into a story-driven, day-in-the-street experience with real images and long-form nostalgic copy.

**Architecture:** Reuse the structured content response approach already added for "钟楼旧影", but specialize the payload for "回民街的泡馍馆" with a cover image, gallery, and four time-of-day story sections. Keep the list page behavior unchanged except for real image rendering, and let the detail page reuse the existing rich story layout.

**Tech Stack:** FastAPI, SQLAlchemy, React, TypeScript, Vite, SQLite

---

### Task 1: Add a structured payload for "回民街的泡馍馆"

**Files:**
- Modify: `E:\codex\Reminiscence Therapy\backend\app\services\content.py`

- [ ] Step 1: Add constants for the Muslim Street title, cover image, gallery images, and time-of-day story sections.
- [ ] Step 2: Extend the content response builder so this entry returns `cover_image_url`, `gallery`, and `story_sections`.
- [ ] Step 3: Keep ordinary content entries unchanged.

### Task 2: Sync the runtime database entry

**Files:**
- Modify: `E:\codex\Reminiscence Therapy\backend\app\main.py`
- Modify: `E:\codex\Reminiscence Therapy\backend\yiwangkailai.db` (runtime data update)

- [ ] Step 1: Add default summary, cover image, era, region, and tags for "回民街的泡馍馆".
- [ ] Step 2: Update the existing row on startup if it already exists.
- [ ] Step 3: Leave all other seed data intact.

### Task 3: Reuse the detail page for street storytelling

**Files:**
- Verify: `E:\codex\Reminiscence Therapy\frontend\src\pages\ContentDetailPage.tsx`
- Verify: `E:\codex\Reminiscence Therapy\frontend\src\pages\MuseumPage.tsx`

- [ ] Step 1: Confirm the current detail page can already render cover images, galleries, and story sections.
- [ ] Step 2: Confirm the museum list card shows real images for entries with `thumbnail_url` or `media_url`.
- [ ] Step 3: Only patch the front end if the Muslim Street entry needs extra formatting.

### Task 4: Verify the new content end to end

**Files:**
- Verify: `E:\codex\Reminiscence Therapy\frontend`
- Verify: `E:\codex\Reminiscence Therapy\backend`

- [ ] Step 1: Restart the backend so the Muslim Street sync runs.
- [ ] Step 2: Fetch the content list and detail APIs to confirm the entry returns a gallery plus four story sections.
- [ ] Step 3: Open the front-end page and confirm the museum entry remains accessible through the existing login flow.
- [ ] Step 4: Confirm the detail page module compiles through Vite.
