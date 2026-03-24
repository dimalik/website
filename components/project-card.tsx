import Link from "next/link";
import { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:border-accent dark:hover:border-accent-dark transition-colors"
    >
      {project.image && (
        <div className="mb-3 rounded overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-40 object-cover"
          />
        </div>
      )}
      <h3 className="font-sans text-lg font-semibold group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
