import { useReducer, useState } from "react";
import { PlaygroundContext } from "@/lib/playground/context";
import { reducer } from "@/lib/playground/reducer";
import { defaultState } from "@/lib/playground/defaults";
import { Topbar } from "./Topbar";
import { Canvas } from "./Canvas";
import { RightPanel } from "./RightPanel";
import { SavedPresets } from "./SavedPresets";

export function Playground() {
  const [state, dispatch] = useReducer(reducer, undefined, defaultState);
  const [presetsKey, setPresetsKey] = useState(0);

  return (
    <PlaygroundContext.Provider value={{ state, dispatch }}>
      <div className="flex flex-col h-screen w-full bg-surface-0 text-text-primary font-ui">
        <Topbar onPresetsChange={() => setPresetsKey((k) => k + 1)} />
        <div className="flex flex-1 min-h-0 flex-col xl:flex-row">
          <div className="flex-1 min-h-0 min-w-0 flex flex-col">
            <Canvas />
            <SavedPresets refreshKey={presetsKey} />
          </div>
          <div className="xl:w-[340px] xl:shrink-0 max-h-[55vh] xl:max-h-none xl:h-auto overflow-hidden border-t xl:border-t-0 border-border-subtle shadow-[0_-12px_28px_-18px_rgba(0,0,0,0.6)] xl:shadow-none">
            <RightPanel />
          </div>
        </div>
      </div>
    </PlaygroundContext.Provider>
  );
}
