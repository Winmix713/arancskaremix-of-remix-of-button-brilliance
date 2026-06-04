import { useMemo, useState } from "react";
import { usePlayground } from "@/lib/playground/context";
import { deriveCss } from "@/lib/playground/serializeCss";
import { TextureFilter, NoiseFilter } from "@/lib/playground/filterDefs";
import { Loader2, ArrowRight } from "lucide-react";

const STATES = ["default", "hover", "active", "focus", "disabled", "loading"] as const;
const ZOOMS = [50, 100, 200] as const;
const BG_MODES = [
  { value: "checker", label: "Checker" },
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "custom", label: "Custom" },
] as const;

export function Canvas() {
  const { state, dispatch } = usePlayground();
  const [editingLabel, setEditingLabel] = useState(false);
  const derived = useMemo(() => deriveCss(state), [state]);

  const { canvas, base } = state;

  // State-injected overrides
  let style = { ...derived.baseStyle } as React.CSSProperties;
  if (canvas.state === "hover") style = { ...style, backgroundColor: derived.hoverBg };
  if (canvas.state === "active")
    style = { ...style, backgroundColor: derived.activeBg, transform: "scale(0.98)" };
  if (canvas.state === "focus")
    style = { ...style, outline: `2px solid ${derived.focusRing}`, outlineOffset: 3 };
  if (canvas.state === "disabled") style = { ...style, opacity: 0.4 };

  // Premium background modes inspired by Apple marketing
  const canvasBg =
    canvas.bgMode === "checker"
      ? {
          backgroundImage:
            "conic-gradient(from 0deg at 50% 50%, oklch(20% 0.01 265) 0% 25%, oklch(13% 0.01 265) 25% 50%, oklch(20% 0.01 265) 50% 75%, oklch(13% 0.01 265) 75% 100%)",
          backgroundSize: "24px 24px",
        }
      : canvas.bgMode === "dark"
        ? {
            background: `
              radial-gradient(900px 400px at 20% -5%, oklch(68% 0.19 252 / 0.12), transparent 50%),
              radial-gradient(700px 500px at 100% 80%, oklch(70% 0.18 280 / 0.08), transparent 60%),
              oklch(10% 0.01 265)
            `,
          }
        : canvas.bgMode === "light"
          ? {
              background: `
                radial-gradient(900px 600px at 15% 10%, oklch(68% 0.19 252 / 0.15), transparent 50%),
                radial-gradient(700px 500px at 100% 90%, oklch(70% 0.18 320 / 0.1), transparent 60%),
                oklch(96% 0 0)
              `,
            }
          : { backgroundColor: canvas.customBg };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-canvas-light to-canvas-dark overflow-hidden">
      {/* SVG defs */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <TextureFilter texture={state.effects.texture} />
          <NoiseFilter noise={state.effects.noise} />
        </defs>
      </svg>

      <div className="flex-1 flex items-center justify-center overflow-auto relative p-8">
        {/* Animated background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* State controls — floating top */}
        <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/20 backdrop-blur-lg px-2 py-1.5 shadow-xl">
            {STATES.map((s) => (
              <button
                key={s}
                onClick={() => dispatch({ type: "SET_CANVAS", patch: { state: s } })}
                className={`
                  px-3 h-7 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-150
                  ${
                    canvas.state === s
                      ? "bg-accent text-white shadow-lg shadow-accent/30"
                      : "text-white/60 hover:text-white/80 hover:bg-white/5"
                  }
                `}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div
          className="relative"
          style={{
            transform: `scale(${canvas.zoom / 100})`,
            transformOrigin: "center",
            transition: "transform 180ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <button
            type="button"
            style={style}
            disabled={canvas.state === "disabled"}
            onDoubleClick={() => setEditingLabel(true)}
            className="font-ui transition-all duration-150 hover:scale-105 active:scale-95"
          >
            {/* Texture overlay */}
            {derived.textureLayer && <span style={derived.textureLayer} aria-hidden />}
            {/* Noise overlay */}
            {derived.noiseLayer && <span style={derived.noiseLayer} aria-hidden />}
            {/* Glass overlays */}
            {derived.glassLayers && (
              <>
                <span style={derived.glassLayers.shadow} aria-hidden />
                <span style={derived.glassLayers.highlight} aria-hidden />
              </>
            )}

            <span
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                filter: derived.contentFilter,
              }}
            >
              {canvas.state === "loading" && (
                <Loader2 className="size-4 animate-spin" />
              )}
              {base.iconSlot === "left" && canvas.state !== "loading" && (
                <ArrowRight className="size-4" />
              )}
              {editingLabel ? (
                <input
                  autoFocus
                  value={base.label}
                  onChange={(e) =>
                    dispatch({ type: "SET_BASE", patch: { label: e.target.value } })
                  }
                  onBlur={() => setEditingLabel(false)}
                  onKeyDown={(e) => e.key === "Enter" && setEditingLabel(false)}
                  className="bg-transparent border-none outline-none text-inherit font-inherit w-32 text-center"
                  style={{ font: "inherit", color: "inherit" }}
                />
              ) : (
                <span>{base.label}</span>
              )}
              {base.iconSlot === "right" && canvas.state !== "loading" && (
                <ArrowRight className="size-4" />
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom toolbar — minimal, premium */}
      <div className="border-t border-white/5 bg-gradient-to-t from-black/20 to-black/5 backdrop-blur-sm px-6 py-4 flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-wider text-text-muted">
        <div className="flex items-center gap-3">
          <span>Zoom</span>
          <div className="flex items-center gap-1.5">
            {ZOOMS.map((z) => (
              <button
                key={z}
                onClick={() => dispatch({ type: "SET_CANVAS", patch: { zoom: z } })}
                className={`
                  px-2.5 h-7 rounded-lg transition-all duration-150 font-mono text-xs font-bold
                  ${
                    canvas.zoom === z
                      ? "bg-accent/20 text-accent border border-accent/30"
                      : "text-text-secondary border border-white/5 hover:text-text-primary hover:bg-white/5"
                  }
                `}
              >
                {z}%
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-5 bg-white/10" />

        <div className="flex items-center gap-3">
          <span>Background</span>
          <div className="flex items-center gap-1.5">
            {BG_MODES.map((m) => (
              <button
                key={m.value}
                onClick={() => dispatch({ type: "SET_CANVAS", patch: { bgMode: m.value } })}
                className={`
                  px-2.5 h-7 rounded-lg transition-all duration-150 text-xs font-semibold
                  ${
                    canvas.bgMode === m.value
                      ? "bg-accent/20 text-accent border border-accent/30"
                      : "text-text-secondary border border-white/5 hover:text-text-primary hover:bg-white/5"
                  }
                `}
              >
                {m.label}
              </button>
            ))}
            {canvas.bgMode === "custom" && (
              <input
                type="color"
                value={canvas.customBg}
                onChange={(e) =>
                  dispatch({ type: "SET_CANVAS", patch: { customBg: e.target.value } })
                }
                className="h-7 w-10 cursor-pointer rounded-lg border border-white/10 p-1"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
