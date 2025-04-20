import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'data' | 'software' | 'soft';
}

const INITIAL_SKILLS_COUNT = 6;

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [showAllInAllTab, setShowAllInAllTab] = useState<boolean>(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const skills: Skill[] = [
    // ... skills array remains the same ...
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
    { name: 'Git', level: 90, category: 'software' },
    { name: 'Azure', level: 75, category: 'software' },
    { name: 'Generative AI', level: 80, category: 'data' },
    { name: 'Large Language Models', level: 80, category: 'data' },
    { name: 'Communication', level: 85, category: 'soft' },
    { name: 'Problem Solving', level: 90, category: 'soft' },
    { name: 'Collaboration', level: 85, category: 'soft' },
    { name: 'Project Management', level: 80, category: 'soft' },
    { name: 'Time Management', level: 85, category: 'soft' }
  ];

  useEffect(() => {
    let skillsToShow: Skill[];
    if (activeTab === 'all') {
      skillsToShow = showAllInAllTab ? skills : skills.slice(0, INITIAL_SKILLS_COUNT);
    } else {
      skillsToShow = skills.filter(skill => skill.category === activeTab);
    }
    setFilteredSkills(skillsToShow);
  }, [activeTab, showAllInAllTab]);

  const tabs = [
    // ... tabs array remains the same ...
    { id: 'all', label: 'All Skills' },
    { id: 'technical', label: 'Technical' },
    { id: 'data', label: 'Data Science' },
    { id: 'software', label: 'Tools & Frameworks' },
    { id: 'soft', label: 'Soft Skills' },
  ];

  const handleToggleShowAll = () => {
    setShowAllInAllTab(prev => !prev);
  };

  // --- MODIFIED Function to handle scrolling after exit animation ---
  const handleExitComplete = () => {
    // Check if we are in the 'all' tab AND the skills are currently hidden (meaning we just clicked 'Show Less')
    if (activeTab === 'all' && !showAllInAllTab) {
      const skillsSection = document.getElementById('skills');
      const headerElement = document.querySelector('header'); // Find the header element

      if (skillsSection && headerElement) {
        const headerHeight = headerElement.offsetHeight; // Get the header's current height
        const skillsSectionTop = skillsSection.offsetTop; // Get distance from top of document to top of skills section

        // Calculate the target scroll position: top of skills section minus header height
        const targetScrollY = skillsSectionTop - headerHeight;

        // Scroll smoothly to the calculated position
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        });
      } else {
        // Optional: Fallback or log if elements aren't found
        console.warn("Could not find skills section or header for precise scrolling.");
        // Fallback to simple scrollIntoView if needed
        // skillsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  // --- END OF MODIFICATION ---

  const skillItemVariants = {
    // ... variants remain the same ...
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    // --- REMOVED scroll-mt-* from here if you added it previously ---
    <section id="skills" className="section bg-background py-20" ref={ref}>
      {/* --- --- */}
      <div className="container mx-auto px-4">
        {/* Title Section */}
         <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium">My Skills</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Technical Expertise</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          className="flex flex-wrap justify-center mb-10 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
              }}
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

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0"
          layout
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Pass the modified handleExitComplete */}
          <AnimatePresence initial={false} onExitComplete={handleExitComplete}>
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="mb-6"
                variants={skillItemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                exit="exit"
                custom={index}
                layout="position"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-primary">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-progress"
                    initial={{ width: '0%' }}
                    animate={inView ? { width: `${skill.level}%` } : { width: '0%' }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

          {/* Show More/Less Button */}
          {activeTab === 'all' && skills.length > INITIAL_SKILLS_COUNT && (
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleToggleShowAll}
              className="inline-flex items-center px-6 py-2 border border-primary text-primary font-medium rounded-md hover:bg-primary/10 transition-colors duration-300 text-sm"
            >
              {showAllInAllTab ? (
                <>
                  Show Less Skills <ChevronUp size={16} className="ml-1" />
                </>
              ) : (
                <>
                  Show All Skills <ChevronDown size={16} className="ml-1" />
                </>
              )}
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Skills;
