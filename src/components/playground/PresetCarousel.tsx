/**
 * Preset Carousel v2.0
 */

import { useRef, useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Heart, X, Search } from "lucide-react";

interface Preset {
  id: string;
  name: string;
  tags?: string[];
  isFavorite?: boolean;
}

interface PresetCarouselProps {
  refreshKey?: number;
  onPresetSelect?: (presetId: string) => void;
}

const MOCK_PRESETS: Preset[] = [
  { id: "1", name: "Primary Blue", tags: ["primary", "modern"], isFavorite: true },
  { id: "2", name: "Gradient Glow", tags: ["gradient", "effect"], isFavorite: false },
  { id: "3", name: "Minimalist", tags: ["minimal", "clean"], isFavorite: true },
  { id: "4", name: "Dark Theme", tags: ["dark", "contrast"], isFavorite: false },
  { id: "5", name: "Vibrant", tags: ["colorful", "bold"], isFavorite: false },
  { id: "6", name: "Soft Neutral", tags: ["neutral", "calm"], isFavorite: true },
];

function PresetCard({
  preset,
  onSelect,
  onToggleFavorite,
}: {
  preset: Preset;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <div
      onClick={() => onSelect(preset.id)}
      className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 hover:scale-105 active:scale-95"
    >
      <div className="relative w-full h-full bg-gradient-to-br from-surface-2 to-surface-1 flex items-center justify-center border border-border-subtle group-hover:border-accent transition-colors">
        <div className="text-center">
          <div className="text-xs font-semibold text-text-primary mb-2 px-2 truncate">
            {preset.name}
          </div>
          <div className="flex flex-wrap gap-1 justify-center px-2">
            {preset.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-surface-3/50 text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(preset.id);
            }}
            className="p-2 rounded-lg bg-surface-1/90 hover:bg-accent text-text-secondary hover:text-accent-foreground transition-colors"
            title={preset.isFavorite ? "Remove favorite" : "Add favorite"}
          >
            <Heart
              className="w-5 h-5"
              fill={preset.isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        {preset.isFavorite && (
          <div className="absolute top-1 right-1 text-yellow-400">⭐</div>
        )}
      </div>
    </div>
  );
}

export function PresetCarousel({
  refreshKey = 0,
  onPresetSelect,
}: PresetCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(MOCK_PRESETS.filter((p) => p.isFavorite).map((p) => p.id))
  );

  const filteredPresets = useMemo(() => {
    return MOCK_PRESETS.filter(
      (preset) =>
        preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery]);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  const handleToggleFavorite = useCallback((presetId: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(presetId)) {
        newSet.delete(presetId);
      } else {
        newSet.add(presetId);
      }
      return newSet;
    });
  }, []);

  const handlePresetSelect = useCallback(
    (presetId: string) => {
      onPresetSelect?.(presetId);
    },
    [onPresetSelect]
  );

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-text-secondary">
          Presets
        </h3>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-24 px-2 py-1 text-xs rounded-lg bg-surface-2 border border-border-subtle placeholder:text-text-muted focus:outline-none focus:border-accent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-3 h-3 text-text-muted" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-1 min-h-0">
        <button
          onClick={() => scroll("left")}
          className="flex-shrink-0 p-2 rounded-lg hover:bg-surface-2 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div ref={scrollContainerRef} className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-2">
            {filteredPresets.map((preset) => (
              <PresetCard
                key={preset.id}
                preset={{
                  ...preset,
                  isFavorite: favorites.has(preset.id),
                }}
                onSelect={handlePresetSelect}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="flex-shrink-0 p-2 rounded-lg hover:bg-surface-2 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {searchQuery && (
        <div className="text-xs text-text-muted">
          Found {filteredPresets.length} preset{filteredPresets.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
