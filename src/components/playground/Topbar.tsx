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
    <header className="flex items-center justify-between gap-4 px-6 h-16 shrink-0 border-b border-playground-border">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-head text-sm font-semibold text-text-primary">Design Studio Pro</h1>
          <input
            value={state.meta.name}
            onChange={(e) => dispatch({ type: "SET_META_NAME", name: e.target.value })}
            className="bg-transparent text-xs font-ui text-text-secondary outline-none focus:text-accent min-w-0 truncate max-w-[200px]"
            placeholder="Preset name..."
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={save}
          className="h-9 px-3 text-xs font-semibold text-text-secondary hover:text-accent hover:bg-surface-2 rounded-lg transition-colors"
        >
          <Save className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copy(css, "CSS copied")}
          className="h-9 px-3 text-xs font-semibold text-text-secondary hover:text-accent hover:bg-surface-2 rounded-lg transition-colors"
        >
          <Copy className="size-4" />
        </Button>

        <Dialog open={cssOpen} onOpenChange={setCssOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 text-xs font-semibold text-text-secondary hover:text-accent hover:bg-surface-2 rounded-lg transition-colors"
            >
              <FileCode2 className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-surface-1 border-playground-border rounded-2xl">
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
              className="h-9 px-3 text-xs font-semibold text-text-secondary hover:text-accent hover:bg-surface-2 rounded-lg transition-colors"
            >
              <Code2 className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-surface-1 border-playground-border rounded-2xl">
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
          className="h-9 px-3 text-xs font-semibold text-text-secondary hover:text-accent hover:bg-surface-2 rounded-lg transition-colors"
        >
          <Download className="size-4" />
        </Button>
      </div>
    </header>
  );
}
