# Button Playground — Plan v1 (Build-Ready)

Single-page design tool for crafting, inspecting, and exporting production-ready button styles. Zero backend. All state local, presets in `localStorage`.

## Aesthetic
**"Instrument Panel"** — dark obsidian surfaces, hairline borders, monospaced readouts, precision sliders, phosphor-green accent. Teenage Engineering OP-1 meets Linear.
- Display: **Syne** (logo, section headings)
- UI: **DM Mono** (labels, readouts, numerics)

## Route
Single route `/`. No alias in v1.

## Layout

```text
┌────────────────────────────────────────────────────────────────┐
│ TOPBAR  [⬡ BP] Preset name (editable) [Save][Copy CSS][< >][↓]│
├──────────────────────────────────┬─────────────────────────────┤
│ CANVAS                           │ RIGHT PANEL (sticky scroll) │
│  ┌──────────────────────────┐    │  Color Theme                │
│  │     Primary Action ←edit │    │  Shape & Size               │
│  └──────────────────────────┘    │  Appearance                 │
│  State: [Default][Hover][Active] │  Effects (accordion)        │
│         [Focus][Disabled][Load]  │                             │
│  Zoom: [50%][100%][200%]         │                             │
│  BG:   [Checker][Dark][Light][⬛]│                             │
├──────────────────────────────────┴─────────────────────────────┤
│ SAVED PRESETS (horizontal scroll)                              │
└────────────────────────────────────────────────────────────────┘
```

Responsive: ≥1280 two-column · 768–1279 panel stacks below · <768 single column. No FAB, no bottom sheet.

## Canvas
- BG modes: checker (conic-gradient), dark, light, custom color.
- Zoom: 50/100/200% via `scale()`, value in phosphor-green readout.
- State strip injects a CSS class so every state is inspectable without interaction. Loading shows inline spinner.
- Inline label edit by clicking the button text.
- SVG `<defs>` for all filters live in Canvas.

## Right Panel

**1 · Color Theme.** 8 oklch swatches (Indigo, Blue, Cyan, Emerald, Amber, Rose, Violet, Slate) + Custom (`<input type="color">` + hex). Hover/Active/Focus derived via oklch lightness shift (+6 / −8 / 60% alpha). APCA-based auto text color, manual override available.

**2 · Shape & Size.** Border radius (4 presets [4,10,16,999] + free slider 0–999), Padding X (8–64), Padding Y (4–32), Font size (10–24), Font weight (400/500/600/700 SegmentedControl), Letter spacing (−0.05–0.2 em), Min width (0–400).

**3 · Appearance.** Canvas theme Light/Dark (canvas only, not chrome). Border None/1/2/3 px + color + alpha. Icon slot None/Left/Right (mock SVG).

**4 · Effects (accordion).** Master Enable Switch per section. All **Uniform mode only** in v1; Progressive listed as "Coming soon" disabled item.

- **Inner Shadow** — X, Y, Blur, Spread (−20→20), Color, Alpha. `inset` always true.
- **Drop Shadow 1** — same minus inset. If button is transparent, exported CSS includes a comment about the `::before` pattern; no auto pseudo-element generation.
- **Drop Shadow 2** — independent toggle + values.
- **Background Blur** — Blur 0–40 px, Saturation 0–200%. `backdrop-filter`.
- **Layer Blur** — `filter: blur()` on content layer, 0–20 px.
- **Texture** — Type (Fine/Coarse/Linen/Carbon), Size (64/128/256), Blend (Overlay/Multiply/Screen), Opacity. Clip-to-shape via `overflow:hidden` + matching radius. Inline SVG `feTurbulence` in `<defs>`.
- **Glass** — Light angle (0–360°), Refraction (0–20), Depth (0–100%), Frost (0–40), Splay (0–40). Composed from backdrop-filter + linear-gradient highlight + linear-gradient shadow. No dispersion in v1.
- **Noise** — Type (Mono/Duo/Multi), Size (0.5–4), Density (1–8), Color per channel, Opacity. SVG `feTurbulence`.

## State & Data Flow

