import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, FileText, ClipboardList, Search, Calendar } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

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
          }
        } else if (subscriptionId) {
          const response = await fetch(`${BACKEND_URL}/api/subscription/${subscriptionId}`);
          const data = await response.json();
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, subscriptionId]);

  // Load Calendly widget
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

  const steps = [
    {
      icon: FileText,
      title: 'Riceverai il contratto via email',
      description: 'Ti invieremo il contratto di servizio da accettare online.'
    },
    {
      icon: ClipboardList,
      title: 'Compila il formulario di onboarding',
      description: 'Raccogliamo le informazioni necessarie per iniziare.'
    },
    {
      icon: Search,
      title: 'Analizziamo il tuo caso',
      description: 'Il nostro team studierà la tua situazione attuale.'
    },
    {
      icon: Calendar,
      title: 'Prenota la prima consulenza',
      description: 'Fissiamo un incontro per allinearci sugli obiettivi.'
    }
  ];

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-[#161716] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#c8f000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#9a9a96]">Verifica pagamento in corso...</p>
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
            Grazie, il tuo servizio Arxéon è attivo.
          </h1>
          <p className="text-[#9a9a96] text-lg">
            Abbiamo ricevuto correttamente il pagamento.
          </p>
          {order && (
            <div className="mt-6 inline-block bg-[#2a2c29] px-6 py-3 rounded-full border border-[#343633]">
              <span className="text-[#9a9a96]">Pacchetto </span>
              <span className="text-[#c8f000] font-semibold">{order.package?.charAt(0).toUpperCase() + order.package?.slice(1)}</span>
              <span className="text-[#9a9a96]"> • </span>
              <span className="text-white font-semibold">CHF {(order.total_monthly / 100).toLocaleString('it-CH')}/mese</span>
            </div>
          )}
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-[#1f211f]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl mb-4 text-center">Ecco cosa succede ora</h2>
          <p className="text-[#9a9a96] text-center mb-12">Segui questi passaggi per attivare il servizio.</p>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#343633] hidden md:block transform -translate-x-1/2"></div>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-6 md:gap-12">
                  {index % 2 === 0 ? (
                    <>
                      <div className="hidden md:block flex-1 text-right">
                        <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                        <p className="text-[#9a9a96] text-sm mt-1">{step.description}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center flex-shrink-0 z-10">
                        <span className="text-[#161716] font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1 md:opacity-0">
                        <h3 className="text-white font-semibold text-lg md:hidden">{step.title}</h3>
                        <p className="text-[#9a9a96] text-sm mt-1 md:hidden">{step.description}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block flex-1"></div>
                      <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center flex-shrink-0 z-10">
                        <span className="text-[#161716] font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                        <p className="text-[#9a9a96] text-sm mt-1">{step.description}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Note */}
      <section className="py-8 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="bg-[#2a2c29] p-5 rounded-xl border border-[#343633]">
            <p className="text-[#6f716d] text-sm text-center">
              L{"'"}attivazione del servizio avviene tramite accettazione online. 
              Se necessario, ti chiederemo una firma digitale del contratto.
            </p>
          </div>
        </div>
      </section>

      {/* CTA - Onboarding */}
      <section className="py-16 bg-[#1f211f]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10 text-center">
          <h2 className="text-white font-bold text-2xl mb-4">Inizia subito</h2>
          <p className="text-[#9a9a96] mb-8">Compila il formulario di onboarding per permetterci di prepararci al meglio.</p>
          <Link 
            to={`/onboarding${orderId ? `?order_id=${orderId}` : ''}`} 
            className="btn-primary text-base px-10 py-4"
          >
            Inizia l{"'"}onboarding
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>

      {/* Calendly Preview */}
      <section className="py-16 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div className="text-center mb-8">
            <h2 className="text-white font-bold text-2xl mb-4">Oppure prenota subito la consulenza</h2>
            <p className="text-[#9a9a96]">Se preferisci, puoi già fissare la prima consulenza.</p>
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
