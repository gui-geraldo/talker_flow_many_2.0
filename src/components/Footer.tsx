import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <Logo variant="white" className="mb-6" />
            <p className="text-white/70 text-sm">
              Soluções de IA para otimização de clínicas médicas e centros de saúde.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Casos de sucesso
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Soluções</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Agente de Agendamento
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Integração com sistemas
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Pacotes empresariais
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  API para desenvolvedores
                </a>
              </li>
            </ul>
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
                  {/* Ícones sociais mantidos */}
                  {/* ... SVGs como no código original ... */}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Many Tasks. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
