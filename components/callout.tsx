import { ReactNode, Children, isValidElement } from "react";

const CALLOUT_TYPES: Record<string, { label: string; border: string; bg: string; text: string }> = {
  NOTE: {
    label: "Note",
    border: "border-accent dark:border-accent-dark",
    bg: "bg-accent/5 dark:bg-accent-dark/5",
    text: "text-accent dark:text-accent-dark",
  },
  TIP: {
    label: "Tip",
    border: "border-emerald-500",
    bg: "bg-emerald-500/5",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  WARNING: {
    label: "Warning",
    border: "border-amber-500",
    bg: "bg-amber-500/5",
    text: "text-amber-600 dark:text-amber-400",
  },
  IMPORTANT: {
    label: "Important",
    border: "border-purple-500",
    bg: "bg-purple-500/5",
    text: "text-purple-600 dark:text-purple-400",
  },
  CAUTION: {
    label: "Caution",
    border: "border-red-500",
    bg: "bg-red-500/5",
    text: "text-red-600 dark:text-red-400",
  },
};

function extractCalloutType(children: ReactNode): { type: string; rest: ReactNode[] } | null {
  const childArray = Children.toArray(children);
  if (childArray.length === 0) return null;

  const first = childArray[0];
  if (!isValidElement(first)) return null;

  const inner = (first.props as { children?: ReactNode })?.children;
  const text = typeof inner === "string" ? inner : Children.toArray(inner).find((c) => typeof c === "string");
  if (typeof text !== "string") return null;

  const match = text.match(/^\[!(\w+)\]\s*/);
  if (!match) return null;

  const type = match[1].toUpperCase();
  if (!CALLOUT_TYPES[type]) return null;

  const remaining = text.slice(match[0].length);
  const restOfFirst = remaining ? remaining : null;
  const restChildren = childArray.slice(1);

  return { type, rest: restOfFirst ? [restOfFirst, ...restChildren] : restChildren };
}

export function Blockquote({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  const callout = extractCalloutType(children);

  if (!callout) {
    return (
      <blockquote
        className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 text-gray-600 dark:text-gray-400 italic"
        {...props}
      >
        {children}
      </blockquote>
    );
  }

  const style = CALLOUT_TYPES[callout.type];
  return (
    <div className={`border-l-4 ${style.border} ${style.bg} rounded-r-lg pl-4 pr-4 py-3 my-4`}>
      <p className={`font-semibold text-sm ${style.text} mb-1`}>{style.label}</p>
      <div className="text-sm text-gray-700 dark:text-gray-300">{callout.rest}</div>
    </div>
  );
}
