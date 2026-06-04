import { usePlayground } from "@/lib/playground/context";
import { CollapsibleSection } from "../shared/CollapsibleSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { InnerShadow } from "../effects/InnerShadow";
import { DropShadow } from "../effects/DropShadow";
import { BackgroundBlur } from "../effects/BackgroundBlur";
import { LayerBlur } from "../effects/LayerBlur";
import { Texture } from "../effects/Texture";
import { Glass } from "../effects/Glass";
import { Noise } from "../effects/Noise";
import type { Action } from "@/lib/playground/reducer";
import type { ReactNode } from "react";

function Row({
  value,
  title,
  enabled,
  onToggle,
  children,
}: {
  value: string;
  title: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <AccordionItem value={value} className="border-b border-white/5">
      <div className="flex items-center justify-between gap-2 px-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
        <AccordionTrigger className="flex-1 text-xs font-semibold uppercase tracking-widest text-text-primary hover:no-underline">
          {title}
        </AccordionTrigger>
        <Switch
          checked={enabled}
          onCheckedChange={(v) => {
            onToggle(v);
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <AccordionContent className="pb-3 px-2 pt-2">{children}</AccordionContent>
    </AccordionItem>
  );
}

export function Effects() {
  const { state, dispatch } = usePlayground();
  const e = state.effects;
  const toggle = (type: Action["type"], enabled: boolean) =>
    dispatch({ type, patch: { enabled } } as Action);

  return (
    <CollapsibleSection title="Effects" className="border-b-0">
      <Accordion type="multiple" className="w-full">
        <Row
          value="inner"
          title="Inner Shadow"
          enabled={e.innerShadow.enabled}
          onToggle={(v) => toggle("SET_INNER_SHADOW", v)}
        >
          <InnerShadow />
        </Row>
        <Row
          value="ds1"
          title="Drop Shadow 1"
          enabled={e.dropShadow1.enabled}
          onToggle={(v) => toggle("SET_DROP_SHADOW_1", v)}
        >
          <DropShadow which={1} />
        </Row>
        <Row
          value="ds2"
          title="Drop Shadow 2"
          enabled={e.dropShadow2.enabled}
          onToggle={(v) => toggle("SET_DROP_SHADOW_2", v)}
        >
          <DropShadow which={2} />
        </Row>
        <Row
          value="bgblur"
          title="Background Blur"
          enabled={e.backgroundBlur.enabled}
          onToggle={(v) => toggle("SET_BG_BLUR", v)}
        >
          <BackgroundBlur />
        </Row>
        <Row
          value="layerblur"
          title="Layer Blur"
          enabled={e.layerBlur.enabled}
          onToggle={(v) => toggle("SET_LAYER_BLUR", v)}
        >
          <LayerBlur />
        </Row>
        <Row
          value="texture"
          title="Texture"
          enabled={e.texture.enabled}
          onToggle={(v) => toggle("SET_TEXTURE", v)}
        >
          <Texture />
        </Row>
        <Row
          value="glass"
          title="Glass"
          enabled={e.glass.enabled}
          onToggle={(v) => toggle("SET_GLASS", v)}
        >
          <Glass />
        </Row>
        <Row
          value="noise"
          title="Noise"
          enabled={e.noise.enabled}
          onToggle={(v) => toggle("SET_NOISE", v)}
        >
          <Noise />
        </Row>
      </Accordion>
    </CollapsibleSection>
  );
}
