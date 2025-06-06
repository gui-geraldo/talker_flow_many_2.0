
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqSection: React.FC = () => {
  const faqs = [
    {
      pergunta: "Quanto tempo leva para implementar o agente na minha empresa?",
      resposta: "A implementação é rápida, geralmente entre 24 e 48 horas após a contratação. Nossa equipe configura o sistema de acordo com suas necessidades específicas e realiza um treinamento online com sua equipe."
    },
    {
      pergunta: "O agente consegue lidar com situações complexas?",
      resposta: "Sim! O agente é treinado para lidar com situações como reagendamentos, cancelamentos, passar informações, responder audios e emojis e até mesmo priorizar urgências conforme as suas regras."
    },
    {
      pergunta: "Como é feito o treinamento do agente?",
      resposta: "Desenvolvemos um processo de personalização onde coletamos informações sobre seus produtos e serviços, regras e tom de comunicação perfeito. O agente é então ajustado para refletir a identidade e os procedimentos específicos da sua empresa, como se fosse um novo funcionário."
    },
    {
      pergunta: "E se o cliente fizer perguntas fora do que foi treinado?",
      resposta: "Sem problemas! Assim como um humano, ele é treinado  para lidar com situações inesperadas e redirecionar de forma natural. Quando necessário, ele encaminha a conversa para uma pessoa, e sinaliza ao seu time que precisa de intervenção."
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-8 pb-8 bg-gradient-to-b from-blue-50/30 to-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gradient">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-6 animate-fade-in bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className="flex justify-between items-center w-full text-left py-5 px-6 focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-xl font-bold text-neutral-dark">{faq.pergunta}</h3>
                {openIndex === index ? (
                  <ChevronUp className="flex-shrink-0 text-primary" />
                ) : (
                  <ChevronDown className="flex-shrink-0 text-neutral-dark" />
                )}
              </button>
              <div 
                className={`transition-all duration-300 overflow-hidden border-t ${
                  openIndex === index ? 'max-h-96 opacity-100 border-gray-100' : 'max-h-0 opacity-0 border-transparent'
                }`}
              >
                <p className="px-6 py-5 text-neutral-dark/80">
                  {faq.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-100/50">
          <p className="mb-4 text-neutral-dark/90 font-medium">
            Não encontrou o que procurava?
          </p>
          <a href="#contato" className="text-primary font-semibold hover:underline">
            Fale diretamente com nossa equipe
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
