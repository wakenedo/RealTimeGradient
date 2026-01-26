/** Build CSS gradient string */
function buildGradient(colors, type = "linear", direction = "to right") {
  return type === "linear"
    ? `linear-gradient(${direction}, ${colors.join(",")})`
    : `radial-gradient(circle, ${colors.join(",")})`;
}

/** Create overlay for smooth transitions/effects */
function createOverlay(container, gradient, duration) {
  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 0,
    background: gradient,
    opacity: "0",
    transition: `opacity ${duration}ms ease-in-out`,
  });
  container.appendChild(overlay);
  return overlay;
}

/** Create a pure text overlay for gradient crossfade */
function createTextOverlay(container, gradient, duration) {
  const overlay = document.createElement("span");
  overlay.textContent = container.textContent;

  Object.assign(overlay.style, {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "inline-block",
    background: gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    pointerEvents: "none",
    opacity: "0",
    transition: `opacity ${duration}ms ease-in-out`,
    zIndex: 20,
  });

  const host = container.parentNode;
  if (getComputedStyle(host).position === "static") {
    host.style.position = "relative";
  }

  host.appendChild(overlay);

  // fade new overlay in
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
  });
  return overlay;
}

function ensureTextClipBuffers(container, duration) {
  if (container.__dgTextFx && container.__dgTextFx.duration !== duration) {
    const { a, b } = container.__dgTextFx;
    a.style.transition =
      b.style.transition = `opacity ${duration}ms ease-in-out`;
    container.__dgTextFx.duration = duration;
    return container.__dgTextFx;
  }
  if (container.__dgTextFx) return container.__dgTextFx;

  const host = container.parentNode;
  if (getComputedStyle(host).position === "static") {
    host.style.position = "relative";
  }

  const makeSpan = (z) => {
    const s = document.createElement("span");
    s.textContent = container.textContent; // mirror text
    Object.assign(s.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "inline-block",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
      pointerEvents: "none",
      opacity: "0",
      willChange: "opacity",
      zIndex: z,
      transition: `opacity ${duration}ms ease-in-out`,
    });
    host.appendChild(s);
    return s;
  };

  const a = makeSpan(20); // outgoing
  const b = makeSpan(21); // incoming

  container.__dgTextFx = { a, b, visible: null, duration };
  return container.__dgTextFx;
}

