import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'data' | 'software' | 'soft';
}

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const skills: Skill[] = [
    { name: 'Python', level: 90, category: 'technical' },
    { name: 'SQL', level: 85, category: 'technical' },
    { name: 'Machine Learning', level: 85, category: 'data' },
    { name: 'Deep Learning', level: 80, category: 'data' },
    { name: 'Statistical Analysis', level: 85, category: 'data' },
    { name: 'Data Visualization', level: 90, category: 'data' },
    { name: 'TensorFlow', level: 80, category: 'software' },
    { name: 'PyTorch', level: 75, category: 'software' },
    { name: 'Scikit-Learn', level: 85, category: 'software' },
    { name: 'NumPy', level: 90, category: 'software' },
    { name: 'Pandas', level: 90, category: 'software' },
    { name: 'Matplotlib', level: 85, category: 'software' },
    { name: 'Seaborn', level: 85, category: 'software' },
    { name: 'Docker', level: 80, category: 'software' },
    { name: 'Communication', level: 85, category: 'soft' },
    { name: 'Problem Solving', level: 90, category: 'soft' },
    { name: 'Collaboration', level: 85, category: 'soft' },
    // { name: 'Project Management', level: 80, category: 'soft' },
    { name: 'Time Management', level: 85, category: 'soft' }
  ];

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(skills.filter(skill => skill.category === activeTab));
    }
  }, [activeTab]);

  const tabs = [
    { id: 'all', label: 'All Skills' },
    { id: 'technical', label: 'Technical' },
    { id: 'data', label: 'Data Science' },
    { id: 'software', label: 'Tools & Frameworks' },
    { id: 'soft', label: 'Soft Skills' },
  ];

  return (
    <section id="skills" className="section bg-background py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium">My Skills</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Technical Expertise</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center mb-10 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-primary text-background' 
                  : 'bg-background text-accent border border-primary/30 hover:border-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div 
              key={skill.name} 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-primary">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <motion.div 
                  className="skill-progress"
                  initial={{ width: '0%' }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;