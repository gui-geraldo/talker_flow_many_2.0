import React, { useEffect, useRef, useState } from "react";
import { UsersRound, Cpu, Volume2, Share2 } from "lucide-react";

/**
 * Seção "IA + Humano"
 * - Mostra os ícones (barra superior + equipe + toggle + chip IA)
 * - Texto igual ao da imagem
 * - Toggle HUMANO ↔ IA anima ao entrar em viewport: move da direita p/ esquerda e muda de cor
 */
const IaHumano: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animateToLeft, setAnimateToLeft] = useState(false);

  // Anima quando a seção entra na tela
  useEffect(() => {
    if (!sectionRef.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateToLeft(true); // direita -> esquerda
          // desliga depois de acionar uma vez
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="ia-humano"
      ref={sectionRef}
      className="relative py-20 bg-slate-50"
    >
      <div className="container mx-auto px-4">
        {/* Barra superior (decorativa, como no print) */}
        <div className="mx-auto mb-10 w-full max-w-3xl">
          <div className="rounded-2xl bg-slate-900 text-slate-100 px-4 py-3 flex items-center gap-3 shadow-lg">
            <Volume2 className="w-4 h-4 opacity-70" />
            <Share2 className="w-4 h-4 opacity-70" />
            <div className="ml-auto flex items-center gap-2">
              <button className="rounded-md bg-red-600/90 px-3 py-1.5 text-xs font-medium">
                Desativar IA
              </button>
              <button className="rounded-md bg-emerald-500/90 px-3 py-1.5 text-xs font-medium">
                Resolver
              </button>
            </div>
          </div>
        </div>

        {/* Ícones grandes + Toggle */}
        <div className="mx-auto grid max-w-4xl grid-cols-3 items-center gap-8 md:gap-12 mb-10">
          <div className="flex justify-center">
            <UsersRound className="w-24 h-24 text-slate-600" />
          </div>

          {/* Toggle HUMANO ↔ IA (anima no scroll) */}
          <div className="flex flex-col items-center">
            <div className="mb-3 text-sm font-medium text-slate-600 uppercase tracking-wide">
              Humano &nbsp;&nbsp;|&nbsp;&nbsp; IA
            </div>

            {/* Track */}
            <div
              className={[
                "relative h-14 w-28 rounded-full border transition-colors duration-700",
                animateToLeft ? "bg-white border-slate-300" : "bg-emerald-500 border-emerald-500"
              ].join(" ")}
              aria-label="Alternar entre Humano e IA (demonstração)"
              role="switch"
              aria-checked={!animateToLeft} // começa em IA (direita), move para Humano (esquerda)
            >
              {/* Knob */}
              <div
                className={[
                  "absolute top-1 left-1 h-12 w-12 rounded-full bg-white shadow transition-transform duration-700 will-change-transform",
                  animateToLeft ? "translate-x-0" : "translate-x-12"
                ].join(" ")}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Cpu className="w-24 h-24 text-slate-600" />
          </div>
        </div>

        {/* Texto principal */}
        <p className="mx-auto max-w-4xl text-center text-xl text-slate-700 mb-6">
          Tenha controle total sobre quem está interagindo com seu cliente, um
          atendente ou a IA. Intervenha a qualquer momento de forma simples.
        </p>

        <h2 className="mx-auto max-w-5xl text-center text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Time humano ou IA? Você escolhe em um clique!
        </h2>
      </div>
    </section>
  );
};

export default IaHumano;