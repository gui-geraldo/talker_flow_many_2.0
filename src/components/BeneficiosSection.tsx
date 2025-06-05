import React from 'react';
import { CheckCircle, TrendingUp, DollarSign } from 'lucide-react';

const BeneficiosSection: React.FC = () => {
  const beneficios = [
    {
      title: "menos tempo em tarefas repetitivas",
      value: "70%",
      description: "Reduza drasticamente o tempo gasto com triagens, agendamentos repetitivos e dúvidas frequentes",
      icon: CheckCircle,
      color: "text-secondary"
    },
    {
      title: "de aumento na conversão de leads",
      value: "25%",
      description: "Resposta em segundos e abordagem inteligente fecham mais vendas e marca mais agendamentos.",
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      title: "que fecham a mais, pagam a operação",
      value: "3 clientes",
      description: "Se apenas 3 clientes a mais fecharem por mês, seu investimento já está pago.",
      icon: DollarSign,
      color: "text-purple-500"
    }
  ];

  return (
    <section id="beneficios" className="pt-8 pb-4 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-neutral-dark">
            Benefícios Quantificáveis
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {beneficios.map((item, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-xl border border-neutral-background animate-fade-in hover:shadow-md hover:scale-[1.02] transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-background">
                  <item.icon className={item.color} size={32} />
                </div>
              </div>
              <h3 className="text-5xl font-extrabold mb-2 text-neutral-dark">
                {item.value}
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
