export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <div className="max-w-3xl mx-auto px-6">
        &copy; {new Date().getFullYear()} Dimitris Alikaniotis
      </div>
    </footer>
  );
}
