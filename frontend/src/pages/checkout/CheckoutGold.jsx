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
      nameKey: 'checkout.addons.second_business.name',
      descKey: 'checkout.addons.second_business.description',
      priceMonthly: 1200,
      selectable: true
    },
    {
      code: 'oneshot_website',
      nameKey: 'checkout.addons.website.name',
      descKey: 'checkout.addons.website.description',
      priceOneShot: 800,
      selectable: true
    },
    {
      code: 'oneshot_logo',
      nameKey: 'checkout.addons.logo.name',
      descKey: 'checkout.addons.logo.description',
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
        throw new Error(data.detail || t('common.error'));
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || t('common.error'));
      setIsProcessing(false);
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-[#161716]">
      {/* Header */}
      <section className="py-16 bg-[#161716] border-b border-[#343633]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <Link to="/servizi" className="text-[#9a9a96] hover:text-[#c8f000] transition-colors text-sm mb-6 inline-flex items-center gap-2">
            {t('checkout.back_to_packages')}
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <span className="text-[#6f716d] text-sm uppercase tracking-wider mb-2 block">Checkout</span>
              <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl mb-2">{t('checkout.gold.title')}</h1>
              <p className="text-[#9a9a96] text-lg">{t('checkout.gold.subtitle')}</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold text-white">CHF {basePrice.toLocaleString("it-CH")}</span>
              <span className="text-[#9a9a96] ml-2">{t('checkout.per_month')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Riepilogo completo */}
      <section className="py-12 bg-[#1f211f]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#c8f000]">
            <h2 className="text-white font-bold text-xl mb-6">{t('checkout.gold.includes_title')}</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-[#c8f000] font-semibold mb-4">{t('checkout.gold.operational_title')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">{t('checkout.gold.operational1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">{t('checkout.gold.operational2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">{t('checkout.gold.operational3')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">{t('checkout.gold.operational4')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">{t('checkout.gold.operational5')}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#c8f000] font-semibold mb-4">{t('checkout.gold.strategic_title')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">{t('checkout.gold.strategic1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">{t('checkout.gold.strategic2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">{t('checkout.gold.strategic3')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">{t('checkout.gold.strategic4')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#9a9a96]">{t('checkout.gold.strategic5')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#161716] p-4 rounded-lg border border-[#343633]">
              <p className="text-[#9a9a96] text-sm">
                <Info className="inline-block text-[#c8f000] mr-2" size={16} />
                {t('checkout.gold.scope_note')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add-on selezionabili */}
      <section className="py-12 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl mb-3">{t('checkout.gold.addons_title')}</h2>
          <p className="text-[#9a9a96] mb-8">
            {t('checkout.gold.addons_subtitle')}
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
                      <h3 className="text-white font-medium">{t(addon.nameKey)}</h3>
                      <span className="text-[#c8f000] font-semibold">
                        {addon.priceMonthly ? `CHF ${addon.priceMonthly.toLocaleString("it-CH")}${t('checkout.per_month')}` : `CHF ${addon.priceOneShot} ${t('checkout.one_time')}`}
                      </span>
                    </div>
                    <p className="text-[#9a9a96] text-sm">{t(addon.descKey)}</p>
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
          <h2 className="text-white font-bold text-2xl mb-3">{t('checkout.gold.custom_title')}</h2>
          <p className="text-[#9a9a96] mb-8">
            {t('checkout.gold.custom_subtitle')}
          </p>

          <div className="space-y-4">
            {/* E-commerce */}
            <Link
              to="/contatti"
              className="bg-[#2a2c29] p-5 md:p-6 rounded-xl border border-[#343633] hover:border-[#6f716d] cursor-pointer transition-all block"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white font-medium mb-2">{t('checkout.gold.ecommerce_title')}</h3>
                  <p className="text-[#9a9a96] text-sm">{t('checkout.gold.ecommerce_desc')}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#c8f000] font-semibold">{t('checkout.gold.ecommerce_price')}</p>
                  <p className="text-[#6f716d] text-sm">{t('checkout.gold.ecommerce_note')}</p>
                  <span className="btn-secondary mt-3 text-sm py-2 px-4 inline-flex items-center">
                    <MessageCircle size={14} className="mr-2" />
                    {t('checkout.gold.talk_cta')}
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
                  <h3 className="text-white font-medium mb-2">{t('checkout.gold.custom_project_title')}</h3>
                  <p className="text-[#9a9a96] text-sm">{t('checkout.gold.custom_project_desc')}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#c8f000] font-semibold">{t('checkout.gold.custom_project_price')}</p>
                  <span className="btn-secondary mt-3 text-sm py-2 px-4 inline-flex items-center">
                    <MessageCircle size={14} className="mr-2" />
                    {t('checkout.gold.consultation_cta')}
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
