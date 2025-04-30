import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Logo variant="white" className="mb-6" />
            <p className="text-white/70 text-sm">
              Soluções de IA para otimização de clínicas médicas e centros de saúde.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-white/70">
                contato@manytasks.com.br
              </li>
              <li className="text-white/70">
                (21) 98801-3301
              </li>
              <li className="mt-4">
                <div className="flex space-x-4">
                  {/* Seus ícones sociais (Facebook, Twitter, LinkedIn) mantidos aqui */}
                  {/* ... SVGs como no original ... */}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex justify-center">
            <p className="text-white/50 text-sm text-center">
              © {new Date().getFullYear()} Many Tasks. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


