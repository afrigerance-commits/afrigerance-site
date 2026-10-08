import { fireEvent,render,screen,waitFor } from "@testing-library/react";
import { expect,it } from "vitest";
import { createRoutine,routineDay } from "@/lib/routine";
import { RoutinePlanner } from "@/components/routine-planner";
it("adapts the daily budget without inventing religious repetition counts",()=>{
 for(const profile of ["homme","femme"] as const)for(const budget of [10,20,40] as const){const tasks=createRoutine(profile,budget);expect(tasks.reduce((sum,t)=>sum+t.minutes,0)).toBe(budget);expect(tasks).toHaveLength(4);}
});
it("restores preferences but clears yesterday's completion",async()=>{
 localStorage.setItem("mirath-routine-v1",JSON.stringify({profile:"femme",minutes:10,day:"2000-01-01",done:["coran"]}));
 const view=render(<RoutinePlanner/>);
 await waitFor(()=>expect(screen.getByRole("button",{name:"Femme"})).toHaveAttribute("aria-pressed","true"));
 expect(screen.getByLabelText("Terminer : Lire et comprendre")).not.toBeChecked();
 fireEvent.click(screen.getByLabelText("Terminer : Lire et comprendre"));
 await waitFor(()=>expect(JSON.parse(localStorage.getItem("mirath-routine-v1")!).done).toEqual(["coran"]));
 expect(JSON.parse(localStorage.getItem("mirath-routine-v1")!).day).toBe(routineDay());
 view.unmount();localStorage.clear();
});
