import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react'; // Added Loader2

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission in progress
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null); // Track submission errors
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // --- IMPORTANT: getform.io endpoint URL ---
  const getformEndpoint = 'https://getform.io/f/bvrwxmgb';
  // --- ---

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Added type HTMLFormElement
    e.preventDefault();
    setIsSubmitting(true); // Start loading state
    setSubmitError(null); // Clear previous errors
    setIsSubmitted(false); // Ensure success message isn't shown yet

    const form = e.target as HTMLFormElement;
    const data = new FormData(form); // Use FormData to easily send form data

    try {
      const response = await fetch(getformEndpoint, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json' // Tells getform how to send back errors
        }
      });

      if (response.ok) {
        console.log('Form successfully submitted to getform.io');
        setIsSubmitted(true); // Show success message
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        // Try to parse error from getform.io if available
        const errorData = await response.json().catch(() => ({})); // Catch if response isn't JSON
        console.error('Form submission error:', response.statusText, errorData);
        setSubmitError(`Submission failed: ${response.statusText}. Please try again.`);
      }
    } catch (error) {
      console.error('Network error or other issue:', error);
      setSubmitError('An error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false); // Stop loading state regardless of outcome
    }
  };

  const contactInfo = [
    { icon: <Mail className="text-primary w-6 h-6" />, text: "rayrohit685@gmail.com" },
    { icon: <Phone className="text-primary w-6 h-6" />, text: "+91 8260701843" },
    { icon: <MapPin className="text-primary w-6 h-6" />, text: "Hyderabad, India" }
  ];

  const socialLinks = {
    x: "https://x.com/RayRohit_07",
    linkedin: "https://www.linkedin.com/in/rohit-ray-08634a216/",
    github: "https://github.com/Rohit-Ray-Git",
    instagram: "https://www.instagram.com/rohitray.in/"
  };

  return (
    <section id="contact" className="section bg-background py-20" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Title Section (no changes) */}
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
          {/* Contact Info & Social Links (no changes) */}
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
            <div className="flex space-x-4">
              <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors duration-300" aria-label="X Profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors duration-300" aria-label="LinkedIn Profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
              </a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors duration-300" aria-label="GitHub Profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors duration-300" aria-label="Instagram Profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
              </a>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-background border border-primary/20 rounded-lg p-8 shadow-lg relative overflow-hidden" // Added overflow-hidden
          >
            {/* Success Message Overlay */}
            {isSubmitted && (
              <motion.div
                className="absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center py-10 text-center z-10 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="text-success w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-accent-dark">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)} // Hide success message
                  className="mt-6 px-6 py-2 bg-primary text-background rounded-md hover:bg-primary-dark transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}

            {/* Form Element - Conditionally hidden by the success overlay */}
            <form onSubmit={handleSubmit} className={`space-y-6 ${isSubmitted ? 'invisible' : ''}`}>
              {/* Input Fields (no changes needed here) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-background border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors" placeholder="John Doe" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-background border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors" placeholder="john@example.com" disabled={isSubmitting} />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 bg-background border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors" placeholder="Project Inquiry" disabled={isSubmitting} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 bg-background border border-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors resize-none" placeholder="Hello, I'd like to talk about..." disabled={isSubmitting}></textarea>
              </div>

              {/* Submit Button with Loading State */}
              <motion.button
                type="submit"
                className={`w-full py-3 bg-primary text-background font-medium rounded-md hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                whileHover={!isSubmitting ? { scale: 1.03 } : {}} // Disable hover effect when submitting
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}   // Disable tap effect when submitting
                disabled={isSubmitting} // Disable button during submission
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="mr-2 animate-spin" /> // Show spinner
                ) : (
                  <Send size={18} className="mr-2" /> // Show Send icon
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {/* Error Message Display */}
              {submitError && (
                <p className="text-error text-sm mt-2 text-center">{submitError}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
