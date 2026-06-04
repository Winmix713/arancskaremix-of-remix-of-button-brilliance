/**
 * Premium Right Panel v2.0
 */

import { useState, useCallback } from "react";
import { usePlayground } from "@/lib/playground/context";
import { Palette, Type, Sparkles, Layout, ChevronDown, ChevronUp } from "lucide-react";

interface RightPanelPremiumProps {
  activeTab: "color" | "typography" | "effects" | "layout";
  onTabChange: (tab: "color" | "typography" | "effects" | "layout") => void;
}

const TABS = [
  { id: "color", label: "Color", icon: Palette },
  { id: "typography", label: "Type", icon: Type },
  { id: "effects", label: "Effects", icon: Sparkles },
  { id: "layout", label: "Layout", icon: Layout },
] as const;

function TabNavigation({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: any) => void;
}) {
  return (
    <div className="flex gap-1 border-b border-border-subtle p-2" role="tablist">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all
              ${
                activeTab === tab.id
                  ? "bg-accent/20 text-accent shadow-sm"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2/50"
              }
            `}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            <Icon className="w-4 h-4" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function CollapsibleSection({
  id,
  title,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  expanded: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border-subtle last:border-0">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-2/50 transition-colors"
        role="button"
        aria-expanded={expanded}
      >
        <span className="text-sm font-semibold text-text-primary">{title}</span>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-text-secondary" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-secondary" />
        )}
      </button>

      {expanded && (
        <div className="px-4 py-3 bg-surface-2/30 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function ColorSection() {
  const { state, dispatch } = usePlayground();

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-text-secondary mb-2 block">
          Background
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={state.button?.backgroundColor || "#3366ff"}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_BUTTON",
                payload: { backgroundColor: e.target.value },
              })
            }
            className="w-12 h-10 rounded-lg cursor-pointer border border-border-subtle"
          />
          <input
            type="text"
            value={state.button?.backgroundColor || "#3366ff"}
            className="flex-1 px-3 py-2 rounded-lg bg-surface-1 border border-border-subtle text-xs font-mono"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-text-secondary mb-2 block">
          Text Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={state.button?.textColor || "#ffffff"}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_BUTTON",
                payload: { textColor: e.target.value },
              })
            }
            className="w-12 h-10 rounded-lg cursor-pointer border border-border-subtle"
          />
          <input
            type="text"
            value={state.button?.textColor || "#ffffff"}
            className="flex-1 px-3 py-2 rounded-lg bg-surface-1 border border-border-subtle text-xs font-mono"
          />
        </div>
      </div>
    </div>
  );
}

function TypographySection() {
  const { state, dispatch } = usePlayground();

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-text-secondary mb-2 block">
          Text
        </label>
        <input
          type="text"
          value={state.button?.text || "Button"}
          onChange={(e) =>
            dispatch({ type: "UPDATE_BUTTON", payload: { text: e.target.value } })
          }
          className="w-full px-3 py-2 rounded-lg bg-surface-1 border border-border-subtle text-xs"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-text-secondary mb-2 block">
          Size: {state.button?.fontSize || 16}px
        </label>
        <input
          type="range"
          min="12"
          max="32"
          value={state.button?.fontSize || 16}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_BUTTON",
              payload: { fontSize: Number(e.target.value) },
            })
          }
          className="w-full"
        />
      </div>
    </div>
  );
}

function EffectsSection() {
  const { state, dispatch } = usePlayground();

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-text-secondary mb-2 block">
          Radius: {state.button?.borderRadius || 8}px
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={state.button?.borderRadius || 8}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_BUTTON",
              payload: { borderRadius: Number(e.target.value) },
            })
          }
          className="w-full"
        />
      </div>
    </div>
  );
}

function LayoutSection() {
  const { state, dispatch } = usePlayground();

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-text-secondary mb-2 block">
          Padding X: {state.button?.paddingX || 24}px
        </label>
        <input
          type="range"
          min="8"
          max="48"
          value={state.button?.paddingX || 24}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_BUTTON",
              payload: { paddingX: Number(e.target.value) },
            })
          }
          className="w-full"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-text-secondary mb-2 block">
          Padding Y: {state.button?.paddingY || 12}px
        </label>
        <input
          type="range"
          min="8"
          max="32"
          value={state.button?.paddingY || 12}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_BUTTON",
              payload: { paddingY: Number(e.target.value) },
            })
          }
          className="w-full"
        />
      </div>
    </div>
  );
}

export function RightPanelPremium({
  activeTab,
  onTabChange,
}: RightPanelPremiumProps) {
  const [sections, setSections] = useState<Record<string, boolean>>({
    "color-theme": activeTab === "color",
    "typography-opts": activeTab === "typography",
    "effects-opts": activeTab === "effects",
    "layout-opts": activeTab === "layout",
  });

  const toggleSection = useCallback((id: string) => {
    setSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />

      <div className="flex-1 overflow-y-auto">
        {activeTab === "color" && (
          <CollapsibleSection
            id="color-theme"
            title="Colors"
            expanded={sections["color-theme"]}
            onToggle={toggleSection}
          >
            <ColorSection />
          </CollapsibleSection>
        )}

        {activeTab === "typography" && (
          <CollapsibleSection
            id="typography-opts"
            title="Typography"
            expanded={sections["typography-opts"]}
            onToggle={toggleSection}
          >
            <TypographySection />
          </CollapsibleSection>
        )}

        {activeTab === "effects" && (
          <CollapsibleSection
            id="effects-opts"
            title="Effects"
            expanded={sections["effects-opts"]}
            onToggle={toggleSection}
          >
            <EffectsSection />
          </CollapsibleSection>
        )}

        {activeTab === "layout" && (
          <CollapsibleSection
            id="layout-opts"
            title="Layout"
            expanded={sections["layout-opts"]}
            onToggle={toggleSection}
          >
            <LayoutSection />
          </CollapsibleSection>
        )}
      </div>
    </div>
  );
}
