import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Info, ArrowUpRight, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const stripePromise = loadStripe('pk_live_51SZY44Cdt6E6uRkpGd0maHnrXDrpGsnk70gbd64NYco7ZJIDJtG1CPGDLzqmgZEIs9YLicnw3AaSyC0CVGuKwSpw00sIiHe9uy');

const CheckoutBasic = () => {
  const navigate = useNavigate();
  const [selectedAddons, setSelectedAddons] = useState([]);

  const basePrice = 200;

  const addons = [
    {
      id: 'sito',
      name: 'Creazione o rifacimento del sito internet',
      subtitle: '(non e-commerce)',
      description: 'Realizziamo o sistemiamo il tuo sito per renderlo chiaro, professionale e facile da usare.',
      priceOneShot: 800,
      priceMonthly: 0,
      type: 'one-shot'
    },
    {
      id: 'logo',
      name: 'Creazione o restyling logo e identità visiva',
      description: "Miglioriamo l'immagine del tuo brand per renderla coerente e riconoscibile.",
      priceOneShot: 650,
      priceMonthly: 0,
      type: 'one-shot'
    },
    {
      id: 'social',
      name: 'Gestione di una pagina social',
      subtitle: '(1 piattaforma)',
      description: 'Gestiamo contenuti e pubblicazioni su una piattaforma a tua scelta.',
      priceOneShot: 0,
      priceMonthly: 400,
      type: 'monthly'
    },
    {
      id: 'ads',
      name: 'Gestione campagne pubblicitarie',
      subtitle: '(1 piattaforma)',
      description: 'Gestiamo le campagne pubblicitarie per portare contatti o visibilità.',
      priceOneShot: 0,
      priceMonthly: 400,
      type: 'monthly',
      note: "È richiesto un budget minimo di CHF 300/mese per test e attivazione. Se l'analisi iniziale mostra che la piattaforma scelta o il budget non sono ottimali, ti contatteremo per definire la soluzione migliore."
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
      id: 'seo',
      name: 'Ottimizzazione e revisione SEO del sito',
      description: 'Miglioriamo la comprensione del sito da parte di Google.',
      priceOneShot: 0,
      priceMonthly: 500,
      type: 'monthly'
    }
  ];

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const showUpgradeMessage = useMemo(() => {
    const monthlyCount = selectedAddons.filter(id => {
      const addon = addons.find(a => a.id === id);
      return addon && (addon.type === 'monthly' || addon.type === 'hybrid');
    }).length;
    const totalCount = selectedAddons.length;
    return monthlyCount >= 1 || totalCount >= 2;
  }, [selectedAddons]);

  const totals = useMemo(() => {
    let monthly = basePrice;
    let oneShot = 0;
    selectedAddons.forEach(id => {
      const addon = addons.find(a => a.id === id);
      if (addon) {
        monthly += addon.priceMonthly;
        oneShot += addon.priceOneShot;
      }
    });
    return { monthly, oneShot };
  }, [selectedAddons]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');

  const handleCheckout = async () => {
    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      toast.error('Inserisci un indirizzo email valido');
      return;
    }

    setIsProcessing(true);

    try {
      // Build items array
      const items = [
        {
          name: 'Pacchetto Basic - Consulenza strategica',
          price: basePrice * 100, // Convert to cents
          type: 'subscription',
          quantity: 1
        }
      ];

      // Add selected addons
      selectedAddons.forEach(id => {
        const addon = addons.find(a => a.id === id);
        if (addon) {
          if (addon.priceMonthly > 0) {
            items.push({
              name: addon.name,
              price: addon.priceMonthly * 100,
              type: 'subscription',
              quantity: 1
            });
          }
          if (addon.priceOneShot > 0) {
            items.push({
              name: addon.name + ' (setup)',
              price: addon.priceOneShot * 100,
              type: 'one_time',
              quantity: 1
            });
          }
        }
      });

      const response = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package: 'basic',
          items,
          customer_email: customerEmail
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Si è verificato un errore. Riprova.');
    } finally {
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
              <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl mb-2">Pacchetto Basic</h1>
              <p className="text-[#9a9a96] text-lg">Consulenza strategica e analisi</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold text-white">CHF {basePrice}</span>
              <span className="text-[#9a9a96] ml-2">/ mese</span>
            </div>
          </div>
        </div>
      </section>

      {/* Riepilogo */}
      <section className="py-12 bg-[#1f211f]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#343633]">
            <h2 className="text-white font-semibold text-lg mb-4">Cosa include il pacchetto Basic</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                <span className="text-[#9a9a96]">Analisi mensile del business e del marketing</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                <span className="text-[#9a9a96]">Analisi strumenti e dati forniti dal cliente</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                <span className="text-[#9a9a96]">1 consulenza strategica mensile (20–40 minuti)</span>
              </li>
            </ul>
            <div className="bg-[#161716] p-4 rounded-lg border border-[#343633]">
              <p className="text-[#9a9a96] text-sm leading-relaxed">
                <Info className="inline-block text-[#c8f000] mr-2" size={16} />
                Con il pacchetto Basic ti aiutiamo a prendere decisioni migliori, ma l{"'"}implementazione resta a tuo carico. 
                Se vuoi che gestiamo direttamente alcune attività operative, puoi aggiungerle qui sotto oppure valutare il pacchetto Premium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add-on operativi */}
      <section className="py-12 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl mb-3">Vuoi che ci occupiamo direttamente anche di queste attività?</h2>
          <p className="text-[#9a9a96] mb-8">
            Queste attività non sono incluse nel pacchetto Basic, ma possono essere prese in carico dal nostro team.
          </p>

          <div className="space-y-4">
            {addons.map((addon) => (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`bg-[#2a2c29] p-5 md:p-6 rounded-xl border cursor-pointer transition-all ${
                  selectedAddons.includes(addon.id)
                    ? 'border-[#c8f000] bg-[#2a2c29]'
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
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-white font-medium">
                        {addon.name}
                        {addon.subtitle && <span className="text-[#6f716d] font-normal"> {addon.subtitle}</span>}
                      </h3>
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
                    <p className="text-[#9a9a96] text-sm mb-2">{addon.description}</p>
                    {addon.note && (
                      <div className="bg-[#161716] p-3 rounded-lg mt-3">
                        <p className="text-[#6f716d] text-xs leading-relaxed">
                          <Info className="inline-block mr-1" size={12} />
                          {addon.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade message */}
          {showUpgradeMessage && (
            <div className="mt-8 bg-[#343633] p-6 rounded-xl border border-[#c8f000]">
              <p className="text-white mb-4">
                Se vuoi che gestiamo in modo continuativo un{"'"}attività ogni mese, il pacchetto Premium è spesso più semplice ed efficiente.
              </p>
              <button
                onClick={() => navigate('/checkout/premium')}
                className="btn-primary"
              >
                Passa a Premium
                <ArrowUpRight className="ml-2" size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Email Input Section */}
      <section className="py-8 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="bg-[#2a2c29] p-6 rounded-xl border border-[#343633]">
            <label className="block text-white font-medium mb-2">
              Email per la fatturazione
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
                onClick={handleCheckout}
                disabled={isProcessing || !customerEmail}
                className="btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 animate-spin\" size={16} />
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

export default CheckoutBasic;
