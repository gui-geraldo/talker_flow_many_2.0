mimport React from 'react';
import { Check, Star } from 'lucide-react';

const PlanosSection: React.FC = () => {
  const planos = [
    {
      nome: "Essencial",
      preco: "R$ 599",
      periodo: "/mês",
      destaque: false,
      recursos: [
        "Até 5.000 mensagens/mês",
        "Apenas português",
        "Reconhece apenas texto",
        "Até 3 usuários"
        "Atendente sem auxílio"
      ]
    },
    {
      nome: "Pro",
      preco: "R$ 799",
      periodo: "/mês",
      destaque: true,
      recursos: [
        "Mensagens ilimitadas",
        "24 idiomas",
        "Reconhece texto, áudio e emojis",
        "Até 10 usuários",
        "Assistente particular do atendente"
      ]
    }
  ];

  return (
    <section id="planos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Planos e Preços</h2>
          <p className="text-lg text-neutral-600">Escolha o plano ideal para o tamanho da sua clínica</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {planos.map((plano, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 border transition-all hover:shadow-xl hover:scale-[1.02] duration-300 ${
                plano.destaque
                  ? 'bg-gradient-to-br from-white via-blue-50 to-blue-100 border-blue-200 shadow-md'
                  : 'bg-white border-gray-200'
              }`}
            >
              {plano.destaque && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-1.5 rounded-full text-sm font-bold flex items-center space-x-1 shadow-md">
                  <Star className="h-4 w-4" />
                  <span>Mais Popular</span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plano.nome}</h3>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className={`text-4xl font-bold ${plano.destaque ? 'text-blue-600' : 'text-neutral-800'}`}>
                    {plano.preco}
                  </span>
                  <span className="text-neutral-500">{plano.periodo}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plano.recursos.map((recurso, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Check className={`h-5 w-5 mt-1 flex-shrink-0 ${plano.destaque ? 'text-blue-500' : 'text-green-500'}`} />
                    <span className="text-neutral-700">{recurso}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 ${
                  plano.destaque
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                    : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                }`}
              >
                Contratar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanosSection;
