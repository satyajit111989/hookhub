# HookHub MVP — Spec

## 1. Project Overview

HookHub is a read-only, statically-rendered web directory for browsing open-source Claude Code hooks. It gives developers a fast way to discover lifecycle hooks from the community — what they do, which event they target, and where to find the source — without requiring authentication, a backend, or any runtime data fetching.

**Problem:** Claude Code hook repositories are scattered across GitHub with no central browsing surface.

**MVP goal:** Render a filterable grid of curated hooks from a static TypeScript data file.

---

## 2. MVP Scope

### In scope
- Single home page with all hooks in a responsive card grid
- Filter bar to narrow hooks by category
- Each card shows: name, lifecycle event, category, short description, "View on GitHub" link
- Static data file (`lib/hooks-data.ts`) as the sole data source
- Dark-mode support (already wired in `globals.css`)
- TypeScript types for the Hook entity

### Out of scope
- User submissions or contribution forms
- Authentication or user accounts
- Keyword/text search
- Hook detail pages (`/hooks/[slug]`)
- Database or CMS backend
- Pagination
- Rating, voting, or bookmarking
- Install scripts or copy-to-clipboard

---

## 3. Data Model

```ts
// lib/types.ts

export type HookLifecycle =
  | "PreToolUse"
  | "PostToolUse"
  | "Notification"
  | "Stop"
  | "SubagentStop"
  | "SessionStart";

export type HookCategory =
  | "Security"
  | "Observability"
  | "Notifications"
  | "Formatting"
  | "Testing"
  | "Git"
  | "Session Management";

export interface Hook {
  id: string;            // kebab-case slug, unique
  name: string;          // Display name
  category: HookCategory;
  lifecycle: HookLifecycle;
  description: string;   // 1-2 sentences
  repoUrl: string;       // Full GitHub URL
  author: string;        // GitHub username
  tags: string[];        // Optional free-form tags
}
```

---

## 4. Hook Categories

| Category | Description | Source repo |
|---|---|---|
| Security | Block/warn on dangerous shell commands | disler/claude-code-hooks-mastery |
| Observability | Log events, trace agent activity | disler/claude-code-hooks-multi-agent-observability |
| Notifications | Sound or desktop alerts | varun86/awesome-claude-code-sounds |
| Formatting | Auto-format files after edits | karanb192/claude-code-hooks |
| Testing | Run tests automatically after code changes | rohitg00/awesome-claude-code-toolkit |
| Git | Auto-commit, push, or log on session events | ChrisWiles/claude-code-showcase |
| Session Management | Workspace setup, env loading at session start | pascalporedda/awesome-claude-code |

---

## 5. Pages & Routes

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Full hook directory: header, filter bar, hook grid |

Single-route MVP. No detail pages. No nested layouts beyond `app/layout.tsx`.

---

## 6. UI Component Breakdown

```
components/
  SiteHeader.tsx        — wordmark, tagline, GitHub link (Server Component)
  CategoryFilter.tsx    — pill filter buttons ("use client" — owns selectedCategory state)
  HookGrid.tsx          — grid wrapper, renders HookCard for each hook (Server Component)
  HookCard.tsx          — single hook card display (Server Component)
  CategoryBadge.tsx     — coloured pill for category (Server Component, reusable)
  LifecycleBadge.tsx    — pill for lifecycle event (Server Component, reusable)

lib/
  types.ts              — Hook, HookLifecycle, HookCategory types
  hooks-data.ts         — static Hook[] array, the sole data source
```

### Data flow

`app/page.tsx` is a Client Component (`"use client"`). It imports `HOOKS` from `lib/hooks-data.ts`, holds `selectedCategory` state, derives the filtered list, and renders `SiteHeader` → `CategoryFilter` → `HookGrid`.

### Grid layout
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

### HookCard content
Name (bold) · LifecycleBadge · CategoryBadge · description · tags · author · "View on GitHub" link (`target="_blank" rel="noopener noreferrer"`)

---

## 7. Seed Data (10 hooks for `lib/hooks-data.ts`)

| id | name | category | lifecycle | author |
|---|---|---|---|---|
| dangerous-command-blocker | Dangerous Command Blocker | Security | PreToolUse | disler |
| security-validator | Security Validator | Security | PreToolUse | disler |
| multi-agent-monitor | Multi-Agent Observability Monitor | Observability | PostToolUse | disler |
| sound-notify-macos | macOS Sound Notification | Notifications | Notification | varun86 |
| sound-notify-cross-platform | Cross-Platform Sound Notification | Notifications | Stop | varun86 |
| auto-format-prettier | Auto Prettier Format | Formatting | PostToolUse | karanb192 |
| auto-test-runner | Auto Test Runner | Testing | PostToolUse | rohitg00 |
| typescript-type-check | TypeScript Type-Safe Hook Runner | Formatting | PostToolUse | johnlindquist |
| auto-git-commit | Auto Git Commit on Stop | Git | Stop | ChrisWiles |
| session-env-loader | Session Environment Loader | Session Management | SessionStart | pascalporedda |

### Full seed data with descriptions

