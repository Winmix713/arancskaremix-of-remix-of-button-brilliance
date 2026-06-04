import { usePlayground } from "@/lib/playground/context";
import { CollapsibleSection } from "../shared/CollapsibleSection";
import { ControlRow } from "../shared/ControlRow";
import { SegmentedControl } from "../shared/SegmentedControl";
import { ColorInput } from "../shared/ColorInput";

export function Appearance() {
  const { state, dispatch } = usePlayground();
  const b = state.base;
  const c = state.canvas;
  return (
    <CollapsibleSection title="Appearance">
      <ControlRow label="Canvas">
        <SegmentedControl<"light" | "dark">
          value={c.appearance}
          onChange={(appearance) => dispatch({ type: "SET_CANVAS", patch: { appearance } })}
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
          ]}
        />
      </ControlRow>
      <ControlRow label="Border">
        <SegmentedControl<0 | 1 | 2 | 3>
          value={b.borderWidth}
          onChange={(borderWidth) => dispatch({ type: "SET_BASE", patch: { borderWidth } })}
          options={[
            { value: 0, label: "None" },
            { value: 1, label: "1px" },
            { value: 2, label: "2px" },
            { value: 3, label: "3px" },
          ]}
        />
      </ControlRow>
      {b.borderWidth > 0 && (
        <ControlRow label="Border color">
          <ColorInput
            color={b.borderColor}
            alpha={b.borderAlpha}
            onColor={(borderColor) => dispatch({ type: "SET_BASE", patch: { borderColor } })}
            onAlpha={(borderAlpha) => dispatch({ type: "SET_BASE", patch: { borderAlpha } })}
          />
        </ControlRow>
      )}
      <ControlRow label="Icon slot">
        <SegmentedControl<"none" | "left" | "right">
          value={b.iconSlot}
          onChange={(iconSlot) => dispatch({ type: "SET_BASE", patch: { iconSlot } })}
          options={[
            { value: "none", label: "None" },
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
          ]}
        />
      </ControlRow>
    </CollapsibleSection>
  );
}
