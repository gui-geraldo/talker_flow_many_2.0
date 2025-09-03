// SignupModal.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Plan = {
  id: 'starter' | 'essencial' | 'pro';
  nome: string;
  preco?: string;
  periodo?: string;
  destaque?: boolean;
  checkoutUrl: string; // URL de checkout na Green (um por plano)
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId: Plan['id'];
  plans: Plan[];
  webhookUrl: string; // URL do seu webhook n8n
};

type FormData = {
  name: string;
  email: string;
  phone: string; // com máscara
  plan: Plan['id'];
};

type Errors = Partial<Record<keyof FormData, string>>;

const phoneDigits = (v: string) => v.replace(/\D/g, '');
const formatPhone = (v: string) => {
  const d = phoneDigits(v).slice(0, 11); // BR padrão: 11 (com 9)
  if (d.length <= 10) {
    // (DD) 0000-0000
    const part1 = d.slice(0, 2);
    const part2 = d.slice(2, 6);
    const part3 = d.slice(6, 10);
    return [
      part1 ? `(${part1}` : '',
      part1 && part1.length === 2 ? ') ' : '',
      part2,
      part3 ? `-${part3}` : '',
    ].join('');
  }
  // (DD) 00000-0000
  const part1 = d.slice(0, 2);
  const part2 = d.slice(2, 7);
  const part3 = d.slice(7, 11);
  return `(${part1}) ${part2}-${part3}`;
};

const emailOk = (e: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

const SignupModal: React.FC<Props> = ({ isOpen, onClose, initialPlanId, plans, webhookUrl }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    plan: initialPlanId,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setFormData((f) => ({ ...f, plan: initialPlanId }));
      setErrors({});
      setSending(false);
      startTimeRef.current = Date.now();
      // bloqueia scroll da página
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, initialPlanId]);

  const planById = useMemo(
    () => Object.fromEntries(plans.map(p => [p.id, p] as const)),
    [plans]
  );

  if (!isOpen) return null;

  const validate = (): boolean => {
    const e: Errors = {};
    if (!formData.name.trim()) e.name = 'Informe seu nome.';
    if (!emailOk(formData.email)) e.email = 'E-mail inválido.';
    const digits = phoneDigits(formData.phone);
    if (digits.length < 10) e.phone = 'WhatsApp inválido.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Coleta metadados simples (opcional – enxuto)
  const collectMeta = () => {
    const url = new URL(window.location.href);
    const get = (k: string) => url.searchParams.get(k) || undefined;
    return {
      page_url: window.location.href,
      referrer: document.referrer || undefined,
      utm_source: get('utm_source'),
      utm_medium: get('utm_medium'),
      utm_campaign: get('utm_campaign'),
      utm_content: get('utm_content'),
      utm_term: get('utm_term'),
      idioma: navigator.language,
      tempo_sessao_seg: Math.round((Date.now() - startTimeRef.current) / 1000),
    };
  };

  const tryFetchJson = async (dest: string, body: any, timeoutMs = 1500) => {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const r = await fetch(dest, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
        signal: ctrl.signal,
      });
      clearTimeout(id);
      return r.ok;
    } catch {
      clearTimeout(id);
      return false;
    }
  };

  const tryBeacon = (dest: string, body: any) => {
    try {
      if ('sendBeacon' in navigator) {
        const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
        return navigator.sendBeacon(dest, blob);
      }
      return false;
    } catch {
      return false;
    }
  };

  const tryFetchNoCors = async (dest: string, body: any) => {
    try {
      await fetch(dest, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
      });
      // no-cors não dá status; assumimos best-effort
      return true;
    } catch {
      return false;
    }
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setSending(true);

    // monta payload do webhook
    const idem = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const selectedPlan = planById[formData.plan];
    const payload = {
      nome: formData.name.trim(),
      email: formData.email.trim(),
      celular: phoneDigits(formData.phone),
      plano_id: selectedPlan.id,
      plano_nome: selectedPlan.nome,
      form_id: 'seleciona_checkout',
      idempotency_key: idem,
      data_envio_iso: new Date().toISOString(),
      ...collectMeta(),
    };

    // tenta enviar (3 estratégias)
    const ok =
      (await tryFetchJson(webhookUrl, payload)) ||
      tryBeacon(webhookUrl, payload) ||
      (await tryFetchNoCors(webhookUrl, payload));

    // salva localmente (opcional)
    try {
      localStorage.setItem('lead_checkout', JSON.stringify({
        ...payload,
        phone_masked: formData.phone,
      }));
    } catch {}

    // redireciona para checkout (mesmo se webhook falhar — ajuste se quiser bloquear)
    window.location.href = selectedPlan.checkoutUrl;
  };

  const changePlan = (id: Plan['id']) => setFormData((f) => ({ ...f, plan: id }));

  return (
    <div
      aria-modal
      role="dialog"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-bold">Quase lá! Preencha seus dados</h3>
          <button onClick={onClose} aria-label="Fechar" className="p-2 rounded hover:bg-neutral-100">✕</button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Seleção de plano dentro do modal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {plans.map((p) => {
              const selected = formData.plan === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => changePlan(p.id)}
                  className={`text-left border rounded-lg p-4 transition ${
                    selected ? 'border-blue-600 ring-2 ring-blue-200' : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="font-semibold">{p.nome}</div>
                  {!!p.preco && (
                    <div className="text-sm text-neutral-600">
                      {p.preco} <span className="text-neutral-400">{p.periodo}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-600"
                value={formData.name}
                onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                placeholder="Seu nome"
              />
              {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input
                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-600"
                value={formData.email}
                onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                placeholder="voce@exemplo.com"
                inputMode="email"
              />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp</label>
              <input
                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-600"
                value={formData.phone}
                onChange={(e) => setFormData((f) => ({ ...f, phone: formatPhone(e.target.value) }))}
                placeholder="(11) 99999-9999"
                inputMode="tel"
              />
              {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={sending}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-60"
            >
              {sending ? 'Enviando…' : 'Ir para pagamento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;