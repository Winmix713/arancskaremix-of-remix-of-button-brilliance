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
    <div className="rounded-2xl border border-playground-border bg-gradient-to-b from-preset-top to-preset-bottom backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <h3 className="font-head text-xs font-semibold uppercase tracking-widest text-text-secondary">
          Presets
        </h3>
        <span className="text-xs font-mono text-text-muted bg-white/5 px-2 py-1 rounded-lg">
          {userPresets.length}
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto p-4">
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
    <button
      onClick={onLoad}
      className="group relative shrink-0 flex flex-col items-center gap-2.5 w-44 p-4 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 hover:border-white/20 hover:bg-gradient-to-b hover:from-white/10 hover:to-white/0 transition-all duration-200 hover:shadow-lg hover:shadow-accent/10"
      title="Click to load preset"
    >
      {/* Preview area */}
      <div className="relative h-24 w-full grid place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-black/20 to-black/40 border border-white/5">
        <div style={{ transform: "scale(0.5)" }}>
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

      {/* Label */}
      <div className="w-full text-center">
        {editing ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => onEndEdit(name)}
            onKeyDown={(e) => e.key === "Enter" && onEndEdit(name)}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/10 px-2 py-1 text-xs font-semibold text-text-primary w-full text-center rounded-lg outline-none border border-white/10 focus:border-accent/50"
          />
        ) : (
          <p
            onDoubleClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="text-xs font-semibold text-text-primary truncate w-full"
            title="Double-click to rename"
          >
            {preset.name}
          </p>
        )}
      </div>

      {/* Built-in badge */}
      {builtin && (
        <span className="absolute top-2 right-2 px-2 h-5 flex items-center rounded-full bg-accent/20 border border-accent/30 text-[7px] uppercase tracking-wider font-semibold text-accent">
          Built-in
        </span>
      )}

      {/* Delete button */}
      {!builtin && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-2 right-2 size-6 grid place-items-center rounded-lg bg-black/40 border border-white/10 text-text-muted opacity-0 group-hover:opacity-100 hover:text-accent transition-all duration-150"
          title="Delete preset"
        >
          <X className="size-3.5" />
        </button>
      )}
    </button>
  );
}
