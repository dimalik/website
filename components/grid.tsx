export function Grid({ cols = 3, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div
      className="grid gap-2 my-6 [&_p]:m-0 [&_img]:my-0"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {children}
    </div>
  );
}
