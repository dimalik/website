import Link from "next/link";
import { LatestItem } from "@/lib/types";

export function PostListItem({ item, href }: { item: LatestItem; href: string }) {
  return (
    <li>
      <Link href={href} className="group block py-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-sans text-lg group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
            {item.title}
          </h3>
          <time className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
            {new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </time>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {item.description}
        </p>
      </Link>
    </li>
  );
}
