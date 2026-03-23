"use client";

export function Grid({ cols = 3, children }: { cols?: number | string; children: React.ReactNode }) {
  const n = Number(cols) || 3;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${n}, 1fr)`,
        gap: "0.5rem",
        margin: "1.5rem 0",
      }}
    >
      <style>{`
        .img-grid p { margin: 0; display: contents; }
        .img-grid img { margin: 0; cursor: zoom-in; border-radius: 0.5rem; }
      `}</style>
      <div className="img-grid" style={{ display: "contents" }}>
        {children}
      </div>
    </div>
  );
}
