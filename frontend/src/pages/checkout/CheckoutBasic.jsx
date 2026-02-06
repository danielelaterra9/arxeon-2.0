import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Info, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '../../hooks/useAnalytics';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CheckoutBasic = () => {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const { trackStartCheckout } = useAnalytics();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Basic package: CHF 200/mese
  const basePrice = 200;

  // Add-ons disponibili (stessi del Premium)
  const availableAddons = [
    {
      code: 'addon_social_monthly',
      nameKey: 'checkout.addons.social.name',
      descKey: 'checkout.addons.social.description',
      priceMonthly: 400
    },
    {
      code: 'addon_ads_monthly',
      nameKey: 'checkout.addons.ads.name',
      descKey: 'checkout.addons.ads.description',
      priceMonthly: 400
    },
    {
      code: 'addon_seo_monthly',
      nameKey: 'checkout.addons.seo.name',
      descKey: 'checkout.addons.seo.description',
      priceMonthly: 500
    },
    {
      code: 'addon_gmb_monthly',
      nameKey: 'checkout.addons.gmb.name',
      descKey: 'checkout.addons.gmb.description',
      priceMonthly: 100
    },
    {
      code: 'oneshot_website',
      nameKey: 'checkout.addons.website.name',
      descKey: 'checkout.addons.website.description',
      priceOneShot: 800
    },
    {
      code: 'oneshot_logo',
      nameKey: 'checkout.addons.logo.name',
      descKey: 'checkout.addons.logo.description',
      priceOneShot: 650
    },
    {
      code: 'oneshot_gmb_setup',
      nameKey: 'checkout.addons.gmb_setup.name',
      descKey: 'checkout.addons.gmb_setup.description',
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
    trackStartCheckout('basic', totals.monthly, totals.oneShot, selectedAddons);

    setIsProcessing(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package: 'basic',
          addons: selectedAddons,
          customerEmail: customerEmail
        }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(t('common.error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-[#161716]">
      {/* Header */}
      <section className="py-12 bg-[#161716] border-b border-[#343633]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <Link to="/servizi" className="text-[#9a9a96] text-sm hover:text-white mb-4 inline-block">
            {t('checkout.back_to_packages')}
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-[#c8f000] font-bold text-3xl">{t('checkout.basic.title')}</h1>
              <p className="text-[#9a9a96]">{t('checkout.basic.subtitle')}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-white">CHF {basePrice}</span>
              <span className="text-[#9a9a96]">{t('checkout.per_month')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Riepilogo */}
      <section className="py-12 bg-[#1f211f]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="bg-[#2a2c29] p-6 md:p-8 rounded-xl border border-[#343633]">
            <h2 className="text-white font-semibold text-lg mb-4">{t('checkout.basic.includes_title')}</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                <span className="text-[#9a9a96]">{t('checkout.basic.include1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                <span className="text-[#9a9a96]">{t('checkout.basic.include2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                <span className="text-[#9a9a96]">{t('checkout.basic.include3')}</span>
              </li>
            </ul>
            <div className="bg-[#161716] p-4 rounded-lg border border-[#343633]">
              <p className="text-[#9a9a96] text-sm leading-relaxed">
                <Info className="inline-block text-[#c8f000] mr-2" size={16} />
                {t('checkout.basic.note')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-12 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-semibold text-lg mb-2">{t('checkout.basic.addons_title')}</h2>
          <p className="text-[#9a9a96] text-sm mb-6">{t('checkout.basic.addons_subtitle')}</p>
          
          <div className="space-y-3">
            {availableAddons.map((addon) => (
              <div
                key={addon.code}
                onClick={() => toggleAddon(addon.code)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedAddons.includes(addon.code)
                    ? 'bg-[#2a2c29] border-[#c8f000]'
                    : 'bg-[#1f211f] border-[#343633] hover:border-[#6f716d]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    selectedAddons.includes(addon.code)
                      ? 'bg-[#c8f000] border-[#c8f000]'
                      : 'border-[#6f716d]'
                  }`}>
                    {selectedAddons.includes(addon.code) && <Check size={14} className="text-[#161716]" />}
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="text-white font-medium">{t(addon.nameKey)}</h3>
                      <div className="text-right">
                        {addon.priceMonthly && (
                          <span className="text-[#c8f000] font-semibold">CHF {addon.priceMonthly}{t('checkout.per_month')}</span>
                        )}
                        {addon.priceOneShot && (
                          <span className="text-[#c8f000] font-semibold">CHF {addon.priceOneShot} {t('checkout.one_time')}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-[#9a9a96] text-sm">{t(addon.descKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Input Section */}
      <section className="py-8 bg-[#1f211f]">
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
                <span className="text-3xl font-bold text-white">CHF {totals.monthly}</span>
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

export default CheckoutBasic;
