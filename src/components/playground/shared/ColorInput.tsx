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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => onColor(e.target.value)}
          className="h-7 w-9 cursor-pointer rounded border border-border-subtle bg-surface-2 p-0.5"
        />
        <Input
          value={color}
          onChange={(e) => onColor(e.target.value)}
          className="h-7 flex-1 px-2 text-[11px] font-ui bg-surface-2 border-border-subtle"
        />
      </div>
      {onAlpha && alpha !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-muted font-ui w-10">Alpha</span>
          <Slider
            value={[alpha]}
            min={0}
            max={100}
            step={1}
            onValueChange={(v) => onAlpha(v[0])}
            className="flex-1"
          />
          <span className="text-[10px] text-text-muted font-ui w-8 text-right">{alpha}%</span>
        </div>
      )}
    </div>
  );
}
