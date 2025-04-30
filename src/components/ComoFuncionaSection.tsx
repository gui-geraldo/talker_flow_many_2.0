
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
      description: "O agente de conversação interage naturalmente com os pacientes, confirma dados e registra o agendamento no sistema automaticamente.",
      icon: MessageSquare,
      color: "bg-purple-100"
    },
    {
      id: 3,
      title: "Notificações para sua equipe",
      description: "Você e sua equipe são notificados de todas as consultas agendadas por email ou WhatsApp, da forma que preferir.",
      icon: Bell,
      color: "bg-green-100"
    }
  ];

  return (
    <section id="como-funciona" className="section-padding bg-gradient-to-b from-white to-blue-50/30">
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
            <div key={step.id} className="glass-effect rounded-xl p-6 shadow-lg animate-fade-in transform transition-all duration-300 hover:-translate-y-2">
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

        <div className="mt-16 p-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold mb-4 text-center">Libere sua equipe de tarefas repetitivas</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">Sua equipe perde tempo precioso respondendo perguntas repetitivas como:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-600 rounded-full p-1 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span>"Qual o endereço da clínica?"</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-600 rounded-full p-1 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span>"Quais horários estão disponíveis?"</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-600 rounded-full p-1 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span>"Atende convênio?"</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-600 rounded-full p-1 mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span>"Tem estacionamento?"</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-bold mb-3">Com o Many Tasks</h4>
                <p className="mb-4">Seu assistente automatizado responde a todas essas perguntas instantaneamente, enquanto sua equipe foca no que realmente importa: o cuidado com os pacientes.</p>
                <div className="flex items-center">
                  <span className="bg-white text-primary rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="font-medium">Economia de tempo</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="bg-white text-primary rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="font-medium">Disponível 24h por dia</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="bg-white text-primary rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="font-medium">Mais produtividade</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="#diferenciais" className="text-primary font-semibold inline-flex items-center hover:underline">
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
