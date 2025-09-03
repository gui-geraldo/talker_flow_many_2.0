// SignupModal.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';

// TIPOS
type Plan = {
  id: 'starter' | 'essencial' | 'pro';
  nome: string;
  preco?: string;
  periodo?: string;
  destaque?: boolean;
  checkoutUrl: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId: Plan['id'];
  plans: Plan[];
  // webhookUrl: string;  // não é mais necessário, usamos o fixo solicitado
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  plan: Plan['id'];
};

type Errors = Partial<Record<keyof FormData, string>>;

// AUXILIARES
const phoneDigits = (v: string) => v.replace(/\D/g, '');
const formatPhone = (v: string) => {
  const d = phoneDigits(v).slice(0, 11);
  if (d.length <= 10) {
    const p1 = d.slice(0, 2), p2 = d.slice(2, 6), p3 = d.slice(6, 10);
    return `${p1 ? `(${p1}` : ''}${p1.length === 2 ? ') ' : ''}${p2}${p3 ? `-${p3}` : ''}`;
  }
  const p1 = d.slice(0, 2), p2 = d.slice(2, 7), p3 = d.slice(7, 11);
  return `(${p1}) ${p2}-${p3}`;
};
const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

const parseUserAgent = () => {
  const ua = navigator.userAgent;
  let sistema_operacional = 'Outro';
  if (/Windows/i.test(ua)) sistema_operacional = 'Windows';
  else if (/Macintosh|Mac OS X/i.test(ua)) sistema_operacional = 'MacOS';
  else if (/Android/i.test(ua)) sistema_operacional = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) sistema_operacional = 'iOS';
  else if (/Linux/i.test(ua)) sistema_operacional = 'Linux';

  let navegador = 'Outro';
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) navegador = 'Chrome';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) navegador = 'Safari';
  else if (/Firefox/i.test(ua)) navegador = 'Firefox';
  else if (/Edg/i.test(ua)) navegador = 'Edge';

  const dispositivo = /Mobi/i.test(ua) ? 'mobile' : 'desktop';
  return { sistema_operacional, navegador, dispositivo };
};

// URL FIXA DO WEBHOOK (pedido)
const WEBHOOK_URL = 'https://n8nwebhooks.talkerflow.me/webhook/c3e04dda-76e0-4844-8341-8dc0b1a35590';

const SignupModal: React.FC<Props> = ({ isOpen, onClose, initialPlanId, plans }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
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
    if (!formData.company.trim()) e.company = 'Informe o nome da empresa.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const collectMeta = () => {
    const url = new URL(window.location.href);
    const get = (k: string) => url.searchParams.get(k) || undefined;

    const utm_source = get('utm_source');
    let origin_platform = utm_source;
    if (utm_source === 'ig') origin_platform = 'ig';
    if (utm_source === 'fb') origin_platform = 'fb';

    const sessionTimeSec = Math.round((Date.now() - startTimeRef.current) / 1000);

    return {
      utm_source: utm_source,
      utm_medium: get('utm_medium'),
      utm_campaign: get('utm_campaign'),
      utm_content: get('utm_content'),
      utm_term: get('utm_term'),
      fbclid: get('fbclid'),
      gclid: get('gclid'),
      referrer: document.referrer || undefined,
      page_url: window.location.href,
      ...parseUserAgent(),
      idioma: navigator.language,
      quantidade_visitas: 1,
      tempo_total_no_site_segundos: sessionTimeSec,
      tempo_sessao_atual_segundos: sessionTimeSec,
      origin_platform: origin_platform,
    };
  };

  // Envio
  const tryFetchJson = async (dest: string, body: any, headers: Record<string, string>, timeoutMs = 1500) => {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const r = await fetch(dest, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
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
    } catch { return false; }
  };
  const tryFetchNoCors = async (dest: string, body: any, headers: Record<string,string>) => {
    try {
      await fetch(dest, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(body),
        keepalive: true,
      });
      return true;
    } catch { return false; }
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);

    const idem = (crypto as any)?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const selectedPlan = planById[formData.plan];

    // BODY com os MESMOS nomes do seu exemplo + Nome_empresa
    const payload = {
      Nome: formData.name.trim(),
      Email: formData.email.trim(),
      Celular: phoneDigits(formData.phone),
      produto_popup: selectedPlan?.nome ?? '',
      form_id: 'Seleciona_Checkout',
      idempotency_key: idem,
      data_envio: new Date().toISOString(),
      Nome_empresa: formData.company.trim(), // ADICIONADO conforme pedido
      ...collectMeta(),
    };

    // Query params iguais ao exemplo (produto_popup & idem)
    const url = new URL(WEBHOOK_URL);
    if (selectedPlan?.nome) url.searchParams.set('produto_popup', selectedPlan.nome);
    url.searchParams.set('idem', idem);

    // Header x-idempotency-key igual ao exemplo
    const headers = { 'x-idempotency-key': idem };

    // Tenta enviar
    await tryFetchJson(url.toString(), payload, headers)
      || tryBeacon(url.toString(), payload)
      || (await tryFetchNoCors(url.toString(), payload, headers));

    // Redireciona para o checkout
    if (selectedPlan?.checkoutUrl) {
      window.location.href = selectedPlan.checkoutUrl;
    } else {
      setSending(false);
    }
  };

  const changePlan = (id: Plan['id']) => setFormData((f) => ({ ...f, plan: id }));

  // ===== RENDER (identidade clean alinhada ao site) =====
  return (
    <div
      aria-modal
      role="dialog"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-xl rounded-2xl bg-white text-neutral-900 shadow-2xl overflow-hidden border border-gray-200">
        {/* Header: azul sólido discreto (coeso com o site) */}
        <div className="p-6 bg-blue-600 text-white flex items-center justify-between">
          <h3 className="text-2xl font-extrabold">Comece agora!</h3>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {/* Campos */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Nome completo <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-neutral-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
              placeholder="Seu nome"
              required
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-neutral-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
              placeholder="seuemail@exemplo.com"
              inputMode="email"
              required
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-neutral-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.phone}
              onChange={(e) => setFormData((f) => ({ ...f, phone: formatPhone(e.target.value) }))}
              placeholder="(11) 99999-9999"
              inputMode="tel"
              required
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Nome da empresa <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-neutral-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.company}
              onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))}
              placeholder="Ex.: Clínica Sorriso LTDA"
              required
            />
            {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
          </div>

          {/* Planos */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-600">Escolha seu plano</label>
            {plans.map((p) => {
              const selected = formData.plan === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => changePlan(p.id)}
                  className={`w-full text-left rounded-xl border px-4 py-4 transition
                    ${selected
                      ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-neutral-900">{p.nome}</span>
                    <span className="text-neutral-600">{p.preco} {p.periodo}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-xl py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-80"
          >
            {sending ? 'Enviando…' : 'Finalizar Assinatura'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
