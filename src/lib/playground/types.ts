export type SwatchName =
  | "Indigo" | "Blue" | "Cyan" | "Emerald" | "Amber" | "Rose" | "Violet" | "Slate" | "Custom";

export type ShadowState = {
  enabled: boolean;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string; // hex like "#000000"
  alpha: number; // 0-100
};

export type BackgroundBlurState = {
  enabled: boolean;
  blur: number;
  saturation: number;
};

export type LayerBlurState = {
  enabled: boolean;
  blur: number;
};

export type TextureType = "fine" | "coarse" | "linen" | "carbon";
export type TextureState = {
  enabled: boolean;
  type: TextureType;
  size: 64 | 128 | 256;
  blend: "overlay" | "multiply" | "screen";
  opacity: number;
};

export type GlassState = {
  enabled: boolean;
  angle: number; // 0-360
  refraction: number;
  depth: number;
  frost: number;
  splay: number;
};

export type NoiseType = "mono" | "duo" | "multi";
export type NoiseState = {
  enabled: boolean;
  type: NoiseType;
  size: number; // baseFrequency 0.5-4
  density: number; // numOctaves 1-8
  color1: string;
  color2: string;
  opacity: number;
};

export type EffectsState = {
  innerShadow: ShadowState;
  dropShadow1: ShadowState;
  dropShadow2: ShadowState;
  backgroundBlur: BackgroundBlurState;
  layerBlur: LayerBlurState;
  texture: TextureState;
  glass: GlassState;
  noise: NoiseState;
};

export type BaseStyle = {
  swatch: SwatchName;
  bgOklch: string; // e.g. "oklch(55% 0.22 265)"
  customHex: string; // hex for Custom swatch
  textColorMode: "auto" | "manual";
  textColorManual: string; // hex
  radius: number;
  paddingX: number;
  paddingY: number;
  fontSize: number;
  fontWeight: 400 | 500 | 600 | 700;
  letterSpacing: number; // em
  minWidth: number;
  borderWidth: 0 | 1 | 2 | 3;
  borderColor: string; // hex
  borderAlpha: number; // 0-100
  iconSlot: "none" | "left" | "right";
  label: string;
};

export type CanvasState = {
  bgMode: "checker" | "dark" | "light" | "custom";
  customBg: string;
  zoom: 50 | 100 | 200;
  state: "default" | "hover" | "active" | "focus" | "disabled" | "loading";
  appearance: "light" | "dark";
};

export type ButtonStyleState = {
  base: BaseStyle;
  effects: EffectsState;
  canvas: CanvasState;
  meta: { id: string; name: string; createdAt: number };
};

export type SavedPreset = {
  id: string;
  name: string;
  createdAt: number;
  state: ButtonStyleState;
};
