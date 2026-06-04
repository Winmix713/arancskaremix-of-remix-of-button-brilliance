/**
 * Premium Left Navigation v2.0
 */

import { useMemo, useCallback } from "react";
import { LayoutGrid, Archive, Settings, HelpCircle, Moon, Sun, X } from "lucide-react";

interface LeftNavPremiumProps {
  onClose?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const NAV_ITEMS = [
  { id: "designer", icon: LayoutGrid, label: "Designer", tooltip: "Design" },
  { id: "presets", icon: Archive, label: "Presets", tooltip: "Browse" },
] as const;

const BOTTOM_ITEMS = [
  { id: "settings", icon: Settings, label: "Settings", tooltip: "Preferences" },
  { id: "help", icon: HelpCircle, label: "Help", tooltip: "Docs" },
] as const;

function NavItemButton({
  icon: Icon,
  label,
  tooltip,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tooltip: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={`
        flex items-center justify-center w-12 h-12 rounded-xl
        transition-all duration-200
        ${
          active
            ? "bg-accent/25 text-accent shadow-lg scale-105"
            : "text-text-secondary hover:text-text-primary hover:bg-surface-2/50 active:scale-95"
        }
      `}
      aria-pressed={active}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

export function LeftNavPremium({
  onClose,
  isDarkMode = true,
  onToggleDarkMode,
}: LeftNavPremiumProps) {
  const handleNavClick = useCallback(() => {}, []);

  return (
    <nav
      className="w-20 h-full flex flex-col items-center gap-4 py-4 px-2 bg-gradient-to-b from-surface-1/60 to-surface-0/40 backdrop-blur-xl border-r border-border-subtle"
      role="navigation"
      aria-label="Main navigation"
    >
      <button
        className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
        title="Home"
        aria-label="Home"
      >
        <span className="font-display font-bold text-lg">B</span>
      </button>

      <div className="w-8 h-px bg-border-subtle" />

      <div className="flex flex-col gap-2 w-full" role="menubar">
        {NAV_ITEMS.map((item) => (
          <NavItemButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            tooltip={item.tooltip}
            active={item.id === "designer"}
            onClick={handleNavClick}
          />
        ))}
      </div>

      <div className="flex-1" />

      <button
        onClick={onToggleDarkMode}
        title={isDarkMode ? "Light mode" : "Dark mode"}
        className="flex items-center justify-center w-12 h-12 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-2/50 transition-all"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      <div className="flex flex-col gap-2 w-full" role="menubar">
        {BOTTOM_ITEMS.map((item) => (
          <NavItemButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            tooltip={item.tooltip}
            onClick={handleNavClick}
          />
        ))}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex lg:hidden items-center justify-center w-12 h-12 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-2/50 transition-all"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </nav>
  );
}
