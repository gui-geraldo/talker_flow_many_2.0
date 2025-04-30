
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqSection: React.FC = () => {
  const faqs = [
    {
      pergunta: "Quanto tempo leva para implementar o agente na minha clínica?",
      resposta: "A implementação é rápida, geralmente entre 24 e 48 horas após a contratação. Nossa equipe configura o sistema de acordo com suas necessidades específicas e realiza um treinamento online com sua equipe."
    },
    {
      pergunta: "O agente consegue lidar com situações complexas de agendamento?",
      resposta: "Sim! O agente é treinado para lidar com situações como reagendamentos, cancelamentos, verificação de disponibilidade por especialidade ou profissional específico, e até mesmo priorizar urgências conforme regras da clínica."
    },
    {
      pergunta: "É possível integrar com o sistema de gestão que já utilizo?",
      resposta: "Com certeza. O Many Tasks possui API aberta e conectores para os principais sistemas de gestão de clínicas do mercado. Se você utiliza um sistema que ainda não temos integração nativa, nossa equipe de desenvolvimento pode criar uma conexão personalizada."
    },
    {
      pergunta: "Como é feito o treinamento do agente para o perfil da minha clínica?",
      resposta: "Desenvolvemos um processo de personalização onde coletamos informações sobre protocolos de atendimento, tipos de serviços oferecidos, regras de agenda e tom de comunicação preferido. O agente é então ajustado para refletir a identidade e os procedimentos específicos da sua clínica."
    },
    {
      pergunta: "Como garantir a privacidade dos dados dos pacientes?",
      resposta: "O Many Tasks é 100% compatível com a LGPD. Utilizamos criptografia de ponta a ponta, armazenamento seguro em servidores no Brasil e processos rigorosos de acesso a dados. Além disso, fornecemos toda a documentação necessária para conformidade legal da sua operação."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-neutral-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-neutral-dark">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            Tire suas dúvidas sobre o Many Tasks
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-4 border-b border-neutral-background pb-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className="flex justify-between items-center w-full text-left py-4 px-2 focus:outline-none"
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
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-2 pb-4 text-neutral-dark/80">
                  {faq.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="mb-4 text-neutral-dark/70">
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
