import { ColorTheme } from "./sections/ColorTheme";
import { ShapeSize } from "./sections/ShapeSize";
import { Appearance } from "./sections/Appearance";
import { Effects } from "./sections/Effects";

export function RightPanel() {
  return (
    <aside className="flex flex-col gap-0 bg-gradient-to-b from-inspector-top to-inspector-bottom backdrop-blur-xl px-6 py-4 overflow-y-auto h-full">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-4">
        Inspector
      </h2>

      <div className="space-y-0">
        <ColorTheme />
        <div className="h-px bg-white/5 my-3" />
        <ShapeSize />
        <div className="h-px bg-white/5 my-3" />
        <Appearance />
        <div className="h-px bg-white/5 my-3" />
        <Effects />
      </div>
    </aside>
  );
}
