
import React from 'react';
import { Check } from 'lucide-react';

const PlanosSection: React.FC = () => {
  const planos = [
    {
      nome: "Essencial",
      preco: "R$ 897,99",
      periodo: "/mês",
      destaque: false,
      recursos: [
        "Até 2.000 mensagens/mês",
        "Integração com WhatsApp Business",
        "Interface administrativa",
        "Atendimento apenas em português",
        "Não reconhece áudios e emojis",
        "Apenas 1 usuário",
        "Relatórios básicos",
      ],
      botao: "Contratar"
    },
    {
      nome: "Pro",
      preco: "R$ 1.200",
      periodo: "/mês",
      destaque: true,
      recursos: [
        "Mensagens ilimitadas",
        "Suporte a 24 idiomas",
        "Reconhecimento de áudio",
        "Entendimento de emojis",
        "Até 5 usuários",
        "Prioridade no suporte"
      ],
      botao: "Recomendado"
    }
  ];

  return (
    <section id="planos" className="section-padding bg-gradient-to-b from-white to-blue-50/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gradient">
            Planos e Preços
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            Escolha o plano ideal para o tamanho da sua clínica
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {planos.map((plano, index) => (
            <div 
              key={index} 
              className={`rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl animate-fade-in ${
                plano.destaque 
                  ? 'border-primary relative scale-105 shadow-lg border-2 bg-gradient-to-br from-white to-blue-50' 
                  : 'border-neutral-background shadow glass-effect'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plano.destaque && (
                <div className="bg-gradient-to-r from-primary to-blue-600 text-white text-center py-2 text-sm font-medium">
                  Mais Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plano.nome}</h3>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold">{plano.preco}</span>
                  <span className="text-neutral-dark/70 ml-1">{plano.periodo}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plano.recursos.map((recurso, i) => (
                    <li key={i} className="flex items-center">
                      <Check className={`mr-3 ${plano.destaque ? 'text-blue-500' : 'text-secondary'}`} size={18} />
                      <span>{recurso}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="#contato"
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-center block transition-all hover:shadow-lg ${
                    plano.destaque
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-white hover:scale-105'
                      : 'bg-neutral-background text-neutral-dark border border-neutral-dark/20 hover:bg-neutral-dark/5'
                  }`}
                >
                  {plano.botao}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-neutral-dark/70">
          <p>
            Todos os planos incluem suporte técnico e atualizações gratuitas. 
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlanosSection;
