import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// use seus PNGs
import IconHumano from "@/assets/humano.png";
import IconIa from "@/assets/ia.png";

const IaHumano: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const knobRef = useRef<HTMLDivElement | null>(null);
  const hasInteracted = useRef(false);

  // true = IA (knob à direita / trilho verde)
  const [isIA, setIsIA] = useState(true);
  const [translateRightPx, setTranslateRightPx] = useState(0);

  // mede a distância EXATA para o knob ir até a direita (sem parar no meio)
  const measure = () => {
    const track = trackRef.current;
    const knob = knobRef.current;
    if (!track || !knob) return;

    const trackRect = track.getBoundingClientRect();
    const knobRect = knob.getBoundingClientRect();

    // o knob começa com left: 8px (top-2 left-2) => padding visual do trilho
    const leftPadding = 8;
    const rightPadding = 8;

    const maxTranslate =
      trackRect.width - knobRect.width - leftPadding - rightPadding;

    setTranslateRightPx(Math.max(0, Math.round(maxTranslate)));
  };

  useLayoutEffect(() => {
    measure();
    // recalcula ao redimensionar
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // anima quando a seção entra na tela: direita (IA) -> esquerda (Humano)
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasInteracted.current) {
          setIsIA(false); // vai para a esquerda
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const toggle = () => {
    hasInteracted.current = true;
    setIsIA((v) => !v);
  };

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key.toLowerCase() === "enter") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <section id="ia-humano" ref={sectionRef} className="relative py-20 bg-slate-50">
      <div className="container mx-auto px-4">

        {/* === BARRA SUPERIOR (de volta) === */}
        <div className="mx-auto mb-12 w-full max-w-3xl">
          <div className="rounded-2xl bg-slate-900 text-slate-100 px-4 py-3 flex items-center gap-3 shadow-lg">
            <span className="inline-block w-4 h-4 rounded-full bg-slate-600" />
            <span className="inline-block w-4 h-4 rounded-full bg-slate-600" />
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

        {/* ÍCONES + TOGGLE */}
        <div className="mx-auto grid max-w-5xl grid-cols-3 items-center gap-10 md:gap-16 mb-10">
          {/* PNG do atendente — maior */}
          <div className="flex justify-center">
            <img
              src={IconHumano}
              alt="Atendente humano"
              className="w-32 h-32 md:w-40 md:h-40 object-contain opacity-90"
              draggable={false}
            />
          </div>

          {/* Toggle HUMANO ↔ IA — menor que antes e clicável */}
          <div className="flex flex-col items-center">
            <div className="mb-3 text-sm font-medium text-slate-600 uppercase tracking-wide">
              HUMANO &nbsp;&nbsp;|&nbsp;&nbsp; IA
            </div>

            {/* trilho (mais curto agora) */}
            <div
              ref={trackRef}
              className={[
                // ↓ largura menor (w-36 md:w-40), altura moderada (h-14)
                "relative h-14 w-36 md:w-40 rounded-full border transition-colors duration-300 cursor-pointer select-none outline-none",
                isIA ? "bg-emerald-500 border-emerald-500" : "bg-white border-slate-300",
              ].join(" ")}
              role="switch"
              aria-checked={isIA}
              tabIndex={0}
              onClick={toggle}
              onKeyDown={onKey}
              aria-label="Alternar entre Humano e IA"
            >
              {/* trilho interno opcional */}
              <div
                className={[
                  "absolute inset-1 rounded-full transition-colors duration-300",
                  isIA ? "bg-emerald-400/30" : "bg-slate-100",
                ].join(" ")}
              />

              {/* knob — agora movimentação em PX calculado (vai até o fim) */}
              <div
                ref={knobRef}
                className="absolute top-2 left-2 h-10 w-10 md:h-11 md:w-11 rounded-full bg-white shadow transition-transform duration-300 will-change-transform"
                style={{
                  transform: `translateX(${isIA ? translateRightPx : 0}px)`,
                }}
              />
            </div>

            <div className="mt-2 text-xs text-slate-500">
              {isIA ? "IA ativa" : "Humano ativo"}
            </div>
          </div>

          {/* PNG da IA — maior */}
          <div className="flex justify-center">
            <img
              src={IconIa}
              alt="IA"
              className="w-32 h-32 md:w-40 md:h-40 object-contain opacity-90"
              draggable={false}
            />
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
