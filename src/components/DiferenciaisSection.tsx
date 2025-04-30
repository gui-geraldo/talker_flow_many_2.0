
import React from 'react';
import { Clock, MessageSquare, Users, Calendar } from 'lucide-react';

const DiferenciaisSection: React.FC = () => {
  const diferenciais = [
    {
      title: "24 Horas /365 Dias",
      description: "Nossa IA trabalha ininterruptamente, gerando uma experiência consistente para pacientes a qualquer momento do dia ou da noite.",
      icon: Clock
    },
    {
      title: "Interpreta texto, áudio e emojis",
      description: "Compreensão avançada de linguagem natural, incluindo mensagens de voz e expressões comuns em apps de mensagem.",
      icon: MessageSquare
    },
    {
      title: "Poliglota: 24 idiomas",
      description: "Atendimento em múltiplos idiomas, permitindo que sua clínica atenda pacientes estrangeiros sem barreiras de comunicação.",
      icon: Users
    },
  ];

  return (
    <section id="diferenciais" className="section-padding bg-neutral-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-neutral-dark">
            Diferenciais Exclusivos
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            Por que o Many Tasks é a escolha ideal para sua clínica
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diferenciais.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm animate-fade-in card-hover text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <item.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-dark">
                {item.title}
              </h3>
              <p className="text-neutral-dark/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiferenciaisSection;
