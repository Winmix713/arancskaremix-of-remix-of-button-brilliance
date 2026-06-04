import type { ButtonStyleState, ShadowState, SwatchName } from "./types";

export const SWATCHES: { name: Exclude<SwatchName, "Custom">; oklch: string }[] = [
  { name: "Indigo", oklch: "oklch(55% 0.22 265)" },
  { name: "Blue", oklch: "oklch(55% 0.20 240)" },
  { name: "Cyan", oklch: "oklch(65% 0.17 200)" },
  { name: "Emerald", oklch: "oklch(62% 0.19 155)" },
  { name: "Amber", oklch: "oklch(72% 0.20 75)" },
  { name: "Rose", oklch: "oklch(58% 0.22 15)" },
  { name: "Violet", oklch: "oklch(54% 0.24 290)" },
  { name: "Slate", oklch: "oklch(45% 0.04 260)" },
];

const emptyShadow = (): ShadowState => ({
  enabled: false,
  x: 0,
  y: 4,
  blur: 12,
  spread: 0,
  color: "#000000",
  alpha: 30,
});

export const newId = () => Math.random().toString(36).slice(2, 10);

export const defaultState = (): ButtonStyleState => ({
  base: {
    swatch: "Indigo",
    bgOklch: SWATCHES[0].oklch,
    customHex: "#3b82f6",
    textColorMode: "auto",
    textColorManual: "#ffffff",
    radius: 999,
    paddingX: 28,
    paddingY: 12,
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0.01,
    minWidth: 0,
    borderWidth: 0,
    borderColor: "#ffffff",
    borderAlpha: 20,
    iconSlot: "none",
    label: "Primary Action",
  },
  effects: {
    innerShadow: { ...emptyShadow(), y: 1, blur: 0, color: "#ffffff", alpha: 20 },
    dropShadow1: { ...emptyShadow(), enabled: true },
    dropShadow2: emptyShadow(),
    backgroundBlur: { enabled: false, blur: 12, saturation: 140 },
    layerBlur: { enabled: false, blur: 0 },
    texture: { enabled: false, type: "fine", size: 128, blend: "overlay", opacity: 30 },
    glass: { enabled: false, angle: 135, refraction: 4, depth: 40, frost: 12, splay: 8 },
    noise: {
      enabled: false,
      type: "mono",
      size: 1.2,
      density: 2,
      color1: "#ffffff",
      color2: "#000000",
      opacity: 20,
    },
  },
  canvas: {
    bgMode: "checker",
    customBg: "#1a1a1a",
    zoom: 100,
    state: "default",
    appearance: "dark",
  },
  meta: { id: newId(), name: "Untitled", createdAt: Date.now() },
});
