import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Info, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAnalytics } from '../../hooks/useAnalytics';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CheckoutBasic = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const { trackStartCheckout } = useAnalytics();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Basic package: CHF 200/mese - NO add-on operativi
  const basePrice = 200;

  const handleCheckout = async () => {
    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      toast.error('Inserisci un indirizzo email valido');
      return;
    }

    // Track checkout start
    trackStartCheckout('basic', basePrice, 0, []);

    setIsProcessing(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: 'basic',
          selectedAddons: [], // Basic non ha add-on operativi
          customerEmail: customerEmail
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Errore nella creazione del checkout');
      }

      // Redirect to Stripe Checkout
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
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Input Section */}
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

      {/* Riepilogo e CTA */}
      <section className="py-12 bg-[#1f211f] border-t border-[#343633] sticky bottom-0">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-[#9a9a96] text-sm mb-1">Totale stimato</p>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-white">CHF {basePrice}</span>
                <span className="text-[#9a9a96]">/mese</span>
              </div>
              <p className="text-[#6f716d] text-xs mt-2">Il totale finale sarà mostrato nella schermata di pagamento.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link to="/servizi#faq" className="btn-secondary text-center justify-center">
                Ho domande
              </Link>
              <Link to="/servizi" className="btn-secondary text-center justify-center">
                Vedi i pacchetti
              </Link>
              <button 
                onClick={handleCheckout}
                disabled={isProcessing || !customerEmail}
                className="btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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

export default CheckoutBasic;
