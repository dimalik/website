import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPosts, getPostBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx-components";

export async function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Dimitris Alikaniotis`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <h1 className="font-serif text-3xl font-semibold mb-2">{post.title}</h1>
      <div className="text-gray-500 dark:text-gray-400 text-sm flex gap-3">
        <time>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        {post.lastModified !== post.date && (
          <>
            <span>·</span>
            <span>
              Updated{" "}
              {new Date(post.lastModified).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </>
        )}
      </div>
      <div className="prose dark:prose-invert max-w-none mt-8">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
