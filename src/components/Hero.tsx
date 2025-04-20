// e:\Portfolio-2\project\src\components\Hero.tsx
import React, { useState, useEffect } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

import profileImage from '../assets/images/pro-pic1.png';

const Hero: React.FC = () => {
  const profileImageUrl = profileImage;

  // State for the typing animation
  const words = ['Data Scientist', 'Data Analyst', 'AI Engineer', 'ML Engineer'];
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 1500;

  // Effect for the typing animation logic
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
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);

  }, [text, isDeleting, wordIndex, words, pauseDuration, typingSpeed, deletingSpeed]);

  // --- Define CV path ---
  // --- REPLACE WITH YOUR GOOGLE DRIVE SHAREABLE LINK ---
  const cvPath = 'https://drive.google.com/file/d/1EZ_p1Da-ypjtvC6oQZH6S7zPkT95ju6n/view?usp=sharing'; 
  // --- ---

  return (
    <section id="hero" className="section relative flex items-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <motion.div
          className="flex-1 mb-12 lg:mb-0 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-primary text-lg font-medium mb-4">Hello, I'm</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight"> 
            Rohit Ray
            <span
              className="block text-primary mt-2 min-h-[1.2em] text-4xl md:text-6xl" 
              style={{ textShadow: '0 0 3px #00FFFF' }}
            >
              {text}
              <span className="animate-blink">_</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-accent-dark max-w-2xl lg:mx-0 mx-auto mb-8">
            Passionate about transforming data into meaningful insights and building innovative AI solutions.
            Specializing in machine learning, data visualization, and predictive analytics.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            {/* View Projects Button */}
            <Link to="projects" smooth={true} duration={800} offset={-80}>
              <motion.button
                className="px-6 py-3 bg-primary text-background font-medium rounded-md hover:bg-primary-dark transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
            </Link>

            {/* CV Link/Button */}
            <motion.a
              href={cvPath} // Now uses the Google Drive link
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary/10 transition-colors duration-300" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} className="mr-2" /> 
              View CV
            </motion.a>

            {/* Contact Me Button */}
            <Link to="contact" smooth={true} duration={800} offset={-80}>
              <motion.button
                className="px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 relative lg:max-w-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse-slow"></div>
            <img
              src={profileImageUrl}
              alt="Rohit Ray - Data Scientist"
              className="w-96 h-96 object-cover rounded-full border-4 border-primary relative z-10 mx-auto"
            />
          </div>
        </motion.div>
      </div>

      <Link
        to="about"
        smooth={true}
        duration={800}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary cursor-pointer animate-bounce"
      >
        <ChevronDown size={32} />
      </Link>
    </section>
  );
};

export default Hero;
