import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Info, MessageCircle } from 'lucide-react';

const CheckoutGold = () => {
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [showContactModal, setShowContactModal] = useState(null);

  const basePrice = 1700;

  const toggleAddon = (addonId) => {
    if (addonId === 'ecommerce' || addonId === 'custom') {
      setShowContactModal(addonId);
      return;
    }
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    let monthly = basePrice;

    if (selectedAddons.includes('second-business')) {
      monthly += 1200;
    }

    return { monthly };
  };

  const totals = calculateTotal();

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

      {/* Add-on fuori perimetro */}
      <section className="py-12 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl mb-3">Esigenze fuori dal perimetro standard</h2>
          <p className="text-[#9a9a96] mb-8">
            Per progetti più complessi o esigenze particolari, possiamo valutare insieme le opzioni.
          </p>

          <div className="space-y-4">
            {/* E-commerce */}
            <div
              onClick={() => toggleAddon('ecommerce')}
              className="bg-[#2a2c29] p-5 md:p-6 rounded-xl border border-[#343633] hover:border-[#6f716d] cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white font-medium mb-2">Progetto e-commerce</h3>
                  <p className="text-[#9a9a96] text-sm">Vendita online di prodotti o servizi.</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#c8f000] font-semibold">A partire da CHF 8'000</p>
                  <p className="text-[#6f716d] text-sm">da definire in consulenza</p>
                  <button className="btn-secondary mt-3 text-sm py-2 px-4">
                    <MessageCircle size={14} className="mr-2" />
                    Parliamone
                  </button>
                </div>
              </div>
            </div>

            {/* Secondo business */}
            <div
              onClick={() => toggleAddon('second-business')}
              className={`bg-[#2a2c29] p-5 md:p-6 rounded-xl border cursor-pointer transition-all ${
                selectedAddons.includes('second-business')
                  ? 'border-[#c8f000]'
                  : 'border-[#343633] hover:border-[#6f716d]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                  selectedAddons.includes('second-business')
                    ? 'bg-[#c8f000] border-[#c8f000]'
                    : 'border-[#6f716d]'
                }`}>
                  {selectedAddons.includes('second-business') && <Check size={14} className="text-[#161716]" />}
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="text-white font-medium">Gestione di un secondo business</h3>
                    <span className="text-[#c8f000] font-semibold">CHF 1'200/mese</span>
                  </div>
                  <p className="text-[#9a9a96] text-sm">Per la gestione di un{"'"}attività aggiuntiva distinta.</p>
                </div>
              </div>
            </div>

            {/* Progetto custom */}
            <div
              onClick={() => toggleAddon('custom')}
              className="bg-[#2a2c29] p-5 md:p-6 rounded-xl border border-[#343633] hover:border-[#6f716d] cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white font-medium mb-2">Progetto dedicato, complesso o analisi strategica avanzata</h3>
                  <p className="text-[#9a9a96] text-sm">Per esigenze particolari che richiedono un approccio su misura.</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#c8f000] font-semibold">Solo su misura</p>
                  <button className="btn-secondary mt-3 text-sm py-2 px-4">
                    <MessageCircle size={14} className="mr-2" />
                    Richiedi consulenza
                  </button>
                </div>
              </div>
            </div>
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
                <span className="text-3xl font-bold text-white">CHF {totals.monthly.toLocaleString("it-CH")}</span>
                <span className="text-[#9a9a96]">/mese</span>
              </div>
              {selectedAddons.includes('second-business') && (
                <p className="text-[#6f716d] text-sm mt-1">
                  Include gestione secondo business
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link to="/valutazione" className="btn-secondary text-center justify-center">
                Preferisco una call prima
              </Link>
              <button className="btn-primary justify-center">
                Procedi al pagamento
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowContactModal(null)}>
          <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#343633] max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[#c8f000] font-bold text-xl mb-4">
              {showContactModal === 'ecommerce' ? 'Progetto e-commerce' : 'Progetto su misura'}
            </h3>
            <p className="text-[#9a9a96] mb-6">
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
