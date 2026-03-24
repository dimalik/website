export default function Home() {
  return (
    <div>
      <section>
        <h1 className="font-sans text-3xl font-semibold mb-6">
          Dimitris Alikaniotis
        </h1>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            I am a Research Scientist working on Machine Learning and Natural Language Processing.
            My work emphasises representation learning, affective computing, and personalisation,
            drawing from computational psychology, NLP, and crowdsourcing for unsupervised solutions
            including structured prediction, personalisation, semantic search, sentiment analysis,
            and text classification.
          </p>
          <p>
            Previously, I was a PhD student in Computational Psycholinguistics and Semantics at
            the University of Cambridge, supervised by{" "}
            <a href="https://www.neuroscience.cam.ac.uk/directory/profile.php?jnw12" className="text-accent dark:text-accent-dark hover:underline" target="_blank" rel="noopener noreferrer">Dr. John Williams</a>.
            My research used statistical and machine learning methods to understand language
            learning and processing, focusing on the strategies that allow people to unconsciously
            pick up linguistic regularities from their environment.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            My Erdős number is 5.
          </p>
        </div>
        <div className="mt-6 flex gap-6 text-sm">
          <a href="https://github.com/dimalik" className="text-accent dark:text-accent-dark hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://scholar.google.com/citations?user=8ZsPobcAAAAJ&hl=en&oi=ao" className="text-accent dark:text-accent-dark hover:underline" target="_blank" rel="noopener noreferrer">Google Scholar</a>
          <a href="https://www.linkedin.com/in/dimitriosalikaniotis/" className="text-accent dark:text-accent-dark hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </section>
    </div>
  );
}
