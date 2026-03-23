import { ReactNode } from "react";

export function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
      {children}
    </figcaption>
  );
}
