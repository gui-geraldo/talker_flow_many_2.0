
import React from 'react';
import { Calendar, MessageSquare, Bell } from 'lucide-react';

const ComoFuncionaSection: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: "Clínica envia horários disponíveis",
      description: "Basta informar os horários disponíveis dos profissionais da clínica e o sistema está pronto para gerenciar automaticamente.",
      icon: Calendar,
      color: "bg-blue-100"
    },
    {
      id: 2,
      title: "Agente conversa com pacientes",
      description: "O agente de IA conversa naturalmente com os pacientes, confirma dados e registra o agendamento no sistema automaticamente.",
      icon: MessageSquare,
      color: "bg-purple-100"
    },
    {
      id: 3,
      title: "Lembretes reduzem faltas em até 40%",
      description: "Sistema envia lembretes automáticos, confirma presença e reagenda em caso de cancelamentos, reduzindo significativamente as faltas.",
      icon: Bell,
      color: "bg-green-100"
    }
  ];

  return (
    <section id="como-funciona" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-neutral-dark">
            Como Funciona
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            Do agendamento manual à liberdade total em apenas três passos simples
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-neutral-background rounded-xl p-6 shadow-sm animate-fade-in card-hover">
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mr-4`}>
                  <step.icon className="text-primary" size={24} />
                </div>
                <span className="text-4xl font-extrabold text-primary">
                  {step.id}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-dark">
                {step.title}
              </h3>
              <p className="text-neutral-dark/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#diferenciais" className="text-primary font-semibold inline-flex items-center">
            Conheça nossos diferenciais
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComoFuncionaSection;
