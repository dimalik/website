import { Publication } from "@/lib/types";

export const publications: Publication[] = [
  // ==================== Peer-Reviewed ====================

  {
    title: "Your Large Language Models Are Leaving Fingerprints",
    authors: ["H. E. McGovern", "R. Stureborg", "Y. Suhara", "D. Alikaniotis"],
    venue: "GenAIDetect Workshop",
    year: 2025,
    category: "peer-reviewed",
    links: {},
  },
  {
    title: "mEdIT: Multilingual Text Editing via Instruction Tuning",
    authors: [
      "V. Raheja",
      "D. Alikaniotis",
      "V. Kulkarni",
      "B. Alhafni",
      "D. Kumar",
    ],
    venue: "NAACL",
    year: 2024,
    category: "peer-reviewed",
    links: {},
  },
  {
    title: "Large Language Models Are Inconsistent and Biased Evaluators",
    authors: ["R. Stureborg", "D. Alikaniotis", "Y. Suhara"],
    venue: "arXiv",
    year: 2024,
    category: "peer-reviewed",
    links: {
      pdf: "https://arxiv.org/abs/2405.01724",
    },
  },
  {
    title:
      "Characterizing the Confidence of Large Language Model-Based Automatic Evaluation Metrics",
    authors: ["R. Stureborg", "D. Alikaniotis", "Y. Suhara"],
    venue: "EACL",
    year: 2024,
    category: "peer-reviewed",
    links: {},
  },
  {
    title: "Source Identification in Abstractive Summarization",
    authors: ["Y. Suhara", "D. Alikaniotis"],
    venue: "EACL",
    year: 2024,
    category: "peer-reviewed",
    links: {},
  },
  {
    title: "Adversarial Grammatical Error Correction",
    authors: ["V. Raheja", "D. Alikaniotis"],
    venue: "Findings of EMNLP",
    year: 2020,
    category: "peer-reviewed",
    links: {},
  },
  {
    title:
      "The Unreasonable Effectiveness of Transformer Language Models in Grammatical Error Correction",
    authors: ["D. Alikaniotis", "V. Raheja"],
    venue: "BEA Workshop",
    year: 2019,
    category: "peer-reviewed",
    links: {
      pdf: "https://www.aclweb.org/anthology/W19-4412",
    },
  },
  {
    title:
      "The Entropy of Words — Learnability and Expressivity across More than 1000 Languages",
    authors: ["C. Bentz", "D. Alikaniotis", "M. Cysouw", "R. Ferrer-i-Cancho"],
    venue: "Entropy 19(6)",
    year: 2017,
    category: "peer-reviewed",
    links: {
      pdf: "https://www.mdpi.com/1099-4300/19/6/275",
      code: "https://github.com/dimalik/HRate",
    },
  },
  {
    title:
      "Variation in Word Frequency Distributions: Definitions, Measures and Implications for a Corpus-based Language Typology",
    authors: ["C. Bentz", "D. Alikaniotis", "T. Samardžić", "P. Buttery"],
    venue: "Journal of Quantitative Linguistics",
    year: 2017,
    category: "peer-reviewed",
    links: {
      pdf: "https://www.tandfonline.com/doi/abs/10.1080/09296174.2016.1265792",
      code: "https://github.com/dimalik/nfd/",
    },
  },
  {
    title: "Automatic Text Scoring Using Neural Networks",
    authors: ["D. Alikaniotis", "H. Yannakoudakis", "M. Rei"],
    venue: "ACL",
    year: 2016,
    category: "peer-reviewed",
    links: {
      pdf: "https://aclanthology.info/papers/P16-1068/p16-1068",
      code: "https://github.com/dimalik/aes",
    },
  },
  {
    title: "The Word Entropy of Natural Languages",
    authors: ["C. Bentz", "D. Alikaniotis"],
    venue: "arXiv",
    year: 2016,
    category: "peer-reviewed",
    links: {
      pdf: "https://arxiv.org/abs/1606.06996",
    },
  },
  {
    title: "Predicting Author Age from Weibo Microblog Posts",
    authors: ["W. Zhang", "A. Caines", "D. Alikaniotis", "P. Buttery"],
    venue: "LREC",
    year: 2016,
    category: "peer-reviewed",
    links: {
      pdf: "https://apc38.user.srcf.net/wp-content/uploads/2013/12/958_Paper.pdf",
    },
  },
  {
    title: "The Glottolog Data Explorer: Mapping the World's Languages",
    authors: [
      "A. P. Caines",
      "C. Bentz",
      "D. Alikaniotis",
      "F. Katushemererwe",
      "P. Buttery",
    ],
    venue: "LREC",
    year: 2016,
    category: "peer-reviewed",
    links: {
      interactive: "https://cainesap.shinyapps.io/langmap/",
    },
  },
  {
    title: "A Distributional Semantics Approach to Implicit Language Learning",
    authors: ["D. Alikaniotis", "J. N. Williams"],
    venue: "NetWordS",
    year: 2015,
    category: "peer-reviewed",
    links: {
      pdf: "http://ceur-ws.org/Vol-1347/paper17.pdf",
    },
  },

  // ==================== US Patents ====================

  {
    title: "Real-Time Tone Feedback in Video Conferencing",
    authors: ["V. Raheja", "D. Alikaniotis"],
    venue: "US Patent 12,526,167",
    year: 2026,
    category: "patent",
    links: {},
  },
  {
    title: "Detecting the Tone of Text",
    authors: ["D. Alikaniotis", "S. Levental", "A. Shevchenko"],
    venue: "US Patent App. 19/267,669",
    year: 2025,
    category: "patent",
    links: {},
  },
  {
    title:
      "Automatic Code Generation from Informal Specifications of Text Editing and Grammar Correction Guidelines",
    authors: ["D. Kumar", "V. Raheja", "V. Kulkarni", "D. Alikaniotis"],
    venue: "US Patent App. 18/587,303",
    year: 2025,
    category: "patent",
    links: {},
  },
  {
    title: "Detecting the Tone of Text",
    authors: ["D. Alikaniotis", "S. Levental", "A. Shevchenko"],
    venue: "US Patent 12,380,275",
    year: 2025,
    category: "patent",
    links: {},
  },
  {
    title: "Conforming Digital Documents to Style Guides",
    authors: ["V. Kulkarni", "C. Leacock", "D. Alikaniotis", "M. Gubin"],
    venue: "US Patent App. 18/977,100",
    year: 2025,
    category: "patent",
    links: {},
  },
  {
    title: "Automatic Prediction of Important Content",
    authors: ["R. Khlystik", "K. Singh", "D. Alikaniotis", "J. Vandamme"],
    venue: "US Patent 12,164,860",
    year: 2024,
    category: "patent",
    links: {},
  },
  {
    title: "Real-Time Tone Feedback in Video Conferencing",
    authors: ["V. Raheja", "D. Alikaniotis"],
    venue: "US Patent 11,894,941",
    year: 2024,
    category: "patent",
    links: {},
  },
  {
    title: "Automatic Prediction of Important Content",
    authors: ["R. Khlystik", "K. Singh", "D. Alikaniotis", "J. Vandamme"],
    venue: "US Patent 11,853,687",
    year: 2023,
    category: "patent",
    links: {},
  },
  {
    title: "Detecting the Tone of Text",
    authors: ["D. Alikaniotis", "S. Levental", "A. Shevchenko"],
    venue: "US Patent 11,763,085",
    year: 2023,
    category: "patent",
    links: {},
  },

  // ==================== Other Publications ====================

  {
    title:
      "Understanding Semantic Implicit Learning through Distributional Linguistic Patterns. A Computational Perspective",
    authors: ["D. Alikaniotis"],
    venue: "PhD Thesis, University of Cambridge",
    year: 2017,
    category: "other",
    links: {},
  },
  {
    title: "Linguistic Naturalness and Semi-artificial Language Learning",
    authors: [
      "J. N. Williams",
      "M. Sheehan",
      "A. Paciorek",
      "D. Alikaniotis",
    ],
    venue: "Fifth Implicit Learning Seminar, Lancaster, UK",
    year: 2016,
    category: "other",
    links: {},
  },
  {
    title: "Semantic Constraints in Implicit Language Learning",
    authors: ["D. Alikaniotis", "J. N. Williams"],
    venue: "Cambridge Language Sciences Annual Symposium",
    year: 2015,
    category: "other",
    links: {},
  },
  {
    title:
      "Modelling Implicit Language Learning with Distributional Semantics",
    authors: ["D. Alikaniotis"],
    venue: "NLIP Seminar Series, University of Cambridge",
    year: 2015,
    category: "other",
    links: {},
  },
  {
    title:
      "Predicting Semantic Constraints in Implicit Language Learning with Distributional Semantics",
    authors: ["D. Alikaniotis", "J. N. Williams"],
    venue:
      "Interdisciplinary Advances in Statistical Learning, San Sebastian, Spain",
    year: 2015,
    category: "other",
    links: {},
  },
  {
    title: "Computational Methods for Calculating Semantic Similarity",
    authors: ["D. Alikaniotis"],
    venue: "Workshop in Computational Linguistics, University of Cambridge",
    year: 2014,
    category: "other",
    links: {},
  },
  {
    title: "Implicit Rule Learning in a Computer Language Game",
    authors: ["D. Alikaniotis"],
    venue: "MPhil Research Project, University of Cambridge",
    year: 2012,
    category: "other",
    links: {},
  },
  {
    title: "Pragmatic Motivations for Erroneous Reasoning",
    authors: ["D. Alikaniotis"],
    venue: "MPhil Research Project, University of Cambridge",
    year: 2011,
    category: "other",
    links: {},
  },
  {
    title: "Computational Linguistics and Electronic Lexicography",
    authors: ["D. Alikaniotis"],
    venue:
      "Bachelor's Thesis, National and Kapodistrian University of Athens",
    year: 2011,
    category: "other",
    links: {},
  },
];
