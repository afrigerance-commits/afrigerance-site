export interface MemorizationSettings { from: number; to: number; repetitions: number; delay: number }
export function validMemorization(s: MemorizationSettings, numbers: number[]) {
  return numbers.includes(s.from) && numbers.includes(s.to) && s.from <= s.to && Number.isInteger(s.repetitions) && s.repetitions >= 1 && s.repetitions <= 10 && Number.isInteger(s.delay) && s.delay >= 0 && s.delay <= 30;
}
export function memorizationNext(s: MemorizationSettings, current: number, completed: number, numbers: number[]) {
  if (current < s.from || current > s.to) return null;
  if (completed < s.repetitions) return { verse: current, completed };
  const next = numbers[numbers.indexOf(current) + 1];
  return next !== undefined && next <= s.to ? { verse: next, completed: 0 } : null;
}
