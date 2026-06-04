import type { ButtonStyleState, ShadowState } from "./types";
import { hexWithAlpha, shiftLightness, withAlpha, pickAutoTextColor } from "./colorUtils";

function shadowToCss(s: ShadowState, inset: boolean): string | null {
  if (!s.enabled) return null;
  const color = hexWithAlpha(s.color, s.alpha);
  return `${inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${color}`;
}

export function effectiveBg(state: ButtonStyleState): string {
  return state.base.swatch === "Custom" ? state.base.customHex : state.base.bgOklch;
}

export function effectiveTextColor(state: ButtonStyleState): string {
  if (state.base.textColorMode === "manual") return state.base.textColorManual;
  return pickAutoTextColor(effectiveBg(state));
}

export type DerivedCss = {
  baseStyle: React.CSSProperties;
  hoverBg: string;
  activeBg: string;
  focusRing: string;
  cssString: string;
  contentFilter?: string; // for layer blur
  textureLayer?: React.CSSProperties;
  noiseLayer?: React.CSSProperties;
  glassLayers?: { highlight: React.CSSProperties; shadow: React.CSSProperties };
};

export function deriveCss(state: ButtonStyleState): DerivedCss {
  const { base, effects } = state;
  const bg = effectiveBg(state);
  const text = effectiveTextColor(state);

  // Derived state colors (only meaningful for oklch swatch)
  const hoverBg = shiftLightness(bg, 6);
  const activeBg = shiftLightness(bg, -8);
  const focusRing = withAlpha(bg, 60);

  // Shadows
  const shadows = [
    shadowToCss(effects.innerShadow, true),
    shadowToCss(effects.dropShadow1, false),
    shadowToCss(effects.dropShadow2, false),
  ].filter(Boolean) as string[];

  // Background blur
  const backdropParts: string[] = [];
  if (effects.backgroundBlur.enabled) {
    backdropParts.push(`blur(${effects.backgroundBlur.blur}px)`);
    backdropParts.push(`saturate(${effects.backgroundBlur.saturation}%)`);
  }
  if (effects.glass.enabled) {
    // Merge frost into backdrop blur
    backdropParts.push(`blur(${effects.glass.frost}px)`);
    backdropParts.push(`saturate(140%)`);
  }
  const backdropFilter = backdropParts.length ? backdropParts.join(" ") : undefined;

  // Border
  const borderCss =
    base.borderWidth > 0
      ? `${base.borderWidth}px solid ${hexWithAlpha(base.borderColor, base.borderAlpha)}`
      : "none";

  // Glass overlay layers
  let glassLayers: DerivedCss["glassLayers"];
  if (effects.glass.enabled) {
    const angle = effects.glass.angle;
    const depth = effects.glass.depth / 100;
    const splay = effects.glass.splay;
    glassLayers = {
      highlight: {
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        pointerEvents: "none",
        background: `linear-gradient(${angle}deg, rgba(255,255,255,${0.5 * depth}) 0%, rgba(255,255,255,0) ${30 + splay}%)`,
        mixBlendMode: "screen",
      },
      shadow: {
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        pointerEvents: "none",
        background: `linear-gradient(${(angle + 180) % 360}deg, rgba(0,0,0,${0.35 * depth}) 0%, rgba(0,0,0,0) ${30 + splay}%)`,
        mixBlendMode: "multiply",
      },
    };
  }

  // Texture layer
  let textureLayer: React.CSSProperties | undefined;
  if (effects.texture.enabled) {
    textureLayer = {
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      pointerEvents: "none",
      mixBlendMode: effects.texture.blend,
      opacity: effects.texture.opacity / 100,
      filter: `url(#bp-texture-filter)`,
      backgroundColor: "#808080",
    };
  }

  // Noise layer
  let noiseLayer: React.CSSProperties | undefined;
  if (effects.noise.enabled) {
    noiseLayer = {
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      pointerEvents: "none",
      opacity: effects.noise.opacity / 100,
      filter: `url(#bp-noise-filter)`,
      backgroundColor: effects.noise.color1,
      mixBlendMode: effects.noise.type === "mono" ? "overlay" : "normal",
    };
  }

  // Layer blur on content
  const contentFilter = effects.layerBlur.enabled
    ? `blur(${effects.layerBlur.blur}px)`
    : undefined;

  const baseStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: bg,
    color: text,
    borderRadius: base.radius,
    padding: `${base.paddingY}px ${base.paddingX}px`,
    fontSize: base.fontSize,
    fontWeight: base.fontWeight,
    letterSpacing: `${base.letterSpacing}em`,
    minWidth: base.minWidth || undefined,
    border: borderCss,
    boxShadow: shadows.length ? shadows.join(", ") : undefined,
    backdropFilter,
    WebkitBackdropFilter: backdropFilter,
    overflow: "hidden",
    cursor: "pointer",
    transition: "background-color 120ms ease, box-shadow 120ms ease, transform 80ms ease",
  };

  // CSS string for export
  const lines: string[] = [];
  lines.push(".btn {");
  lines.push(`  display: inline-flex;`);
  lines.push(`  align-items: center;`);
  lines.push(`  justify-content: center;`);
  lines.push(`  gap: 8px;`);
  lines.push(`  border-radius: ${base.radius}px;`);
  lines.push(`  padding: ${base.paddingY}px ${base.paddingX}px;`);
  lines.push(`  font-size: ${base.fontSize}px;`);
  lines.push(`  font-weight: ${base.fontWeight};`);
  lines.push(`  letter-spacing: ${base.letterSpacing}em;`);
  if (base.minWidth) lines.push(`  min-width: ${base.minWidth}px;`);
  lines.push(`  background-color: ${bg};`);
  lines.push(`  color: ${text};`);
  lines.push(`  border: ${borderCss};`);
  if (shadows.length) {
    lines.push(`  box-shadow:`);
    shadows.forEach((s, i) => lines.push(`    ${s}${i === shadows.length - 1 ? ";" : ","}`));
  }
  if (backdropFilter) {
    lines.push(`  backdrop-filter: ${backdropFilter};`);
    lines.push(`  -webkit-backdrop-filter: ${backdropFilter};`);
  }
  lines.push(`  cursor: pointer;`);
  lines.push(`  transition: background-color 120ms ease, box-shadow 120ms ease, transform 80ms ease;`);
  lines.push(`}`);
  lines.push(`.btn:hover { background-color: ${hoverBg}; }`);
  lines.push(`.btn:active { background-color: ${activeBg}; transform: scale(0.98); }`);
  lines.push(`.btn:focus-visible { outline: 2px solid ${focusRing}; outline-offset: 3px; }`);
  lines.push(`.btn:disabled { opacity: 0.4; pointer-events: none; }`);

  if ((effects.dropShadow1.enabled || effects.dropShadow2.enabled) && backdropFilter) {
    lines.unshift(
      `/* Note: When the button is semi-transparent and uses a drop shadow,`,
      `   wrap shadows on a ::before pseudo-element for full visibility behind`,
      `   transparent areas. This export keeps the simple .btn ruleset only. */`,
      ``,
    );
  }

  return {
    baseStyle,
    hoverBg,
    activeBg,
    focusRing,
    cssString: lines.join("\n"),
    contentFilter,
    textureLayer,
    noiseLayer,
    glassLayers,
  };
}
