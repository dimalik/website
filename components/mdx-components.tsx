import type { MDXComponents } from "mdx/types";
import { ImageLightbox } from "./image-lightbox";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="font-serif text-3xl font-semibold mt-8 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="font-serif text-2xl font-semibold mt-8 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="font-serif text-xl font-semibold mt-6 mb-2" {...props} />
  ),
  a: (props) => (
    <a
      className="text-accent dark:text-accent-dark hover:underline"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  code: (props) => (
    <code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded" {...props} />
  ),
  pre: (props) => (
    <pre className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4" {...props} />
  ),
  img: (props) => <ImageLightbox {...props} />,
};
