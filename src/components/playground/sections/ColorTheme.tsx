import { usePlayground } from "@/lib/playground/context";
import { SWATCHES } from "@/lib/playground/defaults";
import { CollapsibleSection } from "../shared/CollapsibleSection";
import { ControlRow } from "../shared/ControlRow";
import { SegmentedControl } from "../shared/SegmentedControl";
import { ColorInput } from "../shared/ColorInput";
import { Input } from "@/components/ui/input";

export function ColorTheme() {
  const { state, dispatch } = usePlayground();
  const { swatch, customHex, textColorMode, textColorManual } = state.base;

  return (
    <CollapsibleSection title="Color Theme">
      <div className="grid grid-cols-8 gap-2">
        {SWATCHES.map((sw) => (
          <button
            key={sw.name}
            title={sw.name}
            onClick={() =>
              dispatch({ type: "SET_BASE", patch: { swatch: sw.name, bgOklch: sw.oklch } })
            }
            className={`
              aspect-square rounded-lg border transition-all hover:scale-110
              ${
                swatch === sw.name
                  ? "border-accent ring-2 ring-accent/30 shadow-lg shadow-accent/20"
                  : "border-white/10 hover:border-white/20"
              }
            `}
            style={{ background: sw.oklch }}
          />
        ))}
        <button
          title="Custom"
          onClick={() => dispatch({ type: "SET_BASE", patch: { swatch: "Custom" } })}
          className={`
            aspect-square rounded-lg border text-lg font-semibold transition-all hover:scale-110
            ${
              swatch === "Custom"
                ? "border-accent ring-2 ring-accent/30 text-accent bg-accent/5"
                : "border-white/10 hover:border-white/20 text-text-secondary"
            }
          `}
        >
          +
        </button>
      </div>

      {swatch === "Custom" && (
        <div className="pt-3">
          <ControlRow label="Custom color">
            <ColorInput
              color={customHex}
              onColor={(customHex) => dispatch({ type: "SET_BASE", patch: { customHex } })}
            />
          </ControlRow>
        </div>
      )}

      <div className="pt-3 space-y-1">
        <ControlRow label="Text color">
          <SegmentedControl<"auto" | "manual">
            value={textColorMode}
            onChange={(textColorMode) => dispatch({ type: "SET_BASE", patch: { textColorMode } })}
            options={[
              { value: "auto", label: "Auto" },
              { value: "manual", label: "Manual" },
            ]}
          />
        </ControlRow>
        {textColorMode === "manual" && (
          <ControlRow label="Text">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={textColorManual}
                onChange={(e) =>
                  dispatch({ type: "SET_BASE", patch: { textColorManual: e.target.value } })
                }
                className="h-7 w-9 cursor-pointer rounded border border-border-subtle bg-surface-2 p-0.5"
              />
              <Input
                value={textColorManual}
                onChange={(e) =>
                  dispatch({ type: "SET_BASE", patch: { textColorManual: e.target.value } })
                }
                className="h-7 flex-1 px-2 text-[11px] font-ui bg-surface-2 border-border-subtle"
              />
            </div>
          </ControlRow>
        )}
      </div>
    </CollapsibleSection>
  );
}
