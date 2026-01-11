// ARXEON AFFILIATE TRACKING
(function() {
  const API = 'https://rewardportal-1.preview.emergentagent.com/api';
  const DAYS = 60;

  function setCookie(n, v, d) {
    const e = new Date();
    e.setTime(e.getTime() + d*24*60*60*1000);
    document.cookie = `${n}=${v};expires=${e.toUTCString()};path=/;SameSite=Lax`;
  }

  function getCookie(n) {
    const c = document.cookie.split(';').find(c => c.trim().startsWith(n + '='));
    return c ? c.split('=')[1] : null;
  }

  async function trackClick(code) {
    const r = await fetch(`${API}/track/click`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({affiliate_code: code, visitor_id: getCookie('arx_visitor')})
    });
    if (r.ok) {
      const d = await r.json();
      setCookie('arx_visitor', d.visitor_id, DAYS);
      setCookie('arx_affiliate', code, DAYS);
    }
  }

  window.ArxeonAffiliate = {
    trackPurchase: async (data) => {
      const code = getCookie('arx_affiliate');
      if (!code) return null;
      const r = await fetch(`${API}/track/purchase`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...data, affiliate_code: code, visitor_id: getCookie('arx_visitor')})
      });
      return r.ok ? await r.json() : null;
    },
    hasAffiliate: () => !!getCookie('arx_affiliate'),
    getAffiliateCode: () => getCookie('arx_affiliate')
  };

  const ref = new URLSearchParams(location.search).get('ref');
  if (ref) trackClick(ref);
})();
