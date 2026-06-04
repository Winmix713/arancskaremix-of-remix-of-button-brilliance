import { usePlayground } from "@/lib/playground/context";
import { ControlRow } from "../shared/ControlRow";
import { NumericSlider } from "../shared/NumericSlider";
import { SegmentedControl } from "../shared/SegmentedControl";
import type { TextureType } from "@/lib/playground/types";

export function Texture() {
  const { state, dispatch } = usePlayground();
  const s = state.effects.texture;
  const set = (patch: Partial<typeof s>) => dispatch({ type: "SET_TEXTURE", patch });
  const dim = !s.enabled;
  return (
    <div className="space-y-1">
      <ControlRow label="Type" disabled={dim}>
        <SegmentedControl<TextureType>
          value={s.type}
          onChange={(type) => set({ type })}
          options={[
            { value: "fine", label: "Fine" },
            { value: "coarse", label: "Coarse" },
            { value: "linen", label: "Linen" },
            { value: "carbon", label: "Carbon" },
          ]}
        />
      </ControlRow>
      <ControlRow label="Size" disabled={dim}>
        <SegmentedControl<64 | 128 | 256>
          value={s.size}
          onChange={(size) => set({ size })}
          options={[
            { value: 64, label: "64" },
            { value: 128, label: "128" },
            { value: 256, label: "256" },
          ]}
        />
      </ControlRow>
      <ControlRow label="Blend" disabled={dim}>
        <SegmentedControl<"overlay" | "multiply" | "screen">
          value={s.blend}
          onChange={(blend) => set({ blend })}
          options={[
            { value: "overlay", label: "Overlay" },
            { value: "multiply", label: "Multiply" },
            { value: "screen", label: "Screen" },
          ]}
        />
      </ControlRow>
      <ControlRow label="Opacity" disabled={dim}>
        <NumericSlider
          value={s.opacity}
          min={0}
          max={100}
          onChange={(opacity) => set({ opacity })}
          suffix="%"
        />
      </ControlRow>
    </div>
  );
}
