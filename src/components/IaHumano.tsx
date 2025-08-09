// src/components/IaHumano.tsx
import React, { useEffect, useRef, useState } from "react";

// ✅ Se preferir usar a pasta "public", troque para src="/images/..." no <img>
import IconHumano from "@/assets/humano.png"; // coloque seu PNG em src/assets/humano.png
import IconIa from "@/assets/ia.png";         // e seu PNG em src/assets/ia.png

const IaHumano: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasInteracted = useRef(false);

  // true = IA (knob à direita, trilho verde) | false = Humano (knob à esquerda, trilho branco)
  const [isIA, setIsIA] = useState(true);

  // Anima quando a seção entra na viewport: IA (direita) -> Humano (esquerda)
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasInteracted.current) {
          setIsIA(false); // desliza p/ esquerda + trilho branco
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
        {/* fileira de ícones + toggle */}
        <div className="mx-auto grid max-w-4xl grid-cols-3 items-center gap-8 md:gap-12 mb-10">
          {/* seu ícone do atendente */}
          <div className="flex justify-center">
            <img
              src={IconHumano}
              alt="Atendente humano"
              className="w-24 h-24 object-contain opacity-90"
              draggable={false}
            />
          </div>

          {/* Toggle HUMANO ↔ IA (clicável + teclado + anima no scroll) */}
          <div className="flex flex-col items-center">
            <div className="mb-3 text-sm font-medium text-slate-600 uppercase tracking-wide">
              Humano &nbsp;&nbsp;|&nbsp;&nbsp; IA
            </div>

            {/* Track */}
            <div
              className={[
                // alongado: w-48 (192px) | alto: h-16 | borda arredondada
                "relative h-16 w-48 rounded-full border transition-colors duration-500 cursor-pointer select-none outline-none",
                isIA ? "bg-emerald-500 border-emerald-500" : "bg-white border-slate-300",
              ].join(" ")}
              role="switch"
              aria-checked={isIA}
              tabIndex={0}
              onClick={toggle}
              onKeyDown={onKey}
              aria-label="Alternar entre Humano e IA"
            >
              {/* trilho interno opcional para dar “smartphone vibe” */}
              <div
                className={[
                  "absolute inset-1 rounded-full transition-colors duration-500",
                  isIA ? "bg-emerald-400/30" : "bg-slate-100",
                ].join(" ")}
              />

              {/* Knob */}
              <div
                className={[
                  "absolute top-2 left-2 h-12 w-12 rounded-full bg-white shadow transition-transform duration-500 will-change-transform",
                  isIA ? "translate-x-16 md:translate-x-20" : "translate-x-0",
                ].join(" ")}
              />
            </div>

            {/* label dinâmico (opcional) */}
            <div className="mt-2 text-xs text-slate-500">
              {isIA ? "IA ativa" : "Humano ativo"}
            </div>
          </div>

          {/* seu ícone da IA */}
          <div className="flex justify-center">
            <img
              src={IconIa}
              alt="IA"
              className="w-24 h-24 object-contain opacity-90"
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
