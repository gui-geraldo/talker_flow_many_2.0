import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Clock, Mic, CheckCheck, Pause, Play, Signal, Wifi, BatteryFull } from 'lucide-react';

// Main App component
const App = () => {
  return (
    <div className="font-sans">
      <HeroSection />
    </div>
  );
};

const HeroSection: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [chatProgress, setCharProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(error => console.error("Error playing audio:", error));
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const heroSectionElement = document.getElementById('hero-section');
      if (heroSectionElement) {
        const sectionTop = heroSectionElement.offsetTop;
        const sectionHeight = heroSectionElement.offsetHeight;
        const scrollInSection = position - sectionTop;
        const progress = Math.max(0, Math.min(100, (scrollInSection / (sectionHeight * 0.6)) * 100));
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

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const messages = [
    { sender: 'client', text: 'Oi! Quero agendar uma consulta', time: '14:00' },
    { sender: 'agent', text: `Olá! Tudo bem? Eu sou a Isabela, aqui da Integral Care.\nÉ a sua primeira consulta com a gente?`, time: '14:01' },
    { sender: 'client', text: 'Sim, primeira vez. Tem horário pra sexta?', time: '14:01' },
    { sender: 'agent', text: 'Legal! Tenho horário com o Dr. Paulo na sexta às 16h ou 17:15. Qual horário prefere? :)', time: '14:02' },
    { sender: 'client', text: '', time: '14:02', audio: true, audioSrc: '/sample/Sample_Audio_Whatsapp.mp3' },
    { sender: 'agent', text: 'Sim, sexta é uma correria mesmo Marcela! Vamos de manhã, tenho na terça às 9h ou 11:15h. Qual fica melhor?', time: '14:03' },
    { sender: 'client', text: '11:15 fica bom', time: '14:03' },
    { sender: 'agent', text: 'Fechado! Me manda seu nome completo por favor, e o seu email tb', time: '14:04' },
    { sender: 'client', text: 'Marcela da Silva\nnm.silva@gmail.com', time: '14:04' },
    { sender: 'agent', text: 'Fechado Marcela, já coloquei na agenda do Dr.!', time: '14:05' },
    {
      sender: 'agent',
      text: `<strong>Consulta Agendada!</strong>\n\n<strong>Data:</strong> 05/Ago - Terça\n<strong>Horário:</strong> 11:15\n<strong>Nome:</strong> Marcela da Silva\n<strong>Email:</strong> m.silva@gmail.com\n\n<strong>Nosso Endereço:</strong>\nAv. Paulista 534, São Paulo\nMenos de 5 min da estação Trianon MASP`,      time: '14:05'
    },
    { sender: 'client', text: 'Blz! Obrigada', time: '14:06' },
    { sender: 'agent', text: 'Magina, foi um prazer\nAté logo :)', time: '14:06' }
  ];

  return (
    <section id="hero-section" className="pt-28 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-neutral-100 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-800 mb-6">
              Seu cliente atendido na <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">hora em que precisa</span>, sempre.
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Conversas inteligentes no WhatsApp que qualificam leads, resolvem dúvidas e constroem relações de confiança em diálogos humanos, 24 horas por dia.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#como-funciona" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                <span>Como Funciona</span> <CheckCheck size={18} />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 bg-white/50 p-4 rounded-xl border border-blue-500/10">
              <div className="flex items-center">
                <MessageSquare className="text-blue-600 mr-2" size={20} />
                <span className="text-sm font-medium text-gray-700">Responde até 1.000 mensagens por minuto</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-blue-600 mr-2" size={20} />
                <span className="text-sm font-medium text-gray-700">Conversação 24/7 via WhatsApp</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-500/10 rounded-full"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-purple-500/10 rounded-full"></div>

              <div className="relative mx-auto border-gray-800 bg-black border-[14px] rounded-[2.5rem] h-[540px] w-[260px] md:h-[640px] md:w-[310px] shadow-xl overflow-hidden scale-[1.00]">
                <div className="absolute top-0 left-0 w-full px-4 pt-1 flex justify-between text-white text-xs font-normal z-40">
                  <span>09:41</span>
                  <div className="flex gap-1 items-center">
                    <Signal size={14} />
                    <Wifi size={14} />
                    <BatteryFull size={14} />
                  </div>
                </div>
                <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
                  <div className="h-5 w-28 mx-auto mt-[-2px] rounded-b-2xl bg-black"></div>
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
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/40x40/E0E0E0/757575?text=Error')} 
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Marcela Paciente</p>
                      <p className="text-xs text-white/80">Online</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col h-[calc(100%-100px)] bg-[#ece5dd]">
                  <div ref={chatRef} className="flex-1 overflow-y-auto space-y-4 p-4" style={{ scrollbarWidth: 'none', scrollBehavior: 'smooth' }}>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`px-3 py-1.5 rounded-lg max-w-[80%] shadow-sm whitespace-pre-line ${msg.sender === 'client' ? 'bg-white rounded-tl-none self-start' : 'bg-[#d9fdd3] rounded-tr-none self-end ml-auto'}`}
                      >
                        {msg.audio && msg.audioSrc ? (
                          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 cursor-pointer" onClick={toggleAudio}>
                            {isPlaying ? <Pause size={18} className="text-gray-600" /> : <Play size={18} className="text-gray-600" />}
                            <div className="w-32 h-1 bg-gray-300 rounded-full relative">
                              <div className="absolute top-0 left-0 h-1 bg-gray-500 rounded-full" style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-500">{formatTime(currentTime)}/{formatTime(duration)}</span>
                            <audio ref={audioRef} src={msg.audioSrc} className="hidden"></audio>
                          </div>
                        ) : (
                          msg.text.includes('<strong>') ? 
                          <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text }}></p> :
                          <p className="text-sm">{msg.text}</p>
                        )}
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <p className="text-[10px] text-gray-500">{msg.time}</p>
                          {msg.sender === 'agent' && <CheckCheck size={12} className="text-[#34b7f1]" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center bg-[#f0f2f5] p-2 border-t border-gray-200">
                    <div className="w-full h-10 bg-white rounded-full px-4 flex items-center text-sm text-gray-400">
                      Digite uma mensagem...
                    </div>
                    <Mic size={24} className="text-gray-500 ml-2 cursor-pointer" />
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

export default App;
