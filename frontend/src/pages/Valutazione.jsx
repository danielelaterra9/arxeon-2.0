import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Valutazione = () => {
  const { t } = useTranslation();
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
    socialLinks: '',
    objective: '',
    budget: '',
    mainProblem: '',
    previousAttempts: '',
    improvementImportance: 3,
    privacyConsent: false,
  });

  const [errors, setErrors] = useState({});

  // Options from translations
  const sectors = [
    { id: 'consulting', label: t('evaluation.sectors.consulting') },
    { id: 'retail', label: t('evaluation.sectors.retail') },
    { id: 'ecommerce', label: t('evaluation.sectors.ecommerce') },
    { id: 'hospitality', label: t('evaluation.sectors.hospitality') },
    { id: 'health', label: t('evaluation.sectors.health') },
    { id: 'technology', label: t('evaluation.sectors.technology') },
    { id: 'manufacturing', label: t('evaluation.sectors.manufacturing') },
    { id: 'real_estate', label: t('evaluation.sectors.real_estate') },
    { id: 'finance', label: t('evaluation.sectors.finance') },
    { id: 'education', label: t('evaluation.sectors.education') },
    { id: 'other', label: t('evaluation.sectors.other') },
  ];

  const geoAreas = [
    { id: 'ticino', label: t('evaluation.areas.ticino') },
    { id: 'romandie', label: t('evaluation.areas.romandie') },
    { id: 'deutschschweiz', label: t('evaluation.areas.deutschschweiz') },
    { id: 'national', label: t('evaluation.areas.national') },
    { id: 'international', label: t('evaluation.areas.international') },
  ];

  const channels = [
    { id: 'social', label: t('evaluation.channels_list.social') },
    { id: 'ads', label: t('evaluation.channels_list.ads') },
    { id: 'seo', label: t('evaluation.channels_list.seo') },
    { id: 'email', label: t('evaluation.channels_list.email') },
    { id: 'website', label: t('evaluation.channels_list.website') },
    { id: 'offline', label: t('evaluation.channels_list.offline') },
    { id: 'none', label: t('evaluation.channels_list.none') },
  ];

  const objectives = [
    { id: 'acquisition', label: t('evaluation.objectives.acquisition') },
    { id: 'retention', label: t('evaluation.objectives.retention') },
    { id: 'awareness', label: t('evaluation.objectives.awareness') },
    { id: 'sales', label: t('evaluation.objectives.sales') },
    { id: 'leads', label: t('evaluation.objectives.leads') },
    { id: 'other', label: t('evaluation.objectives.other') },
  ];

  const budgets = [
    { id: 'under500', label: t('evaluation.budgets.under500') },
    { id: '500_1000', label: t('evaluation.budgets.500_1000') },
    { id: '1000_2000', label: t('evaluation.budgets.1000_2000') },
    { id: '2000_5000', label: t('evaluation.budgets.2000_5000') },
    { id: 'over5000', label: t('evaluation.budgets.over5000') },
    { id: 'undefined', label: t('evaluation.budgets.undefined') },
  ];

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Check if social channels are selected
  const hasSocialChannels = formData.channels.some(ch => 
    ['social', 'ads'].includes(ch)
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t('evaluation.form.required');
    if (!formData.email.trim()) {
      newErrors.email = t('evaluation.form.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('evaluation.form.invalid_email');
    }
    if (!formData.phone.trim()) newErrors.phone = t('evaluation.form.required');
    if (!formData.companyName.trim()) newErrors.companyName = t('evaluation.form.required');
    if (!formData.sector) newErrors.sector = t('evaluation.form.select_sector');
    if (!formData.geoArea) newErrors.geoArea = t('evaluation.form.select_area');
    if (formData.channels.length === 0) newErrors.channels = t('evaluation.form.select_channel');
    if (hasSocialChannels && !formData.socialLinks.trim()) {
      newErrors.socialLinks = t('evaluation.form.insert_social');
    }
    if (!formData.objective) newErrors.objective = t('evaluation.form.select_objective');
    if (!formData.budget) newErrors.budget = t('evaluation.form.select_budget');
    if (!formData.mainProblem.trim()) newErrors.mainProblem = t('evaluation.form.required');
    if (!formData.privacyConsent) newErrors.privacyConsent = t('evaluation.form.accept_privacy');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(t('evaluation.form.required'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/free-audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          website: formData.website,
          sector: formData.sector,
          geoArea: formData.geoArea,
          channels: formData.channels,
          objective: formData.objective,
          budget: formData.budget,
          mainProblem: formData.mainProblem,
          previousAttempts: formData.previousAttempts,
          improvementImportance: formData.improvementImportance,
        }),
      });

      if (!response.ok) {
        throw new Error('Errore nella richiesta');
      }

      const data = await response.json();
      sessionStorage.setItem('valutazioneData', JSON.stringify({...formData, auditId: data.id}));
      toast.success(t('common.success'));
      navigate('/valutazione/conferma');
    } catch (error) {
      console.error('Error submitting audit:', error);
      toast.error(t('common.error'));
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
              {t('evaluation.hero.title')}
            </h1>
            <p className="text-[#9a9a96] text-lg leading-relaxed">
              {t('evaluation.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-[#343633] hidden md:block"></div>
              
              <div className="space-y-12">
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center flex-shrink-0 text-[#161716] font-bold text-xl relative z-10">
                    1
                  </div>
                  <div className="pt-2">
                    <h3 className="text-white font-semibold text-lg mb-2">{t('evaluation.steps.step1_title')}</h3>
                    <p className="text-[#9a9a96]">{t('evaluation.steps.step1_desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center flex-shrink-0 text-[#161716] font-bold text-xl relative z-10">
                    2
                  </div>
                  <div className="pt-2">
                    <h3 className="text-white font-semibold text-lg mb-2">{t('evaluation.steps.step2_title')}</h3>
                    <p className="text-[#9a9a96]">{t('evaluation.steps.step2_desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center flex-shrink-0 text-[#161716] font-bold text-xl relative z-10">
                    3
                  </div>
                  <div className="pt-2">
                    <h3 className="text-white font-semibold text-lg mb-2">{t('evaluation.steps.step3_title')}</h3>
                    <p className="text-[#9a9a96]">{t('evaluation.steps.step3_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COSA OTTIENI / COSA NON È / A CHI È UTILE */}
      <section className="py-16 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-white font-bold text-xl mb-6">{t('evaluation.whatYouGet.title')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#9a9a96]">{t('evaluation.whatYouGet.point1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#9a9a96]">{t('evaluation.whatYouGet.point2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#9a9a96]">{t('evaluation.whatYouGet.point3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#9a9a96]">{t('evaluation.whatYouGet.point4')}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-xl mb-6">{t('evaluation.whatIsNot.title')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6f716d] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#6f716d]">{t('evaluation.whatIsNot.point1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6f716d] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#6f716d]">{t('evaluation.whatIsNot.point2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6f716d] mt-2.5 flex-shrink-0"></span>
                  <span className="text-[#6f716d]">{t('evaluation.whatIsNot.point3')}</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#2a2c29] p-6 rounded-xl border-2 border-[#c8f000]">
              <h3 className="text-[#c8f000] font-bold text-xl mb-6">{t('evaluation.whoIsFor.title')}</h3>
              <p className="text-white mb-4 font-medium">{t('evaluation.whoIsFor.intro')}</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-white">{t('evaluation.whoIsFor.point1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-white">{t('evaluation.whoIsFor.point2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                  <span className="text-white">{t('evaluation.whoIsFor.point3')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#c8f000] font-bold text-2xl mb-12 text-center">{t('evaluation.form.title')}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('evaluation.form.fullName')} <span className="text-[#c8f000]">*</span>
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
                      {t('evaluation.form.email')} <span className="text-[#c8f000]">*</span>
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
                      {t('evaluation.form.phone')} <span className="text-[#c8f000]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-[#161716] border rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-[#343633]'
                      }`}
                      placeholder="+41 00 000 00 00"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('evaluation.form.companyName')} <span className="text-[#c8f000]">*</span>
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
                      {t('evaluation.form.website')} <span className="text-[#6f716d] text-xs">({t('common.optional')})</span>
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
                      {t('evaluation.form.sector')} <span className="text-[#c8f000]">*</span>
                    </label>
                    <Select value={formData.sector} onValueChange={(value) => handleSelectChange('sector', value)}>
                      <SelectTrigger className={`w-full px-4 py-3 h-auto bg-[#161716] border rounded-lg text-white focus:ring-0 focus:ring-offset-0 ${
                        errors.sector ? 'border-red-500' : 'border-[#343633]'
                      }`}>
                        <SelectValue placeholder={t('evaluation.form.sector_placeholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2c29] border-[#343633]">
                        {sectors.map((sector) => (
                          <SelectItem key={sector.id} value={sector.id} className="text-white hover:bg-[#343633] focus:bg-[#343633] focus:text-[#c8f000]">
                            {sector.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.sector && <p className="text-red-500 text-sm mt-1">{errors.sector}</p>}
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('evaluation.form.geoArea')} <span className="text-[#c8f000]">*</span>
                    </label>
                    <Select value={formData.geoArea} onValueChange={(value) => handleSelectChange('geoArea', value)}>
                      <SelectTrigger className={`w-full px-4 py-3 h-auto bg-[#161716] border rounded-lg text-white focus:ring-0 focus:ring-offset-0 ${
                        errors.geoArea ? 'border-red-500' : 'border-[#343633]'
                      }`}>
                        <SelectValue placeholder={t('evaluation.form.geoArea_placeholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2c29] border-[#343633]">
                        {geoAreas.map((area) => (
                          <SelectItem key={area.id} value={area.id} className="text-white hover:bg-[#343633] focus:bg-[#343633] focus:text-[#c8f000]">
                            {area.label}
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
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-4">
                      {t('evaluation.form.channels')} <span className="text-[#c8f000]">*</span>
                    </label>
                    <p className="text-[#6f716d] text-xs mb-3">{t('evaluation.form.channels_hint')}</p>
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
                    
                    {hasSocialChannels && (
                      <div className="mt-4 p-4 bg-[#161716] rounded-lg border border-[#343633]">
                        <label className="block text-white text-sm font-medium mb-2">
                          {t('evaluation.form.socialLinks')} <span className="text-[#c8f000]">*</span>
                        </label>
                        <p className="text-[#6f716d] text-xs mb-3">
                          {t('evaluation.form.socialLinks_hint')}
                        </p>
                        <textarea
                          name="socialLinks"
                          value={formData.socialLinks}
                          onChange={handleInputChange}
                          rows={2}
                          className={`w-full px-4 py-3 bg-[#2a2c29] border rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors resize-none ${
                            errors.socialLinks ? 'border-red-500' : 'border-[#343633]'
                          }`}
                          placeholder="es: facebook.com/miazienda, instagram.com/miazienda"
                        />
                        {errors.socialLinks && <p className="text-red-500 text-sm mt-1">{errors.socialLinks}</p>}
                      </div>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        {t('evaluation.form.objective')} <span className="text-[#c8f000]">*</span>
                      </label>
                      <Select value={formData.objective} onValueChange={(value) => handleSelectChange('objective', value)}>
                        <SelectTrigger className={`w-full px-4 py-3 h-auto bg-[#161716] border rounded-lg text-white focus:ring-0 focus:ring-offset-0 ${
                          errors.objective ? 'border-red-500' : 'border-[#343633]'
                        }`}>
                          <SelectValue placeholder={t('evaluation.form.objective_placeholder')} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2a2c29] border-[#343633]">
                          {objectives.map((obj) => (
                            <SelectItem key={obj.id} value={obj.id} className="text-white hover:bg-[#343633] focus:bg-[#343633] focus:text-[#c8f000]">
                              {obj.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.objective && <p className="text-red-500 text-sm mt-1">{errors.objective}</p>}
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        {t('evaluation.form.budget')} <span className="text-[#c8f000]">*</span>
                      </label>
                      <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
                        <SelectTrigger className={`w-full px-4 py-3 h-auto bg-[#161716] border rounded-lg text-white focus:ring-0 focus:ring-offset-0 ${
                          errors.budget ? 'border-red-500' : 'border-[#343633]'
                        }`}>
                          <SelectValue placeholder={t('evaluation.form.budget_placeholder')} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2a2c29] border-[#343633]">
                          {budgets.map((budget) => (
                            <SelectItem key={budget.id} value={budget.id} className="text-white hover:bg-[#343633] focus:bg-[#343633] focus:text-[#c8f000]">
                              {budget.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('evaluation.form.mainProblem')} <span className="text-[#c8f000]">*</span>
                    </label>
                    <textarea
                      name="mainProblem"
                      value={formData.mainProblem}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 bg-[#161716] border rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors resize-none ${
                        errors.mainProblem ? 'border-red-500' : 'border-[#343633]'
                      }`}
                      placeholder={t('evaluation.form.mainProblem_placeholder')}
                    />
                    {errors.mainProblem && <p className="text-red-500 text-sm mt-1">{errors.mainProblem}</p>}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('evaluation.form.previousAttempts')}
                    </label>
                    <textarea
                      name="previousAttempts"
                      value={formData.previousAttempts}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#161716] border border-[#343633] rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors resize-none"
                      placeholder={t('evaluation.form.previousAttempts_placeholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-3">
                      {t('evaluation.form.importance')} <span className="text-[#c8f000]">*</span>
                    </label>
                    <div className="flex items-center justify-between gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, improvementImportance: value }))}
                          className={`flex-1 py-3 px-4 rounded-lg border text-center font-medium transition-all ${
                            formData.improvementImportance === value
                              ? 'bg-[#c8f000] text-[#161716] border-[#c8f000]'
                              : 'bg-[#161716] text-white border-[#343633] hover:border-[#c8f000]'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-[#6f716d]">
                      <span>{t('evaluation.form.importance_low')}</span>
                      <span>{t('evaluation.form.importance_high')}</span>
                    </div>
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
                    {t('evaluation.form.privacy')} <span className="text-[#c8f000]">*</span>
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
                      {t('evaluation.form.submitting')}
                    </span>
                  ) : (
                    <>
                      {t('evaluation.form.submit')}
                      <ArrowRight className="ml-2" size={18} />
                    </>
                  )}
                </button>
                <div className="flex items-start gap-2 mt-4 p-3 bg-[#161716] rounded-lg border border-[#343633]">
                  <Info className="text-[#c8f000] flex-shrink-0 mt-0.5" size={16} />
                  <p className="text-[#6f716d] text-sm">
                    {t('evaluation.form.ai_note')}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Valutazione;
