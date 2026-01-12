// Small utility helpers used across modules
export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
export const lerp = (a, b, t) => a + (b - a) * t;

export const invLerp = (a, b, v) => {
  if (a === b) return 0;
  return (v - a) / (b - a);
};

export const map = (v, inMin, inMax, outMin, outMax) => {
  if (Number.isNaN(v)) return outMin;
  return lerp(outMin, outMax, clamp(invLerp(inMin, inMax, v), 0, 1));
};

export const pad2 = (n) => String(Math.floor(n)).padStart(2, "0");

export const hourToClock = (h) => {
  const hourNorm = ((h % 24) + 24) % 24; // normalize negative/overflow
  const hours = Math.floor(hourNorm);
  const mins = Math.floor((hourNorm - hours) * 60);
  return `${pad2(hours)}:${pad2(mins)}`;
};
