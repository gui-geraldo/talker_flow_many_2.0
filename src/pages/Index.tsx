
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ComoFuncionaSection from '@/components/ComoFuncionaSection';
import DiferenciaisSection from '@/components/DiferenciaisSection';
import BeneficiosSection from '@/components/BeneficiosSection';
import DepoimentosSection from '@/components/DepoimentosSection';
import PlanosSection from '@/components/PlanosSection';
import FaqSection from '@/components/FaqSection';
import ContatoSection from '@/components/ContatoSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Atualizando metadados da página para SEO
  document.title = "Many Tasks | Agente de IA para Agendamento Médico";
  document.querySelector('meta[name="description"]')?.setAttribute(
    "content", 
    "Automatize agendamentos médicos 24/7 via WhatsApp. Reduza faltas em até 40% e libere sua equipe. Integração simples com seu sistema atual."
  );

  // Schema.org para SEO
  React.useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Many Tasks Agente de Agendamento",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "497.00",
        "priceCurrency": "BRL"
      },
      "provider": {
        "@type": "LocalBusiness",
        "name": "Many Tasks",
        "email": "contato@manytasks.com.br",
        "telephone": "+5521988013301",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BR"
        }
      }
    };
    
    // Adiciona o schema ao head
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(schema);
    document.head.appendChild(scriptTag);
    
    return () => {
      document.head.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
      <Header />
      <main className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="fixed -z-10 top-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="fixed -z-10 bottom-1/2 right-0 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl"></div>
        
        <HeroSection />
        <ComoFuncionaSection />
        <DiferenciaisSection />
        <BeneficiosSection />
        <DepoimentosSection />
        <PlanosSection />
        <FaqSection />
        <ContatoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
