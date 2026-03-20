import { Metadata } from "next";
import { getProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects | Dimitris Alikaniotis",
  description: "Research projects and tools by Dimitris Alikaniotis.",
  openGraph: {
    title: "Projects | Dimitris Alikaniotis",
    description: "Research projects and tools by Dimitris Alikaniotis.",
  },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-8">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {projects.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No projects yet.</p>
      )}
    </div>
  );
}
