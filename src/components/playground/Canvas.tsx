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

  const canvasBg =
    canvas.bgMode === "checker"
      ? {
          backgroundImage:
            "conic-gradient(from 0deg, oklch(20% 0.01 265) 0% 25%, oklch(13% 0.01 265) 25% 50%, oklch(20% 0.01 265) 50% 75%, oklch(13% 0.01 265) 75% 100%)",
          backgroundSize: "24px 24px",
        }
      : canvas.bgMode === "dark"
        ? { backgroundColor: "oklch(10% 0.01 265)" }
        : canvas.bgMode === "light"
          ? { backgroundColor: "oklch(96% 0 0)" }
          : { backgroundColor: canvas.customBg };

  return (
    <div className="flex flex-col bg-surface-0 h-full">
      {/* SVG defs */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <TextureFilter texture={state.effects.texture} />
          <NoiseFilter noise={state.effects.noise} />
        </defs>
      </svg>

      <div
        className="flex-1 flex items-center justify-center overflow-auto relative"
        style={canvasBg}
      >
        {/* Floating state strip */}
        <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-border-subtle bg-surface-1/80 backdrop-blur-md px-1 py-1 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.6)]">
            {STATES.map((s) => (
              <button
                key={s}
                onClick={() => dispatch({ type: "SET_CANVAS", patch: { state: s } })}
                className={
                  "px-2.5 h-6 rounded-full text-[9px] uppercase tracking-[0.16em] font-ui transition-colors " +
                  (canvas.state === s
                    ? "bg-accent text-accent-foreground"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-3")
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            transform: `scale(${canvas.zoom / 100})`,
            transformOrigin: "center",
            transition: "transform 180ms ease",
          }}
        >
          <button
            type="button"
            style={style}
            disabled={canvas.state === "disabled"}
            onDoubleClick={() => setEditingLabel(true)}
            className="font-ui"
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

      {/* Bottom toolbar */}
      <div className="border-t border-border-subtle bg-surface-1 px-3 py-2 flex flex-wrap items-center gap-3 text-[10px] font-ui uppercase tracking-[0.14em]">

        <div className="flex items-center gap-1">
          <span className="text-text-muted">Zoom</span>
          {ZOOMS.map((z) => (
            <button
              key={z}
              onClick={() => dispatch({ type: "SET_CANVAS", patch: { zoom: z } })}
              className={
                "px-2 h-6 rounded border transition-colors tabular-nums " +
                (canvas.zoom === z
                  ? "border-accent text-accent bg-surface-3"
                  : "border-border-subtle text-text-secondary bg-surface-2 hover:bg-surface-3")
              }
            >
              {z}%
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-text-muted">BG</span>
          {BG_MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => dispatch({ type: "SET_CANVAS", patch: { bgMode: m.value } })}
              className={
                "px-2 h-6 rounded border transition-colors " +
                (canvas.bgMode === m.value
                  ? "border-accent text-accent bg-surface-3"
                  : "border-border-subtle text-text-secondary bg-surface-2 hover:bg-surface-3")
              }
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
              className="h-6 w-7 cursor-pointer rounded border border-border-subtle p-0.5 bg-surface-2"
            />
          )}
        </div>
      </div>
    </div>
  );
}
