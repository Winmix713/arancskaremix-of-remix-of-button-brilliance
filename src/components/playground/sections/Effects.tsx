import { usePlayground } from "@/lib/playground/context";
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
    <AccordionItem value={value} className="border-b border-border-subtle">
      <div className="flex items-center justify-between gap-2 pr-1">
        <AccordionTrigger className="flex-1 py-2.5 text-[11px] uppercase tracking-[0.16em] font-head text-text-primary hover:no-underline">
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
      <AccordionContent className="pb-3 pt-1">{children}</AccordionContent>
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
