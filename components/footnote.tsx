"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export function FootnoteProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    fnCounter = 0;
  }, []);
  return <>{children}</>;
}

let fnCounter = 0;
function getNextId() {
  return ++fnCounter;
}

export function Fn({ children }: { children: ReactNode }) {
  const idRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (idRef.current === null) {
      idRef.current = getNextId();
    }
    setMounted(true);
    return () => {
      // Reset counter when all components unmount (page navigation)
    };
  }, []);

  if (!mounted) {
    return <sup className="text-accent dark:text-accent-dark text-xs">*</sup>;
  }

  const id = idRef.current!;

  return (
    <span className="inline">
      <sup>
        <a
          href={`#fn-${id}`}
          id={`fnref-${id}`}
          className="text-accent dark:text-accent-dark text-xs no-underline hover:underline"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(`fn-${id}`)?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {id}
        </a>
      </sup>
      <span data-fn={id} className="hidden">
        {children}
      </span>
    </span>
  );
}

export function Footnotes() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.innerHTML = "";
    const notes = document.querySelectorAll("[data-fn]");
    notes.forEach((note) => {
      const id = note.getAttribute("data-fn");
      const li = document.createElement("li");
      li.id = `fn-${id}`;
      li.innerHTML =
        note.innerHTML +
        ` <a href="#fnref-${id}" style="text-decoration:none">\u21a9</a>`;
      li.querySelector("a:last-child")?.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById(`fnref-${id}`)?.scrollIntoView({ behavior: "smooth" });
      });
      list.appendChild(li);
    });
  }, []);

  return (
    <section className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
      <ol
        ref={listRef}
        className="list-decimal pl-5 space-y-2 [&_a]:text-accent dark:[&_a]:text-accent-dark"
      />
    </section>
  );
}
