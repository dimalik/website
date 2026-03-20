import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Dimitris Alikaniotis",
  description:
    "AI/ML researcher working on representation learning, NLP, and computational psychology.",
  openGraph: {
    title: "Dimitris Alikaniotis",
    description:
      "AI/ML researcher working on representation learning, NLP, and computational psychology.",
  },
};

const themeScript = `
  (function() {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark font-sans min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 w-full max-w-prose mx-auto px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
