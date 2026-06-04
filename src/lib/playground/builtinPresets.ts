import type { SavedPreset, ButtonStyleState } from "./types";
import { defaultState } from "./defaults";

function instrument(): ButtonStyleState {
  const s = defaultState();
  s.base.swatch = "Custom";
  s.base.customHex = "#00ff41";
  s.base.textColorMode = "manual";
  s.base.textColorManual = "#0a0f0a";
  s.base.radius = 6;
  s.base.paddingX = 24;
  s.base.paddingY = 10;
  s.base.fontWeight = 700;
  s.base.letterSpacing = 0.14;
  s.base.label = "EXECUTE";
  s.base.borderWidth = 1;
  s.base.borderColor = "#00ff41";
  s.base.borderAlpha = 60;
  s.effects.dropShadow1 = {
    enabled: true,
    x: 0,
    y: 0,
    blur: 24,
    spread: 0,
    color: "#00ff41",
    alpha: 55,
  };
  s.effects.innerShadow = {
    enabled: true,
    x: 0,
    y: 1,
    blur: 0,
    spread: 0,
    color: "#ffffff",
    alpha: 30,
  };
  s.meta.name = "Instrument";
  return s;
}

function glass(): ButtonStyleState {
  const s = defaultState();
  s.base.swatch = "Custom";
  s.base.customHex = "#ffffff";
  s.base.textColorMode = "manual";
  s.base.textColorManual = "#ffffff";
  s.base.radius = 14;
  s.base.label = "Glass";
  s.base.borderWidth = 1;
  s.base.borderColor = "#ffffff";
  s.base.borderAlpha = 30;
  s.effects.backgroundBlur = { enabled: true, blur: 16, saturation: 160 };
  s.effects.glass = { enabled: true, angle: 135, refraction: 4, depth: 60, frost: 10, splay: 12 };
  s.effects.dropShadow1.enabled = false;
  s.meta.name = "Glass";
  return s;
}

export const BUILTIN_PRESETS: SavedPreset[] = [
  { id: "builtin:instrument", name: "Instrument", createdAt: 0, state: instrument() },
  { id: "builtin:glass", name: "Glass", createdAt: 0, state: glass() },
];

export const isBuiltin = (id: string) => id.startsWith("builtin:");
