import { HookCategory } from "@/lib/types";

const COLORS: Record<HookCategory, string> = {
  Security: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Observability: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Notifications: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Formatting: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Testing: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Git: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Session Management": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

export default function CategoryBadge({ category }: { category: HookCategory }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${COLORS[category]}`}>
      {category}
    </span>
  );
}
