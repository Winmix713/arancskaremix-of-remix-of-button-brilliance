import { usePlayground } from "@/lib/playground/context";
import { ControlRow } from "../shared/ControlRow";
import { NumericSlider } from "../shared/NumericSlider";

export function Glass() {
  const { state, dispatch } = usePlayground();
  const s = state.effects.glass;
  const set = (patch: Partial<typeof s>) => dispatch({ type: "SET_GLASS", patch });
  const dim = !s.enabled;
  return (
    <div className="space-y-1">
      <ControlRow label="Light angle" disabled={dim} hint={`${s.angle}°`}>
        <NumericSlider value={s.angle} min={0} max={360} onChange={(angle) => set({ angle })} suffix="°" />
      </ControlRow>
      <ControlRow label="Refraction" disabled={dim}>
        <NumericSlider value={s.refraction} min={0} max={20} onChange={(refraction) => set({ refraction })} suffix="px" />
      </ControlRow>
      <ControlRow label="Depth" disabled={dim}>
        <NumericSlider value={s.depth} min={0} max={100} onChange={(depth) => set({ depth })} suffix="%" />
      </ControlRow>
      <ControlRow label="Frost" disabled={dim}>
        <NumericSlider value={s.frost} min={0} max={40} onChange={(frost) => set({ frost })} suffix="px" />
      </ControlRow>
      <ControlRow label="Splay" disabled={dim}>
        <NumericSlider value={s.splay} min={0} max={40} onChange={(splay) => set({ splay })} suffix="px" />
      </ControlRow>
      <p className="text-[10px] text-text-muted font-ui pt-1">Dispersion — coming soon</p>
    </div>
  );
}
