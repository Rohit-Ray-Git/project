import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

interface GlowEffectProps {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
}

const GlowEffect: React.FC<GlowEffectProps> = ({
  color = '#4f46e5',
  size = 150,
  blur = 50,
  opacity = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();
  const [localX, setLocalX] = React.useState(0);
  const [localY, setLocalY] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setLocalX(x - rect.left);
      setLocalY(y - rect.top);
    }
  }, [x, y]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute rounded-full transition-all duration-200"
        style={{
          left: localX,
          top: localY,
          width: size,
          height: size,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${color} ${opacity * 100}%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          opacity: isHovered ? opacity : 0,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

export default GlowEffect; 