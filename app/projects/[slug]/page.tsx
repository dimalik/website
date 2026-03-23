import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx-components";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Dimitris Alikaniotis`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      {project.image && (
        <div className="mb-8 rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.title} className="w-full" />
        </div>
      )}
      <h1 className="font-serif text-3xl font-semibold mb-2">
        {project.title}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        {project.description}
      </p>
      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote source={project.content} components={mdxComponents} />
      </div>
    </article>
  );
}
