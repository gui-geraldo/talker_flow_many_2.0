import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, Send } from 'lucide-react';
import Check from '@/components/Check';

const ContatoSection: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    whatsapp: '',
    email: '',
    comentario: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Enviar dados para o webhook do Make
    try {
      const response = await fetch('/api/enviar-formulario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }

    toast({
      title: "Solicitação enviada!",
      description: "Em breve entraremos em contato!",
    });

    // Redirecionamento para WhatsApp (simulado)
    const whatsappNumber = "5521988013301";
    const message = `Olá! Sou ${formData.nome} da ${formData.empresa} e gostaria de iniciar com a Talker Flow.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    toast({
      title: "Redirecionando para WhatsApp...",
      description: "Você será conectado com um consultor.",
    });

    // Reset do formulário
    setFormData({
      nome: '',
      empresa: '',
      whatsapp: '',
      email: '',
      comentario: ''
    });
  }

  return (
    <section id="contato" className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-neutral-dark relative inline-block">
            Ainda ficaram dúvidas?
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            Será um prazer conversar!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg glass-effect animate-fade-in">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="nome" className="block text-sm font-medium text-neutral-dark mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="empresa" className="block text-sm font-medium text-neutral-dark mb-2">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Nome da sua empresa"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="whatsapp" className="block text-sm font-medium text-neutral-dark mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="comentario" className="block text-sm font-medium text-neutral-dark mb-2">
                  Comentários (opcional)
                </label>
                <textarea
                  id="comentario"
                  name="comentario"
                  value={formData.comentario}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Conte-nos um pouco sobre sua empresa e suas necessidades"
                />
              </div>

              <button
                type="submit"
                className="w-full relative overflow-hidden group bg-gradient-to-r from-primary to-primary/80 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]"
              >
                <span>Quero automatizar meus agendamentos</span>
                <Send size={18} className="transition-all duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out]"></div>
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-neutral-dark">
                Transforme conversas em resultados!
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start card-modern p-3 pl-4">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Check className="text-fuchsia-500" size={16} />
                    </div>
                  </div>
                  <p className="mt-1">Funcionários focados no que realmente dá resultado
</p>
                </li>
                <li className="flex items-start card-modern p-3 pl-4">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Check className="text-primary" size={16} />
                    </div>
                  </div>
                  <p className="mt-1">Nunca mais perca contatos que chegam fora do horário comercial
                  </p>
                </li>
                <li className="flex items-start card-modern p-3 pl-4">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Check className="text-primary" size={16} />
                    </div>
                  </div>
                  <p className="mt-1">Atendimento 24h, como só as grandes empresas tem
</p>
                </li>
                <li className="flex items-start card-modern p-3 pl-4">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Check className="text-primary" size={16} />
                    </div>
                  </div>
                  <p className="mt-1">Padronização na comunicação com todos os clientes</p>
                </li>
              </ul>
            </div>

            <div className="space-y-4 glass-effect p-6 rounded-xl shadow-md">
              <div className="flex items-center hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Phone className="text-primary" size={20} />
                </div>
                <span>(11) 96601-3044</span>
              </div>
              <div className="flex items-center hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Mail className="text-primary" size={20} />
                </div>
                <span>contato@talkerflow.me</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContatoSection;
