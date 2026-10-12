/**
 * Single source of truth for all site content.
 * Edit this file to update the site. Empty strings / empty arrays hide the
 * related UI instead of showing broken links or placeholder text.
 */

export type MemberId = "danunja" | "nikhil";
export type PersonFilterValue = "all" | MemberId;

export type SectionId =
  | "home"
  | "services"
  | "projects"
  | "team"
  | "skills"
  | "certifications"
  | "process"
  | "contact";

export interface NavItem {
  id: SectionId;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Work" },
  { id: "team", label: "Team" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export const site = {
  name: "FLUX",
  descriptor: "Machine Learning Experts",
  availability: "Available for freelance projects",
  headline: "Machine Learning & Deep Learning solutions, built for your problem.",
  intro:
    "We're two B.Tech AI & ML students who take on freelance projects in computer vision, chatbots, custom ML models, data analysis, and web apps. Tell us the problem, and we'll build a working solution.",
  tagline: "Designed with curiosity. Built with code.",
};

/** Studio-level contact. Individual links live on each team member below. */
export const studio = {
  whatsapp: "", // digits only with country code, e.g. 919876543210
};

/**
 * Client requests are sent to the backend in /server, which emails both of you.
 * The recipients are set in the .env file (MAIL_TO), not here.
 */
export const contactForm = {
  phoneRequired: false,
  projectTypes: [
    "Computer vision",
    "Chatbot / conversational AI",
    "Custom ML or deep learning model",
    "Data analysis",
    "Web app for an ML model",
    "Something else",
  ],
};

export interface SkillCategory {
  id: string;
  title: string;
  icon: "code" | "brain" | "chart" | "wrench" | "web" | "database" | "cloud";
  items: string[];
}

export interface ResumeFile {
  /** File inside /public. Until it exists, the resume button shows as disabled. */
  path: string;
  downloadName: string;
}

export interface Experience {
  title: string;
  organization: string;
  description: string;
}

export interface TeamMember {
  id: MemberId;
  name: string;
  shortName: string;
  initials: string;
  role: string;
  bio: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    status: string;
    duration?: string;
  };
  experience: Experience[];
  focus: string[];
  /** Receives client requests. Leave empty to skip this person. */
  email: string;
  github: string;
  linkedin: string;
  resume: ResumeFile;
  skills: SkillCategory[];
}

export const team: TeamMember[] = [
  {
    id: "danunja",
    name: "Danunja Reddy Kota",
    shortName: "KDR",
    initials: "KDR",
    role: "Machine Learning & Deep Learning",
    bio: "B.Tech student in Computer Science and Artificial Intelligence. Builds machine learning, deep learning, and computer vision projects in Python and Java.",
    education: {
      degree: "B.Tech — Computer Science and Artificial Intelligence",
      institution: "Lakireddy Bali Reddy College of Engineering",
      location: "Mylavaram, Andhra Pradesh",
      duration: "2023–2027",
      status: "Currently pursuing",
    },
    experience: [
      {
        title: "Data Intern",
        organization: "Placemantra",
        description:
          "Analysed datasets with Python, NumPy, and Pandas, and contributed to data preprocessing, feature extraction, and model evaluation on AI/ML projects.",
      },
      {
        title: "ServiceNow Administrator",
        organization: "Smart Bridge",
        description:
          "Managed and configured the ServiceNow platform to improve IT service management through better data handling and process automation.",
      },
    ],
    focus: ["Machine Learning", "Deep Learning", "Computer Vision", "Conversational AI"],
    email: "danunjareddykota@gmail.com",
    github: "https://github.com/danunjareddy",
    linkedin: "https://linkedin.com/in/danunja-reddy-kota",
    resume: { path: "/resume-danunja.pdf", downloadName: "Danunja_Reddy_Kota_Resume.pdf" },
    skills: [
      { id: "languages", title: "Programming Languages", icon: "code", items: ["Python", "Java"] },
      {
        id: "ai-ml",
        title: "AI & Machine Learning",
        icon: "brain",
        items: [
          "Machine Learning",
          "Deep Learning",
          "Computer Vision",
          "Model Evaluation",
          "TensorFlow",
          "PyTorch",
          "Scikit-learn",
        ],
      },
      {
        id: "data",
        title: "Data Science & Analytics",
        icon: "chart",
        items: ["NumPy", "Pandas", "Matplotlib", "SQL", "MySQL", "Data Analysis"],
      },
      {
        id: "tools",
        title: "Developer Tools & Platforms",
        icon: "wrench",
        items: ["Git", "GitHub", "Jupyter Notebook", "Google Colab", "Visual Studio Code"],
      },
    ],
  },
  {
    id: "nikhil",
    name: "Nikhil Raju Vadali",
    shortName: "Nikhil",
    initials: "NRV",
    role: "AI/ML & Web Development",
    bio: "B.Tech student in Computer Science and Engineering (AI & ML) and Research Intern at NIT Warangal. Works across machine learning, computer vision, and web development.",
    education: {
      degree: "B.Tech — Computer Science and Engineering (AI & ML)",
      institution: "Lakireddy Bali Reddy College of Engineering",
      location: "Mylavaram, Andhra Pradesh",
      status: "Currently pursuing",
    },
    experience: [
      {
        title: "Research Intern",
        organization: "NIT Warangal",
        description:
          "AI/ML research and intelligent sensing. Developing and evaluating deep learning models.",
      },
      {
        title: "Data Science Intern",
        organization: "Placemantra",
        description:
          "Exploratory data analysis, data preprocessing, and machine learning models for predictive analytics.",
      },
    ],
    focus: ["Machine Learning", "Computer Vision", "Web Development"],
    email: "nikhilrajuvadali48@gmail.com",
    github: "https://github.com/NikhilrajuV",
    linkedin: "https://linkedin.com/in/nikhilraju-vadali-627b5433b",
    resume: { path: "/resume-nikhil.pdf", downloadName: "Nikhil_Raju_Vadali_Resume.pdf" },
    skills: [
      { id: "languages", title: "Programming Languages", icon: "code", items: ["Python", "Java", "JavaScript"] },
      {
        id: "ai-ml",
        title: "AI & Machine Learning",
        icon: "brain",
        items: ["Machine Learning", "Deep Learning", "Computer Vision"],
      },
      {
        id: "web",
        title: "Web Development",
        icon: "web",
        items: ["HTML", "CSS", "React", "Node.js"],
      },
      {
        id: "cloud",
        title: "Cloud & Backend",
        icon: "cloud",
        items: ["Firebase", "Cloud Technologies"],
      },
      { id: "database", title: "Databases", icon: "database", items: ["MySQL", "SQL"] },
      {
        id: "tools",
        title: "Developer Tools",
        icon: "wrench",
        items: ["Git", "GitHub"],
      },
    ],
  },
];

export const heroTags = ["Python", "Machine Learning", "Deep Learning", "Computer Vision", "Web Apps"];

export const memberById = (id: MemberId): TeamMember | undefined => team.find((m) => m.id === id);

export const memberNames = (ids: MemberId[]): string =>
  ids
    .map((id) => memberById(id)?.shortName)
    .filter((n): n is string => Boolean(n))
    .join(" & ");

/** Everyone who receives client requests. */
export const teamEmails: string[] = team.map((m) => m.email).filter(Boolean);

export interface Service {
  id: string;
  title: string;
  icon: "vision" | "chat" | "model" | "data" | "web";
  description: string;
  deliverables: string[];
  /** Project ids from the `projects` list below that relate to this service. */
  relatedProjects: string[];
}

export const services: Service[] = [
  {
    id: "vision",
    title: "Computer Vision",
    icon: "vision",
    description: "Models that recognise or classify what is in an image, trained on the kind of images you have.",
    deliverables: ["Image classification models", "Detection and recognition pipelines", "Evaluation on your own data"],
    relatedProjects: ["dog-emotion", "bird-detection", "face-morphing"],
  },
  {
    id: "chatbots",
    title: "Chatbots & Conversational AI",
    icon: "chat",
    description: "A chatbot that answers common questions from the information you give it.",
    deliverables: ["Question-answering chatbot", "Built around your own content", "Clear setup notes"],
    relatedProjects: ["college-chatbot"],
  },
  {
    id: "models",
    title: "Custom ML & Deep Learning Models",
    icon: "model",
    description: "A model built for your specific problem, from data preparation to training and evaluation.",
    deliverables: ["Data preparation", "Model training and evaluation", "Code you can run and reuse"],
    relatedProjects: ["heart-disease", "wivision"],
  },
  {
    id: "data",
    title: "Data Analysis",
    icon: "data",
    description: "Cleaning, exploring, and visualising your data so the results are easy to understand.",
    deliverables: ["Data cleaning and exploration", "Charts and summaries", "SQL and Python analysis"],
    relatedProjects: [],
  },
  {
    id: "web",
    title: "Web Apps for Your Model",
    icon: "web",
    description: "A simple web interface so people can use your model or tool without touching any code.",
    deliverables: ["Web interface for a model or tool", "Built with Flask, React, or Node.js", "Clear setup notes"],
    relatedProjects: ["heart-disease", "visitor-management"],
  },
];

export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { title: "Share your brief", description: "Tell us the problem, the data you have, and when you need it." },
  {
    title: "Scope and quote",
    description: "We agree what will be built, what you will receive, and the price before work starts.",
  },
  {
    title: "Build and review",
    description: "We build and test the solution and share progress so you can give feedback.",
  },
  {
    title: "Deliver and hand off",
    description: "You receive the code, the results, and a short guide on how to use them.",
  },
];

