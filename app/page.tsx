import { getLatestItems } from "@/lib/mdx";
import { PostListItem } from "@/components/post-list-item";

export default function Home() {
  const latest = getLatestItems(3);

  return (
    <div>
      <section className="mb-16">
        <h1 className="font-serif text-3xl font-semibold mb-6">
          Dimitris Alikaniotis
        </h1>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Research scientist working on representation learning, natural language processing,
            and computational psychology. Previously at Grammarly; PhD in Computational
            Psycholinguistics from the University of Cambridge.
          </p>
        </div>
        <div className="mt-6 flex gap-6 text-sm">
          <a href="mailto:da352@cam.ac.uk" className="text-accent dark:text-accent-dark hover:underline">Email</a>
          <a href="https://github.com/da352" className="text-accent dark:text-accent-dark hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://scholar.google.com/citations?user=PLACEHOLDER" className="text-accent dark:text-accent-dark hover:underline" target="_blank" rel="noopener noreferrer">Google Scholar</a>
        </div>
      </section>

      {latest.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-semibold mb-4">Latest</h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {latest.map((item) => (
              <PostListItem
                key={item.slug}
                item={item}
                href={item.type === "post" ? `/writing/${item.slug}` : `/projects/${item.slug}`}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
