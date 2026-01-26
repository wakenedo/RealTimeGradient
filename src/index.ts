import DynamicGradientRuntime from "./RealTimeGradient/realTimeGradient.js";

// ---- public types ----
export type GradientType = "linear" | "radial";

export interface ScheduleEntry {
  time: string;
  colors: string[];
  type?: GradientType;
  direction?: string;
}

export interface GradientOptions {
  type?: GradientType;
  direction?: string;
  colors?: string[];
  transitionDuration?: number;
  schedule?: ScheduleEntry[];
  textClip?: boolean;
}

export interface EffectOptions {
  applyColors?: string[];
  duration?: number;
  hue?: "white" | "black" | "gold" | "silver" | string;
  loop?: boolean;
}

// 🔗 attach types to runtime symbol
export const DynamicGradient = DynamicGradientRuntime as unknown as {
  new (container: string | HTMLElement, options?: GradientOptions): any;
  init(container: string | HTMLElement, options?: GradientOptions): any;
};
