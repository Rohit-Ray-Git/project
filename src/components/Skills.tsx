import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import SVG logos for skills
import pythonLogo from '../assets/skills/python.svg';
import sqlLogo from '../assets/skills/sql.svg';
import numpyLogo from '../assets/skills/numpy.svg';
import pandasLogo from '../assets/skills/pandas.svg';
import matplotlibLogo from '../assets/skills/matplotlib.svg';
import seabornLogo from '../assets/skills/seaborn.svg';
import huggingfaceLogo from '../assets/skills/huggingface.svg';
import pytorchLogo from '../assets/skills/pytorch.svg';
import sklearnLogo from '../assets/skills/scikit-learn.svg';
import dockerLogo from '../assets/skills/docker.svg';
import gitLogo from '../assets/skills/github.svg';
import azureLogo from '../assets/skills/azure.svg';

interface Skill {
  name: string;
  description: string;
  logo: string;
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const skills: Skill[] = [
    { name: 'Python', description: 'Programming Language', logo: pythonLogo },
    { name: 'NumPy', description: 'Numerical Computing', logo: numpyLogo },
    { name: 'Pandas', description: 'Data Manipulation', logo: pandasLogo },
    { name: 'Matplotlib', description: 'Data Visualization', logo: matplotlibLogo },
    { name: 'Scikit-Learn', description: 'Machine Learning', logo: sklearnLogo },
    { name: 'Hugging Face', description: 'AI Models & Tools', logo: huggingfaceLogo },
    { name: 'PyTorch', description: 'Deep Learning', logo: pytorchLogo },
    { name: 'SQL', description: 'Database Querying', logo: sqlLogo },
    { name: 'Docker', description: 'Containerization', logo: dockerLogo },
    { name: 'GitHub', description: 'Version Control', logo: gitLogo },
    { name: 'Azure', description: 'Cloud Platform', logo: azureLogo },
    { name: 'Seaborn', description: 'Statistical Visualization', logo: seabornLogo }
  ];

  return (
    <section id="skills" className="section py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Essential Tools I use</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the powerful tools and technologies I use to create exceptional, high-performing AI and Machine Learning applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-gray-800/20 hover:border-gray-700/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1 }
              } : { opacity: 0, y: 20 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-white mb-1">{skill.name}</h4>
                  <p className="text-gray-400 text-sm">{skill.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
