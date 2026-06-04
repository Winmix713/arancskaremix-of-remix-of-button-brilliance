import { usePlayground } from "@/lib/playground/context";
import { ControlRow } from "../shared/ControlRow";
import { NumericSlider } from "../shared/NumericSlider";
import { ColorInput } from "../shared/ColorInput";

export function InnerShadow() {
  const { state, dispatch } = usePlayground();
  const s = state.effects.innerShadow;
  const set = (patch: Partial<typeof s>) => dispatch({ type: "SET_INNER_SHADOW", patch });
  const dim = !s.enabled;
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-2 gap-3">
        <ControlRow label="X" disabled={dim}>
          <NumericSlider value={s.x} min={-20} max={20} onChange={(x) => set({ x })} suffix="px" />
        </ControlRow>
        <ControlRow label="Y" disabled={dim}>
          <NumericSlider value={s.y} min={-20} max={20} onChange={(y) => set({ y })} suffix="px" />
        </ControlRow>
        <ControlRow label="Blur" disabled={dim}>
          <NumericSlider value={s.blur} min={0} max={40} onChange={(blur) => set({ blur })} suffix="px" />
        </ControlRow>
        <ControlRow label="Spread" disabled={dim}>
          <NumericSlider value={s.spread} min={-20} max={20} onChange={(spread) => set({ spread })} suffix="px" />
        </ControlRow>
      </div>
      <ControlRow label="Color" disabled={dim}>
        <ColorInput
          color={s.color}
          alpha={s.alpha}
          onColor={(color) => set({ color })}
          onAlpha={(alpha) => set({ alpha })}
        />
      </ControlRow>
    </div>
  );
}
