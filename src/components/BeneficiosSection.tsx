
import React from 'react';
import { ArrowDown, ArrowUp, Clock } from 'lucide-react';

const BeneficiosSection: React.FC = () => {
  const beneficios = [
    {
      title: "Tempo de secretárias em triagem",
      value: "70%",
      description: "Redução no tempo gasto em atendimentos de agendamento",
      icon: ArrowDown,
      color: "text-secondary"
    },
    {
      title: "Aumento na ocupação de agenda",
      value: "25%",
      description: "Mais consultas agendadas, menos horários ociosos",
      icon: ArrowUp,
      color: "text-primary"
    },
    {
      title: "Retorno do investimento",
      value: "3",
      description: "Meses, em média, para recuperar o investimento",
      icon: Clock,
      color: "text-purple-500"
    }
  ];

  return (
    <section id="beneficios" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-neutral-dark">
            Benefícios Quantificados
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            Resultados reais de clínicas que já usam o Many Tasks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {beneficios.map((item, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-xl border border-neutral-background animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-background">
                  <item.icon className={item.color} size={32} />
                </div>
              </div>
              <h3 className="text-5xl font-extrabold mb-2 text-neutral-dark">
                {item.value}
                {item.title.includes("meses") ? <span className="text-lg ml-1">meses</span> : <span className="text-lg">%</span>}
              </h3>
              <p className="text-lg font-medium mb-2">{item.title}</p>
              <p className="text-neutral-dark/70">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Já pensou em quantas horas sua equipe economizaria todo mês?
          </h3>
          <a href="#contato" className="btn-primary inline-block">
            Calcule sua economia
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeneficiosSection;
