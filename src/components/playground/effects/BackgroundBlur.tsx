import { usePlayground } from "@/lib/playground/context";
import { ControlRow } from "../shared/ControlRow";
import { NumericSlider } from "../shared/NumericSlider";

export function BackgroundBlur() {
  const { state, dispatch } = usePlayground();
  const s = state.effects.backgroundBlur;
  const set = (patch: Partial<typeof s>) => dispatch({ type: "SET_BG_BLUR", patch });
  const dim = !s.enabled;
  return (
    <div>
      <ControlRow label="Blur" disabled={dim}>
        <NumericSlider value={s.blur} min={0} max={40} onChange={(blur) => set({ blur })} suffix="px" />
      </ControlRow>
      <ControlRow label="Saturation" disabled={dim}>
        <NumericSlider
          value={s.saturation}
          min={0}
          max={200}
          onChange={(saturation) => set({ saturation })}
          suffix="%"
        />
      </ControlRow>
      <p className="text-[10px] text-text-muted font-ui pt-1">Progressive blur — coming soon</p>
    </div>
  );
}
