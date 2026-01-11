/**
 * useAnalytics Hook - Arxéon Analytics & Retargeting
 * 
 * Questo hook gestisce tutti gli eventi di tracking tramite GTM dataLayer.
 * Gli eventi vengono poi inoltrati a GA4, Meta Pixel, LinkedIn Insight Tag.
 * 
 * Eventi disponibili:
 * - Page views: view_home, view_services, view_valutazione, view_metodo, view_contatti
 * - Form: submit_valutazione, view_thankyou_valutazione
 * - Checkout: start_checkout_basic, start_checkout_premium, start_checkout_gold, complete_checkout
 */

import { useCallback } from 'react';

// Inizializza dataLayer se non esiste
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

/**
 * Push evento al dataLayer di GTM
 */
const pushEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams
    });
    
    // Debug log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, eventParams);
    }
  }
};

/**
 * Hook principale per analytics
 */
export const useAnalytics = () => {
  
  // ==================== PAGE VIEW EVENTS ====================
  
  const trackPageView = useCallback((pageName, additionalParams = {}) => {
    pushEvent(`view_${pageName}`, {
      page_name: pageName,
      page_path: window.location.pathname,
      page_url: window.location.href,
      ...additionalParams
    });
  }, []);

  const trackViewHome = useCallback(() => {
    trackPageView('home');
  }, [trackPageView]);

  const trackViewServices = useCallback(() => {
    trackPageView('services');
  }, [trackPageView]);

  const trackViewValutazione = useCallback(() => {
    trackPageView('valutazione');
  }, [trackPageView]);

  const trackViewMetodo = useCallback(() => {
    trackPageView('metodo');
  }, [trackPageView]);

  const trackViewContatti = useCallback(() => {
    trackPageView('contatti');
  }, [trackPageView]);

  // ==================== FORM EVENTS ====================

  const trackSubmitValutazione = useCallback((formData = {}) => {
    pushEvent('submit_valutazione', {
      form_name: 'valutazione_gratuita',
      sector: formData.sector || '',
      geo_area: formData.geoArea || '',
      objective: formData.objective || '',
      budget: formData.budget || '',
      channels: formData.channels?.join(',') || ''
    });
  }, []);

  const trackViewThankYouValutazione = useCallback(() => {
    pushEvent('view_thankyou_valutazione', {
      page_name: 'thankyou_valutazione',
      page_path: '/valutazione/conferma'
    });
  }, []);

  // ==================== CHECKOUT EVENTS ====================

  const trackStartCheckout = useCallback((packageType, totalMonthly = 0, totalOneShot = 0, addons = []) => {
    const eventName = `start_checkout_${packageType}`;
    pushEvent(eventName, {
      package_type: packageType,
      currency: 'CHF',
      value_monthly: totalMonthly,
      value_oneshot: totalOneShot,
      addons: addons.join(','),
      // Per Meta Pixel - InitiateCheckout
      content_type: 'product',
      content_name: `Pacchetto ${packageType.charAt(0).toUpperCase() + packageType.slice(1)}`,
      content_ids: [packageType]
    });
  }, []);

  const trackCompleteCheckout = useCallback((subscriptionData = {}) => {
    pushEvent('complete_checkout', {
      transaction_id: subscriptionData.id || '',
      package_type: subscriptionData.package || '',
      currency: 'CHF',
      value: subscriptionData.total_monthly ? subscriptionData.total_monthly / 100 : 0,
      customer_email: subscriptionData.customer_email || '',
      // Per Meta Pixel - Purchase
      content_type: 'product',
      content_name: `Pacchetto ${subscriptionData.package?.charAt(0).toUpperCase() + subscriptionData.package?.slice(1)}`,
      content_ids: [subscriptionData.package],
      num_items: 1
    });
  }, []);

  // ==================== GENERIC TRACKING ====================

  const trackEvent = useCallback((eventName, params = {}) => {
    pushEvent(eventName, params);
  }, []);

  return {
    // Page views
    trackPageView,
    trackViewHome,
    trackViewServices,
    trackViewValutazione,
    trackViewMetodo,
    trackViewContatti,
    // Forms
    trackSubmitValutazione,
    trackViewThankYouValutazione,
    // Checkout
    trackStartCheckout,
    trackCompleteCheckout,
    // Generic
    trackEvent
  };
};

export default useAnalytics;
