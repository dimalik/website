"use client";

export function Fn({ id, children }: { id?: string; children: React.ReactNode }) {
  const noteId = id ?? "";
  return (
    <sup>
      <a
        href={`#fn-${noteId}`}
        id={`fnref-${noteId}`}
        className="text-accent dark:text-accent-dark text-xs no-underline hover:underline"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(`fn-${noteId}`)?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {children}
      </a>
    </sup>
  );
}

export function Footnotes({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
      <ol className="list-decimal pl-5 space-y-2 [&_a]:text-accent dark:[&_a]:text-accent-dark">
        {children}
      </ol>
    </section>
  );
}

export function Note({ id, children }: { id?: string; children: React.ReactNode }) {
  const noteId = id ?? "";
  return (
    <li id={`fn-${noteId}`}>
      {children}{" "}
      <a
        href={`#fnref-${noteId}`}
        className="no-underline hover:underline"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(`fnref-${noteId}`)?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        ↩
      </a>
    </li>
  );
}
