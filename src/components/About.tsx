import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, LineChart, Database, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const specialties = [
    { 
      icon: <Brain className="text-primary w-12 h-12" />, 
      title: "Machine Learning", 
      description: "Building and implementing ML models to solve real-world problems and extract valuable insights." 
    },
    { 
      icon: <LineChart className="text-primary w-12 h-12" />, 
      title: "Data Visualization", 
      description: "Creating intuitive and interactive visualizations that communicate complex data insights effectively." 
    },
    { 
      icon: <Database className="text-primary w-12 h-12" />, 
      title: "Data Engineering", 
      description: "Developing efficient data pipelines and infrastructure to process and analyze large datasets." 
    },
    { 
      icon: <Sparkles className="text-primary w-12 h-12" />, 
      title: "Generative AI", 
      description: "Exploring and implementing cutting-edge generative AI models for innovative solutions." 
    }
  ];

  return (
    <section id="about" className="section bg-background py-20">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium">About Me</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Who I Am</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed mb-6">
              I'm a passionate <span className="text-primary">Data Scientist</span> with a strong foundation in machine learning 
              and data analysis. My journey in data science began during my academic years, where I discovered my passion for 
              uncovering patterns in complex datasets.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With a background in <span className="text-primary">Computer Science</span>, I combine theoretical knowledge 
              with practical skills to develop machine learning models and data-driven solutions that address real-world challenges.
            </p>
            <p className="text-lg leading-relaxed">
              I'm constantly learning and staying current with the latest developments in AI and data science.
              When I'm not coding or analyzing data, I enjoy contributing to open-source projects and sharing my knowledge 
              through technical blogs.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {specialties.map((specialty, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="glass rounded-lg p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <div className="mb-4">{specialty.icon}</div>
                <h3 className="text-xl font-bold mb-2">{specialty.title}</h3>
                <p className="text-accent-dark text-sm">{specialty.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;