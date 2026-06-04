export function CodeView({ code }: { code: string }) {
  return (
    <pre className="overflow-auto rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm p-4 text-xs leading-relaxed font-mono text-text-primary max-h-[420px]">
      <code>{code}</code>
    </pre>
  );
}
