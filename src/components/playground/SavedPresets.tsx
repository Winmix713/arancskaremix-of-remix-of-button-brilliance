import { useEffect, useState } from "react";
import { usePlayground } from "@/lib/playground/context";
import { deriveCss } from "@/lib/playground/serializeCss";
import { loadPresets, deletePreset, renamePreset } from "@/lib/playground/presets";
import { BUILTIN_PRESETS, isBuiltin } from "@/lib/playground/builtinPresets";
import type { SavedPreset } from "@/lib/playground/types";
import { X } from "lucide-react";
import { toast } from "sonner";

export function SavedPresets({ refreshKey }: { refreshKey: number }) {
  const { dispatch } = usePlayground();
  const [userPresets, setUserPresets] = useState<SavedPreset[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setUserPresets(loadPresets());
  }, [refreshKey]);

  const refresh = () => setUserPresets(loadPresets());
  const presets = [...BUILTIN_PRESETS, ...userPresets];

  return (
    <div className="border-t border-border-subtle bg-surface-1 px-4 py-3 shrink-0">
      <div className="flex items-center justify-between pb-2">
        <h3 className="font-head text-[11px] uppercase tracking-[0.18em] text-text-secondary">
          Saved Presets
        </h3>
        <span className="text-[10px] font-ui text-text-muted">{userPresets.length}</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {presets.map((p) => {
          const builtin = isBuiltin(p.id);
          return (
            <PresetCard
              key={p.id}
              preset={p}
              builtin={builtin}
              editing={editingId === p.id}
              onEdit={() => !builtin && setEditingId(p.id)}
              onEndEdit={(name) => {
                renamePreset(p.id, name);
                setEditingId(null);
                refresh();
              }}
              onLoad={() => {
                dispatch({ type: "LOAD", state: p.state });
                toast.success(`Loaded "${p.name}"`);
              }}
              onDelete={() => {
                deletePreset(p.id);
                refresh();
                toast.success("Preset deleted");
              }}
            />
          );
        })}
      </div>
    </div>
  );
}


function PresetCard({
  preset,
  builtin,
  editing,
  onEdit,
  onEndEdit,
  onLoad,
  onDelete,
}: {
  preset: SavedPreset;
  builtin: boolean;
  editing: boolean;
  onEdit: () => void;
  onEndEdit: (name: string) => void;
  onLoad: () => void;
  onDelete: () => void;
}) {
  const [name, setName] = useState(preset.name);
  const derived = deriveCss(preset.state);

  return (
    <div className="group relative shrink-0 rounded-md border border-border-subtle bg-surface-2 p-2 hover:border-border-strong transition-colors">
      <button
        onClick={onLoad}
        className="flex flex-col items-center gap-1.5 w-32"
        title="Click to load"
      >
        <div className="relative h-12 w-full grid place-items-center overflow-hidden rounded bg-surface-0">
          <div style={{ transform: "scale(0.4)" }}>
            <div
              style={{
                ...derived.baseStyle,
                position: "relative",
                cursor: "default",
              }}
            >
              <span style={{ position: "relative" }}>{preset.state.base.label}</span>
            </div>
          </div>
        </div>
        {editing ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => onEndEdit(name)}
            onKeyDown={(e) => e.key === "Enter" && onEndEdit(name)}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface-3 px-1 py-0.5 text-[10px] font-ui text-text-primary w-full text-center rounded outline-none"
          />
        ) : (
          <span
            onDoubleClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="text-[10px] font-ui text-text-secondary truncate w-full text-center"
            title="Double-click to rename"
          >
            {preset.name}
          </span>
        )}
      </button>
      {!builtin && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute -top-1.5 -right-1.5 size-5 grid place-items-center rounded-full bg-surface-3 border border-border-subtle text-text-muted opacity-0 group-hover:opacity-100 hover:text-accent transition-opacity"
          title="Delete"
        >
          <X className="size-3" />
        </button>
      )}
      {builtin && (
        <span className="absolute -top-1.5 -right-1.5 px-1.5 h-4 grid place-items-center rounded-full bg-surface-3 border border-border-subtle text-[8px] uppercase tracking-wider text-text-muted">
          Built-in
        </span>
      )}
    </div>
  );
}
