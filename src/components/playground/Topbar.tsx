import { useMemo, useState } from "react";
import { usePlayground } from "@/lib/playground/context";
import { deriveCss } from "@/lib/playground/serializeCss";
import { serializeComponent } from "@/lib/playground/serializeComponent";
import { addPreset } from "@/lib/playground/presets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CodeView } from "./shared/CodeView";
import { Save, Copy, Download, Code2, FileCode2 } from "lucide-react";
import { toast } from "sonner";

export function Topbar({ onPresetsChange }: { onPresetsChange: () => void }) {
  const { state, dispatch } = usePlayground();
  const css = useMemo(() => deriveCss(state).cssString, [state]);
  const tsx = useMemo(() => serializeComponent(state), [state]);
  const [cssOpen, setCssOpen] = useState(false);
  const [tsxOpen, setTsxOpen] = useState(false);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(label);
    } catch {
      toast.error("Copy failed");
    }
  };

  const download = () => {
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "button.css";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded button.css");
  };

  const save = () => {
    addPreset(state, state.meta.name || "Untitled");
    toast.success("Preset saved");
    onPresetsChange();
  };

  return (
    <header className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 h-14 shrink-0 bg-[linear-gradient(180deg,oklch(100%_0_0_/_3%),oklch(100%_0_0_/_0%))] backdrop-blur-xl supports-[backdrop-filter]:bg-surface-1/70">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2.5">
          <span
            className="grid place-items-center size-7 rounded-[8px] text-white text-[13px] font-semibold shadow-[inset_0_1px_0_oklch(100%_0_0/25%),0_4px_14px_-4px_oklch(68%_0.19_252/60%)]"
            style={{ background: "linear-gradient(135deg, oklch(72% 0.18 250), oklch(58% 0.21 270))" }}
          >
            B
          </span>
          <span className="font-head text-[13px] font-semibold tracking-[-0.01em] text-text-primary hidden sm:inline">
            Button Playground
          </span>
        </div>
        <span className="text-text-muted">·</span>
        <input
          value={state.meta.name}
          onChange={(e) => dispatch({ type: "SET_META_NAME", name: e.target.value })}
          className="bg-transparent text-[12px] font-ui text-text-secondary outline-none focus:text-text-primary min-w-0 truncate max-w-[180px]"
          placeholder="Preset name"
        />
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={save}
          className="h-8 px-2 text-[11px] font-ui uppercase tracking-wider text-text-secondary hover:text-accent hover:bg-surface-3"
        >
          <Save className="size-3.5" /> <span className="hidden md:inline">Save</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copy(css, "CSS copied")}
          className="h-8 px-2 text-[11px] font-ui uppercase tracking-wider text-text-secondary hover:text-accent hover:bg-surface-3"
        >
          <Copy className="size-3.5" /> <span className="hidden md:inline">Copy CSS</span>
        </Button>

        <Dialog open={cssOpen} onOpenChange={setCssOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-[11px] font-ui uppercase tracking-wider text-text-secondary hover:text-accent hover:bg-surface-3"
            >
              <FileCode2 className="size-3.5" /> <span className="hidden md:inline">CSS</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-surface-1 border-border-subtle">
            <DialogHeader>
              <DialogTitle className="font-head text-text-primary">CSS Export</DialogTitle>
            </DialogHeader>
            <CodeView code={css} />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => copy(css, "CSS copied")}>
                <Copy className="size-3.5" /> Copy
              </Button>
              <Button size="sm" onClick={download}>
                <Download className="size-3.5" /> Download
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={tsxOpen} onOpenChange={setTsxOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-[11px] font-ui uppercase tracking-wider text-text-secondary hover:text-accent hover:bg-surface-3"
            >
              <Code2 className="size-3.5" />{" "}
              <span className="hidden md:inline">Component</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-surface-1 border-border-subtle">
            <DialogHeader>
              <DialogTitle className="font-head text-text-primary">TSX Component</DialogTitle>
            </DialogHeader>
            <CodeView code={tsx} />
            <div className="flex justify-end gap-2 pt-2">
              <Button size="sm" onClick={() => copy(tsx, "Component copied")}>
                <Copy className="size-3.5" /> Copy
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="ghost"
          size="sm"
          onClick={download}
          className="h-8 px-2 text-[11px] font-ui uppercase tracking-wider text-text-secondary hover:text-accent hover:bg-surface-3"
        >
          <Download className="size-3.5" />
        </Button>
      </div>
    </header>
  );
}
