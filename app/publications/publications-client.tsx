"use client";

import { useState } from "react";
import { Publication } from "@/lib/types";
import { PublicationEntry } from "@/components/publication-entry";

function groupByYear(pubs: Publication[]) {
  const grouped = pubs.reduce<Record<number, Publication[]>>((acc, pub) => {
    (acc[pub.year] ??= []).push(pub);
    return acc;
  }, {});
  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);
  return { grouped, years };
}

function YearGroupedList({ pubs }: { pubs: Publication[] }) {
  const { grouped, years } = groupByYear(pubs);
  return (
    <>
      {years.map((year) => (
        <section key={year} className="mb-8">
          <h3 className="font-serif text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">
            {year}
          </h3>
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {grouped[year].map((pub, i) => (
              <PublicationEntry key={i} pub={pub} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

export function PublicationsClient({
  publications,
}: {
  publications: Publication[];
}) {
  const [query, setQuery] = useState("");

  const filtered = publications.filter((pub) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      pub.title.toLowerCase().includes(q) ||
      pub.venue.toLowerCase().includes(q) ||
      pub.authors.some((a) => a.toLowerCase().includes(q)) ||
      pub.year.toString().includes(q)
    );
  });

  const peerReviewed = filtered.filter((p) => p.category === "peer-reviewed");
  const patents = filtered.filter((p) => p.category === "patent");
  const other = filtered.filter((p) => p.category === "other");

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by title, author, venue, or year..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-3 py-2 mb-8 border border-gray-300 dark:border-gray-700 rounded bg-transparent text-sm focus:outline-none focus:border-accent dark:focus:border-accent-dark"
      />
      {peerReviewed.length > 0 && (
        <div className="mb-12">
          <h2 className="font-serif text-xl font-semibold mb-4">Peer-Reviewed</h2>
          <YearGroupedList pubs={peerReviewed} />
        </div>
      )}
      {patents.length > 0 && (
        <div className="mb-12">
          <h2 className="font-serif text-xl font-semibold mb-4">US Patents</h2>
          <YearGroupedList pubs={patents} />
        </div>
      )}
      {other.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-semibold mb-4">Other Publications</h2>
          <YearGroupedList pubs={other} />
        </div>
      )}
      {filtered.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No matching publications.</p>
      )}
    </div>
  );
}
