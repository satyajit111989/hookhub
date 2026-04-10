import { Hook } from "./types";

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

export const CATEGORIES = Array.from(new Set(HOOKS.map((h) => h.category)));
