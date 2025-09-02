import React from 'react';
import { Check, X, Star } from 'lucide-react';

const PlanosSection: React.FC = () => {
  const planos = [
    { id: 'starter', nome: 'Starter', destaque: false },
    { id: 'essencial', nome: 'Essencial', destaque: false },
    { id: 'pro', nome: 'Pro', destaque: true }, // destaque visual
  ] as const;

  const atributos = [
    {
      nome: 'Mensagens da IA por contato',
      valores: { starter: '15 por número', essencial: '50 por número', pro: 'Infinito' },
    },
    {
      nome: 'Ouve Áudios',
      valores: { starter: 'Não', essencial: 'Sim', pro: 'Sim' },
    },
    {
      nome: 'Usuários',
      valores: { starter: '1', essencial: '5', pro: '15' },
    },
    {
      nome: 'Whatsapps Conectados',
      valores: { starter: '1', essencial: '3', pro: '8' },
    },
    {
      nome: 'Automações, Equipes e Macros',
      valores: { starter: 'Desativado', essencial: 'Rótulos e Automações', pro: 'Tudo ativado' },
    },
    {
      nome: 'IA do atendente',
      valores: { starter: 'Desativado', essencial: 'Ativado', pro: 'Ativado' },
    },
    {
      nome: 'Atendimento Múltilingua',
      valores: { starter: 'Só Português', essencial: '24 Idiomas', pro: '24 Idiomas' },
    },
    {
      nome: 'Limite de mensagens',
      valores: { starter: '5.000', essencial: '20.000', pro: 'Infinito' },
    },
  ] as const;

  const renderValor = (valor: string, isHeaderHighlighted?: boolean) => {
    if (valor.toLowerCase() === 'sim') {
      return (
        <span className="inline-flex items-center gap-2">
          <Check className={`h-5 w-5 ${isHeaderHighlighted ? 'text-blue-600' : 'text-green-600'}`} />
          <span>Sim</span>
        </span>
      );
    }
    if (valor.toLowerCase() === 'não' || valor.toLowerCase() === 'nao') {
      return (
        <span className="inline-flex items-center gap-2">
          <X className="h-5 w-5 text-rose-500" />
          <span>Não</span>
        </span>
      );
    }
    return <span>{valor}</span>;
  };

  return (
    <section id="planos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-4xl font-bold text-neutral-900 mb-3">Planos e Preços</h2>
          <p className="text-lg text-neutral-600">Compare os recursos e escolha o melhor para a sua clínica</p>
        </div>

        <div className="max-w-6xl mx-auto overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="w-1/3 text-left text-sm font-semibold text-neutral-700 px-6 py-4">
                  Atributo
                </th>
                {planos.map((p) => (
                  <th key={p.id} scope="col" className="text-left text-sm font-semibold px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-2 text-neutral-900 ${
                        p.destaque ? 'text-blue-700' : ''
                      }`}
                    >
                      <span className="text-base">{p.nome}</span>
                      {p.destaque && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full">
                          <Star className="h-3.5 w-3.5" />
                          Mais Popular
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {atributos.map((attr, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                  <td className="px-6 py-4 text-sm font-medium text-neutral-800">{attr.nome}</td>
                  {planos.map((p) => (
                    <td
                      key={p.id}
                      className={`px-6 py-4 text-sm ${
                        p.destaque
                          ? 'bg-gradient-to-br from-white via-blue-50 to-blue-100'
                          : 'bg-transparent'
                      }`}
                    >
                      {renderValor((attr.valores as any)[p.id], p.destaque)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* CTA */}
              <tr className="bg-white">
                <td className="px-6 py-5" />
                {planos.map((p) => (
                  <td key={p.id} className="px-6 py-5">
                    <a
                      href="#contato"
                      className={`inline-flex w-full justify-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 text-center ${
                        p.destaque
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                          : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                      }`}
                    >
                      Contratar
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Observações / ajuda de conversão */}
        <p className="max-w-6xl mx-auto text-sm text-neutral-500 mt-4 px-1">
          • Quando “Ouve Áudios” estiver como “Não”, o sistema deve responder automaticamente: “puxa, não posso ouvir áudio”.
        </p>
      </div>
    </section>
  );
};

export default PlanosSection;