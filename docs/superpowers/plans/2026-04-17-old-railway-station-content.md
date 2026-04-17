# Old Railway Station Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing “老火车站” museum entry into a story-driven remembrance page centered on sending off and receiving loved ones at the station.

**Architecture:** Reuse the same structured content response pattern already used for “钟楼旧影” and “回民街的泡馍馆”, then specialize the payload for “老火车站” with one cover image, a gallery, and four emotionally sequenced story sections. Keep the current front-end detail layout unchanged so the new content drops into the existing page naturally.

**Tech Stack:** FastAPI, SQLAlchemy, React, TypeScript, Vite, SQLite

---

### Task 1: Research and pin public image sources

**Files:**
- Modify: `E:\codex\Reminiscence Therapy\docs\superpowers\specs\2026-04-17-old-railway-station-content-design.md`
- Modify: `E:\codex\Reminiscence Therapy\backend\app\services\content.py`

- [ ] Step 1: Find 4 publicly reusable railway-station images that fit the “送别与接站” atmosphere.
- [ ] Step 2: Record each direct image URL plus its Commons page URL for attribution.
- [ ] Step 3: Choose one as the cover image and three to four as gallery/story images.

### Task 2: Add the “老火车站” structured payload

**Files:**
- Modify: `E:\codex\Reminiscence Therapy\backend\app\services\content.py`

- [ ] Step 1: Add constants for the “老火车站” title, cover image, gallery images, and four story sections.
- [ ] Step 2: Write long-form nostalgic copy for the four sections:
- [ ] Step 3: “出门送人”
- [ ] Step 4: “站台挥手”
- [ ] Step 5: “回家盼信”
- [ ] Step 6: “接人回站”
- [ ] Step 7: Extend `build_content_response` so this entry returns `cover_image_url`, `gallery`, and `story_sections`.
- [ ] Step 8: Keep all non-enhanced content entries unchanged.

### Task 3: Sync the seeded database record

**Files:**
- Modify: `E:\codex\Reminiscence Therapy\backend\app\main.py`

- [ ] Step 1: Add defaults for the “老火车站” entry including description, cover image, era, region, tags, and emotion tag.
- [ ] Step 2: Update the existing database row on startup if it already exists.
- [ ] Step 3: Leave the current featured-content recommendation order untouched.

### Task 4: Verify front-end rendering compatibility

**Files:**
- Verify: `E:\codex\Reminiscence Therapy\frontend\src\pages\ContentDetailPage.tsx`
- Verify: `E:\codex\Reminiscence Therapy\frontend\src\pages\MuseumPage.tsx`

- [ ] Step 1: Confirm the current detail page already supports cover images, galleries, and story sections for another entry.
- [ ] Step 2: Confirm the list page will show the updated cover image without extra UI work.
- [ ] Step 3: Only patch the front end if the railway-station entry reveals a layout issue.

### Task 5: Verify the content end to end

**Files:**
- Verify: `E:\codex\Reminiscence Therapy\backend`
- Verify: `E:\codex\Reminiscence Therapy\frontend`

- [ ] Step 1: Restart the backend so the updated station content sync runs.
- [ ] Step 2: Log in and fetch the content list plus detail APIs to confirm “老火车站” returns a cover image, gallery, and four story sections.
- [ ] Step 3: Confirm the front-end page still loads through Vite and can open the detail page normally.
- [ ] Step 4: Summarize the exact image sources used in the completion note.
