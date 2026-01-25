export type GradientType = "linear" | "radial";

export type HuePreset = "white" | "black" | "gold" | "silver" | string;

export interface ScheduleEntry {
  time: string;
  colors: string[];
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
  hue?: HuePreset;
}

export class DynamicGradient {
  private container: HTMLElement;
  private options: GradientOptions;

  constructor(container: string | HTMLElement, options: GradientOptions = {}) {
    this.container =
      typeof container === "string"
        ? (document.querySelector(container) as HTMLElement)
        : container;

    this.options = options;
  }

  static init(container: string | HTMLElement, options?: GradientOptions) {
    return new DynamicGradient(container, options);
  }

  setGradient(options: {
    colors: string[];
    type?: GradientType;
    direction?: string;
  }): void {
    // implementation
  }

  schedule(entries: ScheduleEntry[]): void {
    // implementation
  }

  triggerEffect(options?: EffectOptions): void {
    // implementation
  }

  persistEffect(colors: string[], duration?: number): void {
    // implementation
  }

  stopEffects(): void {
    // implementation
  }
}
