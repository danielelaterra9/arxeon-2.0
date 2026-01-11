import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Info, ArrowUpRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAnalytics } from '../../hooks/useAnalytics';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CheckoutPremium = () => {
  const navigate = useNavigate();
  const [includedCategory, setIncludedCategory] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const { trackStartCheckout } = useAnalytics();

  const basePrice = 400;

  // Categories for Premium (required field)
  const categories = [
    { id: 'sito', name: 'Gestione e aggiornamento del sito internet' },
    { id: 'social', name: 'Gestione social media' },
    { id: 'ads', name: 'Gestione campagne pubblicitarie' },
    { id: 'email', name: 'Email marketing' },
    { id: 'seo', name: 'SEO' }
  ];

  const socialPlatforms = ['Instagram', 'Facebook', 'LinkedIn', 'TikTok'];
  const adsPlatforms = ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads'];

  // Available add-ons for Premium (code-based)
  const availableAddons = [
    {
      code: 'addon_social_extra_monthly',
      name: 'Piattaforma social aggiuntiva',
      description: 'Gestione di una seconda piattaforma social.',
      priceMonthly: 400,
      showIf: () => includedCategory === 'social'
    },
    {
      code: 'addon_ads_extra_monthly',
      name: 'Piattaforma ads aggiuntiva',
      description: 'Gestione di una seconda piattaforma pubblicitaria.',
      priceMonthly: 400,
      showIf: () => includedCategory === 'ads'
    },
    {
      code: 'addon_seo_monthly',
      name: 'Ottimizzazione SEO',
      description: 'Miglioriamo la comprensione del sito da parte di Google.',
      priceMonthly: 500,
      showIf: () => includedCategory !== 'seo'
    },
    {
      code: 'addon_gmb_monthly',
      name: 'Google My Business (gestione mensile)',
      description: 'Ottimizziamo la tua presenza locale su Google.',
      priceMonthly: 100
    },
    {
      code: 'oneshot_website',
      name: 'Creazione o rifacimento sito',
      description: 'Realizziamo o sistemiamo il tuo sito.',
      priceOneShot: 800
    },
    {
      code: 'oneshot_logo',
      name: 'Creazione o restyling logo',
      description: "Miglioriamo l'immagine del tuo brand.",
      priceOneShot: 650
    },
    {
      code: 'oneshot_gmb_setup',
      name: 'Setup Google My Business',
      description: 'Configurazione iniziale del profilo.',
      priceOneShot: 200
    }
  ];

  const toggleAddon = (addonCode) => {
    setSelectedAddons(prev =>
      prev.includes(addonCode)
        ? prev.filter(c => c !== addonCode)
        : [...prev, addonCode]
    );
  };

  const handleCategoryChange = (categoryId) => {
    setIncludedCategory(categoryId);
    setSelectedPlatform('');
    // Remove category-specific addons when category changes
    setSelectedAddons(prev => prev.filter(code => 
      !['addon_social_extra_monthly', 'addon_ads_extra_monthly'].includes(code)
    ));
  };

  const filteredAddons = useMemo(() => {
    return availableAddons.filter(addon => {
      if (addon.showIf) return addon.showIf();
      return true;
    });
  }, [includedCategory]);

  const totals = useMemo(() => {
    let monthly = basePrice;
    let oneShot = 0;

    selectedAddons.forEach(code => {
      const addon = availableAddons.find(a => a.code === code);
      if (addon) {
        if (addon.priceMonthly) monthly += addon.priceMonthly;
        if (addon.priceOneShot) oneShot += addon.priceOneShot;
      }
    });

    return { monthly, oneShot };
  }, [selectedAddons]);

  const showUpgradeMessage = useMemo(() => {
    const monthlyAddons = selectedAddons.filter(code => {
      const addon = availableAddons.find(a => a.code === code);
      return addon && addon.priceMonthly;
    });
    return monthlyAddons.length >= 2;
  }, [selectedAddons]);

  const handleCheckout = async () => {
    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      toast.error('Inserisci un indirizzo email valido');
      return;
    }

    if (!includedCategory) {
      toast.error('Seleziona una categoria operativa inclusa');
      return;
    }

    if ((includedCategory === 'social' || includedCategory === 'ads') && !selectedPlatform) {
      toast.error('Seleziona una piattaforma');
      return;
    }

    // Track checkout start
    trackStartCheckout('premium', totals.monthly, totals.oneShot, selectedAddons);

    setIsProcessing(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: 'premium',
          selectedAddons: selectedAddons,
          includedCategory: includedCategory,
          selectedPlatform: selectedPlatform || null,
          customerEmail: customerEmail
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Errore nella creazione del checkout');
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Si è verificato un errore. Riprova.');
      setIsProcessing(false);
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-[#161716]">
      {/* Header */}
      <section className="py-16 bg-[#161716] border-b border-[#343633]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <Link to="/servizi" className="text-[#9a9a96] hover:text-[#c8f000] transition-colors text-sm mb-6 inline-flex items-center gap-2">
            ← Torna ai pacchetti
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <span className="text-[#6f716d] text-sm uppercase tracking-wider mb-2 block">Checkout</span>
              <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl mb-2">Pacchetto Premium</h1>
              <p className="text-[#9a9a96] text-lg">Consulenza + gestione operativa di un ambito</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold text-white">CHF {basePrice}</span>
              <span className="text-[#9a9a96] ml-2">/ mese</span>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1: Categoria operativa inclusa (OBBLIGATORIA) */}
      <section className="py-12 bg-[#1f211f]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#c8f000] flex items-center justify-center text-[#161716] font-bold text-sm">
              1
            </div>
            <h2 className="text-white font-bold text-xl">Categoria operativa inclusa <span className="text-[#c8f000]">*</span></h2>
          </div>
          <p className="text-[#9a9a96] mb-8 ml-11">
            Il pacchetto Premium include la gestione continuativa di <strong className="text-white">una sola categoria</strong>. 
            Seleziona quella più importante per te.
          </p>

          <div className="space-y-3 ml-11">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`bg-[#2a2c29] p-5 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                  includedCategory === category.id
                    ? 'border-[#c8f000]'
                    : 'border-[#343633] hover:border-[#6f716d]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  includedCategory === category.id ? 'border-[#c8f000]' : 'border-[#6f716d]'
                }`}>
                  {includedCategory === category.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c8f000]"></div>
                  )}
                </div>
                <span className="text-white font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 2: Selezione piattaforma (condizionale) */}
      {(includedCategory === 'social' || includedCategory === 'ads') && (
        <section className="py-12 bg-[#161716]">
          <div className="max-w-[900px] mx-auto px-5 md:px-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#c8f000] flex items-center justify-center text-[#161716] font-bold text-sm">
                2
              </div>
              <h2 className="text-white font-bold text-xl">
                {includedCategory === 'social'
                  ? 'Su quale piattaforma vuoi che gestiamo i contenuti?'
                  : 'Su quale piattaforma vuoi fare pubblicità?'
                }
              </h2>
            </div>

            {includedCategory === 'ads' && (
              <div className="bg-[#2a2c29] p-4 rounded-lg border border-[#343633] mb-6 ml-11">
                <p className="text-[#9a9a96] text-sm">
                  <Info className="inline-block text-[#c8f000] mr-2" size={16} />
                  Il budget pubblicitario non è incluso. È richiesto un budget minimo di CHF 300/mese per test e attivazione.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ml-11">
              {(includedCategory === 'social' ? socialPlatforms : adsPlatforms).map((platform) => (
                <div
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`bg-[#2a2c29] p-4 rounded-xl border cursor-pointer transition-all text-center ${
                    selectedPlatform === platform
                      ? 'border-[#c8f000] bg-[#343633]'
                      : 'border-[#343633] hover:border-[#6f716d]'
                  }`}
                >
                  <span className={`font-medium ${
                    selectedPlatform === platform ? 'text-[#c8f000]' : 'text-white'
                  }`}>{platform}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step 3: Add-on */}
      {includedCategory && (
        <section className="py-12 bg-[#1f211f]">
          <div className="max-w-[900px] mx-auto px-5 md:px-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#343633] flex items-center justify-center text-white font-bold text-sm">
                {(includedCategory === 'social' || includedCategory === 'ads') ? '3' : '2'}
              </div>
              <h2 className="text-white font-bold text-xl">Vuoi aggiungere altri servizi?</h2>
            </div>
            <p className="text-[#9a9a96] mb-8 ml-11">
              Questi servizi non sono inclusi nel pacchetto base, ma possono essere aggiunti.
            </p>

            <div className="space-y-4 ml-11">
              {filteredAddons.map((addon) => (
                <div
                  key={addon.code}
                  onClick={() => toggleAddon(addon.code)}
                  className={`bg-[#2a2c29] p-5 rounded-xl border cursor-pointer transition-all ${
                    selectedAddons.includes(addon.code)
                      ? 'border-[#c8f000]'
                      : 'border-[#343633] hover:border-[#6f716d]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                      selectedAddons.includes(addon.code)
                        ? 'bg-[#c8f000] border-[#c8f000]'
                        : 'border-[#6f716d]'
                    }`}>
                      {selectedAddons.includes(addon.code) && <Check size={14} className="text-[#161716]" />}
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="text-white font-medium">{addon.name}</h3>
                        <div className="text-right">
                          {addon.priceMonthly && (
                            <span className="text-[#c8f000] font-semibold">CHF {addon.priceMonthly}/mese</span>
                          )}
                          {addon.priceOneShot && (
                            <span className="text-[#c8f000] font-semibold">CHF {addon.priceOneShot} una tantum</span>
                          )}
                        </div>
                      </div>
                      <p className="text-[#9a9a96] text-sm">{addon.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upgrade message */}
      {showUpgradeMessage && (
        <section className="py-8 bg-[#161716]">
          <div className="max-w-[900px] mx-auto px-5 md:px-10">
            <div className="bg-[#343633] p-6 rounded-xl border border-[#c8f000]">
              <p className="text-white mb-4">
                Se vuoi delegare più attività operative in parallelo, il pacchetto Gold è spesso più semplice ed efficiente.
              </p>
              <button
                onClick={() => navigate('/checkout/gold')}
                className="btn-primary"
              >
                Valuta il pacchetto Gold
                <ArrowUpRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Email Input Section */}
      {includedCategory && (
        <section className="py-8 bg-[#161716]">
          <div className="max-w-[900px] mx-auto px-5 md:px-10">
            <div className="bg-[#2a2c29] p-6 rounded-xl border border-[#343633]">
              <label className="block text-white font-medium mb-2">
                Email per la fatturazione <span className="text-[#c8f000]">*</span>
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="tua@email.ch"
                className="w-full px-4 py-3 bg-[#161716] border border-[#343633] rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors"
              />
            </div>
          </div>
        </section>
      )}

      {/* Riepilogo e CTA */}
      <section className="py-12 bg-[#1f211f] border-t border-[#343633] sticky bottom-0">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-[#9a9a96] text-sm mb-1">Totale stimato</p>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-white">CHF {totals.monthly}</span>
                <span className="text-[#9a9a96]">/mese</span>
              </div>
              {totals.oneShot > 0 && (
                <p className="text-[#c8f000] text-sm mt-1">
                  + CHF {totals.oneShot} una tantum
                </p>
              )}
              <p className="text-[#6f716d] text-xs mt-2">Il totale finale sarà mostrato nella schermata di pagamento.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link to="/valutazione" className="btn-secondary text-center justify-center">
                Ho domande
              </Link>
              <button 
                onClick={handleCheckout}
                className="btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProcessing || !includedCategory || !customerEmail || ((includedCategory === 'social' || includedCategory === 'ads') && !selectedPlatform)}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Elaborazione...
                  </>
                ) : (
                  <>
                    Procedi al pagamento
                    <ArrowRight className="ml-2" size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutPremium;
