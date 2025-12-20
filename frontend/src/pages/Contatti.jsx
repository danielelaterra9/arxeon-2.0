import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

const Contatti = () => {
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

  return (
    <main className="pt-20">
      {/* HERO */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl leading-tight mb-6">
              Parliamone in modo chiaro.
            </h1>
            <p className="text-[#9a9a96] text-lg leading-relaxed">
              Se hai domande o vuoi chiarire alcuni punti,<br />
              puoi prenotare una call di chiarimento strategico.
            </p>
          </div>
        </div>
      </section>

      {/* PRENOTAZIONE CALENDLY */}
      <section className="py-16 bg-[#161716]">
        <div className="max-w-[900px] mx-auto px-5 md:px-10">
          <div 
            className="calendly-inline-widget rounded-xl overflow-hidden border border-[#343633]" 
            data-url="https://calendly.com/arxeon/30min?hide_gdpr_banner=1&background_color=161716&text_color=ffffff&primary_color=c8f000" 
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </section>

      {/* CONTATTI DIRETTI */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-white font-bold text-2xl mb-8">Preferisci scriverci?</h2>
            
            <a 
              href="mailto:info@arxeon.ch" 
              className="flex items-center justify-center gap-4 p-6 bg-[#2a2c29] rounded-xl border border-[#343633] hover:border-[#c8f000] transition-colors mb-8 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#343633] flex items-center justify-center flex-shrink-0 group-hover:bg-[#c8f000] transition-colors">
                <Mail className="text-[#c8f000] group-hover:text-[#161716] transition-colors" size={22} />
              </div>
              <div className="text-left">
                <p className="text-[#c8f000] font-semibold">info@arxeon.ch</p>
                <p className="text-[#6f716d] text-sm">Rispondiamo entro 24 ore lavorative</p>
              </div>
            </a>

            <p className="text-[#9a9a96] text-sm leading-relaxed mb-8">
              Nessuna pressione, nessun obbligo.<br />
              Solo una conversazione per capire se possiamo aiutarti.
            </p>

            <Link to="/valutazione" className="btn-secondary">
              Oppure richiedi una valutazione gratuita
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* RASSICURAZIONE UMANA */}
      <section className="py-16 bg-[#161716]">
        <div className="max-w-[700px] mx-auto px-5 md:px-10">
          <div className="bg-[#1f211f] p-8 rounded-xl border border-[#343633]">
            <h3 className="text-white font-semibold text-lg mb-4">
              Dietro Arxéon ci sono persone, non solo strumenti.
            </h3>
            <p className="text-[#9a9a96] text-sm leading-relaxed mb-6">
              Arxéon non è un sistema automatico né un servizio impersonale.
              Analisi, strategia e decisioni vengono gestite da persone, con metodo, responsabilità e supervisione continua.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-[#6f716d] text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] flex-shrink-0"></span>
                Strategia e direzione marketing
              </li>
              <li className="flex items-center gap-3 text-[#6f716d] text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] flex-shrink-0"></span>
                Analisi e lettura dei dati
              </li>
              <li className="flex items-center gap-3 text-[#6f716d] text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] flex-shrink-0"></span>
                Coordinamento operativo
              </li>
              <li className="flex items-center gap-3 text-[#6f716d] text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] flex-shrink-0"></span>
                Supervisione qualità e performance
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contatti;
