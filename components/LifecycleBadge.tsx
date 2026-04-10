import { HookLifecycle } from "@/lib/types";

const COLORS: Record<HookLifecycle, string> = {
  PreToolUse: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  PostToolUse: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  Notification: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Stop: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  SubagentStop: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  SessionStart: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export default function LifecycleBadge({ lifecycle }: { lifecycle: HookLifecycle }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${COLORS[lifecycle]}`}>
      {lifecycle}
    </span>
  );
}
