import type { TextureState, NoiseState } from "./types";

// Returns an SVG <filter> id usable in CSS filter: url(#id)
export const TEXTURE_FILTER_ID = "bp-texture-filter";
export const NOISE_FILTER_ID = "bp-noise-filter";

const TEXTURE_PARAMS: Record<TextureState["type"], { freq: string; oct: number }> = {
  fine: { freq: "0.9", oct: 2 },
  coarse: { freq: "0.4", oct: 1 },
  linen: { freq: "0.65 0.05", oct: 1 },
  carbon: { freq: "0.05 0.9", oct: 1 },
};

export function TextureFilter({ texture }: { texture: TextureState }) {
  const p = TEXTURE_PARAMS[texture.type];
  return (
    <filter id={TEXTURE_FILTER_ID} x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency={p.freq} numOctaves={p.oct} stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  );
}

export function NoiseFilter({ noise }: { noise: NoiseState }) {
  return (
    <filter id={NOISE_FILTER_ID} x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency={noise.size} numOctaves={noise.density} stitchTiles="stitch" />
      {noise.type === "mono" && <feColorMatrix type="saturate" values="0" />}
    </filter>
  );
}
