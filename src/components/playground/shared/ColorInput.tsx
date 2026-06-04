import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function ColorInput({
  color,
  alpha,
  onColor,
  onAlpha,
}: {
  color: string;
  alpha?: number;
  onColor: (hex: string) => void;
  onAlpha?: (a: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <input
          type="color"
          value={color}
          onChange={(e) => onColor(e.target.value)}
          className="h-8 w-12 cursor-pointer rounded-lg border border-white/10 p-1 hover:border-white/20 transition-colors"
        />
        <Input
          value={color}
          onChange={(e) => onColor(e.target.value)}
          className="h-8 flex-1 px-3 text-xs font-mono font-semibold bg-white/5 border-white/10 text-text-primary placeholder-text-muted rounded-lg uppercase"
        />
      </div>
      {onAlpha && alpha !== undefined && (
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-text-secondary w-12">Alpha</span>
          <Slider
            value={[alpha]}
            min={0}
            max={100}
            step={1}
            onValueChange={(v) => onAlpha(v[0])}
            className="flex-1"
          />
          <span className="text-xs font-mono font-semibold text-text-muted w-10 text-right">{alpha}%</span>
        </div>
      )}
    </div>
  );
}
