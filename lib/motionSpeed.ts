/** Background drift speed — lower `MOTION_TIME` = faster oscillation. */
export const MOTION_TIME = 0.42;

/** Travel distance multiplier for drift / sway amplitudes. */
export const MOTION_AMP = 1.55;

export function T(periodMs: number) {
  return periodMs * MOTION_TIME;
}

export function A(amount: number) {
  return amount * MOTION_AMP;
}
