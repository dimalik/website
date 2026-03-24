import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <nav className="sticky top-0 z-10 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-2">
        <Link
          href="/"
          className="font-sans text-lg font-semibold hover:text-accent dark:hover:text-accent-dark transition-colors"
        >
          Dimitris Alikaniotis
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/publications" className="hover:text-accent dark:hover:text-accent-dark transition-colors">Publications</Link>
          <Link href="/projects" className="hover:text-accent dark:hover:text-accent-dark transition-colors">Projects</Link>
          <Link href="/writing" className="hover:text-accent dark:hover:text-accent-dark transition-colors">Writing</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
