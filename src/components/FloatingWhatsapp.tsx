// src/components/FloatingWhatsapp.tsx
import React, { useEffect, useRef, useState } from "react";

type Props = {
  phone?: string;                  // DDI + DDD + número. Ex: "5511999998888"
  message?: string;                // Mensagem padrão do WhatsApp
  webhookUrl?: string;             // URL do webhook
  side?: "right" | "left";         // Posição do botão
};

const FloatingWhatsapp: React.FC<Props> = ({
  phone = import.meta.env.VITE_WHATSAPP_PHONE as string,
  message = "Olá! Estava no site da talker Flow, e quero revolucionar o atendimento da minha empresa!"
  webhookUrl = "https://n8nwebhooks.talkerflow.me/webhook/f633b18c-d9a6-4d7a-8c5a-754901c25fa8",
  side = "right",
}) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [company, setCompany] = useState("");
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const phoneSanitized = (tel || phone || "").replace(/\D/g, "");

  const valid =
    name.trim().length >= 2 &&
    company.trim().length >= 2 &&
    /^\d{10,15}$/.test(phoneSanitized); // regra simples p/ telefone

  // Fecha com ESC e clique fora
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (dialogRef.current && e.target instanceof Node && !dialogRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onClick);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      phone: phoneSanitized,
      company: company.trim(),
      timestamp: new Date().toISOString(),
      page: typeof window !== "undefined" ? window.location.href : "",
      source: "floating-whatsapp",
    };

    try {
      // keepalive ajuda a não perder o POST caso a página mude logo depois
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
        // mode: "no-cors", // use apenas se o webhook bloquear CORS e você não precisar da resposta
      });
    } catch (err) {
      // segue mesmo se o webhook falhar — não bloqueamos o WhatsApp
      console.error("Webhook error:", err);
    } finally {
      // abre o WhatsApp com a mensagem (inclui nome/empresa no texto, se quiser)
      const msg = message || "";
      const composed =
        `Olá, sou ${name} da ${company}. ` + msg;
      const wa = `https://wa.me/${phoneSanitized}?text=${encodeURIComponent(composed)}`;
      window.open(wa, "_blank"); // nova aba
      setSubmitting(false);
      setOpen(false);
      // opcional: limpar
      setName(""); setTel(""); setCompany("");
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Falar pelo WhatsApp"
        className={[
          "fixed z-50 bottom-4 md:bottom-6",
          side === "right" ? "right-4 md:right-6" : "left-4 md:left-6",
          "h-14 w-14 md:h-16 md:w-16 rounded-full",
          "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30",
          "flex items-center justify-center",
          "hover:bg-emerald-600 active:scale-95",
          "transition-transform duration-200 focus:outline-none",
          "focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
        ].join(" ")}
      >
        {/* ícone svg do WhatsApp */}
        <svg viewBox="0 0 32 32" aria-hidden="true" className="w-7 h-7 md:w-8 md:h-8">
          <path fill="#fff" d="M19.11 17.82a5.57 5.57 0 0 1-2.38-.6c-.75-.38-1.59-.95-2.46-1.82-.87-.87-1.44-1.71-1.82-2.46a5.57 5.57 0 0 1-.6-2.38c0-.35.2-.67.5-.86l1.04-.64c.34-.21.78-.16 1.06.12l.64.64c.28.28.38.7.25 1.08l-.27.79c-.09.28-.04.58.14.8.58.74 1.33 1.6 2.07 2.34.74.74 1.6 1.49 2.34 2.07.22.18.52.23.8.14l.79-.27c.38-.13.8-.03 1.08.25l.64.64c.28.28.33.72.12 1.06l-.64 1.04c-.19.3-.51.5-.86.5z"/>
          <path fill="#25D366" d="M16 3C9.37 3 4 8.37 4 15c0 2.12.55 4.11 1.52 5.84L4 29l8.34-1.47A11.9 11.9 0 0 0 16 27c6.63 0 12-5.37 12-12S22.63 3 16 3zm0 21.5c-1.62 0-3.13-.39-4.47-1.09l-.32-.16-4.07.72.74-3.98-.17-.33A9.47 9.47 0 1 1 16 24.5z"/>
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6"
          >
            <h3 className="text-lg font-semibold">Fale com a gente no WhatsApp</h3>
            <p className="mt-1 text-sm text-slate-600">
              Preencha rapidinho e vamos te atender agora mesmo.
            </p>

            <form className="mt-5 grid gap-4" onSubmit={submit}>
              <label className="grid gap-1">
                <span className="text-sm text-slate-700">Seu nome</span>
                <input
                  type="text"
                  className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm text-slate-700">Telefone (WhatsApp)</span>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="(11) 99999-8888"
                  className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  required
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm text-slate-700">Empresa</span>
                <input
                  type="text"
                  className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </label>

              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg border hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!valid || submitting}
                  className={[
                    "px-4 py-2 rounded-lg text-white",
                    valid ? "bg-emerald-600 hover:bg-emerald-700" : "bg-emerald-300",
                    "disabled:opacity-60"
                  ].join(" ")}
                >
                  {submitting ? "Enviando..." : "Ir para o WhatsApp"}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 mt-2">
                Enviaremos seus dados para iniciar a conversa no WhatsApp.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingWhatsapp;
