import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, Mail } from 'lucide-react';

const ValutazioneConferma = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Get form data from sessionStorage
    const storedData = sessionStorage.getItem('valutazioneData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    } else {
      // If no data, redirect to form
      navigate('/valutazione');
    }
  }, [navigate]);

  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!formData) {
    return null;
  }

  return (
    <main className="pt-20">
      {/* Success Section */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-[#343633] flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="text-[#c8f000]" size={40} />
            </div>
            <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl leading-tight mb-6">Richiesta inviata<br />con successo!</h1>
            <p className="text-[#9a9a96] text-lg mb-4">
              Grazie {formData.fullName.split(' ')[0]}, abbiamo ricevuto la tua richiesta di valutazione.
            </p>
            <div className="flex items-center justify-center gap-2 text-[#9a9a96] mb-8">
              <Mail size={18} />
              <span>Riceverai il report a: <span className="text-[#c8f000]">{formData.email}</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-16 bg-[#2a2c29]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Cosa succede ora?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633] text-center">
                <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#161716] font-bold">1</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Analisi</h3>
                <p className="text-[#9a9a96] text-sm">Studiamo le informazioni che ci hai fornito</p>
              </div>
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633] text-center">
                <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#161716] font-bold">2</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Report</h3>
                <p className="text-[#9a9a96] text-sm">Ti inviamo il report via email entro 48h</p>
              </div>
              <div className="bg-[#161716] p-6 rounded-xl border border-[#343633] text-center">
                <div className="w-12 h-12 rounded-full bg-[#c8f000] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#161716] font-bold">3</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Call</h3>
                <p className="text-[#9a9a96] text-sm">Se vuoi, approfondiamo insieme i risultati</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book a Call Section */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-[#c8f000]" size={24} />
                <span className="text-[#9a9a96] text-sm uppercase tracking-wider">Passo successivo (opzionale)</span>
              </div>
              <h2 className="text-[#c8f000] font-bold text-3xl md:text-4xl mb-6">Vuoi chiarire<br />alcuni punti?</h2>
              <p className="text-[#9a9a96] text-lg mb-8">
                Prenota una call di chiarimento strategico. 30 minuti per discutere 
                della tua situazione, rispondere alle tue domande e capire insieme 
                come procedere.
              </p>
              <div className="bg-[#2a2c29] p-6 rounded-xl border border-[#343633]">
                <h4 className="text-white font-semibold mb-4">Durante la call parleremo di:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#c8f000] mt-1">•</span>
                    <span className="text-[#9a9a96]">I tuoi obiettivi specifici e le priorità</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c8f000] mt-1">•</span>
                    <span className="text-[#9a9a96]">Le opportunità identificate dall'analisi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c8f000] mt-1">•</span>
                    <span className="text-[#9a9a96]">Il pacchetto più adatto alle tue esigenze</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c8f000] mt-1">•</span>
                    <span className="text-[#9a9a96]">Tempistiche e prossimi passi</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div 
                className="calendly-inline-widget rounded-xl overflow-hidden border border-[#343633]" 
                data-url="https://calendly.com/arxeon/30min?hide_gdpr_banner=1&background_color=161716&text_color=ffffff&primary_color=c8f000" 
                style={{ minWidth: '320px', height: '650px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-16 bg-[#2a2c29]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 text-center">
          <p className="text-[#9a9a96] mb-6">
            Non sei pronto per una call? Nessun problema. Riceverai comunque il report via email.
          </p>
          <Link to="/" className="btn-secondary">
            Torna alla home
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ValutazioneConferma;