```text
<Playground />  (useReducer + PlaygroundContext.Provider)
    ├── <Topbar />
    ├── <Canvas />        reads inlineStyle, filterDefs
    ├── <RightPanel />    dispatches actions
    └── <SavedPresets />  reads/writes localStorage
```

Single `ButtonStyleState` in `useReducer`. Context provides `[state, dispatch]`. No Zustand.

## CSS Export

Human-readable `.btn` ruleset including derived `:hover`, `:active`, `:focus-visible`, `:disabled`. Transparent + Drop Shadow case → comment explaining `::before` wrapper. No auto pseudo-element code.

## TSX Export

Single-file component: CSS as `<style>` tag in snippet head + `<button className="btn">`. One format.

## Export Actions (Topbar)

| Button | Behaviour |
|--------|-----------|
| **Save** | Push `{id,name,style,createdAt}` → `localStorage["bp.presets"]`. Sonner toast "Saved." |
| **Copy CSS** | `navigator.clipboard.writeText(cssString)`. Toast "Copied!" |
| **< > Component** | Copies TSX snippet. Toast "Component copied." |
| **↓ Download** | Blob → anchor download `button.css` |

Code view: `<pre><code>` with DM Mono. No `highlight.js`.

## Saved Presets Row
Horizontal scroll. Card = scaled mini preview + name + date. Click loads. Hover ✕ deletes. Double-click renames. Empty state ghost card "Save your first preset →". No item limit.

## Design Tokens (appended to `src/styles.css`)

```css
:root {
  --surface-0: oklch(10% 0.01 265);
  --surface-1: oklch(13% 0.01 265);
  --surface-2: oklch(16% 0.01 265);
  --surface-3: oklch(20% 0.01 265);
  --border-subtle: oklch(28% 0.02 265 / 60%);
  --border-strong: oklch(40% 0.04 265 / 80%);
  --accent:      oklch(72% 0.22 145);
  --accent-dim:  oklch(60% 0.20 145);
  --accent-glow: oklch(72% 0.22 145 / 25%);
  --text-primary:   oklch(92% 0.01 265);
  --text-secondary: oklch(65% 0.02 265);
  --text-muted:     oklch(45% 0.02 265);
  --font-ui:   "DM Mono", ui-monospace, monospace;
  --font-head: "Syne", sans-serif;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 100ms;
  --dur-base: 180ms;
  --dur-slow: 320ms;
}
```

## File Structure

```text
src/
├── routes/index.tsx                       # renders <Playground />
├── components/playground/
│   ├── Playground.tsx                     # layout + context
│   ├── Topbar.tsx
│   ├── Canvas.tsx                         # preview + SVG defs
│   ├── RightPanel.tsx
│   ├── SavedPresets.tsx
│   ├── sections/
│   │   ├── ColorTheme.tsx
│   │   ├── ShapeSize.tsx
│   │   ├── Appearance.tsx
│   │   └── Effects.tsx
│   ├── effects/
│   │   ├── InnerShadow.tsx
│   │   ├── DropShadow.tsx                 # DS1 + DS2
│   │   ├── BackgroundBlur.tsx
│   │   ├── LayerBlur.tsx
│   │   ├── Texture.tsx
│   │   ├── Glass.tsx
│   │   └── Noise.tsx
│   └── shared/
│       ├── SectionHeader.tsx
│       ├── ControlRow.tsx
│       ├── ColorInput.tsx
│       ├── NumericSlider.tsx
│       ├── SegmentedControl.tsx
│       └── CodeView.tsx
├── lib/playground/
│   ├── types.ts
│   ├── defaults.ts
│   ├── reducer.ts
│   ├── context.ts
│   ├── colorUtils.ts                      # oklch shift + APCA
│   ├── serializeCss.ts
│   ├── serializeComponent.ts
│   ├── filterDefs.ts                      # SVG filter generators
│   └── presets.ts                         # localStorage CRUD
└── styles.css                             # tokens appended
```

## Deferred to v1.1
oklch L/C/H custom sliders · Progressive blur · Glass dispersion · Ruler guides · Cursor px readout · Inline-vs-separate CSS toggle · Preset limit · `/button-playground` alias.

Scope locked. Ready to build on approval.
