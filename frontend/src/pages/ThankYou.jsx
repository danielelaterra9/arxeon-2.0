import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, FileText, ClipboardList, Search, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '../hooks/useAnalytics';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ThankYou = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const { trackCompleteCheckout } = useAnalytics();

  const sessionId = searchParams.get('session_id');
  const subscriptionId = searchParams.get('subscription_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (sessionId) {
          const response = await fetch(`${BACKEND_URL}/api/verify-session/${sessionId}`);
          const data = await response.json();
          if (data.valid && data.subscription) {
            setSubscription(data.subscription);
            
            // Track complete checkout via GTM
            trackCompleteCheckout(data.subscription);
            // Track affiliate purchase if affiliate cookie exists
            if (window.ArxeonAffiliate && window.ArxeonAffiliate.hasAffiliate()) {
              try {
                await window.ArxeonAffiliate.trackPurchase({
                  customer_email: data.subscription.customer_email || '',
                  amount_chf: data.subscription.total_monthly / 100,
                  product_name: `Pacchetto ${data.subscription.package?.charAt(0).toUpperCase() + data.subscription.package?.slice(1)}`,
                  is_recurring: true,
                  month_number: 1
                });
                console.log('Affiliate purchase tracked successfully');
              } catch (affiliateError) {
                console.error('Error tracking affiliate purchase:', affiliateError);
              }
            }
          }
        } else if (subscriptionId) {
          const response = await fetch(`${BACKEND_URL}/api/subscription/${subscriptionId}`);
          const data = await response.json();
          setSubscription(data);
          
          // Track complete checkout via GTM
          trackCompleteCheckout(data);
          
          // Track affiliate purchase if affiliate cookie exists
          if (window.ArxeonAffiliate && window.ArxeonAffiliate.hasAffiliate()) {
            try {
              await window.ArxeonAffiliate.trackPurchase({
                customer_email: data.customer_email || '',
                amount_chf: data.total_monthly / 100,
                product_name: `Pacchetto ${data.package?.charAt(0).toUpperCase() + data.package?.slice(1)}`,
                is_recurring: true,
                month_number: 1
              });
              console.log('Affiliate purchase tracked successfully');
            } catch (affiliateError) {
              console.error('Error tracking affiliate purchase:', affiliateError);
            }
          }
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, subscriptionId, trackCompleteCheckout]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-[#161716] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#c8f000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#9a9a96]">{t('common.loading')}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-[#161716]">
      {/* Success Header */}
      <section className="py-20 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10 text-center">
          <div className="w-20 h-20 rounded-full bg-[#2a2c29] border-2 border-[#c8f000] flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="text-[#c8f000]" size={40} />
          </div>
          <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl mb-4">
            {t('thankYou.title')}
          </h1>
          <p className="text-[#9a9a96] text-lg">
            {t('thankYou.subtitle')}
          </p>
          {subscription && (
            <div className="mt-6 inline-block bg-[#2a2c29] px-6 py-3 rounded-full border border-[#343633]">
              <span className="text-[#9a9a96]">Pacchetto </span>
              <span className="text-[#c8f000] font-semibold">{subscription.package?.charAt(0).toUpperCase() + subscription.package?.slice(1)}</span>
              <span className="text-[#9a9a96]"> • </span>
              <span className="text-white font-semibold">CHF {(subscription.total_monthly / 100).toLocaleString('it-CH')}/mese</span>
            </div>
          )}
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-[#1f211f]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl mb-4 text-center">{t('thankYou.nextSteps')}</h2>
          
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#343633] hidden md:block transform -translate-x-1/2"></div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 md:gap-12">
                <div className="hidden md:block flex-1 text-right">
                  <h3 className="text-white font-semibold text-lg">{t('thankYou.step1')}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-[#161716] font-bold">1</span>
                </div>
                <div className="flex-1 md:opacity-0">
                  <h3 className="text-white font-semibold text-lg md:hidden">{t('thankYou.step1')}</h3>
                </div>
              </div>
              <div className="flex items-start gap-6 md:gap-12">
                <div className="hidden md:block flex-1"></div>
                <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-[#161716] font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{t('thankYou.step2')}</h3>
                </div>
              </div>
              <div className="flex items-start gap-6 md:gap-12">
                <div className="hidden md:block flex-1 text-right">
                  <h3 className="text-white font-semibold text-lg">{t('thankYou.step3')}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-[#161716] font-bold">3</span>
                </div>
                <div className="flex-1 md:opacity-0">
                  <h3 className="text-white font-semibold text-lg md:hidden">{t('thankYou.step3')}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Onboarding */}
      <section className="py-16 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10 text-center">
          <Link 
            to={`/onboarding${subscriptionId ? `?subscription_id=${subscriptionId}` : ''}`} 
            className="btn-primary text-base px-10 py-4"
          >
            {t('thankYou.step1')}
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>

      {/* Calendly Preview */}
      <section className="py-16 bg-[#1f211f]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="text-center mb-8">
            <h2 className="text-white font-bold text-2xl mb-4">{t('contact.call.title')}</h2>
          </div>
          <div 
            className="calendly-inline-widget rounded-xl overflow-hidden border border-[#343633]" 
            data-url="https://calendly.com/arxeon/30min?hide_gdpr_banner=1&background_color=161716&text_color=ffffff&primary_color=c8f000" 
            style={{ minWidth: '320px', height: '650px' }}
          />
        </div>
      </section>
    </main>
  );
};

export default ThankYou;
