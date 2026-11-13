/** Background drift speed — lower `MOTION_TIME` = faster oscillation. */
export const MOTION_TIME = 0.58;

export function T(periodMs: number) {
  return periodMs * MOTION_TIME;
}
