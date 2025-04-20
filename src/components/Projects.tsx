// Projects.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ChevronDown, ChevronUp } from 'lucide-react';

// --- IMPORT YOUR PROJECT IMAGES HERE ---
import project1Image from '../assets/images/projects/customer retention.png';
import project2Image from '../assets/images/projects/segmentation.png';
import project3Image from '../assets/images/projects/facial expression.png';
import project4Image from '../assets/images/projects/license plate detection.jpg';
import project5Image from '../assets/images/projects/sentiment analysis.png';
import project6Image from '../assets/images/projects/document insight.png';
import project7Image from '../assets/images/projects/ats tracker.png';
import project8Image from '../assets/images/projects/azure.png';
import project9Image from '../assets/images/projects/stable-diffusion.jpg';
// --- ---

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  codeLink: string;
}

// --- Define the IDs of the projects to show initially ---
const INITIAL_PROJECT_IDS = [4, 6, 8];
// --- ---

// --- REMOVED Constant ---
// const INITIAL_PROJECTS_COUNT = 3;
// --- ---

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [ref, inView] = useInView({
    threshold: 0.05,
    triggerOnce: false
  });

  const allProjects: Project[] = [
    {
      id: 1,
      title: "Customer Retention Analyzer",
      description: "Predictive model to analyze customer retention using machine learning algorithms and customer loyalty strategies.",
      image: project1Image,
      tags: ["Python", "XGBoost", "Pandas", "NumPy", "Decision Tree"],
      category: "machine-learning",
      codeLink: "https://github.com/Rohit-Ray-Git/Customer-Retention-Analyzer-Using-Machine-Learning-Algorithms"
    },
    {
      id: 2,
      title: "Customer Segmentation K-Means",
      description: "Segmentation of customers using K-Means clustering to identify distinct customer groups for targeted marketing strategies.",
      image: project2Image,
      tags: ["Python", "K-Means", "Elbow", "Hierarchical Clustering", "Streamlit"],
      category: "machine-learning",
      codeLink: "https://github.com/Rohit-Ray-Git/Customer-Segmentation-Using-K-Means-Clustering"
    },
    {
      id: 3,
      title: "Facial Expression Emotion Prediction with CNN",
      description: "Facial expression recognition system using CNN for real-time emotion detection, enhancing user interaction in applications.",
      image: project3Image,
      tags: ["Python", "OpenCV", "Matplotlib", "NumPy", "Streamlit"],
      category: "deep-learning",
      codeLink: "https://github.com/Rohit-Ray-Git/Facial-Expression-Emotion-Prediction-with-CNN"
    },
    {
      id: 4,
      title: "License Plate Detection and Logging System",
      description: "Real-time license plate detection and logging system for parking management, enhancing security and efficiency.",
      image: project4Image,
      tags: ["Python", "YOLOv10", "Computer Vision", "MySQL", "OCR"],
      category: "deep-learning",
      codeLink: "https://github.com/Rohit-Ray-Git/License-Plate-Detection-and-Logging-System-Using-YOLOv10"
    },
    {
      id: 5,
      title: "Text Sentiment Analysis using BERT",
      description: "Sentiment analysis of text data using BERT for understanding customer feedback and improving product strategies.",
      image: project5Image,
      tags: ["Python", "BERT", "Hugging Face Transformers", "PyTorch"],
      category: "nlp",
      codeLink: "https://github.com/Rohit-Ray-Git/Text-Sentiment-Analysis-using-BERT"
    },
    {
      id: 6,
      title: "AI Powered Document Insight Assistant",
      description: "AI-powered document assistant for extracting insights from unstructured data, enhancing data accessibility and decision-making.",
      image: project6Image,
      tags: ["Python", "GPT-4", "FAISS", "LangChain", "Streamlit", "OpenAI"],
      category: "generative-ai",
      codeLink: "https://github.com/Rohit-Ray-Git/AI-Powered-Document-Insight-Assistant"
    },
    {
      id: 7,
      title: "Smart Resume ATS Tracker Using Gemini-Pro",
      description: "Smart resume ATS tracker using Gemini-Pro for efficient job application tracking and management, enhancing job search efficiency.",
      image: project7Image,
      tags: ["Python", "gemini-pro", "Scikit-learn", "PyPDF2", "Streamlit"],
      category: "generative-ai",
      codeLink: "https://github.com/Rohit-Ray-Git/Smart-ATS-Tracker-Using-Gemini-Pro"
    },
    {
      id: 8,
      title: "Azure AI - OCR & Face Detection",
      description: "Azure AI project for OCR and face detection, enhancing document processing and security through advanced image analysis.",
      image: project8Image,
      tags: ["Python", "Azure AI", "Azure Blob Storage", "Azure Face API", "Azure OCR"],
      category: "cloud",
      codeLink: "https://github.com/Rohit-Ray-Git/Azure-Blob-Storage-OCR-and-Face-Detection"
    },
    {
      id: 9,
      title: "Image Generation Using Stable Diffusion and Hugging-Face",
      description: "Image generation using Stable Diffusion and Hugging-Face for creating high-quality images from text prompts, enhancing creative applications.",
      image: project9Image,
      tags: ["Python", "PyTorch", "Hugging Face", "Stable Diffusion"],
      category: "generative-ai",
      codeLink: "https://github.com/Rohit-Ray-Git/Image-Generation-Using-Stable-Diffusion-and-Hugging-Face"
    }
  ];

  // --- MODIFIED useEffect to manage filtered projects ---
  useEffect(() => {
    let projectsToShow: Project[];
    if (activeFilter === 'all') {
      if (showAllProjects) {
        // Show all projects when expanded
        projectsToShow = allProjects;
      } else {
        // Show only the specific initial projects when collapsed
        projectsToShow = allProjects.filter(project => INITIAL_PROJECT_IDS.includes(project.id));
        // Optional: Sort them in the order defined in INITIAL_PROJECT_IDS
        projectsToShow.sort((a, b) => INITIAL_PROJECT_IDS.indexOf(a.id) - INITIAL_PROJECT_IDS.indexOf(b.id));
      }
    } else {
      // When a specific category is selected, always show all projects in that category
      projectsToShow = allProjects.filter(project => project.category === activeFilter);
    }
    setFilteredProjects(projectsToShow);
  }, [activeFilter, showAllProjects]); // Dependency array remains the same
  // --- ---

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'machine-learning', label: 'Machine Learning' },
    { key: 'deep-learning', label: 'Deep Learning' },
    { key: 'nlp', label: 'NLP' },
    { key: 'generative-ai', label: 'Generative AI' },
    { key: 'cloud', label: 'Cloud' },
  ];

  const handleToggleShowAll = () => {
    setShowAllProjects(prev => !prev);
  };

  const handleExitComplete = () => {
    if (activeFilter === 'all' && !showAllProjects) {
      const projectsSection = document.getElementById('projects');
      const headerElement = document.querySelector('header');

      if (projectsSection && headerElement) {
        const headerHeight = headerElement.offsetHeight;
        const projectsSectionTop = projectsSection.offsetTop;
        const targetScrollY = projectsSectionTop - headerHeight;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      } else {
        console.warn("Could not find projects section or header for precise scrolling.");
      }
    }
  };

  const projectItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <section id="projects" className="section bg-background py-20" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium">My Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Recent Projects</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          className="flex flex-wrap justify-center mb-12 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => {
                  setActiveFilter(filter.key);
                  // Optional: Reset showAll state when changing filters away from 'all'
                  // if (filter.key !== 'all') {
                  //   setShowAllProjects(false);
                  // }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-primary text-background'
                  : 'bg-background text-accent border border-primary/30 hover:border-primary'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <AnimatePresence initial={false} onExitComplete={handleExitComplete}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-background border border-primary/20 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 hover:border-primary/50 transition-all duration-500 flex flex-col"
                variants={projectItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={index}
                layout="position"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-primary">{project.title}</h3>
                  <p className="text-accent-dark mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-medium text-primary hover:text-primary-light transition-colors"
                    >
                      <Github size={16} className="mr-1" /> View Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- MODIFIED Show More/Less Button Condition --- */}
        {activeFilter === 'all' && allProjects.length > INITIAL_PROJECT_IDS.length && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleToggleShowAll}
              className="inline-flex items-center px-6 py-2 border border-primary text-primary font-medium rounded-md hover:bg-primary/10 transition-colors duration-300 text-sm"
            >
              {showAllProjects ? (
                <>
                  Show Fewer Projects <ChevronUp size={16} className="ml-1" />
                </>
              ) : (
                <>
                  Show All Projects <ChevronDown size={16} className="ml-1" />
                </>
              )}
            </button>
          </motion.div>
        )}
        {/* --- --- */}

      </div>
    </section>
  );
};

export default Projects;
