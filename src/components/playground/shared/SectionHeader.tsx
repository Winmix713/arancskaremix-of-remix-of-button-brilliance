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
    <div className="flex items-center justify-between gap-3 py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors">
      <h3 className="font-head text-xs font-semibold uppercase tracking-widest text-text-secondary">
        {title}
      </h3>
      {onToggle !== undefined && (
        <Switch checked={!!enabled} onCheckedChange={onToggle} />
      )}
    </div>
  );
}
