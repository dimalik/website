"use client";

import { createContext, useContext, useRef, ReactNode } from "react";

const FootnoteContext = createContext<{ current: number }>({ current: 0 });

export function FootnoteProvider({ children }: { children: ReactNode }) {
  const counter = useRef(0);
  return (
    <FootnoteContext.Provider value={counter}>
      {children}
    </FootnoteContext.Provider>
  );
}

export function Fn({ children }: { children: ReactNode }) {
  const counter = useContext(FootnoteContext);
  counter.current += 1;
  const id = counter.current;

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
      <span
        id={`fn-${id}`}
        data-fn={id}
        data-content=""
        className="hidden"
      >
        {children}
      </span>
    </span>
  );
}

export function Footnotes() {
  return <FootnoteList />;
}

function FootnoteList() {
  return (
    <section className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
      <ol className="list-decimal pl-5 space-y-2 [&_a]:text-accent dark:[&_a]:text-accent-dark" id="footnote-list" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var notes = document.querySelectorAll('[data-fn]');
              var list = document.getElementById('footnote-list');
              if (!list) return;
              notes.forEach(function(note) {
                var id = note.getAttribute('data-fn');
                var li = document.createElement('li');
                li.id = 'fn-' + id;
                li.innerHTML = note.innerHTML + ' <a href="#fnref-' + id + '">\u21a9</a>';
                list.appendChild(li);
              });
            })();
          `,
        }}
      />
    </section>
  );
}
