// Load an HTML component into a container
async function loadComponent(id, file) {
  const res = await fetch(`./demo/js/RTG/src/components/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Load a JS module dynamically and return its exports
async function loadModule(path) {
  return await import(path);
}

async function loadSection(sectionName) {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = `<div id="${sectionName}"></div>`;
  await loadComponent(sectionName, `${sectionName}.html`);

  try {
    const modulePath = `./utils/gradientPreview.js`;
    const module = await import(modulePath);
    if (module.init) {
      module.init(); // optional: if we define a named init() in that script
    }
  } catch (err) {
    // Optional: ignore if file doesn't exist
    console.warn(`No JS found for ${sectionName}`, err);
  }
}

document.addEventListener("click", (e) => {
  const toggle = e.target.closest(".nav-toggle");
  if (toggle) {
    document.querySelector("header nav").classList.toggle("open");
  }
});

/**
 * Initialize code blocks
 * @param {HTMLElement|Document} root - the root element to scan (defaults to entire document)
 */
function codeBlockInit(root = document) {
  root
    .querySelectorAll(".documentation-code-container")
    .forEach((container) => {
      const code = container.querySelector("code");
      const gutter = container.querySelector(".line-numbers");

      // If tokens already wrapped into .code-line elements, use them.
      let codeLineElems = code.querySelectorAll(".code-line");
      if (codeLineElems.length === 0) {
        // Fallback: split current innerHTML on newline to keep token markup intact per line
        const html = code.innerHTML.replace(/\r\n/g, "\n");
        const parts = html.split("\n");
        code.innerHTML = parts
          .map((p) => `<span class="code-line">${p || "&#8203;"}</span>`)
          .join("\n");
        codeLineElems = code.querySelectorAll(".code-line");
      }

      // populate gutter with numbers
      gutter.innerHTML = "";
      for (let i = 0; i < codeLineElems.length; i++) {
        const span = document.createElement("span");
        span.textContent = i + 1;
        gutter.appendChild(span);
      }

      // copy button
      const copyBtn = container.querySelector(".copy-btn");
      if (copyBtn) {
        copyBtn.onclick = async () => {
          try {
            await navigator.clipboard.writeText(code.innerText.trim());
            copyBtn.textContent = "Copied ✓";
            setTimeout(() => (copyBtn.textContent = "Copy"), 1400);
          } catch (e) {
            const range = document.createRange();
            range.selectNodeContents(code);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            document.execCommand("copy");
            sel.removeAllRanges();
            copyBtn.textContent = "Copied ✓";
            setTimeout(() => (copyBtn.textContent = "Copy"), 1400);
          }
        };
      }
    });
}

async function init() {
  document.getElementById("gradient-presentation").innerHTML = `
    <header id="header"></header>
    <main>
      <div id="gradient-intro"></div>
      <div id="gradient-intro-containers"></div>
      <div id="gradient-intro-texts"></div>
      <div id="gradient-documentation"></div>
      <div id="gradient-preview"></div>
    </main>
  `;

  // Load HTML partials
  await loadComponent("header", "header.html");
  await loadComponent("gradient-intro", "gradient-intro.html");
  await loadComponent(
    "gradient-intro-containers",
    "gradient-intro-containers.html"
  );
  await loadComponent("gradient-intro-texts", "gradient-intro-texts.html");
  await loadComponent("gradient-documentation", "gradient-documentation.html");
  await loadComponent("gradient-preview", "gradient-preview.html");

  codeBlockInit(document.querySelector("main"));
  // ✅ Load JS modules dynamically

  const { init } = await loadModule("./utils/gradientPreview.js");
  init();

  const { default: DynamicGradient } = await loadModule(
    "../../../../src/RealTimeGradient/realTimeGradient.js"
  );

  const titleGradient = DynamicGradient.init("#gradient-title", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    textClip: true,
    transitionDuration: 2000,
  });
  const smallTitleGradient = DynamicGradient.init("#gradient-title-1", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    textClip: true,
    transitionDuration: 2000,
  });
  const smallTitleGradient2 = DynamicGradient.init("#gradient-title-2", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    textClip: true,
    transitionDuration: 2000,
  });
  const smallTitleGradient3 = DynamicGradient.init("#gradient-title-3", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    textClip: true,
    transitionDuration: 2000,
  });
  const smallTitleGradient4 = DynamicGradient.init("#gradient-title-4", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    textClip: true,
    transitionDuration: 2000,
  });

  smallTitleGradient.persistEffect(["#2124f4", "#e9b56bff"]);
  smallTitleGradient2.persistEffect(["#2124f4", "#e9b56bff"]);
  smallTitleGradient3.persistEffect(["#2124f4", "#e9b56bff"]);
  smallTitleGradient4.persistEffect(["#2124f4", "#e9b56bff"]);
  titleGradient.persistEffect(["#2124f4", "#e9b56bff"]);
  // Init after DOM is ready
  const gradientSphere1 = DynamicGradient.init("#sphere-1", {
    type: "linear",
    direction: "to top",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
  });
  const gradientSphere2 = DynamicGradient.init("#sphere-2", {
    type: "linear",
    direction: "to top",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
  });
  const gradientSphere3 = DynamicGradient.init("#sphere-3", {
    type: "linear",
    direction: "to top",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
  });
  const gradientSphere4 = DynamicGradient.init("#sphere-4", {
    type: "linear",
    direction: "to top",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
  });
  const gradientSphere5 = DynamicGradient.init("#sphere-5", {
    type: "linear",
    direction: "to top",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
  });

  gradientSphere1.persistEffect(["#2124f4", "#e9b56bff"]);
  gradientSphere2.persistEffect(["#2124f4", "#e9b56bff"]);
  gradientSphere3.persistEffect(["#2124f4", "#e9b56bff"]);
  gradientSphere4.persistEffect(["#2124f4", "#e9b56bff"]);
  gradientSphere5.persistEffect(["#2124f4", "#e9b56bff"]);

  const gradientx = DynamicGradient.init("#gradient-x", {
    type: "linear",
    direction: "to bottom",
    colors: ["#ffffffff", "#d7d7d7ff"],
    transitionDuration: 3500,
  });
  const gradienty = DynamicGradient.init("#gradient-y", {
    type: "linear",
    direction: "to bottom",
    colors: ["#ffffffff", "#d7d7d7ff"],
    transitionDuration: 3500,
  });
  const gradientz = DynamicGradient.init("#gradient-z", {
    type: "linear",
    direction: "to bottom",
    colors: ["#ffffffff", "#d7d7d7ff"],
    transitionDuration: 3500,
  });
  gradientx.persistEffect(["#a1aaffff", "#d7d7d7ff"]);
  gradienty.persistEffect(["#a1aaffff", "#d7d7d7ff"]);
  gradientz.persistEffect(["#a1aaffff", "#d7d7d7ff"]);

  const dividerx = DynamicGradient.init("#divider-container", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });
  const dividery = DynamicGradient.init("#divider-texts", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });
  const dividerz = DynamicGradient.init("#documentation-divider", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });
  const dividera = DynamicGradient.init("#preview-divider", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });

  dividerx.persistEffect(["#2124f4", "#e9b56bff", "#e9b56bff"]);
  dividery.persistEffect(["#2124f4", "#e9b56bff", "#e9b56bff"]);
  dividerz.persistEffect(["#2124f4", "#e9b56bff", "#e9b56bff"]);
  dividera.persistEffect(["#2124f4", "#e9b56bff", "#e9b56bff"]);

  const gradientSphereLogo1 = DynamicGradient.init("#sphere-x", {
    type: "linear",
    direction: "to top",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });
  const gradientSphereLogo2 = DynamicGradient.init("#sphere-y", {
    type: "linear",
    direction: "to top",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });
  const gradientSphereLogo3 = DynamicGradient.init("#sphere-z", {
    type: "linear",
    direction: "to top",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });

  const exampleLinear = DynamicGradient.init("#card-linear", {
    type: "linear",
    direction: "to bottom",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });
  const exampleRadial = DynamicGradient.init("#card-radial", {
    type: "radial",
    direction: "to bottom",
    colors: ["#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });
  const exampleEffect = DynamicGradient.init("#card-effect", {
    type: "linear",
    direction: "to bottom",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 4000,
  });

  exampleEffect.triggerEffect({
    applyColors: ["#9370dbff", "#4682b4ff"],
    duration: 4000,
  });

  const exampleTextGradient = DynamicGradient.init("#text-gradient-example-1", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
    ],
    textClip: true,
    transitionDuration: 2000,
  });
  const exampleTextGradient2 = DynamicGradient.init(
    "#text-gradient-example-2",
    {
      type: "linear",
      direction: "to left",
      colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
      schedule: [
        { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
        { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
        { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
      ],
      textClip: true,
      transitionDuration: 2000,
    }
  );
  const exampleTextGradient3 = DynamicGradient.init(
    "#text-gradient-example-3",
    {
      type: "linear",
      direction: "to right",
      colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
      schedule: [
        { time: "6:00", colors: ["#7fff00ff", "#ffb347ff", "#ff69b4ff"] },
        { time: "18:00", colors: ["#ff4500ff", "#9370dbff", "#4682b4ff"] },
        { time: "00:00", colors: ["#ffff54ff", "#ff7f50ff", "#daa520ff"] },
      ],
      textClip: true,
      transitionDuration: 2000,
    }
  );

  exampleTextGradient.triggerEffect({
    applyColors: ["#2124f4", "#e9b56bff"],
    duration: 4000,
  });
  exampleTextGradient2.triggerEffect({
    hue: "#2124f4",
    duration: 4000,
  });

  DynamicGradient.init("#thead-gradient", {
    type: "linear",
    direction: "to bottom",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });
  DynamicGradient.init("#thead-gradient-2", {
    type: "linear",
    direction: "to bottom",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });
  DynamicGradient.init("#thead-gradient-3", {
    type: "linear",
    direction: "to bottom",
    colors: ["#ff7f50ff", "#6a5acdff", "#20b2aaff"],
    schedule: [
      { time: "6:00", colors: ["#ffb347ff", "#ff69b4ff"] },
      { time: "18:00", colors: ["#9370dbff", "#4682b4ff"] },
      { time: "00:00", colors: ["#ff7f50ff", "#daa520ff"] },
    ],
    transitionDuration: 2000,
  });
}

init();
