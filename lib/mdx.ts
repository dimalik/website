import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

function resolveDate(raw: string | undefined): string {
  if (!raw) return "";
  const str = String(raw).trim();
  if (str.toLowerCase() === "@today") {
    return new Date().toISOString().slice(0, 10);
  }
  return str;
}

function getMdxFiles(dir: string) {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(fullPath, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const stat = fs.statSync(filePath);
      const { data, content } = matter(fileContent);
      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title ?? "",
        date: resolveDate(data.date),
        lastModified: stat.mtime.toISOString().slice(0, 10),
        description: data.description ?? "",
        tags: data.tags ?? [],
        image: data.image,
        draft: data.draft === true,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPosts() {
  return getMdxFiles("posts").filter((p) => !p.draft);
}

export function getAllPosts() {
  return getMdxFiles("posts");
}

export function getProjects() {
  return getMdxFiles("projects").filter((p) => !p.draft);
}

export function getAllProjects() {
  return getMdxFiles("projects");
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
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
