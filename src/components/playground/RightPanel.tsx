import { ColorTheme } from "./sections/ColorTheme";
import { ShapeSize } from "./sections/ShapeSize";
import { Appearance } from "./sections/Appearance";
import { Effects } from "./sections/Effects";

export function RightPanel() {
  return (
    <aside className="flex flex-col gap-1 border-l border-border-subtle bg-surface-1 px-4 py-3 overflow-y-auto h-full">
      <ColorTheme />
      <ShapeSize />
      <Appearance />
      <Effects />
    </aside>
  );
}
