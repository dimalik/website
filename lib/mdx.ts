import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

function getMdxFiles(dir: string) {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(fullPath, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title ?? "",
        date: data.date ?? "",
        description: data.description ?? "",
        tags: data.tags ?? [],
        image: data.image,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPosts() {
  return getMdxFiles("posts");
}

export function getProjects() {
  return getMdxFiles("projects");
}

export function getPostBySlug(slug: string) {
  return getMdxFiles("posts").find((p) => p.slug === slug) ?? null;
}

export function getProjectBySlug(slug: string) {
  return getMdxFiles("projects").find((p) => p.slug === slug) ?? null;
}

export function getLatestItems(count: number) {
  const posts = getPosts().map((p) => ({ ...p, type: "post" as const }));
  const projects = getProjects().map((p) => ({
    ...p,
    type: "project" as const,
  }));
  return [...posts, ...projects]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
