import type {
  ButtonStyleState,
  BaseStyle,
  CanvasState,
  EffectsState,
  ShadowState,
  BackgroundBlurState,
  LayerBlurState,
  TextureState,
  GlassState,
  NoiseState,
} from "./types";
import { defaultState } from "./defaults";

export type Action =
  | { type: "SET_BASE"; patch: Partial<BaseStyle> }
  | { type: "SET_CANVAS"; patch: Partial<CanvasState> }
  | { type: "SET_META_NAME"; name: string }
  | { type: "SET_INNER_SHADOW"; patch: Partial<ShadowState> }
  | { type: "SET_DROP_SHADOW_1"; patch: Partial<ShadowState> }
  | { type: "SET_DROP_SHADOW_2"; patch: Partial<ShadowState> }
  | { type: "SET_BG_BLUR"; patch: Partial<BackgroundBlurState> }
  | { type: "SET_LAYER_BLUR"; patch: Partial<LayerBlurState> }
  | { type: "SET_TEXTURE"; patch: Partial<TextureState> }
  | { type: "SET_GLASS"; patch: Partial<GlassState> }
  | { type: "SET_NOISE"; patch: Partial<NoiseState> }
  | { type: "LOAD"; state: ButtonStyleState }
  | { type: "RESET" };

const setEffect = <K extends keyof EffectsState>(
  state: ButtonStyleState,
  key: K,
  patch: Partial<EffectsState[K]>,
): ButtonStyleState => ({
  ...state,
  effects: { ...state.effects, [key]: { ...state.effects[key], ...patch } },
});

export function reducer(state: ButtonStyleState, action: Action): ButtonStyleState {
  switch (action.type) {
    case "SET_BASE":
      return { ...state, base: { ...state.base, ...action.patch } };
    case "SET_CANVAS":
      return { ...state, canvas: { ...state.canvas, ...action.patch } };
    case "SET_META_NAME":
      return { ...state, meta: { ...state.meta, name: action.name } };
    case "SET_INNER_SHADOW":
      return setEffect(state, "innerShadow", action.patch);
    case "SET_DROP_SHADOW_1":
      return setEffect(state, "dropShadow1", action.patch);
    case "SET_DROP_SHADOW_2":
      return setEffect(state, "dropShadow2", action.patch);
    case "SET_BG_BLUR":
      return setEffect(state, "backgroundBlur", action.patch);
    case "SET_LAYER_BLUR":
      return setEffect(state, "layerBlur", action.patch);
    case "SET_TEXTURE":
      return setEffect(state, "texture", action.patch);
    case "SET_GLASS":
      return setEffect(state, "glass", action.patch);
    case "SET_NOISE":
      return setEffect(state, "noise", action.patch);
    case "LOAD":
      return action.state;
    case "RESET":
      return defaultState();
    default:
      return state;
  }
}
