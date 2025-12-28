import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { sectors, geoAreas, channels, objectives, budgets } from '../data/mock';
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

const Valutazione = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    website: '',
    sector: '',
    geoArea: '',
    channels: [],
    objective: '',
    budget: '',
    mainProblem: '',
    previousAttempts: '',  // New field
    improvementImportance: 3,  // New field (1-5)
    privacyConsent: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleChannelToggle = (channelId) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter((c) => c !== channelId)
        : [...prev.channels, channelId],
    }));
    if (errors.channels) {
      setErrors((prev) => ({ ...prev, channels: '' }));
    }
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, privacyConsent: checked }));
    if (errors.privacyConsent) {
      setErrors((prev) => ({ ...prev, privacyConsent: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Campo obbligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'Campo obbligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email non valida';
    }
    if (!formData.companyName.trim()) newErrors.companyName = 'Campo obbligatorio';
    if (!formData.sector) newErrors.sector = 'Seleziona un settore';
    if (!formData.geoArea) newErrors.geoArea = 'Seleziona un\'area geografica';
    if (formData.channels.length === 0) newErrors.channels = 'Seleziona almeno un canale';
    if (!formData.objective) newErrors.objective = 'Seleziona un obiettivo';
    if (!formData.budget) newErrors.budget = 'Seleziona un budget';
    if (!formData.mainProblem.trim()) newErrors.mainProblem = 'Campo obbligatorio';
    if (!formData.privacyConsent) newErrors.privacyConsent = 'Devi accettare per continuare';
    
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      sessionStorage.setItem('valutazioneData', JSON.stringify(formData));
      toast.success('Richiesta inviata con successo!');
      navigate('/valutazione/conferma');
    } catch (error) {
      toast.error('Si è verificato un errore. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      {/* HERO */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl leading-tight mb-6">
              Valutazione gratuita<br />del tuo marketing
            </h1>
            <p className="text-[#9a9a96] text-lg leading-relaxed">
              Prima di investire tempo o budget, capisci cosa funziona davvero e cosa no.
            </p>
          </div>
        </div>
      </section>

      {/* PERCHÉ ESISTE */}
      <section className="py-16 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white font-bold text-2xl mb-6">Perché offriamo una valutazione gratuita</h2>
            <p className="text-[#9a9a96] leading-relaxed">
              Scegliere un servizio marketing senza chiarezza è rischioso.<br />
              La valutazione serve a fornire una prima analisi oggettiva della situazione, 
              per aiutarti a capire se e come intervenire.
            </p>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl mb-16 text-center">Come funziona</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-[#343633] hidden md:block"></div>
              
              <div className="space-y-12">
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center flex-shrink-0 text-[#161716] font-bold text-xl relative z-10">
                    1
                  </div>
                  <div className="pt-2">
                    <h3 className="text-white font-semibold text-lg mb-2">Compili un questionario guidato</h3>
                    <p className="text-[#9a9a96]">Rispondi a domande mirate sulla tua situazione attuale.</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center flex-shrink-0 text-[#161716] font-bold text-xl relative z-10">
                    2
                  </div>
                  <div className="pt-2">
                    <h3 className="text-white font-semibold text-lg mb-2">Analizziamo le informazioni fornite</h3>
                    <p className="text-[#9a9a96]">Studiamo i dati e identifichiamo opportunità e criticità.</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center flex-shrink-0 text-[#161716] font-bold text-xl relative z-10">
                    3
                  </div>
                  <div className="pt-2">
                    <h3 className="text-white font-semibold text-lg mb-2">Ricevi un report sintetico via email</h3>
                    <p className="text-[#9a9a96]">Entro 48 ore ricevi la valutazione con raccomandazioni concrete.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COSA OTTIENI / COSA NON È / A CHI È UTILE */}
      <section className="py-16 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-white font-bold text-xl mb-6">Cosa ottieni</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#9a9a96]">Una lettura esterna e professionale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#9a9a96]">Punti di miglioramento concreti</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#9a9a96]">Maggiore chiarezza sulle priorità</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#9a9a96]">Indicazione del pacchetto più adatto (se pertinente)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-xl mb-6">Cosa non è questa valutazione</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6f716d] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#6f716d]">Non è una consulenza strategica completa</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6f716d] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#6f716d]">Non è una call di vendita</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6f716d] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#6f716d]">Non comporta obblighi o vincoli</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-xl mb-6">A chi è utile</h3>
              <p className="text-[#9a9a96] mb-4">La valutazione è utile se vuoi:</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#9a9a96]">capire se il tuo marketing è coerente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#9a9a96]">evitare sprechi</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#9a9a96]">prendere decisioni più consapevoli</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#c8f000] font-bold text-2xl mb-12 text-center">Compila la valutazione gratuita</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
                <h3 className="text-white font-semibold mb-6">Informazioni di contatto</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Nome e Cognome <span className="text-[#c8f000]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-[#161716] border rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-[#343633]'
                      }`}
                      placeholder="Mario Rossi"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
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
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Telefono <span className="text-[#6f716d] text-xs">(opzionale)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#161716] border border-[#343633] rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors"
                      placeholder="+41 00 000 00 00"
                    />
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
                <h3 className="text-white font-semibold mb-6">Informazioni aziendali</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Nome Azienda / Brand <span className="text-[#c8f000]">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-[#161716] border rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors ${
                        errors.companyName ? 'border-red-500' : 'border-[#343633]'
                      }`}
                      placeholder="La tua azienda SA"
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Sito web <span className="text-[#6f716d] text-xs">(opzionale)</span>
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
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Settore <span className="text-[#c8f000]">*</span>
                    </label>
                    <Select value={formData.sector} onValueChange={(value) => handleSelectChange('sector', value)}>
                      <SelectTrigger className={`w-full px-4 py-3 h-auto bg-[#161716] border rounded-lg text-white focus:ring-0 focus:ring-offset-0 ${
                        errors.sector ? 'border-red-500' : 'border-[#343633]'
                      }`}>
                        <SelectValue placeholder="Seleziona il settore" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2c29] border-[#343633]">
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector} className="text-white hover:bg-[#343633] focus:bg-[#343633] focus:text-[#c8f000]">
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.sector && <p className="text-red-500 text-sm mt-1">{errors.sector}</p>}
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Area geografica <span className="text-[#c8f000]">*</span>
                    </label>
                    <Select value={formData.geoArea} onValueChange={(value) => handleSelectChange('geoArea', value)}>
                      <SelectTrigger className={`w-full px-4 py-3 h-auto bg-[#161716] border rounded-lg text-white focus:ring-0 focus:ring-offset-0 ${
                        errors.geoArea ? 'border-red-500' : 'border-[#343633]'
                      }`}>
                        <SelectValue placeholder="Seleziona l'area" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2c29] border-[#343633]">
                        {geoAreas.map((area) => (
                          <SelectItem key={area} value={area} className="text-white hover:bg-[#343633] focus:bg-[#343633] focus:text-[#c8f000]">
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.geoArea && <p className="text-red-500 text-sm mt-1">{errors.geoArea}</p>}
                  </div>
                </div>
              </div>

              {/* Marketing Info */}
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
                <h3 className="text-white font-semibold mb-6">Il tuo marketing attuale</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-4">
                      Canali attualmente utilizzati <span className="text-[#c8f000]">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {channels.map((channel) => (
                        <button
                          key={channel.id}
                          type="button"
                          onClick={() => handleChannelToggle(channel.id)}
                          className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                            formData.channels.includes(channel.id)
                              ? 'bg-[#c8f000] text-[#161716] border-[#c8f000]'
                              : 'bg-[#161716] text-[#9a9a96] border-[#343633] hover:border-[#c8f000] hover:text-white'
                          }`}
                        >
                          {channel.label}
                        </button>
                      ))}
                    </div>
                    {errors.channels && <p className="text-red-500 text-sm mt-2">{errors.channels}</p>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Obiettivo principale <span className="text-[#c8f000]">*</span>
                      </label>
                      <Select value={formData.objective} onValueChange={(value) => handleSelectChange('objective', value)}>
                        <SelectTrigger className={`w-full px-4 py-3 h-auto bg-[#161716] border rounded-lg text-white focus:ring-0 focus:ring-offset-0 ${
                          errors.objective ? 'border-red-500' : 'border-[#343633]'
                        }`}>
                          <SelectValue placeholder="Cosa vuoi ottenere?" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2a2c29] border-[#343633]">
                          {objectives.map((obj) => (
                            <SelectItem key={obj} value={obj} className="text-white hover:bg-[#343633] focus:bg-[#343633] focus:text-[#c8f000]">
                              {obj}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.objective && <p className="text-red-500 text-sm mt-1">{errors.objective}</p>}
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Budget marketing mensile <span className="text-[#c8f000]">*</span>
                      </label>
                      <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
                        <SelectTrigger className={`w-full px-4 py-3 h-auto bg-[#161716] border rounded-lg text-white focus:ring-0 focus:ring-offset-0 ${
                          errors.budget ? 'border-red-500' : 'border-[#343633]'
                        }`}>
                          <SelectValue placeholder="Seleziona il budget" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2a2c29] border-[#343633]">
                          {budgets.map((budget) => (
                            <SelectItem key={budget} value={budget} className="text-white hover:bg-[#343633] focus:bg-[#343633] focus:text-[#c8f000]">
                              {budget}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Qual è il tuo problema principale? <span className="text-[#c8f000]">*</span>
                    </label>
                    <textarea
                      name="mainProblem"
                      value={formData.mainProblem}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 bg-[#161716] border rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors resize-none ${
                        errors.mainProblem ? 'border-red-500' : 'border-[#343633]'
                      }`}
                      placeholder="Descrivi brevemente la sfida principale che vorresti affrontare con il marketing..."
                    />
                    {errors.mainProblem && <p className="text-red-500 text-sm mt-1">{errors.mainProblem}</p>}
                  </div>
                </div>
              </div>

              {/* Privacy & Submit */}
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
                <div className="flex items-start gap-3 mb-6">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyConsent}
                    onCheckedChange={handleCheckboxChange}
                    className={`mt-1 border-[#343633] data-[state=checked]:bg-[#c8f000] data-[state=checked]:border-[#c8f000] ${
                      errors.privacyConsent ? 'border-red-500' : ''
                    }`}
                  />
                  <label htmlFor="privacy" className="text-[#9a9a96] text-sm leading-relaxed cursor-pointer">
                    Acconsento al trattamento dei miei dati personali secondo la{' '}
                    <a href="/privacy" className="text-[#c8f000] hover:underline">Privacy Policy</a>{' '}
                    e accetto di essere ricontattato dal team Arxéon per la valutazione richiesta. <span className="text-[#c8f000]">*</span>
                  </label>
                </div>
                {errors.privacyConsent && <p className="text-red-500 text-sm mb-4">{errors.privacyConsent}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      Compila la valutazione gratuita
                      <ArrowRight className="ml-2" size={18} />
                    </>
                  )}
                </button>
                <p className="text-[#6f716d] text-sm text-center mt-4">
                  Le richieste vengono valutate manualmente.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Valutazione;