```ts
// lib/hooks-data.ts
export const HOOKS: Hook[] = [
  {
    id: "dangerous-command-blocker",
    name: "Dangerous Command Blocker",
    category: "Security",
    lifecycle: "PreToolUse",
    description:
      "Intercepts Bash tool calls and blocks execution of destructive commands such as rm -rf, shutdown, and format. Exits with a non-zero code to halt the agent.",
    repoUrl: "https://github.com/disler/claude-code-hooks-mastery",
    author: "disler",
    tags: ["bash", "security", "validation"],
  },
  {
    id: "security-validator",
    name: "Security Validator",
    category: "Security",
    lifecycle: "PreToolUse",
    description:
      "Validates file paths and command arguments against an allowlist before any tool is executed. Prevents path traversal and execution outside the workspace.",
    repoUrl: "https://github.com/disler/claude-code-hooks-mastery",
    author: "disler",
    tags: ["bash", "security", "allowlist"],
  },
  {
    id: "multi-agent-monitor",
    name: "Multi-Agent Observability Monitor",
    category: "Observability",
    lifecycle: "PostToolUse",
    description:
      "Logs every tool call and its result to a structured JSON stream for real-time monitoring of multi-agent Claude Code pipelines.",
    repoUrl: "https://github.com/disler/claude-code-hooks-multi-agent-observability",
    author: "disler",
    tags: ["json", "logging", "monitoring"],
  },
  {
    id: "sound-notify-macos",
    name: "macOS Sound Notification",
    category: "Notifications",
    lifecycle: "Notification",
    description:
      "Plays a system sound using the macOS afplay command when Claude Code sends a notification event, giving audio feedback without requiring focus.",
    repoUrl: "https://github.com/varun86/awesome-claude-code-sounds",
    author: "varun86",
    tags: ["macos", "sound", "afplay"],
  },
  {
    id: "sound-notify-cross-platform",
    name: "Cross-Platform Sound Notification",
    category: "Notifications",
    lifecycle: "Stop",
    description:
      "Detects the host OS (macOS, Linux, Windows) and plays an appropriate completion sound when an agent session ends.",
    repoUrl: "https://github.com/varun86/awesome-claude-code-sounds",
    author: "varun86",
    tags: ["cross-platform", "sound", "bash"],
  },
  {
    id: "auto-format-prettier",
    name: "Auto Prettier Format",
    category: "Formatting",
    lifecycle: "PostToolUse",
    description:
      "Runs Prettier on any file written or edited by Claude Code immediately after the Write tool completes, keeping code style consistent.",
    repoUrl: "https://github.com/karanb192/claude-code-hooks",
    author: "karanb192",
    tags: ["prettier", "formatting", "node"],
  },
  {
    id: "auto-test-runner",
    name: "Auto Test Runner",
    category: "Testing",
    lifecycle: "PostToolUse",
    description:
      "Detects when a test file is modified and automatically executes the relevant test suite, surfacing failures directly in the Claude Code output.",
    repoUrl: "https://github.com/rohitg00/awesome-claude-code-toolkit",
    author: "rohitg00",
    tags: ["testing", "jest", "vitest"],
  },
  {
    id: "typescript-type-check",
    name: "TypeScript Type-Safe Hook Runner",
    category: "Formatting",
    lifecycle: "PostToolUse",
    description:
      "TypeScript-based hook scaffold that provides full type safety for hook event payloads, making it easier to write and maintain hooks with IDE support.",
    repoUrl: "https://github.com/johnlindquist/claude-hooks",
    author: "johnlindquist",
    tags: ["typescript", "types", "scaffold"],
  },
  {
    id: "auto-git-commit",
    name: "Auto Git Commit on Stop",
    category: "Git",
    lifecycle: "Stop",
    description:
      "Stages all modified tracked files and creates a git commit with a timestamped message whenever a Claude Code session stops cleanly.",
    repoUrl: "https://github.com/ChrisWiles/claude-code-showcase",
    author: "ChrisWiles",
    tags: ["git", "commit", "automation"],
  },
  {
    id: "session-env-loader",
    name: "Session Environment Loader",
    category: "Session Management",
    lifecycle: "SessionStart",
    description:
      "Loads project-specific environment variables and toolchain versions from a .claude-session config file at the start of every session.",
    repoUrl: "https://github.com/pascalporedda/awesome-claude-code",
    author: "pascalporedda",
    tags: ["session", "env", "config"],
  },
];
```

---

## 8. Tech Stack

| Concern | Technology |
|---|---|
| Framework | Next.js 16.2.3 (App Router) |
| UI | React 19.2.4 (Server Components by default) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 (`@import "tailwindcss"`) |
| Fonts | Geist Sans + Geist Mono (via `layout.tsx`) |
| Data | Static TypeScript array — no database, no API |
| Path alias | `@/*` → project root |

**No new npm dependencies required for MVP.**

---

## 9. Target File Tree

```
hookhub/
  app/
    globals.css          (no changes)
    layout.tsx           (update: title → "HookHub")
    page.tsx             (replace boilerplate with HookDirectory)
  components/
    SiteHeader.tsx
    CategoryFilter.tsx
    HookGrid.tsx
    HookCard.tsx
    CategoryBadge.tsx
    LifecycleBadge.tsx
  lib/
    types.ts
    hooks-data.ts
  next.config.ts         (no changes)
  package.json           (no changes)
```

---

## 10. Post-MVP Ideas

- Keyword search (debounced client-side filter on name + description)
- Lifecycle event filter (second filter row alongside category)
- Hook detail pages (`app/hooks/[id]/page.tsx`)
- GitHub PR-based submission flow so contributors can add hooks without a backend
- Copy-to-clipboard install helper
- Build-time import from `hesreallyhim/awesome-claude-code`
