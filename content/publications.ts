import { Publication } from "@/lib/types";

export const publications: Publication[] = [
  // Peer-reviewed
  {
    title: "Adversarial Grammatical Error Correction",
    authors: ["V. Raheja", "D. Alikaniotis"],
    venue: "EMNLP",
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
    authors: ["C. Bentz", "D. Alikaniotis", "M. Cysouw", "R. Ferrer-Cancho"],
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
    title:
      "The Glottolog Data Explorer: Mapping the World's Languages",
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
    title:
      "A Distributional Semantics Approach to Implicit Language Learning",
    authors: ["D. Alikaniotis", "J. N. Williams"],
    venue: "NetWordS",
    year: 2015,
    category: "peer-reviewed",
    links: {
      pdf: "http://ceur-ws.org/Vol-1347/paper17.pdf",
    },
  },

  // Other publications
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
    title:
      "Linguistic Naturalness and Semi-artificial Language Learning",
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
    venue: "Interdisciplinary Advances in Statistical Learning, San Sebastian, Spain",
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
