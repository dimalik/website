import { Metadata } from "next";
import { getPosts } from "@/lib/mdx";
import { PostListItem } from "@/components/post-list-item";

export const metadata: Metadata = {
  title: "Writing | Dimitris Alikaniotis",
  description: "Technical writing and blog posts by Dimitris Alikaniotis.",
  openGraph: {
    title: "Writing | Dimitris Alikaniotis",
    description: "Technical writing and blog posts by Dimitris Alikaniotis.",
  },
};

export default function WritingPage() {
  const posts = getPosts();

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-8">Writing</h1>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {posts.map((post) => (
          <PostListItem
            key={post.slug}
            item={{ ...post, type: "post" }}
            href={`/writing/${post.slug}`}
          />
        ))}
      </ul>
      {posts.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
      )}
    </div>
  );
}
