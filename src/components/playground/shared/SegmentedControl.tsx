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
      className="w-full justify-stretch gap-0 rounded-md border border-border-subtle bg-surface-2 p-0.5"
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={String(opt.value)}
          value={String(opt.value)}
          className="flex-1 h-7 text-[11px] font-ui data-[state=on]:bg-surface-3 data-[state=on]:text-accent rounded-sm"
        >
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
