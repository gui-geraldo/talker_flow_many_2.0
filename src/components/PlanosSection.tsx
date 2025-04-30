
import React from 'react';
import { Check } from 'lucide-react';

const PlanosSection: React.FC = () => {
  const planos = [
    {
      nome: "Essencial",
      preco: "R$ 497",
      periodo: "/mês",
      destaque: false,
      recursos: [
        "Até 2.000 mensagens/mês",
        "Integração com WhatsApp Business",
        "Lembretes automáticos",
        "Interface administrativa",
        "Relatórios básicos",
      ],
      botao: "Contratar"
    },
    {
      nome: "Pro",
      preco: "R$ 897",
      periodo: "/mês",
      destaque: true,
      recursos: [
        "Mensagens ilimitadas",
        "Suporte a 24 idiomas",
        "Reconhecimento de áudio",
        "API para integração completa",
        "Relatórios avançados",
        "Prioridade no suporte"
      ],
      botao: "Recomendado"
    },
    {
      nome: "Enterprise",
      preco: "Personalizado",
      periodo: "",
      destaque: false,
      recursos: [
        "Solução personalizada",
        "Integração dedicada",
        "Multi-unidades",
        "Gerente de conta exclusivo",
        "SLA garantido",
        "Suporte 24/7"
      ],
      botao: "Fale Conosco"
    }
  ];

  return (
    <section id="planos" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-neutral-dark">
            Planos e Preços
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            Escolha o plano ideal para o tamanho da sua clínica
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {planos.map((plano, index) => (
            <div 
              key={index} 
              className={`rounded-xl shadow-sm border transition-all duration-300 hover:shadow-lg animate-fade-in overflow-hidden ${
                plano.destaque 
                  ? 'border-primary relative scale-105 shadow-lg' 
                  : 'border-neutral-background'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plano.destaque && (
                <div className="bg-primary text-white text-center py-2 text-sm font-medium">
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
                      <Check className="mr-3 text-secondary" size={18} />
                      <span>{recurso}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="#contato"
                  className={`w-full py-3 px-6 rounded-md font-semibold text-center block transition-transform hover:scale-105 ${
                    plano.destaque
                      ? 'bg-primary text-white'
                      : 'bg-neutral-background text-neutral-dark'
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
            <br />
            Para mais de 5 profissionais, recomendamos o plano Enterprise.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlanosSection;
