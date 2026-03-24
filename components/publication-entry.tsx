import { Publication } from "@/lib/types";

export function PublicationEntry({ pub }: { pub: Publication }) {
  return (
    <li className="py-3">
      <p className="font-sans text-base leading-snug">
        {pub.title}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {pub.authors.map((a, i) => (
          <span key={i}>
            {a.includes("Alikaniotis") ? (
              <strong className="text-text-light dark:text-text-dark">{a}</strong>
            ) : (
              a
            )}
            {i < pub.authors.length - 1 ? ", " : ""}
          </span>
        ))}
        {" — "}
        <em>{pub.venue}</em>, {pub.year}
      </p>
      {Object.keys(pub.links).length > 0 && (
        <div className="flex gap-3 mt-1 text-sm">
          {pub.links.pdf && (
            <a href={pub.links.pdf} className="text-accent dark:text-accent-dark hover:underline" target="_blank" rel="noopener noreferrer">[PDF]</a>
          )}
          {pub.links.code && (
            <a href={pub.links.code} className="text-accent dark:text-accent-dark hover:underline" target="_blank" rel="noopener noreferrer">[Code]</a>
          )}
          {pub.links.bibtex && (
            <a href={pub.links.bibtex} className="text-accent dark:text-accent-dark hover:underline" target="_blank" rel="noopener noreferrer">[BibTeX]</a>
          )}
          {pub.links.interactive && (
            <a href={pub.links.interactive} className="text-accent dark:text-accent-dark hover:underline" target="_blank" rel="noopener noreferrer">[Interactive]</a>
          )}
        </div>
      )}
    </li>
  );
}
