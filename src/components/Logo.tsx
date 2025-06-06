import React from 'react';
import Image from 'next/image';

interface LogoProps {
  variant?: 'default' | 'white';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo.webp"
        alt="Logo Talker Flow"
        width={40}
        height={40}
        className="rounded-full"
        priority
      />
      <span
        className={`ml-2 text-xl font-poppins font-extrabold ${
          variant === 'white' ? 'text-white' : 'text-primary'
        }`}
      >
        Talker Flow
      </span>
    </div>
  );
};

export default Logo;