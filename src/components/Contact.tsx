// e:\Portfolio-2\project\src\components\Contact.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission delay
    console.log("Simulating form submission with data:", formData);
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    }, 1000); // 1 second delay
  };

  const contactInfo = [
    { icon: <Mail className="text-primary w-6 h-6" />, text: "rayrohit685@gmail.com" },
    { icon: <Phone className="text-primary w-6 h-6" />, text: "+91 8260701843" },
    { icon: <MapPin className="text-primary w-6 h-6" />, text: "Hyderabad, India" }
  ];

  // --- Your social media URLs ---
  const socialLinks = {
    twitter: "https://x.com/RayRohit_07",
    linkedin: "https://www.linkedin.com/in/rohit-ray-08634a216/",
    github: "https://github.com/Rohit-Ray-Git"
  };
  // ---

  return (
    <section id="contact" className="section bg-background py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Contact Me</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
            <p className="text-accent-dark mb-8">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-4">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social Links - Updated with actual links */}
            <div className="flex space-x-4">
              <a
                href={socialLinks.twitter} // Use the variable
                target="_blank" // Open in new tab
                rel="noopener noreferrer" // Security best practice
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors duration-300"
                aria-label="Twitter Profile" // Added aria-label for accessibility
              >
                {/* Twitter SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              <a
                href={socialLinks.linkedin} // Use the variable
                target="_blank" // Open in new tab
                rel="noopener noreferrer" // Security best practice
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors duration-300"
                aria-label="LinkedIn Profile" // Added aria-label for accessibility
              >
                {/* LinkedIn SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
              <a
                href={socialLinks.github} // Use the variable
                target="_blank" // Open in new tab
                rel="noopener noreferrer" // Security best practice
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors duration-300"
                aria-label="GitHub Profile" // Added aria-label for accessibility
              >
                {/* GitHub SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            // Added relative positioning for the success overlay
            className="bg-background border border-primary/20 rounded-lg p-8 shadow-lg relative"
          >
            {isSubmitted ? (
              <motion.div
                className="absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center py-10 text-center z-10 rounded-lg" // Made it an overlay
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="text-success w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-accent-dark">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)} // Hide success message
                  className="mt-6 px-6 py-2 bg-primary text-background rounded-md hover:bg-primary-dark transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : null} {/* Conditionally render only the overlay */}

            {/* Form Element - Added invisible class when submitted */}
            <form onSubmit={handleSubmit} className={`space-y-6 ${isSubmitted ? 'invisible' : ''}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors resize-none"
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 bg-primary text-background font-medium rounded-md hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={18} className="mr-2" />
                Send Message
              </motion.button>
            </form>
            {/* Moved the conditional rendering outside the form */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
