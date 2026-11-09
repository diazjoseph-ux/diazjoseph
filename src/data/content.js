/**
 * DIAZ JOSEPH — PORTFOLIO CONTENT & DATA STORE
 * 
 * Edit any section here to update the text, links, projects, and personal details across the entire portfolio website.
 */

export const personalData = {
  name: "Diaz Joseph",
  firstName: "Diaz",
  lastName: "Joseph",
  roleLine: "Aspiring AI Engineer & Web Developer",
  tagline: "First-year B.Tech CSE (Artificial Intelligence) student blending machine intelligence with modern interactive web aesthetics.",
  location: "Kerala, India",
  college: "Thejus Engineering College",
  department: "Computer Science & Engineering (Artificial Intelligence)",
  degree: "B.Tech CSE - AI",
  batchYear: "1st Year (2025 - 2029)",
  email: "diazaloor6@gmail.com",
  statusBadge: "Available for internships & creative collaborations",
  photo: "/assets/diaz.jpg",
  
  aboutBio: [
    "I'm Diaz Joseph, a first-year Computer Science Engineering student specializing in Artificial Intelligence at Thejus Engineering College in Kerala, India.",
    "Driven by curiosity at the intersection of intelligence and design, I spend my days training predictive models, writing clean Python and JavaScript, and crafting immersive web applications with fluid animations and 3D graphics.",
    "Whether it's building real-time computer vision tools or designing minimal, high-performance interfaces, I believe in shipping software that feels as elegant under the hood as it does to the user."
  ],

  stats: [
    { label: "Academic Standing", value: "Year 1", sub: "CSE (AI)" },
    { label: "Institution", value: "Thejus", sub: "Engineering College, Kerala" },
    { label: "Focus Areas", value: "AI & Web", sub: "Neural Nets • React • Three.js" },
    { label: "Code Repositories", value: "15+", sub: "Open source experiments" }
  ]
};

export const navLinks = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" }
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com", icon: "Github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
  { name: "Instagram", url: "https://instagram.com", icon: "Instagram" },
  { name: "Email", url: "mailto:diazaloor6@gmail.com", icon: "Mail" }
];

export const skillsData = {
  marquee: [
    "Python", "JavaScript", "React", "Three.js", "C Programming", "Tailwind CSS",
    "PyTorch", "Git & GitHub", "HTML5 & Modern CSS", "NumPy", "OpenCV", "Vite",
    "Node.js", "REST APIs", "Machine Learning"
  ],
  categories: [
    {
      title: "AI & Machine Learning",
      description: "Foundations in data science, intelligent heuristics, and model training.",
      skills: [
        { name: "Python", level: "Proficient", icon: "Terminal" },
        { name: "NumPy & Pandas", level: "Intermediate", icon: "Database" },
        { name: "PyTorch Basics", level: "Learning", icon: "Cpu" },
        { name: "OpenCV", level: "Intermediate", icon: "Eye" },
        { name: "Scikit-Learn", level: "Familiar", icon: "Binary" }
      ]
    },
    {
      title: "Web Development",
      description: "Modern, dynamic interfaces with responsive layouts and motion.",
      skills: [
        { name: "React / Vite", level: "Advanced", icon: "Code2" },
        { name: "JavaScript (ES6+)", level: "Proficient", icon: "FileCode" },
        { name: "Tailwind CSS", level: "Proficient", icon: "Palette" },
        { name: "Three.js & 3D Web", level: "Intermediate", icon: "Layers" },
        { name: "HTML5 & CSS3", level: "Expert", icon: "Globe" }
      ]
    },
    {
      title: "Core & Systems",
      description: "Low-level foundations, data structures, and developer workflows.",
      skills: [
        { name: "C Language", level: "Proficient", icon: "Cpu" },
        { name: "Data Structures", level: "Intermediate", icon: "Network" },
        { name: "Git & Version Control", level: "Proficient", icon: "GitBranch" },
        { name: "Linux / Shell", level: "Intermediate", icon: "TerminalSquare" }
      ]
    }
  ]
};

export const projectsData = [
  {
    id: "auravision",
    title: "AuraVision AI",
    category: "Computer Vision & Deep Learning",
    description: "An intelligent real-time computer vision assistant capable of gesture recognition, face mesh tracking, and real-time object classification with edge inference.",
    tags: ["Python", "OpenCV", "MediaPipe", "PyTorch", "FastAPI"],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    highlight: "Real-time 60fps edge processing with low latency"
  },
  {
    id: "neurocanvas",
    title: "NeuroCanvas 3D",
    category: "Interactive Three.js & Neural Simulation",
    description: "An interactive 3D WebGL visualization tool demonstrating forward propagation and layer weights in deep neural networks with custom GLSL shaders.",
    tags: ["React", "Three.js", "GLSL Shaders", "Tailwind CSS", "Vite"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    highlight: "Custom chromatic aberration & noise displacement"
  },
  {
    id: "thejus-hub",
    title: "Thejus Academic Hub",
    category: "Full Stack Campus Portal",
    description: "A centralized digital ecosystem for students to track attendance, access curated study resources, and collaborate on AI department projects.",
    tags: ["React", "Node.js", "Tailwind CSS", "REST API", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    highlight: "Engineered specifically for engineering peers"
  },
  {
    id: "pulsetrade",
    title: "PulseTrade ML",
    category: "Algorithmic Analytics & Heuristics",
    description: "Machine learning model analyzing market sentiment signals and historical price indicators to generate probabilistic trend forecasts.",
    tags: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Streamlit"],
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    highlight: "Trained on multi-source financial timeseries data"
  }
];

export const journeyTimeline = [
  {
    year: "2024",
    title: "Igniting the Spark: Computing & Foundations",
    institution: "Higher Secondary Education",
    description: "Developed strong analytical foundations in mathematics and logic. Started building CLI utilities in C and Python, fell in love with algorithmic problem solving.",
    badge: "Origin"
  },
  {
    year: "2025",
    title: "Admitted to Thejus Engineering College",
    institution: "B.Tech CSE (Artificial Intelligence), Kerala",
    description: "Commenced my engineering journey immersed in computer science theory, linear algebra, and data structures. Joined technical clubs and hackathons.",
    badge: "Milestone"
  },
  {
    year: "2025 - 2026",
    title: "Interactive Web & Machine Learning Synergy",
    institution: "Independent Research & Engineering",
    description: "Expanded into high-performance web development (React, Three.js, GSAP) while training deep learning models in Python and exploring computer vision.",
    badge: "Present"
  },
  {
    year: "2026 & Beyond",
    title: "Autonomous Agents & Scalable AI Systems",
    institution: "Future Vision & Industry Impact",
    description: "Aiming to contribute to groundbreaking artificial intelligence research, build autonomous agent frameworks, and architect world-class digital experiences.",
    badge: "Vision"
  }
];

export const contactDetails = {
  headline: "LET'S WORK TOGETHER",
  subtitle: "Have an exciting project, research idea, or internship opportunity? Drop me a message and let's craft something remarkable.",
  email: "diazaloor6@gmail.com",
  phone: "+91 98765 43210",
  location: "Kerala, India",
  collegeAddress: "Thejus Engineering College, Vellarakkad, Thrissur, Kerala",
  formspreeEndpoint: "https://formspree.io/f/placeholder" // Diaz can paste real Formspree endpoint here
};
