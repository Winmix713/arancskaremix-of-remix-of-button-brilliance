import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export function NumericSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
  suffix,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        className="flex-1"
      />
      <div className="flex items-center gap-1 w-20">
        <Input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-7 px-1.5 text-[11px] font-ui text-right bg-surface-2 border-border-subtle"
        />
        {suffix && <span className="text-[10px] text-text-muted font-ui">{suffix}</span>}
      </div>
    </div>
  );
}
