import { useReducer, useState } from "react";
import { PlaygroundContext } from "@/lib/playground/context";
import { reducer } from "@/lib/playground/reducer";
import { defaultState } from "@/lib/playground/defaults";
import { Topbar } from "./Topbar";
import { Canvas } from "./Canvas";
import { RightPanel } from "./RightPanel";
import { LeftNav } from "./LeftNav";
import { SavedPresets } from "./SavedPresets";

export function Playground() {
  const [state, dispatch] = useReducer(reducer, undefined, defaultState);
  const [presetsKey, setPresetsKey] = useState(0);
  const [inspectorOpen, setInspectorOpen] = useState(true);

  return (
    <PlaygroundContext.Provider value={{ state, dispatch }}>
      <div className="flex h-screen w-full bg-playground-bg text-text-primary font-ui antialiased">
        {/* Left Navigation — Glass with icons only */}
        <LeftNav />

        {/* Main content area */}
        <div className="flex flex-col flex-1 min-h-0">
          <Topbar onPresetsChange={() => setPresetsKey((k) => k + 1)} />

          {/* Hero canvas + presets + inspector */}
          <div className="flex flex-1 min-h-0 gap-4 px-4 py-4">
            {/* Center Canvas — Hero Element (70-80% attention) */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              <div className="flex-1 rounded-2xl overflow-hidden bg-canvas-bg backdrop-blur-sm border border-playground-border shadow-lg">
                <Canvas />
              </div>
              <SavedPresets refreshKey={presetsKey} />
            </div>

            {/* Right Inspector Panel */}
            {inspectorOpen && (
              <div className="w-96 shrink-0 rounded-2xl overflow-hidden bg-inspector-bg backdrop-blur-md border border-playground-border shadow-lg">
                <RightPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </PlaygroundContext.Provider>
  );
}
