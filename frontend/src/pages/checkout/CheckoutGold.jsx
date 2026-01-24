import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Info, MessageCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '../../hooks/useAnalytics';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CheckoutGold = () => {
  const { t } = useTranslation();
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const { trackStartCheckout } = useAnalytics();

  const basePrice = 1700;

  // Available add-ons for Gold (code-based)
  const availableAddons = [
    {
      code: 'addon_second_business_monthly',
      name: 'Gestione di un secondo business',
      description: "Per la gestione di un'attività aggiuntiva distinta.",
      priceMonthly: 1200,
      selectable: true
    },
    {
      code: 'oneshot_website',
      name: 'Creazione o rifacimento sito',
      description: 'Realizziamo o sistemiamo il tuo sito.',
      priceOneShot: 800,
      selectable: true
    },
    {
      code: 'oneshot_logo',
      name: 'Creazione o restyling logo',
      description: "Miglioriamo l'immagine del tuo brand.",
      priceOneShot: 250,
      selectable: true
    }
  ];

  const toggleAddon = (addonCode) => {
    setSelectedAddons(prev =>
      prev.includes(addonCode)
        ? prev.filter(c => c !== addonCode)
        : [...prev, addonCode]
    );
  };

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

  const handleCheckout = async () => {
    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      toast.error(t('checkout.email_error'));
      return;
    }

    // Track checkout start
    trackStartCheckout('gold', totals.monthly, totals.oneShot, selectedAddons);

    setIsProcessing(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: 'gold',
          selectedAddons: selectedAddons,
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
              <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl mb-2">Pacchetto Gold</h1>
              <p className="text-[#9a9a96] text-lg">Collaboratore marketing dedicato</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold text-white">CHF {basePrice.toLocaleString("it-CH")}</span>
              <span className="text-[#9a9a96] ml-2">/ mese</span>
            </div>
          </div>
        </div>
      </section>

      {/* Riepilogo completo */}
      <section className="py-12 bg-[#1f211f]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#c8f000]">
            <h2 className="text-white font-bold text-xl mb-6">Il pacchetto Gold include tutto</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-[#c8f000] font-semibold mb-4">Gestione operativa completa</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">Sito internet e landing page</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">Social media (tutte le piattaforme)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">Campagne pubblicitarie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">Email marketing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">SEO e ottimizzazione</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#c8f000] font-semibold mb-4">Supervisione strategica</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">Analisi continua del business</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">Direzione strategica dedicata</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">Risposta entro 24h lavorative</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">Presa in carico entro 24h lavorative</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">Report e call periodiche</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#161716] p-4 rounded-lg border border-[#343633]">
              <p className="text-[#9a9a96] text-sm">
                <Info className="inline-block text-[#c8f000] mr-2" size={16} />
                Il pacchetto Gold è valido per <span className="text-white font-medium">un solo business e un solo settore</span>. 
                Multi-business o multi-settore richiedono accordo separato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add-on selezionabili */}
      <section className="py-12 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl mb-3">Servizi aggiuntivi</h2>
          <p className="text-[#9a9a96] mb-8">
            Puoi aggiungere questi servizi al tuo pacchetto Gold.
          </p>

          <div className="space-y-4">
            {availableAddons.filter(a => a.selectable).map((addon) => (
              <div
                key={addon.code}
                onClick={() => toggleAddon(addon.code)}
                className={`bg-[#2a2c29] p-5 md:p-6 rounded-xl border cursor-pointer transition-all ${
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
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-white font-medium">{addon.name}</h3>
                      <span className="text-[#c8f000] font-semibold">
                        {addon.priceMonthly ? `CHF ${addon.priceMonthly.toLocaleString("it-CH")}${t('checkout.per_month')}` : `CHF ${addon.priceOneShot} ${t('checkout.one_time')}`}
                      </span>
                    </div>
                    <p className="text-[#9a9a96] text-sm">{addon.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Esigenze fuori perimetro */}
      <section className="py-12 bg-[#1f211f]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl mb-3">Esigenze fuori dal perimetro standard</h2>
          <p className="text-[#9a9a96] mb-8">
            Per progetti più complessi o esigenze particolari, possiamo valutare insieme le opzioni.
          </p>

          <div className="space-y-4">
            {/* E-commerce */}
            <Link
              to="/contatti"
              className="bg-[#2a2c29] p-5 md:p-6 rounded-xl border border-[#343633] hover:border-[#6f716d] cursor-pointer transition-all block"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white font-medium mb-2">Progetto e-commerce</h3>
                  <p className="text-[#9a9a96] text-sm">Vendita online di prodotti o servizi.</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#c8f000] font-semibold">A partire da CHF 8&apos;000</p>
                  <p className="text-[#6f716d] text-sm">da definire in consulenza</p>
                  <span className="btn-secondary mt-3 text-sm py-2 px-4 inline-flex items-center">
                    <MessageCircle size={14} className="mr-2" />
                    Parliamone
                  </span>
                </div>
              </div>
            </Link>

            {/* Progetto custom */}
            <Link
              to="/contatti"
              className="bg-[#2a2c29] p-5 md:p-6 rounded-xl border border-[#343633] hover:border-[#6f716d] cursor-pointer transition-all block"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white font-medium mb-2">Progetto dedicato, complesso o analisi strategica avanzata</h3>
                  <p className="text-[#9a9a96] text-sm">Per esigenze particolari che richiedono un approccio su misura.</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#c8f000] font-semibold">Solo su misura</p>
                  <span className="btn-secondary mt-3 text-sm py-2 px-4 inline-flex items-center">
                    <MessageCircle size={14} className="mr-2" />
                    Richiedi consulenza
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Email Input Section */}
      <section className="py-8 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="bg-[#2a2c29] p-6 rounded-xl border border-[#343633]">
            <label className="block text-white font-medium mb-2">
              {t('checkout.email_label')} <span className="text-[#c8f000]">*</span>
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder={t('checkout.email_placeholder')}
              className="w-full px-4 py-3 bg-[#161716] border border-[#343633] rounded-lg text-white placeholder-[#6f716d] focus:outline-none focus:border-[#c8f000] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Riepilogo e CTA */}
      <section className="py-12 bg-[#1f211f] border-t border-[#343633] sticky bottom-0">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-[#9a9a96] text-sm mb-1">{t('checkout.total_estimated')}</p>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-white">CHF {totals.monthly.toLocaleString("it-CH")}</span>
                <span className="text-[#9a9a96]">{t('checkout.per_month')}</span>
              </div>
              {totals.oneShot > 0 && (
                <p className="text-[#c8f000] text-sm mt-1">
                  + CHF {totals.oneShot} {t('checkout.one_time')}
                </p>
              )}
              <p className="text-[#6f716d] text-xs mt-2">{t('checkout.total_note')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button 
                onClick={handleCheckout}
                disabled={isProcessing || !customerEmail}
                className="btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    {t('checkout.processing')}
                  </>
                ) : (
                  <>
                    {t('checkout.proceed')}
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

export default CheckoutGold;
              {showContactModal === 'ecommerce'
                ? 'I progetti e-commerce richiedono una valutazione dedicata per definire costi e tempistiche in base alle tue esigenze specifiche.'
                : 'I progetti complessi o le analisi strategiche avanzate vengono valutati caso per caso per garantire il miglior risultato.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowContactModal(null)} className="btn-secondary flex-1 justify-center">
                Annulla
              </button>
              <Link to="/contatti" className="btn-primary flex-1 justify-center">
                Prenota una call
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CheckoutGold;
