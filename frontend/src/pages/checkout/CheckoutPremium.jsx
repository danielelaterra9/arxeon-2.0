import React, { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Info, ArrowUpRight, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const stripePromise = loadStripe('pk_test_zCUhMH1T0mWFcGotPa0tV96M');

const CheckoutPremium = () => {
  const navigate = useNavigate();
  const [selectedScope, setSelectedScope] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [extraPlatform, setExtraPlatform] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');

  const basePrice = 400;

  const scopes = [
    { id: 'sito', name: 'Gestione e aggiornamento del sito internet' },
    { id: 'social', name: 'Gestione social media' },
    { id: 'ads', name: 'Gestione campagne pubblicitarie' },
    { id: 'email', name: 'Email marketing' },
    { id: 'seo', name: 'SEO' }
  ];

  const socialPlatforms = ['Instagram', 'Facebook', 'LinkedIn', 'TikTok'];
  const adsPlatforms = ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads'];

  const addons = [
    {
      id: 'sito',
      name: 'Creazione o rifacimento sito',
      description: 'Realizziamo o sistemiamo il tuo sito per renderlo chiaro e professionale.',
      priceOneShot: 800,
      priceMonthly: 0,
      type: 'one-shot'
    },
    {
      id: 'logo',
      name: 'Creazione o restyling logo',
      description: "Miglioriamo l'immagine del tuo brand per renderla coerente e riconoscibile.",
      priceOneShot: 650,
      priceMonthly: 0,
      type: 'one-shot'
    },
    {
      id: 'gmb',
      name: 'Ottimizzazione Google My Business',
      description: 'Ottimizziamo la tua presenza locale su Google.',
      priceOneShot: 200,
      priceMonthly: 100,
      type: 'hybrid'
    },
    {
      id: 'seo-addon',
      name: 'Ottimizzazione SEO',
      description: 'Miglioriamo la comprensione del sito da parte di Google.',
      priceOneShot: 0,
      priceMonthly: 500,
      type: 'monthly',
      hideIfScope: 'seo'
    }
  ];

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleScopeChange = useCallback((scopeId) => {
    setSelectedScope(scopeId);
    setSelectedPlatform('');
    setExtraPlatform(false);
  }, []);

  const showUpgradeMessage = useMemo(() => {
    const hasExtraPlatform = extraPlatform ? 1 : 0;
    const relevantAddonsCount = selectedAddons.filter(id => {
      const addon = addons.find(a => a.id === id);
      return addon && addon.type !== 'one-shot';
    }).length;
    const totalScopes = selectedScope ? 1 + hasExtraPlatform : 0;
    const totalRelevantAddons = relevantAddonsCount + hasExtraPlatform;
    return totalScopes >= 2 || (selectedScope && totalRelevantAddons >= 2);
  }, [selectedScope, extraPlatform, selectedAddons]);

  const totals = useMemo(() => {
    let monthly = basePrice;
    let oneShot = 0;

    if (extraPlatform) {
      monthly += 400;
    }

    selectedAddons.forEach(id => {
      const addon = addons.find(a => a.id === id);
      if (addon) {
        monthly += addon.priceMonthly;
        oneShot += addon.priceOneShot;
      }
    });

    return { monthly, oneShot };
  }, [extraPlatform, selectedAddons]);

  const filteredAddons = useMemo(() => addons.filter(addon => {
    if (addon.hideIfScope && addon.hideIfScope === selectedScope) {
      return false;
    }
    return true;
  }), [selectedScope]);

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

      {/* Step 1: Scelta ambito */}
      <section className="py-12 bg-[#1f211f]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#c8f000] flex items-center justify-center text-[#161716] font-bold text-sm">
              1
            </div>
            <h2 className="text-white font-bold text-xl">Cosa vuoi che gestiamo per te ogni mese?</h2>
          </div>
          <p className="text-[#9a9a96] mb-8 ml-11">
            Il pacchetto Premium include la gestione continuativa di un solo ambito. 
            Se hai bisogno di gestire più ambiti, puoi aggiungerli oppure valutare il pacchetto Gold.
          </p>

          <div className="space-y-3 ml-11">
            {scopes.map((scope) => (
              <div
                key={scope.id}
                onClick={() => handleScopeChange(scope.id)}
                className={`bg-[#2a2c29] p-5 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                  selectedScope === scope.id
                    ? 'border-[#c8f000]'
                    : 'border-[#343633] hover:border-[#6f716d]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedScope === scope.id
                    ? 'border-[#c8f000]'
                    : 'border-[#6f716d]'
                }`}>
                  {selectedScope === scope.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c8f000]"></div>
                  )}
                </div>
                <span className="text-white font-medium">{scope.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 2: Sotto-scelte condizionali */}
      {(selectedScope === 'social' || selectedScope === 'ads') && (
        <section className="py-12 bg-[#161716]">
          <div className="max-w-[900px] mx-auto px-5 md:px-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#c8f000] flex items-center justify-center text-[#161716] font-bold text-sm">
                2
              </div>
              <h2 className="text-white font-bold text-xl">
                {selectedScope === 'social'
                  ? 'Su quale piattaforma vuoi che gestiamo i contenuti?'
                  : 'Su quale piattaforma vuoi fare pubblicità?'
                }
              </h2>
            </div>

            {selectedScope === 'ads' && (
              <div className="bg-[#2a2c29] p-4 rounded-lg border border-[#343633] mb-6 ml-11">
                <p className="text-[#9a9a96] text-sm">
                  <Info className="inline-block text-[#c8f000] mr-2" size={16} />
                  Il budget pubblicitario non è incluso. È richiesto un budget minimo di CHF 300/mese per test e attivazione. 
                  Se la piattaforma scelta o il budget non fossero adeguati, ti contatteremo per trovare la soluzione migliore.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ml-11 mb-6">
              {(selectedScope === 'social' ? socialPlatforms : adsPlatforms).map((platform) => (
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

            {/* Extra platform add-on */}
            <div
              onClick={() => setExtraPlatform(!extraPlatform)}
              className={`bg-[#2a2c29] p-5 rounded-xl border cursor-pointer transition-all ml-11 ${
                extraPlatform
                  ? 'border-[#c8f000]'
                  : 'border-[#343633] hover:border-[#6f716d]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  extraPlatform
                    ? 'bg-[#c8f000] border-[#c8f000]'
                    : 'border-[#6f716d]'
                }`}>
                  {extraPlatform && <Check size={14} className="text-[#161716]" />}
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-white font-medium">
                      {selectedScope === 'social'
                        ? "Aggiungi gestione di un'altra piattaforma social"
                        : "Aggiungi gestione di un'altra piattaforma pubblicitaria"
                      }
                    </h3>
                    <span className="text-[#c8f000] font-semibold">CHF 400/mese</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Step 3: Add-on extra */}
      {selectedScope && (
        <section className="py-12 bg-[#1f211f]">
          <div className="max-w-[900px] mx-auto px-5 md:px-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#343633] flex items-center justify-center text-white font-bold text-sm">
                {(selectedScope === 'social' || selectedScope === 'ads') ? '3' : '2'}
              </div>
              <h2 className="text-white font-bold text-xl">Vuoi affidarci anche queste attività operative?</h2>
            </div>

            <div className="space-y-4 ml-11">
              {filteredAddons.map((addon) => (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`bg-[#2a2c29] p-5 rounded-xl border cursor-pointer transition-all ${
                    selectedAddons.includes(addon.id)
                      ? 'border-[#c8f000]'
                      : 'border-[#343633] hover:border-[#6f716d]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                      selectedAddons.includes(addon.id)
                        ? 'bg-[#c8f000] border-[#c8f000]'
                        : 'border-[#6f716d]'
                    }`}>
                      {selectedAddons.includes(addon.id) && <Check size={14} className="text-[#161716]" />}
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="text-white font-medium">{addon.name}</h3>
                        <div className="text-right">
                          {addon.priceOneShot > 0 && (
                            <span className="text-[#c8f000] font-semibold">CHF {addon.priceOneShot} one-shot</span>
                          )}
                          {addon.priceOneShot > 0 && addon.priceMonthly > 0 && (
                            <span className="text-[#6f716d]"> + </span>
                          )}
                          {addon.priceMonthly > 0 && (
                            <span className="text-[#c8f000] font-semibold">CHF {addon.priceMonthly}/mese</span>
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

      {/* Riepilogo e CTA */}
      <section className="py-12 bg-[#1f211f] border-t border-[#343633] sticky bottom-0">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-[#9a9a96] text-sm mb-1">Totale mensile</p>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-white">CHF {totals.monthly}</span>
                <span className="text-[#9a9a96]">/mese</span>
              </div>
              {totals.oneShot > 0 && (
                <p className="text-[#c8f000] text-sm mt-1">
                  + CHF {totals.oneShot} una tantum
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link to="/valutazione" className="btn-secondary text-center justify-center">
                Ho domande
              </Link>
              <button 
                className="btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedScope || ((selectedScope === 'social' || selectedScope === 'ads') && !selectedPlatform)}
              >
                Procedi al pagamento
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutPremium;
