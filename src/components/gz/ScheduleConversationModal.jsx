import React, { useEffect, useMemo, useState } from 'react';
import { Clock3, Send, Shield, Users, X, Lock } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const LOCAL_FORM_ENDPOINT = 'http://127.0.0.1:8765/api/form-responses';

export default function ScheduleConversationModal({ open, onClose }) {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  useEffect(() => {
    if (!open) return;
    setMounted(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const copy = useMemo(() => {
    if (lang === 'en') {
      return {
        topPill: 'The time has come.',
        headline1: 'We develop your',
        headline2: 'FREE',
        headline3: 'App',
        italic: '(Seriously)',
        subtitle:
          'We’re looking for ambitious businesses that need an app to scale. We handle the development— you focus on growing.',
        cards: [
          { title: 'Free services', body: 'Design and development are covered by us.' },
          { title: 'Operating costs', body: 'You only cover maintenance and servers.' },
          { title: 'We look for partners', body: 'We work with committed people with a clear vision.' },
        ],
        lucky: 'Want to be the lucky one?',
        luckyBody: 'Reply to this form and tell us your idea.',
        formTitle: 'Tell us about your project',
        formSubtitle: 'Complete the form and we will get in touch with you.',
        fields: {
          name: 'Your name',
          email: 'Contact email',
          business: 'Business name',
          phone: 'Contact phone',
          project: 'Tell us about your project',
          type: 'What type of app do you need?',
          phase: 'What stage is your business in?',
          users: 'Do you already have users or customers?',
          billing: 'Do you bill currently?',
          found: 'How did you find us?',
        },
        placeholders: {
          name: 'e.g. Annie January',
          email: 'e.g. hello@yourcompany.com',
          business: 'e.g. Startup SL',
          phone: 'e.g. +34 600 123 456',
          project: 'Describe your idea, your business, and the goals you have for the app...',
        },
        selects: {
          empty: 'Select an option',
        },
        submit: 'Send my project',
        submitting: 'Saving...',
        privacy: 'Your information is safe and will not be shared.',
        success: 'Saved locally to respuestas.xlsx.',
        error: 'The local Excel server is not available. Start it and try again.',
      };
    }

    return {
      topPill: 'La hora ha llegado.',
      headline1: 'Desarrollamos tu',
      headline2: 'App',
      headline3: 'GRATIS.',
      italic: '(En serio)',
      subtitle:
        'Buscamos negocios con ambición que necesiten una app para escalar. Nosotros nos encargamos del desarrollo, tú te enfocas en hacer crecer tu negocio.',
      cards: [
        { title: 'Servicios gratuitos', body: 'El diseño y la programación corren por nuestra cuenta.' },
        { title: 'Costes operativos', body: 'Solo cubres el mantenimiento y servidores (plataforma y...' },
        { title: 'Buscamos socios', body: 'Trabajamos con personas comprometidas y con visión.' },
      ],
      lucky: '¿Quieres ser el afortunado o afortunada?',
      luckyBody: 'Responde a este formulario y cuéntanos tu idea.',
      formTitle: 'Cuéntanos tu proyecto',
      formSubtitle: 'Completa el formulario y nos pondremos en contacto contigo.',
      fields: {
        name: 'Tu nombre',
        email: 'Email de contacto',
        business: 'Nombre de tu negocio',
        phone: 'Teléfono de contacto',
        project: 'Cuéntanos sobre tu proyecto',
        type: '¿Qué tipo de app necesitas?',
        phase: '¿En qué fase está tu negocio?',
        users: '¿Tienes ya usuarios o clientes?',
        billing: '¿Facturáis actualmente?',
        found: '¿Cómo nos has encontrado?',
      },
      placeholders: {
        name: 'Ej: Juan Pérez',
        email: 'ejemplo@tunegocio.com',
        business: 'Ej: Mi Startup SL',
        phone: 'Ej: +34 600 123 456',
        project: 'Describe tu idea, tu negocio y qué objetivos tienes con la app...',
      },
      selects: { empty: 'Selecciona una opción' },
      submit: 'Enviar mi proyecto',
      submitting: 'Guardando...',
      privacy: 'Tu información está segura y no será compartida.',
      success: 'Guardado localmente en respuestas.xlsx.',
      error: 'El servidor local de Excel no está disponible. Inícialo y vuelve a intentarlo.',
    };
  }, [lang]);

  if (!open) return null;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      nombre: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      mensaje: formData.get('project')?.toString().trim() || '',
      negocio: formData.get('business')?.toString().trim() || '',
      telefono: formData.get('phone')?.toString().trim() || '',
      tipo_app: formData.get('type')?.toString().trim() || '',
      fase_negocio: formData.get('phase')?.toString().trim() || '',
      usuarios_clientes: formData.get('users')?.toString().trim() || '',
      factura_actualmente: formData.get('billing')?.toString().trim() || '',
      origen: formData.get('found')?.toString().trim() || '',
    };

    setIsSubmitting(true);
    setSubmitState({ type: '', message: '' });

    try {
      const response = await fetch(LOCAL_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || copy.error);
      }

      if (form) form.reset();
      setSubmitState({ type: 'success', message: copy.success });
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error instanceof Error ? error.message : copy.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#07152a] text-white overflow-y-auto">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 inline-flex items-center justify-center rounded-full w-10 h-10 bg-white/10 hover:bg-white/15 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-7 pb-10">
        {/* Top pill */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/5">
            <Clock3 className="w-4 h-4 text-white/80" />
          </span>
          <span className="text-sm sm:text-base text-white/90 font-medium">{copy.topPill}</span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <div className="leading-[0.95]">
            <div className="text-[2.35rem] sm:text-[3.1rem] font-semibold text-white">
              {copy.headline1}
            </div>
            <div className="text-[2.35rem] sm:text-[3.1rem] font-semibold">
              <span style={{ color: '#F0C44F' }}>{copy.headline2}</span>{' '}
              <span style={{ color: '#F0C44F' }}>{copy.headline3}</span>
            </div>
          </div>
          <div className="italic text-white/70 text-[1.05rem] sm:text-[1.2rem]">{copy.italic}</div>
          <p className="text-white/85 leading-[1.55] text-[0.95rem] sm:text-[1.05rem] max-w-[720px]">
            {copy.subtitle}
          </p>
        </div>

        {/* Value cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
            <div className="w-11 h-11 rounded-full bg-[#263B70] flex items-center justify-center mb-3">
              <Send className="w-5 h-5 text-[#F0C44F]" />
            </div>
            <div className="font-semibold mb-1">{copy.cards[0].title}</div>
            <div className="text-white/80 text-[0.92rem] leading-[1.45]">{copy.cards[0].body}</div>
          </div>
          <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
            <div className="w-11 h-11 rounded-full bg-[#263B70] flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-[#F0C44F]" />
            </div>
            <div className="font-semibold mb-1">{copy.cards[1].title}</div>
            <div className="text-white/80 text-[0.92rem] leading-[1.45]">{copy.cards[1].body}</div>
          </div>
          <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
            <div className="w-11 h-11 rounded-full bg-[#263B70] flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-[#F0C44F]" />
            </div>
            <div className="font-semibold mb-1">{copy.cards[2].title}</div>
            <div className="text-white/80 text-[0.92rem] leading-[1.45]">{copy.cards[2].body}</div>
          </div>
        </div>

        {/* Lucky CTA */}
        <div className="mt-5 rounded-[18px] border border-[#F0C44F] bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#F0C44F] flex items-center justify-center">
              <Send className="w-5 h-5 text-[#142133]" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold">{copy.lucky}</div>
              <div className="text-white/85 text-[0.95rem] leading-[1.35]">{copy.luckyBody}</div>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div
          className="mt-6 rounded-[22px] bg-white text-[#111] border border-black/5 shadow-[0_22px_70px_rgba(0,0,0,0.35)]"
          style={{ overflow: 'hidden' }}
        >
          <form onSubmit={handleSubmit} className="p-5 sm:p-7">
            <div className="mb-5">
              <div className="text-[1.65rem] sm:text-[1.9rem] font-semibold mb-2">{copy.formTitle}</div>
              <div className="text-[#4a4a4a] text-[0.95rem] leading-[1.45]">{copy.formSubtitle}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-[#252525] text-sm font-medium">
                {copy.fields.name}
                <input
                  name="name"
                  type="text"
                  placeholder={copy.placeholders.name}
                  className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] placeholder:text-[#6c6c6c] border border-[#e6e6e6] bg-[#f6f6f6] outline-none"
                  required
                />
              </label>
              <label className="block text-[#252525] text-sm font-medium">
                {copy.fields.business}
                <input
                  name="business"
                  type="text"
                  placeholder={copy.placeholders.business}
                  className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] placeholder:text-[#6c6c6c] border border-[#e6e6e6] bg-[#f6f6f6] outline-none"
                  required
                />
              </label>

              <label className="block text-[#252525] text-sm font-medium">
                {copy.fields.email}
                <input
                  name="email"
                  type="email"
                  placeholder={copy.placeholders.email}
                  className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] placeholder:text-[#6c6c6c] border border-[#e6e6e6] bg-[#f6f6f6] outline-none"
                  required
                />
              </label>
              <label className="block text-[#252525] text-sm font-medium">
                {copy.fields.phone}
                <input
                  name="phone"
                  type="tel"
                  placeholder={copy.placeholders.phone}
                  className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] placeholder:text-[#6c6c6c] border border-[#e6e6e6] bg-[#f6f6f6] outline-none"
                  required
                />
              </label>
            </div>

            <label className="block text-[#252525] text-sm font-medium mt-4">
              {copy.fields.project}
              <textarea
                name="project"
                placeholder={copy.placeholders.project}
                className="mt-1 w-full min-h-[92px] rounded-md px-3 py-2.5 text-sm text-[#2b2b2b] placeholder:text-[#6c6c6c] border border-[#e6e6e6] bg-[#f6f6f6] outline-none resize-none"
                required
              />
            </label>

            <div className="mt-3 space-y-3">
              <label className="block text-[#252525] text-sm font-medium">
                {copy.fields.type}
                <select
                  name="type"
                  className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] border border-[#e6e6e6] bg-[#f6f6f6] outline-none"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    {copy.selects.empty}
                  </option>
                  <option value="iOS / Android">iOS / Android</option>
                  <option value="Web app">Web app</option>
                  <option value="Cross-platform">Cross-platform</option>
                  <option value="No estoy seguro">No estoy seguro</option>
                </select>
              </label>

              <label className="block text-[#252525] text-sm font-medium">
                {copy.fields.phase}
                <select
                  name="phase"
                  className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] border border-[#e6e6e6] bg-[#f6f6f6] outline-none"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    {copy.selects.empty}
                  </option>
                  <option value="Idea / MVP">Idea / MVP</option>
                  <option value="En desarrollo">En desarrollo</option>
                  <option value="Ya lanzado">Ya lanzado</option>
                </select>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block text-[#252525] text-sm font-medium">
                  {copy.fields.users}
                  <select
                    name="users"
                    className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] border border-[#e6e6e6] bg-[#f6f6f6] outline-none"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {copy.selects.empty}
                    </option>
                    <option value="Sí">Sí</option>
                    <option value="En camino">En camino</option>
                    <option value="Todavía no">Todavía no</option>
                  </select>
                </label>

                <label className="block text-[#252525] text-sm font-medium">
                  {copy.fields.billing}
                  <select
                    name="billing"
                    className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] border border-[#e6e6e6] bg-[#f6f6f6] outline-none"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {copy.selects.empty}
                    </option>
                    <option value="Sí">Sí</option>
                    <option value="No aún">No aún</option>
                    <option value="Estamos probando">Estamos probando</option>
                  </select>
                </label>
              </div>

              <label className="block text-[#252525] text-sm font-medium">
                {copy.fields.found}
                <select
                  name="found"
                  className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] border border-[#e6e6e6] bg-[#f6f6f6] outline-none"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    {copy.selects.empty}
                  </option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Google">Google</option>
                  <option value="Redes sociales">Redes sociales</option>
                  <option value="Recomendación">Recomendación</option>
                  <option value="Otro">Otro</option>
                </select>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center min-h-[48px] rounded-[10px] text-sm font-semibold text-[#1f1f1f] transition-colors"
              style={{ backgroundColor: '#f0c44f' }}
            >
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                {isSubmitting ? copy.submitting : copy.submit}
              </span>
            </button>

            {submitState.message && (
              <div
                className="mt-3 rounded-[10px] px-3 py-2 text-sm"
                style={{
                  backgroundColor: submitState.type === 'success' ? '#e8f5e9' : '#fdecea',
                  color: submitState.type === 'success' ? '#1f5f2b' : '#a12b2b',
                }}
              >
                {submitState.message}
              </div>
            )}

            <div className="mt-3 flex items-center justify-center gap-2 text-[0.8rem] text-[#6a6a6a]">
              <Lock className="w-3 h-3" aria-hidden="true" />
              <span>{copy.privacy}</span>
            </div>
          </form>
        </div>

        {/* Small entrance hint for screen readers */}
        <div aria-live="polite" className="sr-only">
          {mounted ? 'Schedule modal open.' : ''}
        </div>
      </div>
    </div>
  );
}

