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
    <div className="flex items-center gap-4">
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        className="flex-1"
      />
      <div className="flex items-center gap-1.5">
        <Input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-8 w-16 px-2 text-xs font-mono font-semibold text-right bg-white/5 border-white/10 text-text-primary placeholder-text-muted rounded-lg"
        />
        {suffix && <span className="text-xs text-text-muted font-mono font-semibold">{suffix}</span>}
      </div>
    </div>
  );
}
