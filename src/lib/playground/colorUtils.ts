// Lightweight color helpers. Avoid external deps.

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const to = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return "#" + to(r) + to(g) + to(b);
}

export function hexWithAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  const a = Math.max(0, Math.min(100, alpha)) / 100;
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
}

// Parse "oklch(L% C H)" into numbers. Returns null if not parseable.
export function parseOklch(s: string): { l: number; c: number; h: number } | null {
  const m = s.match(/oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)/i);
  if (!m) return null;
  return { l: parseFloat(m[1]), c: parseFloat(m[2]), h: parseFloat(m[3]) };
}

export function formatOklch(l: number, c: number, h: number, alpha?: number): string {
  const lc = Math.max(0, Math.min(100, l));
  if (alpha === undefined) return `oklch(${lc}% ${c} ${h})`;
  return `oklch(${lc}% ${c} ${h} / ${alpha}%)`;
}

export function shiftLightness(oklch: string, delta: number): string {
  const p = parseOklch(oklch);
  if (!p) return oklch;
  return formatOklch(p.l + delta, p.c, p.h);
}

export function withAlpha(oklch: string, alphaPct: number): string {
  const p = parseOklch(oklch);
  if (!p) return oklch;
  return formatOklch(p.l, p.c, p.h, alphaPct);
}

// Convert hex to approximate oklch string (uses sRGB→linear→OKLab pipeline).
export function hexToOklchString(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const sr = r / 255, sg = g / 255, sb = b / 255;
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const lr = lin(sr), lg = lin(sg), lb = lin(sb);
  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(a * a + b2 * b2);
  let H = (Math.atan2(b2, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return formatOklch(+(L * 100).toFixed(1), +C.toFixed(3), +H.toFixed(1));
}

// APCA-lite: pick black or white text based on background luminance.
export function pickAutoTextColor(bgHexOrOklch: string): string {
  // Try oklch first
  const ok = parseOklch(bgHexOrOklch);
  if (ok) return ok.l > 65 ? "#000000" : "#ffffff";
  // hex fallback
  try {
    const { r, g, b } = hexToRgb(bgHexOrOklch);
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return lum > 0.6 ? "#000000" : "#ffffff";
  } catch {
    return "#ffffff";
  }
}
