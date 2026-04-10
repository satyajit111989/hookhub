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
  id: string;
  name: string;
  category: HookCategory;
  lifecycle: HookLifecycle;
  description: string;
  repoUrl: string;
  author: string;
  tags: string[];
}
