"use client";

import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { QuranChapterMeta } from "@/lib/quran/data";

export function SourateSwitcher({ chapters, current }: { chapters: QuranChapterMeta[]; current: number }) {
  const router = useRouter();

  return (
    <Select value={String(current)} onValueChange={(value) => router.push(`/coran/${value}`)}>
      <SelectTrigger className="mx-auto w-auto min-w-[16rem]" aria-label="Aller à une autre sourate">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {chapters.map((c) => (
          <SelectItem key={c.number} value={String(c.number)}>
            {c.number}. {c.nameFrench} ({c.nameTransliteration})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
