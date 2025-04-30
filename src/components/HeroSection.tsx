import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Clock, Mic, CheckCheck } from 'lucide-react';

const HeroSection: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [chatProgress, setCharProgress] = useState(0);

  const playAudio = () => {
    const audio = document.getElementById('patientAudio') as HTMLAudioElement;
    if (audio) audio.play();
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const sectionTop = heroSection.offsetTop;
        const sectionHeight = heroSection.offsetHeight;
        const scrollInSection = position - sectionTop;
        const progress = Math.max(
          0,
          Math.min(100, (scrollInSection / (sectionHeight * 0.6)) * 100)
        );
        setCharProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      const maxScroll = chatRef.current.scrollHeight - chatRef.current.clientHeight;
      const scrollTo = (maxScroll * chatProgress) / 100;
      chatRef.current.scrollTop = scrollTo;
    }
  }, [chatProgress]);

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

              {/* Smartphone Frame */}
              <div className="relative mx-auto border-gray-800 bg-black border-[14px] rounded-[2.5rem] h-[640px] w-[300px] shadow-xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 z-10">
                  <div className="h-6 w-40 mx-auto rounded-b-3xl bg-black"></div>
                </div>

                {/* Volume Button */}
                <div className="absolute left-[-14px] top-[80px] h-[32px] w-[3px] bg-gray-700 rounded-l-lg"></div>
                {/* Power Button */}
                <div className="absolute right-[-14px] top-[150px] h-[32px] w-[3px] bg-gray-700 rounded-r-lg"></div>

                {/* WhatsApp Header */}
                <div className="flex justify-between items-center py-2 px-4 bg-[#075E54] text-white rounded-t-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                      <img
                        src="https://cdn.pixabay.com/photo/2021/01/17/09/11/woman-5924366_1280.jpg"
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

                {/* Chat Area */}
                <div className="flex flex-col h-full bg-[#ece5dd]">
                  <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto space-y-4 p-4"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {/* Mensagens */}
                    <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
                      <p className="text-sm">Olá! Gostaria de agendar uma consulta</p>
                      <p className="text-[10px] text-gray-500 text-right">10:30</p>
                    </div>

                    <div className="bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%] shadow-sm">
                      <p className="text-sm">
                        Olá! Tudo bem? Eu sou a Marcela, recepcionista aqui da Clínica Integral Care. Me conte, é sua primeira consulta com a gente?
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <p className="text-[10px] text-gray-500">10:31</p>
                        <CheckCheck size={12} className="text-[#34b7f1]" />
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
                      <p className="text-sm">
                        Sim, primeira vez. Tem pra sexta?
                      </p>
                      <p className="text-[10px] text-gray-500 text-right">10:32</p>
                    </div>

                    <div className="bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%] shadow-sm">
                      <p className="text-sm">
                        Temos disponibilidade com Dr. Paulo na sexta às 16h ou 17:15. Qual
                        horário prefere?
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <p className="text-[10px] text-gray-500">10:32</p>
                        <CheckCheck size={12} className="text-[#34b7f1]" />
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
                      <div
                        className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 cursor-pointer"
                        onClick={playAudio}
                      >
                        <Mic size={18} className="text-gray-600" />
                        <div className="w-32 h-1 bg-gray-300 rounded-full relative">
                          <div
                            className="absolute top-0 left-0 h-1 bg-gray-500 rounded-full"
                            style={{ width: '70%' }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">0:08</span>
                        <audio
                          id="patientAudio"
                          src="https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3"
                        ></audio>
                      </div>
                      <p className="text-[10px] text-gray-500 text-right mt-1">10:33</p>
                    </div>

                    <div className="bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%] shadow-sm">
                      <p className="text-sm">
                        Sim, esse horário é uma correria mesmo nas sextas! Pode ser de manhã sim sem problemas. De manhã vou ter na terça, às 9h ou 11:15h. Qual destes fica melhor?
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <p className="text-[10px] text-gray-500">10:34</p>
                        <CheckCheck size={12} className="text-[#34b7f1]" />
                      </div>
                    </div>
                  </div>

                  {/* Campo de digitação */}
                  <div className="flex items-center bg-[#f0f2f5] p-2 border-t border-gray-200">
                    <div className="w-full h-10 bg-white rounded-full px-4 flex items-center text-sm text-gray-400">
                      Digite uma mensagem...
                    </div>
                  </div>
                </div>

                {/* Botão Home */}
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
