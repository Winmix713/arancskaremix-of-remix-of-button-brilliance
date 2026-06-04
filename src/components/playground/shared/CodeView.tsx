export function CodeView({ code }: { code: string }) {
  return (
    <pre className="overflow-auto rounded-md border border-border-subtle bg-surface-0 p-3 text-[11px] leading-relaxed font-ui text-text-primary max-h-[420px]">
      <code>{code}</code>
    </pre>
  );
}
