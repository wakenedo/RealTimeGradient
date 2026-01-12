// index.d.ts

declare module "dynamic-gradient" {
  type GradientType = "linear" | "radial";

  type HuePreset = "white" | "black" | "gold" | "silver" | string;
  // string allows custom hex codes "#RRGGBB"

  interface ScheduleEntry {
    time: string; // "HH:MM" in 24h format
    colors: string[]; // array of CSS color values
  }

  interface GradientOptions {
    type?: GradientType;
    direction?: string;
    colors?: string[];
    transitionDuration?: number;
    schedule?: ScheduleEntry[];
    textClip?: boolean;
  }

  interface EffectOptions {
    applyColors?: string[];
    duration?: number;
    hue?: HuePreset;
  }

  class DynamicGradient {
    constructor(container: string | HTMLElement, options?: GradientOptions);

    static init(
      container: string | HTMLElement,
      options?: GradientOptions
    ): DynamicGradient;

    setGradient(options: {
      colors: string[];
      type?: GradientType;
      direction?: string;
    }): void;

    schedule(entries: ScheduleEntry[]): void;

    triggerEffect(options?: EffectOptions): void;

    persistEffect(colors: string[], duration?: number): void;

    stopEffects(): void;
  }

  export default DynamicGradient;
}
