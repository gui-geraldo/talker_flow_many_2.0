import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const DepoimentosSection: React.FC = () => {
  const depoimentos = [
    {
      nome: "Dr. Carlos Silva",
      especialidade: "Dentista",
      cidade: "São Paulo",
      foto: "/testimonial_icon/carlos-silva.jpg",
      texto: "Passamos de 4 horas diárias no telefone para quase zero. O agente de IA até consegue encaixar pacientes de última hora quando há cancelamentos."
    },
    {
      nome: "Dra. Marta Ribeiro",
      especialidade: "Implantodontia",
      cidade: "Manaus",
      foto: "/testimonial_icon/marta-ribeiro.jpg",
      texto: "Impressionante como simplesmente não há fila. O paciente manda mensagem 14:00, às 14:01 ele é atendido e em 5 minutos a consulta está marcada."
    },
    {
      nome: "Dr. Paulo Mendes",
      especialidade: "Clínico Geral",
      cidade: "Belo Horizonte",
      foto: "/testimonial_icon/paulo-mendes.jpg",
      texto: "Já tive um paciente que agendou consulta às 3 da manhã de um domingo. Quando acordei vi a notificação de agendamento confirmado. Se não fosse pela automação, com certeza teria agendado com outra clínica."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextDepoimento = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % depoimentos.length);
  };

  const prevDepoimento = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + depoimentos.length) % depoimentos.length);
  };

  return (
    <section className="section-padding bg-neutral-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-neutral-dark">
            O que dizem nossos clientes
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            Depoimentos de clínicas que já transformaram seu agendamento
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {depoimentos.map((depoimento, index) => (
                <div key={index} className="w-full flex-shrink-0 p-4">
                  <div className="bg-white p-8 rounded-xl shadow-sm">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-neutral-background overflow-hidden mr-4">
                        <img 
                          src={depoimento.foto} 
                          alt={depoimento.nome} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{depoimento.nome}</h4>
                        <p className="text-neutral-dark/70">
                          {depoimento.especialidade} • {depoimento.cidade}
                        </p>
                      </div>
                    </div>
                    <blockquote className="text-lg italic">
                      "{depoimento.texto}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="absolute top-1/2 -left-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-neutral-dark hover:text-primary transition-colors"
            onClick={prevDepoimento}
            aria-label="Depoimento anterior"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button 
            className="absolute top-1/2 -right-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-neutral-dark hover:text-primary transition-colors"
            onClick={nextDepoimento}
            aria-label="Próximo depoimento"
          >
            <ArrowRight size={20} />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {depoimentos.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-neutral-dark/20"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepoimentosSection;