export type ProjectStatus = "completed" | "in-progress" | "planned";
export type ProjectIcon = "paw" | "chat" | "bird" | "scan" | "heart" | "wifi" | "qr";

export interface Project {
  id: string;
  title: string;
  category: string;
  icon: ProjectIcon;
  owners: MemberId[];
  description: string;
  problem?: string;
  solution?: string;
  contribution?: string;
  stack: string[];
  /** Only set when verified. Shown as a badge; omitted when undefined. */
  status?: ProjectStatus;
  /** Optional real screenshot in /public, e.g. "/projects/dog-emotion.png" */
  image?: string;
  imageAlt?: string;
  repoUrl?: string;
  demoUrl?: string;
}

/**
 * Only facts you supplied are written here. Add `problem`, `solution`,
 * `contribution`, `status`, links and results as you confirm them; the card
 * and detail dialog show whatever is present and hide the rest.
 */
export const projects: Project[] = [
  {
    id: "dog-emotion",
    title: "Dog Emotion Prediction",
    category: "Computer Vision",
    icon: "paw",
    owners: ["danunja"],
    description: "An AI-based project that classifies a dog's emotion from an image.",
    problem: "Reading a dog's emotional state from a photo is subjective and hard to do consistently.",
    stack: ["Python", "Deep Learning", "Computer Vision"],
  },
  {
    id: "college-chatbot",
    title: "College Information Chatbot",
    category: "Conversational AI",
    icon: "chat",
    owners: ["danunja"],
    description: "A chatbot designed to help students find college-related information.",
    problem: "Students need quick answers about their college without searching through multiple sources.",
    stack: ["Python"],
  },
  {
    id: "bird-detection",
    title: "Endangered Bird Detection",
    category: "AI & Conservation",
    icon: "bird",
    owners: ["danunja"],
    description:
      "Deep learning and image classification applied to bird identification and conservation use cases.",
    stack: ["Python", "Deep Learning", "Image Classification"],
  },
  {
    id: "heart-disease",
    title: "Heart Disease Prediction",
    category: "Machine Learning",
    icon: "heart",
    owners: ["nikhil"],
    description: "A Flask web app that predicts heart disease risk from medical parameters.",
    solution:
      "A Random Forest classifier trained on the Heart Disease UCI dataset from Kaggle. The web app takes medical parameters, returns a risk prediction, and shows health tips based on the result. Built for learning, not for medical decisions.",
    stack: ["Python", "Flask", "Scikit-learn", "Pandas", "NumPy", "HTML/CSS"],
    repoUrl: "https://github.com/NikhilrajuV/heartprediction",
  },
  {
    id: "wivision",
    title: "WiVision AI",
    category: "Machine Learning",
    icon: "wifi",
    owners: ["nikhil"],
    description: "An AI-based system for WiFi-based human activity recognition.",
    status: "in-progress",
    stack: ["Machine Learning"],
  },
  {
    id: "face-morphing",
    title: "Face Morphing Attack Detection",
    category: "Computer Vision",
    icon: "scan",
    owners: ["nikhil"],
    description: "An iris-based deepfake detection system for detecting face morphing attacks.",
    status: "in-progress",
    stack: ["Computer Vision"],
  },
  {
    id: "visitor-management",
    title: "Visitor Management System",
    category: "Web Application",
    icon: "qr",
    owners: ["nikhil"],
    description: "A QR-based platform for visitor registration and management.",
    stack: ["QR codes", "Web platform"],
  },
];

