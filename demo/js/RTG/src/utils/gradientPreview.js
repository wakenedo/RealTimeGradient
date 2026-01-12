import DynamicGradient from "../../../../../src/RealTimeGradient/realTimeGradient.js";
import {
  getLocalHour,
  updateTimeDisplay,
  getPaletteForTime,
} from "../../../../../src/RealTimeGradient/utils/index.js";

export function init() {
  const slider = document.getElementById("time-slider");
  const readout = document.getElementById("time-readout");
  const nowBtn = document.getElementById("now-btn");

  const typeSelect = document.getElementById("gradient-type");
  const angleInput = document.getElementById("gradient-angle");

  const paletteContainer = document.getElementById("palette-sections");
  const addSectionBtn = document.getElementById("add-section");

  // Default scheduled palettes
  let palettes = [
    {
      name: "Dawn",
      start: 5, // 5:00
      end: 7, // 7:00
      top: "#ff9a9e", // warm dawn pink
      mid: "#fad0c4", // soft orange/peach
      bottom: "#fbc2eb", // faint violet
    },
    {
      name: "Morning",
      start: 7,
      end: 11,
      top: "#FFD194", // soft sunlight gold
      mid: "#D1913C", // deeper orange
      bottom: "#FFB347", // sunrise amber
    },
    {
      name: "Noon",
      start: 11,
      end: 16, // mid-afternoon
      top: "#3182c9", // strong sky blue
      mid: "#a0faff", // bright cyan
      bottom: "#52bbdb", // aqua
    },
    {
      name: "Evening",
      start: 16,
      end: 20,
      top: "#ff7e5f", // sunset orange
      mid: "#feb47b", // peach
      bottom: "#fd746c", // reddish dusk
    },
    {
      name: "Night",
      start: 20,
      end: 5, // wraps past midnight
      top: "#141E30", // deep navy
      mid: "#243B55", // twilight blue
      bottom: "#1E2B44", // almost black
    },
  ];

  // Initialize DynamicGradient instance
  const gradient = DynamicGradient.init("#gradient-container", {
    type: "linear",
    direction: "180deg",
    colors: ["#fdfdfd", "#ffffff"],
    transitionDuration: 1500,
  });

  // --- Apply gradient via API ---
  function updateGradient(hour) {
    const palette = getPaletteForTime(palettes, hour);

    gradient.setGradient({
      colors: [palette.top, palette.mid, palette.bottom],
      type: typeSelect.value,
      direction: `${angleInput.value}deg`,
    });
  }

  // --- Slider ---
  function updateSlider() {
    const time = parseFloat(slider.value);
    updateTimeDisplay(readout, time);
    updateGradient(time);
  }

  // --- Palette UI (unchanged except calls updateGradient) ---
  function renderPaletteSections() {
    paletteContainer.innerHTML = "";
    palettes.forEach((sec, index) => {
      const div = document.createElement("div");
      div.className = "palette-section";

      div.innerHTML = `
        <strong class="palette-title">${sec.name}</strong>
        <div class="palette-preview" id="preview-${index}"></div>
        
        <div class="palette-time">
          <label>
            Start hour:
            <input type="number" min="0" max="24" value="${sec.start}" 
                   data-index="${index}" class="start-hour" />
          </label>
          <label>
            End hour:
            <input type="number" min="0" max="24" value="${sec.end}" 
                   data-index="${index}" class="end-hour" />
          </label>
        </div>
  
        <label>Top color:
          <input type="color" value="${sec.top}" data-index="${index}" class="color-top">
        </label>
        <label>Mid color:
          <input type="color" value="${sec.mid}" data-index="${index}" class="color-mid">
        </label>
        <label>Bottom color:
          <input type="color" value="${sec.bottom}" data-index="${index}" class="color-bottom">
        </label>
        
        <button data-index="${index}" class="remove-section btn">Remove</button>
        <hr/>
      `;
      paletteContainer.appendChild(div);

      // Initial mini preview
      const preview = div.querySelector(`#preview-${index}`);
      preview.style.background = `linear-gradient(180deg, ${sec.top} 0%, ${sec.mid} 60%, ${sec.bottom} 100%)`;
    });

    // Bind inputs (same as before)...
    paletteContainer.querySelectorAll(".start-hour").forEach((input) => {
      input.addEventListener("input", (e) => {
        const i = e.target.dataset.index;
        palettes[i].start = parseFloat(e.target.value);
        updateGradient(parseFloat(slider.value));
      });
    });
    paletteContainer.querySelectorAll(".end-hour").forEach((input) => {
      input.addEventListener("input", (e) => {
        const i = e.target.dataset.index;
        palettes[i].end = parseFloat(e.target.value);
        updateGradient(parseFloat(slider.value));
      });
    });
    paletteContainer.querySelectorAll(".color-top").forEach((input) => {
      input.addEventListener("input", (e) => {
        const i = e.target.dataset.index;
        palettes[i].top = e.target.value;
        document.getElementById(
          `preview-${i}`
        ).style.background = `linear-gradient(180deg, ${palettes[i].top} 0%, ${palettes[i].mid} 60%, ${palettes[i].bottom} 100%)`;
        updateGradient(parseFloat(slider.value));
      });
    });
    paletteContainer.querySelectorAll(".color-mid").forEach((input) => {
      input.addEventListener("input", (e) => {
        const i = e.target.dataset.index;
        palettes[i].mid = e.target.value;
        document.getElementById(
          `preview-${i}`
        ).style.background = `linear-gradient(180deg, ${palettes[i].top} 0%, ${palettes[i].mid} 60%, ${palettes[i].bottom} 100%)`;
        updateGradient(parseFloat(slider.value));
      });
    });
    paletteContainer.querySelectorAll(".color-bottom").forEach((input) => {
      input.addEventListener("input", (e) => {
        const i = e.target.dataset.index;
        palettes[i].bottom = e.target.value;
        document.getElementById(
          `preview-${i}`
        ).style.background = `linear-gradient(180deg, ${palettes[i].top} 0%, ${palettes[i].mid} 60%, ${palettes[i].bottom} 100%)`;
        updateGradient(parseFloat(slider.value));
      });
    });

    paletteContainer.querySelectorAll(".remove-section").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const i = e.target.dataset.index;
        palettes.splice(i, 1);
        renderPaletteSections();
        updateGradient(parseFloat(slider.value));
      });
    });
  }

  // Add section button
  addSectionBtn.addEventListener("click", () => {
    const newSection = {
      name: `section${palettes.length + 1}`,
      start: 0,
      end: 1,
      top: "#ffffff",
      mid: "#cccccc",
      bottom: "#888888",
    };
    palettes.push(newSection);
    renderPaletteSections();
    updateGradient(parseFloat(slider.value));
  });

  // --- Initialize demo ---
  slider.addEventListener("input", updateSlider);
  nowBtn.addEventListener("click", () => {
    const time = getLocalHour();
    slider.value = time;
    updateSlider();
  });

  [typeSelect, angleInput].forEach((el) =>
    el.addEventListener("input", () => updateGradient(parseFloat(slider.value)))
  );

  slider.value = getLocalHour();
  updateSlider();
  renderPaletteSections();
}
