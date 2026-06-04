import { usePlayground } from "@/lib/playground/context";
import { CollapsibleSection } from "../shared/CollapsibleSection";
import { ControlRow } from "../shared/ControlRow";
import { NumericSlider } from "../shared/NumericSlider";
import { SegmentedControl } from "../shared/SegmentedControl";

const RADIUS_PRESETS = [4, 10, 16, 999] as const;

export function ShapeSize() {
  const { state, dispatch } = usePlayground();
  const b = state.base;
  return (
    <CollapsibleSection title="Shape & Size">
      <ControlRow label="Radius" hint={`${b.radius}px`}>
        <div className="grid grid-cols-4 gap-1">
          {RADIUS_PRESETS.map((r) => (
            <button
              key={r}
              onClick={() => dispatch({ type: "SET_BASE", patch: { radius: r } })}
              className={
                "h-7 text-[11px] font-ui rounded border transition-colors " +
                (b.radius === r
                  ? "border-accent text-accent bg-surface-3"
                  : "border-border-subtle text-text-secondary bg-surface-2 hover:bg-surface-3")
              }
            >
              {r}
            </button>
          ))}
        </div>
        <div className="pt-1">
          <NumericSlider
            value={b.radius}
            min={0}
            max={999}
            onChange={(radius) => dispatch({ type: "SET_BASE", patch: { radius } })}
            suffix="px"
          />
        </div>
      </ControlRow>
      <ControlRow label="Padding X">
        <NumericSlider
          value={b.paddingX}
          min={8}
          max={64}
          onChange={(paddingX) => dispatch({ type: "SET_BASE", patch: { paddingX } })}
          suffix="px"
        />
      </ControlRow>
      <ControlRow label="Padding Y">
        <NumericSlider
          value={b.paddingY}
          min={4}
          max={32}
          onChange={(paddingY) => dispatch({ type: "SET_BASE", patch: { paddingY } })}
          suffix="px"
        />
      </ControlRow>
      <ControlRow label="Font size">
        <NumericSlider
          value={b.fontSize}
          min={10}
          max={24}
          onChange={(fontSize) => dispatch({ type: "SET_BASE", patch: { fontSize } })}
          suffix="px"
        />
      </ControlRow>
      <ControlRow label="Weight">
        <SegmentedControl<400 | 500 | 600 | 700>
          value={b.fontWeight}
          onChange={(fontWeight) => dispatch({ type: "SET_BASE", patch: { fontWeight } })}
          options={[
            { value: 400, label: "400" },
            { value: 500, label: "500" },
            { value: 600, label: "600" },
            { value: 700, label: "700" },
          ]}
        />
      </ControlRow>
      <ControlRow label="Letter spacing" hint={`${b.letterSpacing}em`}>
        <NumericSlider
          value={b.letterSpacing}
          min={-0.05}
          max={0.2}
          step={0.005}
          onChange={(letterSpacing) => dispatch({ type: "SET_BASE", patch: { letterSpacing } })}
        />
      </ControlRow>
      <ControlRow label="Min width">
        <NumericSlider
          value={b.minWidth}
          min={0}
          max={400}
          onChange={(minWidth) => dispatch({ type: "SET_BASE", patch: { minWidth } })}
          suffix="px"
        />
      </ControlRow>
    </section>
  );
}
