/** Some engines expose NaN/Infinity until metadata is loaded. */
export function mediaPosition(duration: number, currentTime: number, playbackRate = 1): MediaPositionState | undefined {
  if (!Number.isFinite(duration) || duration <= 0 || !Number.isFinite(currentTime) || !Number.isFinite(playbackRate) || playbackRate <= 0) return;
  return { duration, position: Math.max(0, Math.min(currentTime, duration)), playbackRate };
}
