import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <main className="pt-20">
      {/* SEZIONE 1 – HERO */}
      <section className="min-h-[calc(100vh-80px)] flex items-center bg-[#161716] relative">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 w-full">
          <div className="max-w-4xl">
            <h1 className="text-[#c8f000] font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8">
              Marketing che lavora<br />
              per il tuo business,<br />
              <span className="text-white">non il contrario.</span>
            </h1>
            <p className="text-[#9a9a96] text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Servizi marketing strutturati, dalla consulenza strategica alla gestione operativa, 
              per professionisti e aziende che vogliono chiarezza, controllo e risultati misurabili.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link to="/valutazione" className="btn-primary text-base px-8 py-4">
                Ottieni una valutazione gratuita
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link 
                to="/servizi" 
                className="text-[#9a9a96] hover:text-[#c8f000] transition-colors text-base font-medium py-4 px-2 flex items-center gap-2"
              >
                Scopri i pacchetti
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 2 – IDENTIFICAZIONE DEL PROBLEMA */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-[#c8f000] font-bold text-3xl md:text-4xl leading-tight mb-8">
              Il problema non è fare marketing.<br />
              <span className="text-white">È farlo senza controllo.</span>
            </h2>
            <p className="text-[#9a9a96] text-lg mb-8">
              Molti business investono tempo e budget in attività marketing che non portano risultati chiari:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                <span className="text-[#9a9a96] text-lg">social pubblicati senza una strategia reale</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                <span className="text-[#9a9a96] text-lg">pubblicità che consuma budget senza dati leggibili</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                <span className="text-[#9a9a96] text-lg">siti web che non generano contatti</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                <span className="text-[#9a9a96] text-lg">decisioni prese a sensazione</span>
              </li>
            </ul>
            <p className="text-white text-xl font-medium">
              Il problema non è fare marketing, ma farlo senza una direzione chiara o senza sapere cosa aspettarsi.
            </p>
          </div>
        </div>
      </section>

      {/* SEZIONE 3 – SOLUZIONE ARXÉON */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-[#c8f000] font-bold text-3xl md:text-4xl leading-tight mb-8">
              Arxéon rende il marketing<br />
              uno strumento di lavoro.
            </h2>
            <div className="space-y-6">
              <p className="text-[#9a9a96] text-lg leading-relaxed">
                Arxéon non aggiunge attività inutili.
              </p>
              <p className="text-white text-xl font-medium leading-relaxed">
                Rende il marketing comprensibile, strutturato e orientato ai risultati.
              </p>
              <p className="text-[#9a9a96] text-lg leading-relaxed">
                Ogni progetto parte da un principio semplice:
              </p>
              <p className="text-[#c8f000] text-xl font-semibold leading-relaxed mb-8">
                il marketing deve aiutare il business a prendere decisioni migliori.
              </p>
              <div className="bg-[#2a2c29] p-6 rounded-xl border border-[#343633]">
                <p className="text-white font-medium mb-4">Arxéon lavora su due livelli:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                    <span className="text-[#9a9a96]">supporto strategico per chi vuole restare autonomo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2.5 flex-shrink-0"></span>
                    <span className="text-[#9a9a96]">gestione operativa per chi desidera delegare in modo controllato</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 4 – METODO IN 4 STEP */}
      <section className="py-24 bg-[#2a2c29]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <h2 className="text-[#c8f000] font-bold text-3xl md:text-4xl leading-tight mb-16 max-w-2xl">
            Un metodo chiaro,<br />
            applicato a ogni progetto.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {[
              { num: '01', title: 'Analisi', desc: 'Capire cosa funziona e cosa no' },
              { num: '02', title: 'Direzione strategica', desc: 'Definire priorità realistiche' },
              { num: '03', title: 'Gestione o supporto', desc: 'In base al pacchetto scelto' },
              { num: '04', title: 'Ottimizzazione', desc: 'Solo dove previsto dal pacchetto' },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-black text-[#9a9a96] mb-4">{step.num}</div>
                <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-[#9a9a96]">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[#6f716d] text-sm italic">
            Il livello di intervento dipende dal pacchetto scelto.
          </p>
        </div>
      </section>

      {/* SEZIONE 5 – PREVIEW PACCHETTI */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-[#c8f000] font-bold text-3xl md:text-4xl leading-tight mb-4">
              Tre pacchetti. Una sola logica:
            </h2>
            <p className="text-white text-2xl md:text-3xl font-bold mb-6">
              far funzionare il marketing.
            </p>
            <p className="text-[#9a9a96] text-lg max-w-2xl mx-auto">
              La differenza tra i pacchetti non è cosa facciamo,<br />
              ma quanto profondamente entriamo nel tuo marketing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633] hover:border-[#c8f000] transition-colors">
              <div className="text-[#c8f000] font-bold text-2xl mb-2">Basic</div>
              <p className="text-[#6f716d] text-sm uppercase tracking-wider mb-4">Solo consulenza strategica</p>
              <p className="text-[#9a9a96]">Per chi vuole restare autonomo con una guida esterna</p>
            </div>
            <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#c8f000]">
              <div className="text-[#c8f000] font-bold text-2xl mb-2">Premium</div>
              <p className="text-[#6f716d] text-sm uppercase tracking-wider mb-4">Gestione operativa di un singolo ambito</p>
              <p className="text-[#9a9a96]">Per chi vuole delegare un canale specifico</p>
            </div>
            <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633] hover:border-[#c8f000] transition-colors">
              <div className="text-[#c8f000] font-bold text-2xl mb-2">Gold</div>
              <p className="text-[#6f716d] text-sm uppercase tracking-wider mb-4">Collaborazione marketing completa</p>
              <p className="text-[#9a9a96]">Per chi vuole un collaboratore dedicato</p>
            </div>
          </div>
          <div className="text-center">
            <Link to="/servizi" className="btn-secondary">
              Confronta i pacchetti
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SEZIONE 6 – VALUTAZIONE GRATUITA */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[#c8f000] font-bold text-3xl md:text-4xl leading-tight mb-8">
              Prima di investire,<br />
              capisci cosa ti serve davvero.
            </h2>
            <p className="text-[#9a9a96] text-lg mb-8">
              Puoi richiedere una valutazione gratuita del tuo marketing:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mb-8 text-left md:text-center">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#c8f000] flex items-center justify-center text-[#161716] font-bold text-sm">1</span>
                <span className="text-white">compili un questionario guidato</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#c8f000] flex items-center justify-center text-[#161716] font-bold text-sm">2</span>
                <span className="text-white">analizziamo la tua situazione</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#c8f000] flex items-center justify-center text-[#161716] font-bold text-sm">3</span>
                <span className="text-white">ricevi un report chiaro via email</span>
              </div>
            </div>
            <p className="text-[#9a9a96] text-base mb-10 max-w-2xl mx-auto">
              La valutazione gratuita serve a capire se e come possiamo lavorare insieme. 
              Non è una consulenza generica e non comporta alcun obbligo.
            </p>
            <Link to="/valutazione" className="btn-primary text-base px-10 py-4">
              Richiedi la valutazione gratuita
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SEZIONE 7 – CTA FINALE */}
      <section className="py-24 bg-[#343633]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 text-center">
          <p className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">
            Il vero costo non è investire nel marketing.
          </p>
          <p className="text-[#c8f000] text-2xl md:text-3xl font-bold mb-10 leading-tight">
            È continuare senza una strategia.
          </p>
          <Link to="/valutazione" className="btn-primary text-base px-10 py-4 bg-white text-[#161716] hover:bg-[#c8f000]">
            Ottieni ora la tua valutazione gratuita
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
