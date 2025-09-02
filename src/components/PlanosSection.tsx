import React from 'react';
import { Check, X, Star } from 'lucide-react';

const PlanosSection: React.FC = () => {
  const planos = [
    { id: 'starter', nome: 'Starter', destaque: false, preco: null, periodo: '/mês' },
    { id: 'essencial', nome: 'Essencial', destaque: false, preco: 'R$ 599', periodo: '/mês' },
    { id: 'pro', nome: 'Pro', destaque: true, preco: 'R$ 799', periodo: '/mês' },
  ] as const;

  const atributos = [
    { nome: 'Mensagens da IA por contato', valores: { starter: '15 por número', essencial: '50 por número', pro: 'Infinito' } },
    { nome: 'Ouve áudios', valores: { starter: 'Não', essencial: 'Sim', pro: 'Sim' } },
    { nome: 'Usuários', valores: { starter: '1', essencial: '5', pro: '15' } },
    { nome: 'WhatsApps conectados', valores: { starter: '1', essencial: '3', pro: '8' } },
    { nome: 'Automações, equipes e macros', valores: { starter: 'Desativado', essencial: 'Rótulos e Automações', pro: 'Tudo ativado' } },
    { nome: 'IA do atendente', valores: { starter: 'Desativado', essencial: 'Ativado', pro: 'Ativado' } },
    { nome: 'Atendimento multilíngue', valores: { starter: 'Só Português', essencial: '24 Idiomas', pro: '24 Idiomas' } },
    { nome: 'Limite de mensagens', valores: { starter: '5.000', essencial: '20.000', pro: 'Infinito' } },
  ] as const;

  const renderValor = (valor: string, destacado?: boolean) => {
    const v = valor.trim().toLowerCase();
    if (v === 'sim') {
      return (
        <span className="inline-flex items-center gap-2">
          <Check className={`h-5 w-5 ${destacado ? 'text-blue-600' : 'text-green-600'}`} />
          <span>Sim</span>
        </span>
      );
    }
    if (v === 'não' || v === 'nao' || v === 'não ') {
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
        {/* Título */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-neutral-900 mb-3">Planos e Preços</h2>
          <p className="text-lg text-neutral-600">Compare os recursos e escolha o melhor para a sua clínica</p>
        </div>

        {/* Tabela */}
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="rounded-2xl border border-neutral-200 shadow-sm bg-white">
            <table className="min-w-full">
              {/* Cabeçalho com nomes e preços, estilizados como os cards */}
              <thead>
                <tr className="align-top">
                  <th className="w-1/3 px-6 py-6 text-left text-sm font-semibold text-neutral-700">
                    Atributo
                  </th>

                  {planos.map((p) => (
                    <th key={p.id} className="px-6 py-6 text-left">
                      <div
                        className={`relative rounded-xl border px-6 py-5 ${
                          p.destaque
                            ? 'bg-gradient-to-br from-white via-blue-50 to-blue-100 border-blue-200 shadow-md'
                            : 'bg-white border-neutral-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-bold text-neutral-900">{p.nome}</h3>
                          {p.destaque && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full shadow">
                              <Star className="h-3.5 w-3.5" />
                              Mais Popular
                            </span>
                          )}
                        </div>

                        {p.preco && (
                          <div className="mt-2 flex items-baseline gap-2">
                            <span className={`text-3xl font-extrabold ${p.destaque ? 'text-blue-600' : 'text-neutral-900'}`}>
                              {p.preco}
                            </span>
                            <span className="text-neutral-500 text-sm">{p.periodo}</span>
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {atributos.map((attr, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                    <td className="px-6 py-4 text-sm font-medium text-neutral-800 sticky left-0 bg-inherit">
                      {attr.nome}
                    </td>

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
                <tr>
                  <td className="px-6 py-6" />
                  {planos.map((p) => (
                    <td key={p.id} className="px-6 py-6">
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

          {/* Nota de usabilidade em mobile (rolagem) */}
          <div className="mt-2 text-xs text-neutral-400 text-center">
            Arraste horizontalmente para ver todos os planos em telas menores.
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanosSection;