import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false 
}) => {
  return (
    <div 
      className={`
        relative overflow-hidden
        bg-glass-200 backdrop-blur-md 
        border border-glass-border 
        rounded-xl shadow-lg
        transition-all duration-300
        ${hoverEffect ? 'hover:bg-glass-300 hover:border-glass-highlight/50 hover:shadow-indigo-500/10 hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {/* Subtle Noise Texture Overlay could go here */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};