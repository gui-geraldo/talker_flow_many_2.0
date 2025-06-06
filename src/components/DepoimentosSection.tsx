import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const DepoimentosSection: React.FC = () => {
  const depoimentos = [
    {
      nome: "Rodrigo",
      especialidade: "Consultoria de Marketing • São Paulo",
      cidade: "São Paulo",
      foto: "/testimonial_icon/carlos-marketing.webp",
      texto: "Meu comercial simplemente triplicou. O SDR da Talker Flow qualifica e filtra todos os leads em tempo real, e meu time comercial só entra em campo pra fechar os mais qualificados. Antes falavam com 20 leads frios pra fechar 2. Agora a IA fala com 100, qualifica 30 e fechamos 10."
    },
    {
      nome: "Paulo",
      especialidade: "Contador",
      cidade: "Belo Horizonte",
      foto: "/testimonial_icon/paulo-contador.webp",
      texto: "Já tive cliente que às 3:00 da manhã agendou uma reunião pra assinar o contrato no dia seguinte. Quando acordei vi confirmação do agendamento. Se não fosse pela Talker Flow, com certeza teria mandado mensagens pra mais 20 escritórios."
    },
    {
      nome: "Dra. Marta",
      especialidade: "Implantodontista",
      cidade: "Manaus",
      foto: "/testimonial_icon/marta-dentista.webp",
      texto: "Impressionante como simplesmente não há fila. O paciente manda mensagem 14:00, às 14:01 ele é atendido e em 5 minutos a consulta está marcada."
    },
    {
      nome: "Fernanda",
      especialidade: "Designer Gráfico",
      cidade: "São Paulo",
      foto: "/testimonial_icon/fernanda-designer.webp",
      texto: "Antes eu perdia horas do meu dia só respondendo mensagens de novos clientes, quase sempre com as mesmas  perguntas. Agora a Talker Flow faz tudo isso por mim. Quando o cliente chega até mim, já sabe o valor, o prazo e as vezes até já pagou! Eu só foco em criar."
    },
    {
      nome: "Guilherme",
      especialidade: "Gestor de Imobiliária",
      cidade: "São Paulo",
      foto: "/testimonial_icon/guilherme-imobiliaria.webp",
      texto: "Os corretores as vezes demoravam para responder, e o cliente ficava esperando e reclamava. Agora a Talker Flow responde eles na hora, apresenta algumas opções de imóveis, passa valores, condições de pagamento e localização. Quando o corretor entra na conversa o cliente já está quase decidido "
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
    <section className="bg-neutral-background pt-8 pb-4">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-neutral-dark">
            O que dizem nossos clientes
          </h2>
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
