import { usePlayground } from "@/lib/playground/context";
import { ControlRow } from "../shared/ControlRow";
import { NumericSlider } from "../shared/NumericSlider";

export function LayerBlur() {
  const { state, dispatch } = usePlayground();
  const s = state.effects.layerBlur;
  const set = (patch: Partial<typeof s>) => dispatch({ type: "SET_LAYER_BLUR", patch });
  const dim = !s.enabled;
  return (
    <ControlRow label="Blur" disabled={dim}>
      <NumericSlider value={s.blur} min={0} max={20} onChange={(blur) => set({ blur })} suffix="px" />
    </ControlRow>
  );
}
