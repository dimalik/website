import { Children, isValidElement, ReactNode } from "react";

function unwrapImages(children: ReactNode): ReactNode[] {
  const result: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const props = child.props as { children?: ReactNode };
    const grandchildren = Children.toArray(props.children);
    if (grandchildren.length === 1 && isValidElement(grandchildren[0])) {
      result.push(grandchildren[0]);
    } else {
      result.push(child);
    }
  });
  return result;
}

export function Grid2({ children }: { children: ReactNode }) {
  return <GridLayout cols={2}>{children}</GridLayout>;
}

export function Grid3({ children }: { children: ReactNode }) {
  return <GridLayout cols={3}>{children}</GridLayout>;
}

export function Grid4({ children }: { children: ReactNode }) {
  return <GridLayout cols={4}>{children}</GridLayout>;
}

function GridLayout({ cols, children }: { cols: number; children: ReactNode }) {
  const items = unwrapImages(children);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "0.5rem",
        margin: "1.5rem 0",
      }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
          {item}
        </div>
      ))}
    </div>
  );
}
