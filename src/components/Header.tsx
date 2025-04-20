// e:\Portfolio-2\project\src\components\Header.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion

const navLinks = [
  { name: 'Home', to: 'hero', offset: -100 },
  { name: 'About', to: 'about', offset: -80 },
  { name: 'Skills', to: 'skills', offset: -80 },
  { name: 'Projects', to: 'projects', offset: -80 },
  { name: 'Contact', to: 'contact', offset: -80 },
];

// Framer Motion Variants
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { delay: 0.3, duration: 0.4 } 
  },
};

const navContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Stagger delay between links
      delayChildren: 0.4,   // Wait 0.4s after header appears before starting links
    },
  },
};

const navItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.3, ease: 'easeOut' } 
  },
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header // Wrap header with motion
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${ // Removed transition-all
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
      variants={headerVariants}
      initial="hidden"
      animate="visible" // Animate on load
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div variants={logoVariants}> {/* Wrap logo for animation */}
          <Link
            to="hero"
            smooth={true}
            duration={800}
            className="text-primary text-2xl font-bold cursor-pointer"
          >
            <span className="glow">RR</span>
          </Link>
        </motion.div>

        <motion.nav // Wrap nav with motion
          className="hidden md:flex space-x-8"
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => (
            <motion.div key={link.name} variants={navItemVariants}> {/* Wrap each link */}
              <Link
                to={link.to}
                spy={true}
                smooth={true}
                offset={link.offset}
                duration={800}
                className="text-accent hover:text-primary transition-colors duration-300 cursor-pointer text-sm font-medium"
                activeClass="text-primary"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Mobile Menu Button (no animation changes needed here) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-accent hover:text-primary"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel (no animation changes needed here) */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-64 shadow-lg' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={link.offset}
                duration={800}
                className="text-accent hover:text-primary transition-colors duration-300 cursor-pointer font-medium"
                activeClass="text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
