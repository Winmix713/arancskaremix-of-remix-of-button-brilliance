import { Switch } from "@/components/ui/switch";

export function SectionHeader({
  title,
  enabled,
  onToggle,
}: {
  title: string;
  enabled?: boolean;
  onToggle?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <h3 className="font-head text-[11px] uppercase tracking-[0.18em] text-text-secondary">
        {title}
      </h3>
      {onToggle !== undefined && (
        <Switch checked={!!enabled} onCheckedChange={onToggle} />
      )}
    </div>
  );
}
