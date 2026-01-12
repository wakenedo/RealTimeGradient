// --- Time helpers ---
export function getLocalHour() {
  const d = new Date();
  return d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
}

export function updateTimeDisplay(readoutEl, time) {
  const hours = Math.floor(time);
  const minutes = Math.floor((time - hours) * 60);
  readoutEl.textContent = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
}

// --- Color helpers ---
export function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

export function rgbToHex([r, g, b]) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function mixColors(c1, c2, t) {
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * t),
    Math.round(c1[1] + (c2[1] - c1[1]) * t),
    Math.round(c1[2] + (c2[2] - c1[2]) * t),
  ];
}

// --- Gradient computation ---
export function getPaletteForTime(palettes, hour) {
  const section =
    palettes.find((s) => {
      if (s.start < s.end) return hour >= s.start && hour < s.end;
      return hour >= s.start || hour < s.end;
    }) || palettes[0];

  const nextIndex = (palettes.indexOf(section) + 1) % palettes.length;
  const next = palettes[nextIndex];

  let t;
  if (section.start < section.end) {
    t = (hour - section.start) / (section.end - section.start);
  } else {
    t =
      hour >= section.start
        ? (hour - section.start) / (24 - section.start + next.end)
        : (hour + 24 - section.start) / (24 - section.start + next.end);
  }

  return {
    top: rgbToHex(mixColors(hexToRgb(section.top), hexToRgb(next.top), t)),
    mid: rgbToHex(mixColors(hexToRgb(section.mid), hexToRgb(next.mid), t)),
    bottom: rgbToHex(
      mixColors(hexToRgb(section.bottom), hexToRgb(next.bottom), t)
    ),
  };
}
