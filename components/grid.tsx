export function Grid({ cols = 3, children }: { cols?: number | string; children: React.ReactNode }) {
  const n = Number(cols) || 3;
  return (
    <div
      className="not-prose grid gap-2 my-6 [&_p]:m-0 [&_p]:contents [&_img]:my-0"
      style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
    >
      {children}
    </div>
  );
}
