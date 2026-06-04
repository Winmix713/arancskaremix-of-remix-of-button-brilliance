import { LayoutGrid, PanelRight, Archive, Help, Settings } from "lucide-react";

export function LeftNav() {
  return (
    <nav className="w-20 shrink-0 flex flex-col items-center gap-3 py-4 px-2 bg-nav-glass backdrop-blur-xl border-r border-playground-border">
      {/* Logo */}
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/80 to-accent/60 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer">
        <span className="font-head font-bold text-white text-sm">B</span>
      </div>

      <div className="w-8 h-px bg-playground-border rounded-full" />

      {/* Nav items */}
      <NavItem icon={LayoutGrid} label="Designer" active />
      <NavItem icon={Archive} label="Presets" />

      <div className="flex-1" />

      {/* Bottom items */}
      <NavItem icon={PanelRight} label="Inspector" />
      <NavItem icon={Settings} label="Settings" />
      <NavItem icon={Help} label="Help" />
    </nav>
  );
}

function NavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      title={label}
      className={`
        flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-150
        ${
          active
            ? "bg-accent/20 text-accent shadow-lg shadow-accent/20"
            : "text-text-secondary hover:text-text-primary hover:bg-surface-3/50"
        }
      `}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
