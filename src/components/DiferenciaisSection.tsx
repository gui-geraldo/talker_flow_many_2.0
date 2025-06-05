import React from 'react';
import { Clock, MessageSquare, Users } from 'lucide-react';

const DiferenciaisSection: React.FC = () => {
  const diferenciais = [
    {
      title: "24 Horas / 365 Dias",
      description: "Nossa IA trabalha ininterruptamente, gerando uma experiência consistente a qualquer momento do dia ou da noite.",
      icon: Clock
    },
    {
      title: "Áudio Texto e Emojis",
      description: "Compreensão avançada de linguagem natural, incluindo mensagens de voz e expressões comuns em apps de mensagem.",
      icon: MessageSquare
    },
    {
      title: "24 Idiomas",
      description: "Atendimento em múltiplos idiomas, converse com seus clientes em sua própria língua, sem barreiras de comunicação.",
      icon: Users
    },
  ];

  return (
    <section id="diferenciais" className="py-20 bg-gray-100"> {/* Ajuste no padding vertical */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
            Diferenciais Exclusivos
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diferenciais.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-xl shadow-sm text-center transition-transform duration-300 hover:shadow-md hover:scale-[1.02]"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <item.icon className="text-blue-600" size={24} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-700">
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
