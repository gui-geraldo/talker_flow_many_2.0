import React from 'react';
import { Calendar, MessageSquare, Target, RefreshCcw, Shield, TrendingUp } from 'lucide-react';

const ComoFuncionaSection: React.FC = () => {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-neutral-dark mb-4">
            Duas soluções, resultados imediatos
          </h2>
          <p className="text-xl text-neutral-dark/70 max-w-2xl mx-auto">
            Escolha a ferramenta ideal para cada momento da jornada do seu cliente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Talker Flow Lead */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 border border-blue-200 backdrop-blur-sm transform transition-transform duration-300 hover:-translate-y-2 shadow-md">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="h-8 w-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-blue-900">Talker Flow Lead</h3>
            </div>

            <h4 className="text-xl font-semibold text-blue-700 mb-4">
              "A primeira impressão é a que fica"
            </h4>

            <p className="text-blue-800 mb-2 font-medium">
              Transforme cada interação em um momento UAU
            </p>

            <p className="text-blue-900/80 mb-6">
              SDR automatizado que atende seus leads via WhatsApp, qualifica interessados,
              agenda reuniões no seu calendário e até fecha vendas. Sua primeira impressão
              será sempre perfeita.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-blue-600 mt-1" />
                <span className="text-blue-900">Resposta imediata para leads, 24 × 7</span>
              </div>
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-blue-600 mt-1" />
                <span className="text-blue-900">Qualificação inteligente que filtra oportunidades</span>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                <span className="text-blue-900">Agendamento automático direto na sua agenda</span>
              </div>
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
                <span className="text-blue-900">Capacidade de fechar vendas automaticamente</span>
              </div>
            </div>
          </div>

          {/* Talker Flow Loop */}
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-8 border border-purple-200 backdrop-blur-sm transform transition-transform duration-300 hover:-translate-y-2 shadow-md">
            <div className="flex items-center space-x-3 mb-6">
              <RefreshCcw className="h-8 w-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-purple-900">Talker Flow Loop</h3>
            </div>

            <h4 className="text-xl font-semibold text-purple-700 mb-4">
              "Seu cliente nunca mais fica sem resposta."
            </h4>

            <p className="text-purple-900/80 mb-6">
              Assistente de suporte e pós-venda que responde dúvidas frequentes,
              envia tutoriais, informa status de pedidos e muito mais — tudo de forma
              automática, 24 horas por dia.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-purple-600 mt-1" />
                <span className="text-purple-900">FAQs, tutoriais e status de pedido em tempo real</span>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-purple-600 mt-1" />
                <span className="text-purple-900">Libera o time humano para casos complexos</span>
              </div>
              <div className="flex items-start space-x-3">
                <RefreshCcw className="h-5 w-5 text-purple-600 mt-1" />
                <span className="text-purple-900">Ciclo contínuo de atendimento e suporte</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFuncionaSection;