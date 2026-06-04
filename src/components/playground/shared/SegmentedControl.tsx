import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type ReactNode } from "react";

export function SegmentedControl<T extends string | number>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: ReactNode }[];
}) {
  return (
    <ToggleGroup
      type="single"
      value={String(value)}
      onValueChange={(v) => {
        if (!v) return;
        const opt = options.find((o) => String(o.value) === v);
        if (opt) onChange(opt.value);
      }}
      className="w-full justify-stretch gap-1 rounded-lg border border-white/10 bg-white/5 p-1"
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={String(opt.value)}
          value={String(opt.value)}
          className="flex-1 h-8 text-xs font-semibold data-[state=on]:bg-accent/20 data-[state=on]:text-accent data-[state=on]:border data-[state=on]:border-accent/30 data-[state=off]:text-text-secondary data-[state=off]:hover:text-text-primary rounded-md transition-colors"
        >
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
