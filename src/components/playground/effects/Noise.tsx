import { usePlayground } from "@/lib/playground/context";
import { ControlRow } from "../shared/ControlRow";
import { NumericSlider } from "../shared/NumericSlider";
import { SegmentedControl } from "../shared/SegmentedControl";
import { ColorInput } from "../shared/ColorInput";
import type { NoiseType } from "@/lib/playground/types";

export function Noise() {
  const { state, dispatch } = usePlayground();
  const s = state.effects.noise;
  const set = (patch: Partial<typeof s>) => dispatch({ type: "SET_NOISE", patch });
  const dim = !s.enabled;
  return (
    <div className="space-y-3">
      <ControlRow label="Type" disabled={dim}>
        <SegmentedControl<NoiseType>
          value={s.type}
          onChange={(type) => set({ type })}
          options={[
            { value: "mono", label: "Mono" },
            { value: "duo", label: "Duo" },
            { value: "multi", label: "Multi" },
          ]}
        />
      </ControlRow>
      <ControlRow label="Size" disabled={dim}>
        <NumericSlider
          value={s.size}
          min={0.5}
          max={4}
          step={0.05}
          onChange={(size) => set({ size })}
        />
      </ControlRow>
      <ControlRow label="Density" disabled={dim}>
        <NumericSlider
          value={s.density}
          min={1}
          max={8}
          onChange={(density) => set({ density })}
        />
      </ControlRow>
      {s.type !== "mono" && (
        <ControlRow label="Color A" disabled={dim}>
          <ColorInput color={s.color1} onColor={(color1) => set({ color1 })} />
        </ControlRow>
      )}
      {s.type === "multi" && (
        <ControlRow label="Color B" disabled={dim}>
          <ColorInput color={s.color2} onColor={(color2) => set({ color2 })} />
        </ControlRow>
      )}
      <ControlRow label="Opacity" disabled={dim}>
        <NumericSlider value={s.opacity} min={0} max={100} onChange={(opacity) => set({ opacity })} suffix="%" />
      </ControlRow>
    </div>
  );
}
