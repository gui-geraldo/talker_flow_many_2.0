
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom flex justify-between items-center">
        <Logo />
        
        <div className="hidden md:flex space-x-8">
          <a href="#como-funciona" className="text-neutral-dark hover:text-primary font-medium transition-colors">
            Como Funciona
          </a>
          <a href="#diferenciais" className="text-neutral-dark hover:text-primary font-medium transition-colors">
            Diferenciais
          </a>
          <a href="#beneficios" className="text-neutral-dark hover:text-primary font-medium transition-colors">
            Benefícios
          </a>
          <a href="#planos" className="text-neutral-dark hover:text-primary font-medium transition-colors">
            Planos
          </a>
        </div>
        
        <a href="#contato" className="hidden md:block btn-primary">
          Solicitar Demonstração
        </a>
        
        <button 
          className="md:hidden text-neutral-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg animate-fade-in">
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            <a 
              href="#como-funciona" 
              className="text-neutral-dark hover:text-primary font-medium transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </a>
            <a 
              href="#diferenciais" 
              className="text-neutral-dark hover:text-primary font-medium transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Diferenciais
            </a>
            <a 
              href="#beneficios" 
              className="text-neutral-dark hover:text-primary font-medium transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefícios
            </a>
            <a 
              href="#planos" 
              className="text-neutral-dark hover:text-primary font-medium transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </a>
            <a 
              href="#contato" 
              className="btn-primary mx-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Solicitar Demonstração
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
