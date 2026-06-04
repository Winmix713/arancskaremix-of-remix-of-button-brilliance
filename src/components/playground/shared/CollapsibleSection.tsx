import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  className,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen} className={cn("border-b border-border-subtle pb-4", className)}>
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 py-2 cursor-pointer text-left hover:no-underline group">
        <h3 className="font-head text-[11px] uppercase tracking-[0.18em] text-text-secondary group-hover:text-text-primary transition-colors">
          {title}
        </h3>
        <ChevronDown className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="pt-1">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
