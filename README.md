# 🌅 dynamic-gradient

A lightweight JavaScript library for creating smooth, customizable, real-time gradients with flexible control over animation speed, direction, and hues.

## UMD (Browser) Usage

```html
<script src="dynamic-gradient.min.js"></script>
<script>
  const gradient = DynamicGradient.init("#hero", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7e5f", "#feb47b"],
  });
</script>
```

## ✨ Features

- 🎨 Smooth color transitions (linear, radial, conic)

- ⚡ Dynamic scheduling (interval-based animation)

- 🔄 Runtime updates (colors, speed, direction)

- 📦 Framework-agnostic — works with plain JS, React, Vue, etc.

- 🖼 Gradient-to-text clipping (textClip)

- 🛠 TypeScript typings

## 🖼️ Basic Usage

```html
<div id="hero" style="height: 300px;"></div>

<script type="module">
  import DynamicGradient from "dynamic-gradient";

  const gradient = DynamicGradient.init("#hero", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7e5f", "#feb47b"],
    transitionDuration: 1000,
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
  });
</script>
```

## ⚙️ API Reference

`DynamicGradient.init(target, options)`
Initialize a gradient on a DOM element.

#### Parameters

- `target`: CSS selector or DOM element
- `options` : configuration object

#### Options:

- `type`: `"linear" | "radial"` (default: `"linear"` )
- `direction`: CSS gradient direction (e.g., `"to right"`, `"45deg"` )
- `colors`: array of color hex values
- `transitionDuration`: time in ms for transitions (default: `1000`)
- `schedule`: optional array of {`time: "HH:MM", colors: []`} objects
- `textClip`: boolean (default: `false`) → applies gradient as background-clip for text

### `stopEffects()`

```js
gradient.stopEffects();
```

### `triggerEffect({ applyColors, duration, hue })`

Overlay temporary effect

```js
gradient.triggerEffect({
  hue: "gold",
  duration: 2000,
});
```

```js
gradient.triggerEffect({
  applyColors: ["#9370dbff", "#4682b4ff"],
  duration: 2000,
});
```

### `persistEffect(colors[], duration)`

Mutate a new gradient smoothly

```js
gradient.persistEffect(["#9370db", "#4682b4"], 2000);
```

### `schedule([{ time: "HH:MM", colors: [] }, ...])`

Allows scheduling of time-based gradients that change automatically throughout the day.

```js
const gradient = DynamicGradient.init("#hero", {
  type: "linear",
  direction: "to right",
  colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"], // default
  schedule: [
    { time: "06:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] }, // morning
    { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] }, // evening
    { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] }, // midnight
  ],
});
```

- `time`: "HH:MM" in `24h format`(e.g. `"06:00"`,`"18:30"` )
- `colors`: array of CSS colors for the gradient

#### Optional per-entry:

- `type`: `"linear"` or `"radial"`
- `direction`: CSS gradient direction(`"to right"`, `"45deg"`, etc.)

#### Behavior

- The most recent matching entry before or equal to the current time will be applied.
- If the time is earlier than the first scheduled entry, it wraps around and uses the last entry.
- The schedule is checked every minute, so changes align with the clock naturally.

### `destroy()`

Stop the gradient animation and clean up.

```js
gradient.destroy();
```

## 🎨 Hue Presets

Some ready-to-use gradient palettes:

```js
hues = {
  sunset: ["#ff7e5f", "#feb47b"],
  ocean: ["#00c6ff", "#0072ff"],
  forest: ["#11998e", "#38ef7d"],
  fire: ["#ff512f", "#dd2476"],
  mono: ["#ffffff", "#000000"],
};
```

Additionally, `triggerEffect` accepts special hue keywords:

- `"white"`, `"black"`, `"gold"`, `"silver"`
- Or any custom hex string (`"#RRGGBB"`)

Usage:

```js
gradient.setGradient({ colors: hues.forest });
```

Or:

```js
gradient.triggerEffect({ hue: "gold", duration: 2000 });
```

## 📦 TypeScript Typings

```ts
// index.d.ts
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
```

## 📄 License

MIT © 2025 — @wakenedo
