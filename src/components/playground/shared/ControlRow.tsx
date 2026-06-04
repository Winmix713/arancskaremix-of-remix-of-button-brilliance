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
    <div className={"flex flex-col gap-1.5 py-1.5 " + (disabled ? "opacity-40 pointer-events-none" : "")}>
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase tracking-[0.14em] text-text-muted font-ui">
          {label}
        </label>
        {hint && <span className="text-[10px] text-text-muted font-ui">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
