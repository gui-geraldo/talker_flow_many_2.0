import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Coluna 1: Logo e descrição */}
          <div>
            <Logo variant="white" className="mb-6" />
            <p className="text-white/70 text-sm">
              Conversas inteligentes no WhatsApp que qualificam leads, resolvem dúvidas e constroem relações de confiança em diálogos humanos, 24 horas por dia.
            </p>
          </div>

          {/* Coluna 2: Contato */}
          <div>
            <h4 className="font-bold text-lg mb-4">Fale Conosco</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contato@talkerflow.me"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  contato@talkerflow.me
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511966013044"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  (11) 96601-3044
                </a>
              </li>
              <li className="mt-4">
                <div className="flex space-x-4">
                  {/* Ícones sociais (opcional) */}
                  {/* ... SVGs ou componentes aqui ... */}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Talker Flow. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
  <a
    href="/politica-de-privacidade"
    className="text-white/50 hover:text-white transition-colors text-sm"
  >
    Política de Privacidade
  </a>
  <a
    href="/termos-de-uso"
    className="text-white/50 hover:text-white transition-colors text-sm"
  >
    Termos de Uso
  </a>
</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;