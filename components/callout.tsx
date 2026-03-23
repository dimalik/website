import { ReactNode, Children, isValidElement, cloneElement, ReactElement } from "react";

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

function getTextContent(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (isValidElement(node)) {
    return getTextContent((node.props as { children?: ReactNode }).children);
  }
  return "";
}

function stripCalloutTag(node: ReactNode, tag: string): ReactNode {
  const pattern = `[!${tag}]`;

  if (typeof node === "string") {
    const idx = node.indexOf(pattern);
    if (idx !== -1) {
      const after = node.slice(idx + pattern.length).replace(/^\n/, "").replace(/^\s/, "");
      return after || null;
    }
    return node;
  }

  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    const newChildren = stripCalloutTag(props.children, tag);
    return cloneElement(node as ReactElement, {}, newChildren);
  }

  if (Array.isArray(node)) {
    let found = false;
    const result = node.map((child, i) => {
      if (found) return child;
      const stripped = stripCalloutTag(child, tag);
      if (stripped !== child) found = true;
      return stripped;
    }).filter(Boolean).map((child, i) =>
      isValidElement(child) ? cloneElement(child as ReactElement, { key: i }) : child
    );
    return result;
  }

  const arr = Children.toArray(node);
  if (arr.length === 0) return node;

  let found = false;
  const result = arr.map((child) => {
    if (found) return child;
    const stripped = stripCalloutTag(child, tag);
    if (stripped !== child) found = true;
    return stripped;
  }).filter(Boolean).map((child, i) =>
    isValidElement(child) ? cloneElement(child as ReactElement, { key: i }) : child
  );
  return result.length === 1 ? result[0] : result;
}

export function Blockquote({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  const text = getTextContent(children);
  const match = text.match(/\[!(\w+)\]/);

  if (match && CALLOUT_TYPES[match[1].toUpperCase()]) {
    const type = match[1].toUpperCase();
    const style = CALLOUT_TYPES[type];
    const cleaned = stripCalloutTag(children, match[1]);
    const filteredChildren = Children.toArray(cleaned).filter((child) => {
      if (isValidElement(child)) {
        const content = getTextContent(child).trim();
        if (content === "") return false;
      }
      return true;
    });

    return (
      <div className={`border-l-4 ${style.border} ${style.bg} rounded-r-lg pl-4 pr-4 py-3 my-4`}>
        <p className={`font-semibold text-sm ${style.text} mb-1`}>{style.label}</p>
        <div className="text-sm text-gray-700 dark:text-gray-300 [&>p]:m-0">{filteredChildren}</div>
      </div>
    );
  }

  return (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 text-gray-600 dark:text-gray-400 italic"
      {...props}
    >
      {children}
    </blockquote>
  );
}
