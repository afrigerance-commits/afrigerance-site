import {it,expect} from "vitest";
import {mediaPosition} from "@/lib/quran/media-position";
it("does not send invalid metadata to lock-screen controls",()=>{expect(mediaPosition(NaN,1)).toBeUndefined();expect(mediaPosition(Infinity,1)).toBeUndefined();expect(mediaPosition(20,NaN)).toBeUndefined();expect(mediaPosition(20,1,0)).toBeUndefined();expect(mediaPosition(20,99)).toEqual({duration:20,position:20,playbackRate:1});});
