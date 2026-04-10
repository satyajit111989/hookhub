"use client";

import { useState } from "react";
import { HOOKS, CATEGORIES } from "@/lib/hooks-data";
import { HookCategory } from "@/lib/types";
import SiteHeader from "@/components/SiteHeader";
import CategoryFilter from "@/components/CategoryFilter";
import HookGrid from "@/components/HookGrid";

export default function Home() {
  const [selected, setSelected] = useState<HookCategory | null>(null);

  const filtered = selected ? HOOKS.filter((h) => h.category === selected) : HOOKS;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {filtered.length} hook{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <CategoryFilter
          categories={CATEGORIES}
          selected={selected}
          onChange={setSelected}
        />
        <HookGrid hooks={filtered} />
      </main>
    </div>
  );
}
