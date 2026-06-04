import { usePlayground } from "@/lib/playground/context";
import { ControlRow } from "../shared/ControlRow";
import { NumericSlider } from "../shared/NumericSlider";
import { ColorInput } from "../shared/ColorInput";
import type { Action } from "@/lib/playground/reducer";
import type { ShadowState } from "@/lib/playground/types";

export function DropShadow({ which }: { which: 1 | 2 }) {
  const { state, dispatch } = usePlayground();
  const s = which === 1 ? state.effects.dropShadow1 : state.effects.dropShadow2;
  const type: Action["type"] = which === 1 ? "SET_DROP_SHADOW_1" : "SET_DROP_SHADOW_2";
  const set = (patch: Partial<ShadowState>) =>
    dispatch({ type, patch } as Action);
  const dim = !s.enabled;
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-2 gap-3">
        <ControlRow label="X" disabled={dim}>
          <NumericSlider value={s.x} min={-40} max={40} onChange={(x) => set({ x })} suffix="px" />
        </ControlRow>
        <ControlRow label="Y" disabled={dim}>
          <NumericSlider value={s.y} min={-40} max={40} onChange={(y) => set({ y })} suffix="px" />
        </ControlRow>
        <ControlRow label="Blur" disabled={dim}>
          <NumericSlider value={s.blur} min={0} max={80} onChange={(blur) => set({ blur })} suffix="px" />
        </ControlRow>
        <ControlRow label="Spread" disabled={dim}>
          <NumericSlider value={s.spread} min={-20} max={40} onChange={(spread) => set({ spread })} suffix="px" />
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
