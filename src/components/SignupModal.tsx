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
  webhookUrl: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  plan: Plan['id'];
};

type Errors = Partial<Record<keyof FormData, string>>;

// ========= VISUAL / TEMA =========
// O componente usa variáveis CSS para cores/tons.
// Defina no seu CSS global (ou no container do modal) algo como:
// :root {
//   --tf-bg: #0b0f12;
//   --tf-surface: #0f1418;
//   --tf-border: rgba(255,255,255,.08);
//   --tf-text: #e6edf3;
//   --tf-text-muted: #a9b1b8;
//   --tf-primary: #25D366;            /* verde WhatsApp (exemplo) */
//   --tf-primary-contrast: #06140b;
//   --tf-accent: #1f6feb;             /* azul de apoio (exemplo) */
//   --tf-danger: #f87171;
// }
// Se não definir, o componente usa defaults abaixo.
const cssVar = (name: string, fallback: string) =>
  `var(${name}, ${fallback})`;

// ========= AUXILIARES =========
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

// User-Agent → navegador / SO / dispositivo
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

const SignupModal: React.FC<Props> = ({
  isOpen, onClose, initialPlanId, plans, webhookUrl,
}) => {
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

    const idem = crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const selectedPlan = planById[formData.plan];

    // BODY com os MESMOS nomes do seu exemplo + Nome_empresa
    const payload = {
      Nome: formData.name.trim(),
      Email: formData.email.trim(),
      Celular: phoneDigits(formData.phone),
      produto_popup: selectedPlan.nome,
      form_id: 'Seleciona_Checkout',
      idempotency_key: idem,
      data_envio: new Date().toISOString(),
      Nome_empresa: formData.company.trim(), // << ADICIONADO
      ...collectMeta(),
    };

    // Query params iguais ao exemplo (produto_popup & idem)
    const url = new URL(webhookUrl);
    url.searchParams.set('produto_popup', selectedPlan.nome);
    url.searchParams.set('idem', idem);

    // Header x-idempotency-key igual ao exemplo
    const headers = { 'x-idempotency-key': idem };

    const ok =
      (await tryFetchJson(url.toString(), payload, headers)) ||
      tryBeacon(url.toString(), payload) ||
      (await tryFetchNoCors(url.toString(), payload, headers));

    // Redireciona para o checkout
    window.location.href = selectedPlan.checkoutUrl;
  };

  const changePlan = (id: Plan['id']) => setFormData((f) => ({ ...f, plan: id }));

  // ===== RENDER =====
  return (
    <div
      aria-modal
      role="dialog"
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(0,0,0,.65)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-xl rounded-2xl shadow-lg overflow-hidden border"
        style={{
          background: cssVar('--tf-surface', '#0f1418'),
          color: cssVar('--tf-text', '#e6edf3'),
          borderColor: cssVar('--tf-border', 'rgba(255,255,255,.08)'),
        }}
      >
        {/* Header alinhado à identidade (sem degradê chamativo) */}
        <div
          className="p-6 flex items-center justify-between"
          style={{
            background: `linear-gradient(90deg, ${cssVar('--tf-primary', '#25D366')} 0%, ${cssVar('--tf-accent', '#1f6feb')} 100%)`,
            color: cssVar('--tf-primary-contrast', '#06140b')
          }}
        >
          <h3 className="text-2xl font-extrabold">Comece agora!</h3>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,.22)' }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {/* Campos */}
          <div>
            <label className="block text-sm font-medium mb-1"
              style={{ color: cssVar('--tf-text-muted', '#a9b1b8') }}>
              Nome completo <span style={{ color: cssVar('--tf-danger', '#f87171') }}>*</span>
            </label>
            <input
              className="w-full rounded-lg px-3 py-2 bg-transparent outline-none focus:ring-2"
              style={{
                border: `1px solid ${cssVar('--tf-border', 'rgba(255,255,255,.08)')}`,
                color: cssVar('--tf-text', '#e6edf3'),
                boxShadow: 'none'
              }}
              value={formData.name}
              onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
              placeholder="Seu nome"
              required
            />
            {errors.name && <p className="mt-1 text-xs" style={{ color: cssVar('--tf-danger', '#f87171') }}>{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1"
              style={{ color: cssVar('--tf-text-muted', '#a9b1b8') }}>
              E-mail <span style={{ color: cssVar('--tf-danger', '#f87171') }}>*</span>
            </label>
            <input
              className="w-full rounded-lg px-3 py-2 bg-transparent outline-none focus:ring-2"
              style={{
                border: `1px solid ${cssVar('--tf-border', 'rgba(255,255,255,.08)')}`,
                color: cssVar('--tf-text', '#e6edf3'),
              }}
              value={formData.email}
              onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
              placeholder="seuemail@exemplo.com"
              inputMode="email"
              required
            />
            {errors.email && <p className="mt-1 text-xs" style={{ color: cssVar('--tf-danger', '#f87171') }}>{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1"
              style={{ color: cssVar('--tf-text-muted', '#a9b1b8') }}>
              WhatsApp <span style={{ color: cssVar('--tf-danger', '#f87171') }}>*</span>
            </label>
            <input
              className="w-full rounded-lg px-3 py-2 bg-transparent outline-none focus:ring-2"
              style={{
                border: `1px solid ${cssVar('--tf-border', 'rgba(255,255,255,.08)')}`,
                color: cssVar('--tf-text', '#e6edf3'),
              }}
              value={formData.phone}
              onChange={(e) => setFormData((f) => ({ ...f, phone: formatPhone(e.target.value) }))}
              placeholder="(11) 99999-9999"
              inputMode="tel"
              required
            />
            {errors.phone && <p className="mt-1 text-xs" style={{ color: cssVar('--tf-danger', '#f87171') }}>{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1"
              style={{ color: cssVar('--tf-text-muted', '#a9b1b8') }}>
              Nome da empresa <span style={{ color: cssVar('--tf-danger', '#f87171') }}>*</span>
            </label>
            <input
              className="w-full rounded-lg px-3 py-2 bg-transparent outline-none focus:ring-2"
              style={{
                border: `1px solid ${cssVar('--tf-border', 'rgba(255,255,255,.08)')}`,
                color: cssVar('--tf-text', '#e6edf3'),
              }}
              value={formData.company}
              onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))}
              placeholder="Ex.: Clínica Sorriso LTDA"
              required
            />
            {errors.company && <p className="mt-1 text-xs" style={{ color: cssVar('--tf-danger', '#f87171') }}>{errors.company}</p>}
          </div>

          {/* Planos */}
          <div className="space-y-3">
            <label className="block text-sm font-medium"
              style={{ color: cssVar('--tf-text-muted', '#a9b1b8') }}>
              Escolha seu plano
            </label>
            {plans.map((p) => {
              const selected = formData.plan === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => changePlan(p.id)}
                  className="w-full text-left rounded-xl px-4 py-4 transition"
                  style={{
                    border: `1px solid ${selected ? cssVar('--tf-primary', '#25D366') : cssVar('--tf-border', 'rgba(255,255,255,.08)')}`,
                    boxShadow: selected ? `0 0 0 4px ${cssVar('--tf-primary', '#25D366')}22` : 'none',
                    background: selected ? `${cssVar('--tf-primary', '#25D366')}14` : 'transparent',
                    color: cssVar('--tf-text', '#e6edf3'),
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{p.nome}</span>
                    <span className="opacity-80">{p.preco} {p.periodo}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-xl py-3 font-semibold"
            style={{
              background: `linear-gradient(90deg, ${cssVar('--tf-primary', '#25D366')} 0%, ${cssVar('--tf-accent', '#1f6feb')} 100%)`,
              color: cssVar('--tf-primary-contrast', '#06140b'),
              opacity: sending ? .8 : 1
            }}
          >
            {sending ? 'Enviando…' : 'Finalizar Assinatura'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;