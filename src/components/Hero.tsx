import React, { useState, useEffect } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

import profileImage from '../assets/images/pro-pic1.png';

// Framer Motion Variants for Hero Section
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Time delay between each child animating
      delayChildren: 0.5,    // Wait 0.5s before starting the first child
    },
  },
};

const textItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, x: 20 }, // Added slight x offset
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.7, delay: 0.6, ease: 'easeOut' },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 1.0, // Delay after text/image animation starts
    },
  },
};

const buttonItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const scrollIndicatorVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 0.5 }, // Delay until other animations likely finished
  },
};


const Hero: React.FC = () => {
  const profileImageUrl = profileImage;

  // State for the typing animation (no changes needed here)
  const words = ['Data Scientist', 'Data Analyst', 'AI Engineer', 'ML Engineer'];
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 1500;

  // Effect for the typing animation logic (no changes needed here)
  useEffect(() => {
    const currentWord = words[wordIndex];
    const handleTyping = () => {
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          // Only set deleting timeout if the component is still mounted
          const timeoutId = setTimeout(() => setIsDeleting(true), pauseDuration);
          return () => clearTimeout(timeoutId); // Cleanup timeout on unmount/re-render
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);

  }, [text, isDeleting, wordIndex, words, pauseDuration, typingSpeed, deletingSpeed]);

  // CV path (no changes needed here)
  const cvPath = 'https://drive.google.com/file/d/1MOubhfQoRjmXbnxVwdG6jXX9mu0u806S/view?usp=sharing';

  return (
    <section id="hero" className="section relative flex items-center overflow-hidden min-h-screen"> {/* Ensure min-height */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        {/* Text Content Column */}
        <motion.div // Apply container variants for text staggering
          className="flex-1 mb-12 lg:mb-0 text-center lg:text-left"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span // Animate "Hello, I'm"
            variants={textItemVariants}
            className="inline-block text-primary text-lg font-medium mb-4"
          >
            Hello, I'm
          </motion.span>

          <motion.h1 // Animate Name and Title container
            variants={textItemVariants}
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Rohit Ray
            {/* Typing animation starts based on its own useEffect delay */}
            <span
              className="block text-primary mt-2 min-h-[1.2em] text-4xl md:text-6xl"
              style={{ textShadow: '0 0 3px #00FFFF' }}
            >
              {text}
              <span className="animate-blink">_</span>
            </span>
          </motion.h1>

          <motion.p // Animate paragraph
            variants={textItemVariants}
            className="text-lg md:text-xl text-accent-dark max-w-2xl lg:mx-0 mx-auto mb-8"
          >
            Passionate about transforming data into meaningful insights and building innovative AI solutions.
            Specializing in machine learning, data visualization, and predictive analytics.
          </motion.p>

          {/* Buttons Container */}
          <motion.div // Apply container variants for button staggering
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            variants={buttonContainerVariants}
            // initial="hidden" // Inherits from parent
            // animate="visible" // Inherits from parent
          >
            {/* View Projects Button */}
            <motion.div variants={buttonItemVariants}>
              <Link to="projects" smooth={true} duration={800} offset={-80}>
                <motion.button
                  className="px-6 py-3 bg-primary text-background font-medium rounded-md hover:bg-primary-dark transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.button>
              </Link>
            </motion.div>

            {/* CV Link/Button */}
            <motion.div variants={buttonItemVariants}>
              <motion.a
                href={cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} className="mr-2" />
                View CV
              </motion.a>
            </motion.div>

            {/* Contact Me Button */}
            <motion.div variants={buttonItemVariants}>
              <Link to="contact" smooth={true} duration={800} offset={-80}>
                <motion.button
                  className="px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Image Column */}
        <motion.div // Apply image variants
          className="flex-1 relative lg:max-w-sm"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">
            {/* Background pulse can remain as CSS animation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse-slow"></div>
            <img
              src={profileImageUrl}
              alt="Rohit Ray - Data Scientist"
              className="w-96 h-96 object-cover rounded-full border-4 border-primary relative z-10 mx-auto"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div // Apply scroll indicator variants
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2" // Wrapper div for positioning
      >
        <Link
          to="about"
          smooth={true}
          duration={800}
          className="text-primary cursor-pointer animate-bounce block" // Added block display
        >
          <ChevronDown size={32} />
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
