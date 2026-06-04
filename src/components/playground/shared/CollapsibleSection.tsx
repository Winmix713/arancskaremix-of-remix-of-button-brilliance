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
    <Collapsible defaultOpen={defaultOpen} className={cn("pb-3", className)}>
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 py-2.5 px-2 cursor-pointer text-left hover:no-underline group rounded-lg hover:bg-white/5 transition-colors">
        <h3 className="font-head text-xs font-semibold uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors">
          {title}
        </h3>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="px-2 pt-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
