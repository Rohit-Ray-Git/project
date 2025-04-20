import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  el: HTMLDivElement;
}

const Particles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particleCount = 15;
    const particles: Particle[] = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 5 + 2;
      const el = document.createElement('div');
      el.className = 'particle';
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.opacity = `${Math.random() * 0.3 + 0.1}`;
      el.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(el);
      
      const particle: Particle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        el
      };
      
      particles.push(particle);
    }
    
    particlesRef.current = particles;
    
    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particles.forEach(p => p.el.remove());
    };
  }, []);
  
  return (
    <div ref={containerRef} className="particles"></div>
  );
};

export default Particles;