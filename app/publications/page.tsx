import { Metadata } from "next";
import { publications } from "@/content/publications";
import { PublicationsClient } from "./publications-client";

export const metadata: Metadata = {
  title: "Publications | Dimitris Alikaniotis",
  description: "Research publications by Dimitris Alikaniotis.",
  openGraph: {
    title: "Publications | Dimitris Alikaniotis",
    description: "Research publications by Dimitris Alikaniotis.",
  },
};

export default function PublicationsPage() {
  return (
    <div>
      <h1 className="font-sans text-3xl font-semibold mb-8">Publications</h1>
      <PublicationsClient publications={publications} />
    </div>
  );
}
