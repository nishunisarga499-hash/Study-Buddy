export const NCERT_CHAPTERS = {
  Physics: {
    "Class 9": [
      "Motion", "Force and Newton's Laws", "Gravitation",
      "Work and Energy", "Sound", "Matter in Our Surroundings",
      "Structure of the Atom", "Natural Resources"
    ],
    "Class 10": [
      "Light – Reflection and Refraction", "Human Eye and Colourful World",
      "Electricity", "Magnetic Effects of Electric Current",
      "Sources of Energy", "Chemical Reactions and Equations"
    ],
    "Class 11": [
      "Physical World", "Units and Measurements", "Motion in a Straight Line",
      "Motion in a Plane", "Laws of Motion", "Work, Energy and Power",
      "System of Particles and Rotational Motion", "Gravitation",
      "Mechanical Properties of Solids", "Thermodynamics", "Waves"
    ],
    "Class 12": [
      "Electric Charges and Fields", "Electrostatic Potential and Capacitance",
      "Current Electricity", "Moving Charges and Magnetism",
      "Electromagnetic Induction", "Alternating Current",
      "Electromagnetic Waves", "Ray Optics", "Wave Optics",
      "Dual Nature of Radiation", "Atoms", "Nuclei", "Semiconductor Devices"
    ]
  },
  Mathematics: {
    "Class 9": [
      "Number Systems", "Polynomials", "Coordinate Geometry",
      "Linear Equations in Two Variables", "Triangles",
      "Quadrilaterals", "Circles", "Heron's Formula",
      "Surface Areas and Volumes", "Statistics", "Probability"
    ],
    "Class 10": [
      "Real Numbers", "Polynomials", "Pair of Linear Equations",
      "Quadratic Equations", "Arithmetic Progressions",
      "Triangles", "Coordinate Geometry", "Introduction to Trigonometry",
      "Circles", "Areas Related to Circles", "Surface Areas and Volumes",
      "Statistics", "Probability"
    ],
    "Class 11": [
      "Sets", "Relations and Functions", "Trigonometric Functions",
      "Principle of Mathematical Induction", "Complex Numbers",
      "Linear Inequalities", "Permutations and Combinations",
      "Binomial Theorem", "Sequences and Series",
      "Straight Lines", "Conic Sections", "Limits and Derivatives",
      "Statistics", "Probability"
    ],
    "Class 12": [
      "Relations and Functions", "Inverse Trigonometric Functions",
      "Matrices", "Determinants", "Continuity and Differentiability",
      "Application of Derivatives", "Integrals",
      "Application of Integrals", "Differential Equations",
      "Vector Algebra", "Three Dimensional Geometry",
      "Linear Programming", "Probability"
    ]
  },
  Chemistry: {
    "Class 9": [
      "Matter in Our Surroundings", "Is Matter Around Us Pure?",
      "Atoms and Molecules", "Structure of the Atom"
    ],
    "Class 10": [
      "Chemical Reactions and Equations", "Acids, Bases and Salts",
      "Metals and Non-metals", "Carbon and its Compounds",
      "Periodic Classification of Elements"
    ],
    "Class 11": [
      "Some Basic Concepts of Chemistry", "Structure of Atom",
      "Classification of Elements", "Chemical Bonding",
      "States of Matter", "Thermodynamics", "Equilibrium",
      "Redox Reactions", "Hydrogen", "s-Block Elements",
      "Organic Chemistry – Basic Principles", "Hydrocarbons"
    ],
    "Class 12": [
      "The Solid State", "Solutions", "Electrochemistry",
      "Chemical Kinetics", "Surface Chemistry",
      "General Principles of Isolation of Elements",
      "p-Block Elements", "d and f Block Elements",
      "Coordination Compounds", "Haloalkanes and Haloarenes",
      "Alcohols, Phenols and Ethers", "Aldehydes and Ketones",
      "Amines", "Biomolecules", "Polymers", "Chemistry in Everyday Life"
    ]
  },
  Biology: {
    "Class 9": [
      "The Fundamental Unit of Life", "Tissues",
      "Diversity in Living Organisms", "Why Do We Fall Ill?",
      "Natural Resources", "Improvement in Food Resources"
    ],
    "Class 10": [
      "Life Processes", "Control and Coordination",
      "How do Organisms Reproduce?", "Heredity and Evolution",
      "Our Environment", "Management of Natural Resources"
    ],
    "Class 11": [
      "The Living World", "Biological Classification",
      "Plant Kingdom", "Animal Kingdom", "Morphology of Flowering Plants",
      "Cell: The Unit of Life", "Cell Cycle and Division",
      "Photosynthesis", "Respiration in Plants",
      "Plant Growth and Development", "Digestion and Absorption",
      "Breathing and Exchange of Gases", "Neural Control",
      "Chemical Coordination"
    ],
    "Class 12": [
      "Reproduction in Organisms", "Sexual Reproduction in Flowering Plants",
      "Human Reproduction", "Reproductive Health",
      "Principles of Inheritance", "Molecular Basis of Inheritance",
      "Evolution", "Human Health and Disease",
      "Strategies for Enhancement in Food Production",
      "Microbes in Human Welfare", "Biotechnology",
      "Organisms and Populations", "Ecosystem",
      "Biodiversity and Conservation", "Environmental Issues"
    ]
  },
  "Computer Science": {
    "Class 9": ["Introduction to IT", "Components of a Computer", "Software"],
    "Class 10": ["Information Technology", "Internet & Email", "Cybersafety"],
    "Class 11": [
      "Computer Fundamentals", "Introduction to Python",
      "Flow of Control", "Functions", "Strings", "Lists", "Tuples",
      "Dictionary", "Introduction to SQL", "Boolean Algebra"
    ],
    "Class 12": [
      "Review of Python", "Exception Handling", "File Handling",
      "Stack", "Queue", "Linked List",
      "Database Concepts", "SQL", "Networking Concepts",
      "Cyber Ethics", "Boolean Algebra", "Communication Technologies"
    ]
  }
}

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
]

export const SUBJECTS = Object.keys(NCERT_CHAPTERS)
export const CLASSES = ["Class 9", "Class 10", "Class 11", "Class 12"]
