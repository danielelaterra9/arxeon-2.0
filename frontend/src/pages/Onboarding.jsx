import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Calendar } from 'lucide-react';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Onboarding = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const subscriptionId = searchParams.get('subscription_id');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company: '',
    website: '',
    social_platforms: [],
    social_links: '',
    has_gmb: false,
    gmb_link: '',
    ads_platforms: [],
    main_objective: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const socialOptions = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'twitter', label: 'X (Twitter)' }
  ];

  const adsOptions = [
    { id: 'google_ads', label: 'Google Ads' },
    { id: 'meta_ads', label: 'Meta Ads (Facebook/Instagram)' },
    { id: 'linkedin_ads', label: 'LinkedIn Ads' },
    { id: 'tiktok_ads', label: 'TikTok Ads' }
  ];

  const objectives = [
    'Aumentare i contatti (lead generation)',
    'Aumentare le vendite',
    'Aumentare le prenotazioni',
    'Migliorare la visibilità del brand',
    'Aumentare il traffico al sito',
    'Fidelizzare i clienti esistenti',
    'Altro'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleArrayItem = (field, itemId) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(itemId)
        ? prev[field].filter(id => id !== itemId)
        : [...prev[field], itemId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'Campo obbligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'Campo obbligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email non valida';
    }
    if (!formData.company.trim()) newErrors.company = 'Campo obbligatorio';
    if (!formData.main_objective) newErrors.main_objective = 'Seleziona un obiettivo';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Per favore, compila tutti i campi obbligatori');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subscription_id: subscriptionId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit onboarding');
      }

      toast.success('Informazioni inviate con successo!');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting onboarding:', error);
      toast.error('Si è verificato un errore. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="pt-20 min-h-screen bg-[#161716]">
        {/* Success */}
        <section className="py-24 bg-[#161716]">
          <div className="max-w-[700px] mx-auto px-5 md:px-10 text-center">
            <div className="w-20 h-20 rounded-full bg-[#2a2c29] border-2 border-[#c8f000] flex items-center justify-center mx-auto mb-8">
              <Check className="text-[#c8f000]" size={40} />
            </div>
            <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl mb-6">
              Grazie, abbiamo ricevuto le informazioni.
            </h1>
            <p className="text-[#9a9a96] text-lg mb-12">
              Il nostro team analizzerà il tuo caso e ti contatterà a breve.
            </p>
            
            <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633] mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar className="text-[#c8f000]" size={24} />
                <h2 className="text-white font-semibold text-xl">Prossimo passo</h2>
              </div>
              <p className="text-[#9a9a96] mb-6">
                Prenota la prima consulenza per allinearci sugli obiettivi e partire correttamente.
              </p>
              <a 
                href="https://calendly.com/arxeon/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                Prenota la prima consulenza
                <ArrowRight className="ml-2" size={16} />
              </a>
            </div>

            <Link to="/" className="text-[#9a9a96] hover:text-[#c8f000] transition-colors">
              ← Torna alla home
            </Link>
          </div>
        </section>

        {/* Calendly Embed */}
        <section className="py-16 bg-[#1f211f]">
          <div className="max-w-[900px] mx-auto px-5 md:px-10">
            <CalendlyEmbed />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-[#161716]">
      {/* Header */}
      <section className="py-16 bg-[#161716] border-b border-[#343633]">
        <div className="max-w-[800px] mx-auto px-5 md:px-10">
          <Link to="/thank-you" className="text-[#9a9a96] hover:text-[#c8f000] transition-colors text-sm mb-6 inline-flex items-center gap-2">
            ← Torna indietro
          </Link>
          <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl mb-4">
            Formulario di onboarding
          </h1>
          <p className="text-[#9a9a96] text-lg">
            Raccontaci del tuo business per permetterci di prepararci al meglio.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-[#1f211f]">
        <div className="max-w-[800px] mx-auto px-5 md:px-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Contact Info */}
            <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#343633]">
              <h2 className="text-white font-semibold text-lg mb-6">Informazioni di contatto</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Nome e Cognome <span className="text-[#c8f000]">*</span>
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#161716] border rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors ${
                      errors.full_name ? 'border-red-500' : 'border-[#343633]'
                    }`}
                    placeholder="Mario Rossi"
                  />
                  {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email <span className="text-[#c8f000]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#161716] border rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors ${
                      errors.email ? 'border-red-500' : 'border-[#343633]'
                    }`}
                    placeholder="mario@azienda.ch"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#343633]">
              <h2 className="text-white font-semibold text-lg mb-6">Informazioni aziendali</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Azienda / Brand <span className="text-[#c8f000]">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#161716] border rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors ${
                      errors.company ? 'border-red-500' : 'border-[#343633]'
                    }`}
                    placeholder="La tua azienda SA"
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Sito web (link)
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#161716] border border-[#343633] rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors"
                    placeholder="https://www.tuosito.ch"
                  />
                </div>
              </div>
            </div>

            {/* Social Presence */}
            <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#343633]">
              <h2 className="text-white font-semibold text-lg mb-6">Presenza social</h2>
              
              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-4">
                  Social utilizzati
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {socialOptions.map(option => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleArrayItem('social_platforms', option.id)}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                        formData.social_platforms.includes(option.id)
                          ? 'bg-[#c8f000] text-[#161716] border-[#c8f000]'
                          : 'bg-[#161716] text-[#9a9a96] border-[#343633] hover:border-[#c8f000]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Link ai profili social
                </label>
                <textarea
                  name="social_links"
                  value={formData.social_links}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#161716] border border-[#343633] rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors resize-none"
                  placeholder="Inserisci i link ai tuoi profili social (uno per riga)"
                />
              </div>
            </div>

            {/* Google My Business */}
            <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#343633]">
              <h2 className="text-white font-semibold text-lg mb-6">Google My Business</h2>
              
              <div className="flex items-center gap-3 mb-4">
                <Checkbox
                  id="has_gmb"
                  checked={formData.has_gmb}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_gmb: checked }))}
                  className="border-[#343633] data-[state=checked]:bg-[#c8f000] data-[state=checked]:border-[#c8f000]"
                />
                <label htmlFor="has_gmb" className="text-white cursor-pointer">
                  Ho un profilo Google My Business
                </label>
              </div>

              {formData.has_gmb && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Link al profilo Google My Business
                  </label>
                  <input
                    type="url"
                    name="gmb_link"
                    value={formData.gmb_link}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#161716] border border-[#343633] rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors"
                    placeholder="https://g.page/tuaazienda"
                  />
                </div>
              )}
            </div>

            {/* Ads Platforms */}
            <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#343633]">
              <h2 className="text-white font-semibold text-lg mb-6">Piattaforme pubblicitarie</h2>
              
              <label className="block text-white text-sm font-medium mb-4">
                Piattaforme ads già utilizzate (se presenti)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {adsOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleArrayItem('ads_platforms', option.id)}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                      formData.ads_platforms.includes(option.id)
                        ? 'bg-[#c8f000] text-[#161716] border-[#c8f000]'
                        : 'bg-[#161716] text-[#9a9a96] border-[#343633] hover:border-[#c8f000]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Objective */}
            <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#343633]">
              <h2 className="text-white font-semibold text-lg mb-6">Obiettivi</h2>
              
              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-2">
                  Obiettivo principale <span className="text-[#c8f000]">*</span>
                </label>
                <Select value={formData.main_objective} onValueChange={(value) => handleSelectChange('main_objective', value)}>
                  <SelectTrigger className={`w-full px-4 py-3 h-auto bg-[#161716] border rounded-lg text-white focus:ring-0 focus:ring-offset-0 ${
                    errors.main_objective ? 'border-red-500' : 'border-[#343633]'
                  }`}>
                    <SelectValue placeholder="Seleziona l'obiettivo principale" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2c29] border-[#343633]">
                    {objectives.map((obj) => (
                      <SelectItem key={obj} value={obj} className="text-white hover:bg-[#343633] focus:bg-[#343633] focus:text-[#c8f000]">
                        {obj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.main_objective && <p className="text-red-500 text-sm mt-1">{errors.main_objective}</p>}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Note libere
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#161716] border border-[#343633] rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors resize-none"
                  placeholder="Altre informazioni utili, sfide attuali, aspettative..."
                />
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary text-base px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Invio in corso...
                  </span>
                ) : (
                  <>
                    Invia informazioni
                    <ArrowRight className="ml-2" size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

// Calendly Embed Component
const CalendlyEmbed = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget rounded-xl overflow-hidden border border-[#343633]" 
      data-url="https://calendly.com/arxeon/30min?hide_gdpr_banner=1&background_color=161716&text_color=ffffff&primary_color=c8f000" 
      style={{ minWidth: '320px', height: '650px' }}
    />
  );
};

export default Onboarding;
