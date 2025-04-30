
import React from 'react';

interface LogoProps {
  variant?: 'default' | 'white';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', className = "" }) => {
  const color = variant === 'white' ? '#FFFFFF' : '#3D5AFE';

  return (
    <div className={`flex items-center ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill={color} />
        <path 
          d="M13 21L17 25L27 15" 
          stroke={variant === 'white' ? '#3D5AFE' : '#FFFFFF'} 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M18 21L22 25L32 15" 
          stroke={variant === 'white' ? '#3D5AFE' : '#FFFFFF'} 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className={`ml-2 text-xl font-poppins font-extrabold ${variant === 'white' ? 'text-white' : 'text-primary'}`}>
        Many Tasks
      </span>
    </div>
  );
};

export default Logo;
