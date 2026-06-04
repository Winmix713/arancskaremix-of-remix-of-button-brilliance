import { type ReactNode } from "react";

export function ControlRow({
  label,
  hint,
  children,
  disabled,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className={"flex flex-col gap-2 py-2 " + (disabled ? "opacity-40 pointer-events-none" : "")}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {label}
        </label>
        {hint && <span className="text-xs text-text-muted font-mono">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
