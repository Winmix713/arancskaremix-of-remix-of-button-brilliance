import { createContext, useContext } from "react";
import type { ButtonStyleState } from "./types";
import type { Action } from "./reducer";

export type PlaygroundContextValue = {
  state: ButtonStyleState;
  dispatch: React.Dispatch<Action>;
};

export const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export function usePlayground() {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error("usePlayground must be used inside <PlaygroundContext.Provider>");
  return ctx;
}
