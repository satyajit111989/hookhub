import { Hook } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import LifecycleBadge from "./LifecycleBadge";

export default function HookCard({ hook }: { hook: Hook }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <div className="flex flex-wrap gap-2">
        <LifecycleBadge lifecycle={hook.lifecycle} />
        <CategoryBadge category={hook.category} />
      </div>

      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">
          {hook.name}
        </h3>
        <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {hook.description}
        </p>
      </div>

      {hook.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {hook.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          by {hook.author}
        </span>
        <a
          href={hook.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          View on GitHub ↗
        </a>
      </div>
    </div>
  );
}
