import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Clock, Mic, CheckCheck } from 'lucide-react';

const HeroSection: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [chatProgress, setCharProgress] = useState(0);
  const [chatScrolled, setChatScrolled] = useState(false);

  const playAudio = () => {
    const audio = document.getElementById('patientAudio') as HTMLAudioElement;
    if (audio) audio.play();
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (!heroSection || !chatRef.current) return;

      const sectionTop = heroSection.offsetTop;
      const sectionHeight = heroSection.offsetHeight;
      const scrollY = window.scrollY;

      const scrollInSection = scrollY - sectionTop;
      const maxChatScroll = chatRef.current.scrollHeight - chatRef.current.clientHeight;

      if (!chatScrolled) {
        const progress = Math.max(
          0,
          Math.min(100, (scrollInSection / (sectionHeight * 0.6)) * 100)
        );
        setCharProgress(progress);

        const scrollTo = (maxChatScroll * progress) / 100;
        chatRef.current.scrollTop = scrollTo;

        if (progress >= 100) {
          setChatScrolled(true);
        }

        if (scrollInSection > 0) {
          window.scrollTo({ top: sectionTop });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chatScrolled]);

  return (
    <section
      id="hero-section"
      className="pt-28 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-neutral-background to-blue-50"
    >
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-extrabold leading-tight text-neutral-dark mb-6">
              Agendamentos 100% automáticos,{' '}
              <span className="text-primary">24h por dia.</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-dark/80 mb-8">
              O Many Tasks cuida da agenda, você cuida dos pacientes.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#contato"
                className="btn-primary rounded-full flex items-center gap-2 shadow-lg hover:shadow-primary/30"
              >
                <span>Solicitar Demonstração</span> <CheckCheck size={18} />
              </a>
              <a
                href="#como-funciona"
                className="btn-outline rounded-full border-2 hover:bg-primary/5"
              >
                Como Funciona
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 bg-white/50 p-4 rounded-xl border border-primary/10">
              <div className="flex items-center">
                <MessageSquare className="text-primary mr-2" size={20} />
                <span className="text-sm font-medium">
                  Responde até 1.000 mensagens por minuto
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="text-primary mr-2" size={20} />
                <span className="text-sm font-medium">
                  Conversação 24/7 via WhatsApp
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary/10 rounded-full"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-secondary/10 rounded-full"></div>

              <div className="relative mx-auto border-gray-800 bg-black border-[14px] rounded-[2.5rem] h-[640px] w-[300px] shadow-xl overflow-hidden">
                <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
                  <div className="h-6 w-40 mx-auto mt-[-2px] rounded-b-3xl bg-black"></div>
                </div>
                <div className="absolute left-[-14px] top-[80px] h-[32px] w-[3px] bg-gray-700 rounded-l-lg"></div>
                <div className="absolute right-[-14px] top-[150px] h-[32px] w-[3px] bg-gray-700 rounded-r-lg"></div>
                <div className="relative z-20 flex justify-between items-center pt-6 pb-3 px-4 bg-[#075E54] text-white">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                      <img
                        src="/Whats_Profile_Photo.jpg"
                        alt="Fernanda avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Fernanda Paciente</p>
                      <p className="text-xs text-white/80">Online</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-full bg-[#ece5dd]">
                  <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto space-y-4 p-4"
                    style={{ scrollbarWidth: 'none', scrollBehavior: 'smooth' }}
                  >
                    <div className="bg-white pt-3 pb-1 px-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
                      <p className="text-sm">Oi! Quro agendar uma consulta</p>
                      <p className="text-[10px] text-gray-500 text-right">10:30</p>
                    </div>
                    <div className="bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%] shadow-sm">
                      <p className="text-sm">
                        Olá! Tudo bem? Eu sou a Marcela, aqui da Clínica Integral Care.<br />
                        Me conte, é sua primeira consulta com a gente?
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <p className="text-[10px] text-gray-500">10:31</p>
                        <CheckCheck size={12} className="text-[#34b7f1]" />
                      </div>
                    </div>
                    <div className="bg-white pt-3 pb-1 px-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
                      <p className="text-sm">Sim, primeira vez. Tem pra sexta?</p>
                      <p className="text-[10px] text-gray-500 text-right">10:32</p>
                    </div>
                    <div className="bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%] shadow-sm">
                      <p className="text-sm">
                        Legal! Tenho horário com o Dr. Paulo na sexta às 16h ou 17:15. Qual horário prefere?
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <p className="text-[10px] text-gray-500">10:32</p>
                        <CheckCheck size={12} className="text-[#34b7f1]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center bg-[#f0f2f5] p-2 border-t border-gray-200">
                    <div className="w-full h-10 bg-white rounded-full px-4 flex items-center text-sm text-gray-400">
                      Digite uma mensagem...
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