export interface CertificateId {
  label: string;
  value: string;
}

export interface Certification {
  id: string;
  owner: MemberId;
  title: string;
  issuer: string;
  kind: "Certification" | "Course";
  description: string;
  /** Free text, for example "Earned August 5, 2026". */
  issued?: string;
  /** Free text, for example "Expires August 6, 2027". */
  validity?: string;
  ids?: CertificateId[];
  /** Image of the certificate in /public/certificates. */
  image?: string;
  verifyUrl?: string;
  /** Set to true only after the credential is confirmed to be real and current. */
  show: boolean;
}

export const certifications: Certification[] = [
  {
    id: "ms-mlops",
    owner: "danunja",
    title: "Microsoft Certified: Machine Learning Operations Engineer Associate",
    issuer: "Microsoft",
    kind: "Certification",
    description: "Operationalising machine learning solutions: deploying, monitoring, and maintaining models.",
    issued: "Earned August 5, 2026",
    validity: "Expires August 6, 2027",
    ids: [
      { label: "Credential ID", value: "DD66D3643B65EC8F" },
      { label: "Certification number", value: "D3J510-467E49" },
    ],
    show: true,
  },
  {
    id: "oracle-agentic-ai",
    owner: "danunja",
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle University",
    kind: "Certification",
    description: "Oracle Certified Foundations Associate in agentic AI.",
    issued: "Earned July 18, 2026",
    validity: "Valid until July 18, 2028",
    ids: [{ label: "Certificate ID", value: "103008639AAI26OFA" }],
    show: true,
  },
  {
    id: "cisco-python-danunja",
    owner: "danunja",
    title: "Python Essentials",
    issuer: "Cisco",
    kind: "Certification",
    description: "Core Python programming fundamentals.",
    show: true,
  },
  {
    id: "nptel-joc",
    owner: "danunja",
    title: "Joy of Computing using Python",
    issuer: "NPTEL",
    kind: "Course",
    description: "Problem-solving and computational thinking with Python.",
    issued: "2025",
    show: true,
  },
  {
    id: "oracle-genai",
    owner: "danunja",
    title: "Oracle Generative AI Professional",
    issuer: "Oracle",
    kind: "Certification",
    description: "Foundations of generative AI and large language models.",
    issued: "2025",
    show: true,
  },
  {
    id: "aws-ccp-danunja",
    owner: "danunja",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    kind: "Certification",
    description: "Cloud fundamentals on AWS.",
    validity: "Valid 2026–2029",
    show: true,
  },
  {
    id: "google-cloud-ai",
    owner: "nikhil",
    title: "Google Cloud AI Certifications",
    issuer: "Google Cloud",
    kind: "Certification",
    description: "Artificial intelligence certifications on Google Cloud.",
    show: true,
  },
  {
    id: "aws-ccp-nikhil",
    owner: "nikhil",
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    kind: "Certification",
    description: "Cloud fundamentals on AWS.",
    show: true,
  },
  {
    id: "cisco-nikhil",
    owner: "nikhil",
    title: "Cybersecurity and Python Essentials",
    issuer: "Cisco",
    kind: "Certification",
    description: "Certifications in cybersecurity and Python programming.",
    show: true,
  },
  {
    id: "infosys-html-css",
    owner: "nikhil",
    title: "HTML5 and CSS3",
    issuer: "Infosys Springboard",
    kind: "Course",
    description: "Building web pages with HTML5 and CSS3.",
    show: true,
  },
  {
    id: "ethical-hacker",
    owner: "nikhil",
    title: "Advanced Ethical Hacker",
    issuer: "Certification listed on resume",
    kind: "Certification",
    description: "Ethical hacking and security testing.",
    show: false, // issuer not known yet. Add it, then turn this on.
  },
];

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
}

/** Empty on purpose. The section stays hidden until you add verified entries. */
export const achievements: Achievement[] = [];