/** Get current time string as HH:MM */
function getCurrentTimeString() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes(),
  ).padStart(2, "0")}`;
}

/** Find active schedule entry for current time */
function getActiveSchedule(scheduleData, currentTime) {
  if (!scheduleData.length) return null;
  let active = scheduleData[0];
  for (let i = 0; i < scheduleData.length; i++) {
    if (currentTime >= scheduleData[i].time) {
      active = scheduleData[i];
    }
  }
  // 🔥 changed: wrap around to last entry if before first time of day
  if (currentTime < scheduleData[0].time) {
    active = scheduleData[scheduleData.length - 1];
  }
  return active;
}

const HUE_PRESETS = {
  white: "#ffffff",
  black: "#000000",
  gold: "#ffe864ff",
  silver: "#d4d4d4ff",
};

class DynamicGradient {
  constructor(container, options = {}) {
    this.container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

    if (!this.container) {
      throw new Error("DynamicGradient: container not found.");
    }

    this.type = options.type || "linear";
    this.direction = options.direction || "to right";
    this.colors = options.colors || ["#1e3c72", "#2a5298"];
    this.transitionDuration = options.transitionDuration ?? 1500;
    this.textClip = options.textClip || false;

    this.scheduleData = options.schedule || [];
    this.currentInterval = null;
    this.lastAppliedKey = null;

    this.container.style.position = this.container.style.position || "relative";

    this.applyGradient(this.colors, this.type, this.direction, false);

    if (this.scheduleData.length > 0) {
      this.schedule(this.scheduleData);
    }
  }

  /** Apply gradient with optional transition */
  applyGradient(
    colors = this.colors,
    type = this.type,
    direction = this.direction,
    withTransition = true,
  ) {
    const newGradient = buildGradient(colors, type, direction);
    const currentGradient = this.container.style.background;

    if (newGradient === currentGradient) return;

    if (this.textClip) {
      const textGradient = createTextOverlay(
        this.container,
        newGradient,
        this.transitionDuration,
      );

      this.container.style.fontWeight = "inherit";
    } else {
      if (withTransition) {
        // 🔥 changed: clear previous overlay before adding a new one
        if (this.transitionOverlay) {
          this.transitionOverlay.remove();
        }
        this.transitionOverlay = createOverlay(
          this.container,
          newGradient,
          this.transitionDuration,
        );
        requestAnimationFrame(() => {
          this.transitionOverlay.style.opacity = "1";
        });
        setTimeout(() => {
          this.container.style.background = newGradient;
          this.transitionOverlay.remove();
          this.transitionOverlay = null;
        }, this.transitionDuration);
      } else {
        this.container.style.background = newGradient;
      }
    }

    this.colors = colors;
    this.type = type;
    this.direction = direction;
  }

  /** Allow toggling text-clip dynamically */
  setTextClip(enabled = true) {
    this.textClip = enabled;
    this.applyGradient(this.colors, this.type, this.direction, false);
  }

  /** Trigger a temporary animated effect */
  triggerEffect({
    applyColors = null,
    duration = this.transitionDuration,
    loop = true,
    hue = "white",
  } = {}) {
    let hueColor;
    if (HUE_PRESETS[hue]) {
      hueColor = HUE_PRESETS[hue];
    } else if (/^#([0-9A-F]{3}){1,2}$/i.test(hue)) {
      hueColor = hue;
    } else {
      hueColor = "#ffffff";
    }

    const gradientTarget = applyColors
      ? buildGradient(applyColors, this.type, this.direction)
      : buildGradient([...this.colors, hueColor], this.type, this.direction);

    if (this.textClip) {
      const buffers = ensureTextClipBuffers(this.container, duration);
      const run = () => {
        const { a, b, visible } = buffers;
        const incoming = visible === "a" ? b : a;

        const gradientTarget = applyColors
          ? buildGradient(applyColors, this.type, this.direction)
          : buildGradient(
              [...this.colors, HUE_PRESETS[hue] || hueColor],
              this.type,
              this.direction,
            );

        incoming.style.background = gradientTarget;
        incoming.style.backgroundClip = "text";
        incoming.style.transition = `opacity ${duration}ms ease-in-out`;
        incoming.style.opacity = "0";

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            incoming.style.opacity = "1";
          });
        });

        setTimeout(() => {
          incoming.style.opacity = "0";
        }, duration);

        buffers.visible = incoming === a ? "a" : "b";

        if (loop) {
          if (this.effectLoopTimeout) clearTimeout(this.effectLoopTimeout);
          this.effectLoopTimeout = setTimeout(run, duration * 2);
        } else {
          setTimeout(() => {
            this.applyGradient(
              applyColors || this.colors,
              this.type,
              this.direction,
              false,
            );
            a.style.opacity = "0";
            b.style.opacity = "0";
          }, duration * 2);
        }
      };
      run();
      return;
    }

    if (!this.effectOverlay) {
      this.effectOverlay = createOverlay(
        this.container,
        gradientTarget,
        duration,
      );
    }

    const overlay = this.effectOverlay;
    const runTransition = () => {
      overlay.style.background = gradientTarget;
      overlay.style.opacity = "1";
      setTimeout(() => {
        overlay.style.opacity = "0";
      }, duration);
    };

    if (this.effectRunning) return;
    this.effectRunning = true;

    runTransition();

    if (loop) {
      if (this.effectLoopInterval) clearInterval(this.effectLoopInterval);
      this.effectLoopInterval = setInterval(runTransition, duration * 2);
    } else {
      setTimeout(() => {
        overlay.remove();
        this.effectOverlay = null;
      }, duration * 2);
    }
  }

  persistEffect(applyColors = this.colors, duration = this.transitionDuration) {
    const targetGradient = buildGradient(
      applyColors,
      this.type,
      this.direction,
    );
    if (this.textClip) {
      const textOverlay = createTextOverlay(
        this.container,
        targetGradient,
        duration,
      );
      requestAnimationFrame(() => {
        textOverlay.style.opacity = "1";
      });
      setTimeout(() => {
        this.applyGradient(applyColors, this.type, this.direction, false);
      }, duration);
    } else {
      const overlay = createOverlay(this.container, targetGradient, duration);
      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
      });
      setTimeout(() => {
        this.applyGradient(applyColors, this.type, this.direction, false);
        overlay.remove();
      }, duration);
    }
  }

  stopEffects() {
    if (this.effectLoopInterval) {
      clearInterval(this.effectLoopInterval);
      this.effectLoopInterval = null;
    }
    if (this.effectLoopTimeout) {
      clearTimeout(this.effectLoopTimeout);
      this.effectLoopTimeout = null;
    }
    this.effectRunning = false;
  }

  // ✅ added: cleanup method to prevent leaks
  destroy() {
    this.stopEffects();
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
    if (this.transitionOverlay) {
      this.transitionOverlay.remove();
      this.transitionOverlay = null;
    }
    if (this.effectOverlay) {
      this.effectOverlay.remove();
      this.effectOverlay = null;
    }
  }

  setGradient({ colors, type, direction }) {
    const newColors = colors || this.colors;
    const newType = type || this.type;
    const newDirection = direction || this.direction;

    if (
      newColors.join(",") === this.colors.join(",") &&
      newType === this.type &&
      newDirection === this.direction
    ) {
      return;
    }
    this.applyGradient(newColors, newType, newDirection, true);
  }

  schedule(entries = []) {
    this.scheduleData = entries
      .map((e) => ({
        ...e,
        time: e.time.padStart(5, "0"),
      }))
      .sort((a, b) => a.time.localeCompare(b.time));

    if (this.currentInterval) clearInterval(this.currentInterval);

    this.checkSchedule();
    this.currentInterval = setInterval(() => this.checkSchedule(), 60 * 1000);
  }

  checkSchedule() {
    const currentTime = getCurrentTimeString();
    const active = getActiveSchedule(this.scheduleData, currentTime);
    if (active) {
      const key = `${active.time}-${active.colors.join(",")}`;
      if (key !== this.lastAppliedKey) {
        this.setGradient(active);
        this.lastAppliedKey = key;
      }
    }
  }

  static init(container, options) {
    return new DynamicGradient(container, options);
  }
}

export default DynamicGradient;
