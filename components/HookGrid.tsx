import { Hook } from "@/lib/types";
import HookCard from "./HookCard";

export default function HookGrid({ hooks }: { hooks: Hook[] }) {
  if (hooks.length === 0) {
    return (
      <p className="text-center text-zinc-500 dark:text-zinc-400 py-16">
        No hooks found for this category.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {hooks.map((hook) => (
        <HookCard key={hook.id} hook={hook} />
      ))}
    </div>
  );
}
