"use client";

import { useTransition } from "react";
import { chapterName } from "@/lib/quran/chapter-name";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { QuranChapterMeta } from "@/lib/quran/data";

export function SourateSwitcher({ chapters, current }: { chapters: QuranChapterMeta[]; current: number }) {
  const router = useRouter();
  const [pending,startTransition]=useTransition();

  return (
    <div aria-busy={pending}><Select value={String(current)} onValueChange={(value) => startTransition(()=>router.push(`/coran/${value}`))}>
      <SelectTrigger className="mx-auto w-auto min-w-[16rem]" aria-label="Aller à une autre sourate">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {chapters.map((c) => (
          <SelectItem key={c.number} value={String(c.number)}>
            {c.number}. {chapterName(c)} · {c.nameFrench}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>{pending && <p role="status" className="mt-2 text-xs text-muted">Ouverture de la sourate…</p>}</div>
  );
}
