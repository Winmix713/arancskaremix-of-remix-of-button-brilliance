import type { SavedPreset, ButtonStyleState } from "./types";
import { newId } from "./defaults";

const KEY = "bp.presets";

export function loadPresets(): SavedPreset[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as SavedPreset[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function savePresets(list: SavedPreset[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addPreset(state: ButtonStyleState, name: string): SavedPreset {
  const preset: SavedPreset = {
    id: newId(),
    name: name || "Untitled",
    createdAt: Date.now(),
    state,
  };
  const list = loadPresets();
  list.unshift(preset);
  savePresets(list);
  return preset;
}

export function deletePreset(id: string) {
  savePresets(loadPresets().filter((p) => p.id !== id));
}

export function renamePreset(id: string, name: string) {
  savePresets(loadPresets().map((p) => (p.id === id ? { ...p, name } : p)));
}
