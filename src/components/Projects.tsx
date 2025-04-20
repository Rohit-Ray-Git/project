// e:\Portfolio-2\project\src\components\Projects.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github } from 'lucide-react';

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

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const projects: Project[] = [
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
      tags: ["Python", "K-Means", "Elbow", "Hierarchical Clustering"],
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

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'machine-learning', label: 'Machine Learning' },
    { key: 'deep-learning', label: 'Deep Learning' },
    { key: 'nlp', label: 'NLP' },
    { key: 'generative-ai', label: 'Generative AI' },
    { key: 'cloud', label: 'Cloud' },
  ];

  return (
    <section id="projects" className="section bg-background py-20" ref={ref}>
      <div className="container mx-auto px-4">
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

        <motion.div
          className="flex flex-wrap justify-center mb-12 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
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

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group bg-background border border-primary/20 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 hover:border-primary/50 transition-all duration-500 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
            >
              {/* Removed bg-black/5 as image will cover the area */}
              <div className="relative overflow-hidden h-48"> 
                <img
                  src={project.image} 
                  alt={project.title}
                  // --- CHANGED object-contain back to object-cover ---
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  // --- ---
                />
                {/* Re-added the gradient overlay, works well with object-cover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
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
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
