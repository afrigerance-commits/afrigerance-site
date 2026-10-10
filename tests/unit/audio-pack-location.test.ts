import { expect, it } from "vitest";
import { audioPackLocation } from "@/lib/quran/audio-pack-location";
import { getPartitions } from "@/lib/quran/partitions";
it("reopens every downloaded Juz and Hizb at its exact partition",()=>{
  for (const type of ["juz","hizb"] as const) for (const part of getPartitions(type)) {
    const location=audioPackLocation({chapter:part.start.chapter,first:part.first,last:part.last});
    expect(location.href).toBe(`/coran/lecture/${type}/${part.number}`);
  }
});
it("reopens partial chapters at their start verse, with safe fallback for legacy metadata",()=>{
  expect(audioPackLocation({chapter:2,first:8,last:20}).href).toBe("/coran/2#verset-1");
  expect(audioPackLocation({chapter:999,first:NaN,last:Infinity}).href).toBe("/coran/1");
});
