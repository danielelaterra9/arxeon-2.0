import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const Servizi = () => {
  const comparisonData = [
    { label: 'Frequenza analisi', basic: '1 al mese', premium: '2 al mese', gold: 'Continua' },
    { label: 'Consulenze', basic: '1 call/mese (20-40 min)', premium: '2 call/mese (20-40 min)', gold: 'Supervisione continua' },
    { label: 'Attività operativa', basic: 'No', premium: 'Sì, 1 categoria', gold: 'Sì, senza limiti' },
    { label: 'Tempo di risposta', basic: '—', premium: 'Entro 24h lavorative', gold: 'Entro 24h lavorative' },
    { label: 'Presa in carico', basic: '—', premium: 'Entro 48h lavorative', gold: 'Entro 24h lavorative' },
    { label: 'Accesso agli account', basic: 'No', premium: 'Sì, 1 categoria', gold: 'Sì, completo' },
  ];

  const faqs = [
    {
      question: "Qual è la differenza reale tra Basic, Premium e Gold?",
      answer: "La differenza non è quanto facciamo, ma quanto entriamo nel tuo marketing:\n\nBasic = consulenza strategica e analisi\nPremium = supporto operativo su una sola categoria\nGold = gestione operativa senza limitazioni + supervisione continua."
    },
    {
      question: "Il Basic include operatività o accesso agli account?",
      answer: "No. Il Basic è esclusivamente consulenza strategica e analisi. Nessuna operatività e nessun accesso agli account."
    },
    {
      question: "Nel Premium cosa significa \"una categoria alla volta\"?",
      answer: "Scegli un ambito principale (sito, social, ads, email o SEO). Fuori da questo ambito le attività sono gestite come add-on."
    },
    {
      question: "Con il Gold posso delegare tutto il marketing?",
      answer: "Sì, per un solo business e un solo settore. Attività multi-business richiedono accordo separato."
    },
    {
      question: "In quanto tempo rispondete e prendete in carico i lavori?",
      answer: "Premium: risposta entro 24h, presa in carico entro 48h lavorative.\nGold: risposta e presa in carico entro 24h lavorative."
    },
    {
      question: "Posso cambiare pacchetto nel tempo?",
      answer: "Sì, il livello di collaborazione può essere adattato in base alla fase del business."
    },
    {
      question: "Perché il Gold costa CHF 1'700/mese?",
      answer: "Include gestione operativa completa, priorità e supervisione strategica continua, come un collaboratore esterno dedicato, senza i costi di un'assunzione interna."
    }
  ];

  return (
    <main className="pt-20">
      {/* ==================================================
          1) GUIDA ALLA SCELTA (PRIMA SEZIONE)
          ================================================== */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-[#c8f000] font-bold text-4xl md:text-5xl leading-tight mb-6 text-center">
              Guida alla scelta
            </h1>
            <p className="text-[#9a9a96] text-lg leading-relaxed text-center mb-16">
              La differenza tra i pacchetti non è cosa facciamo,<br />
              <span className="text-white">ma quanto profondamente entriamo nel tuo marketing.</span>
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Basic */}
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
                <h3 className="text-[#c8f000] font-bold text-xl mb-2">Basic</h3>
                <p className="text-white font-medium mb-4">Per chi vuole restare autonomo</p>
                <p className="text-[#9a9a96] text-sm leading-relaxed">
                  Ideale se gestisci tu il marketing ma vuoi una guida strategica esterna per prendere decisioni più lucide.
                </p>
              </div>

              {/* Premium */}
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#c8f000]">
                <h3 className="text-[#c8f000] font-bold text-xl mb-2">Premium</h3>
                <p className="text-white font-medium mb-4">Per chi vuole delegare un ambito specifico</p>
                <p className="text-[#9a9a96] text-sm leading-relaxed">
                  Ideale se vuoi supporto operativo su un singolo canale: sito, social, advertising, email marketing o SEO.
                </p>
              </div>

              {/* Gold */}
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
                <h3 className="text-[#c8f000] font-bold text-xl mb-2">Gold</h3>
                <p className="text-white font-medium mb-4">Per chi vuole un collaboratore marketing dedicato</p>
                <p className="text-[#9a9a96] text-sm leading-relaxed">
                  Ideale se vuoi delegare completamente il marketing con supervisione strategica continua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          2) PACCHETTI CON PREZZI E ATTIVAZIONE
          ================================================== */}
      <section className="py-24 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="space-y-16">
            
            {/* ----------------
                PACCHETTO BASIC
                ---------------- */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-[#6f716d] text-sm uppercase tracking-wider mb-2 block">Pacchetto</span>
                <h2 className="text-[#c8f000] font-bold text-3xl mb-2">Basic</h2>
                <p className="text-white text-xl font-medium mb-4">Supporto strategico per chi vuole restare autonomo</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">CHF 200</span>
                  <span className="text-[#9a9a96] ml-2">/ mese</span>
                </div>
                <p className="text-[#6f716d] text-sm mb-6">(servizio di consulenza strategica)</p>
                <p className="text-[#9a9a96] leading-relaxed mb-8">
                  Pensato per chi gestisce già il proprio marketing in autonomia ma desidera una guida esperta, 
                  un'analisi esterna e indicazioni strategiche chiare.
                </p>
                <Link to="/checkout/basic" className="btn-secondary">
                  Attiva il pacchetto Basic
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-4">Include:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">Analisi mensile del business e del marketing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">Analisi strumenti utilizzati dal cliente</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">Analisi dati forniti dal cliente</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">1 consulenza strategica mensile (20–40 minuti)</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-[#343633]">
                  <h4 className="text-[#6f716d] font-semibold mb-4">Non include:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <X className="text-[#6f716d] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#6f716d]">Nessuna attività operativa</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-[#6f716d] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#6f716d]">Nessuna gestione diretta</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-[#6f716d] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#6f716d]">Nessun accesso agli account</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-[#343633]"></div>

            {/* ------------------
                PACCHETTO PREMIUM
                ------------------ */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-[#6f716d] text-sm uppercase tracking-wider mb-2 block">Pacchetto</span>
                <h2 className="text-[#c8f000] font-bold text-3xl mb-2">Premium</h2>
                <p className="text-white text-xl font-medium mb-4">Gestione guidata di un singolo strumento marketing</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">CHF 400</span>
                  <span className="text-[#9a9a96] ml-2">/ mese</span>
                </div>
                <p className="text-[#6f716d] text-sm mb-6">(consulenza con supporto operativo)</p>
                <p className="text-[#9a9a96] leading-relaxed mb-8">
                  Pensato per chi utilizza già strumenti di marketing online ma vuole delegarne 
                  la gestione operativa a un partner affidabile.
                </p>
                <Link to="/checkout/premium" className="btn-primary">
                  Attiva il pacchetto Premium
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
              <div className="bg-[#2a2c29] p-8 rounded-xl border-2 border-[#c8f000]">
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-4">Include:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">2 analisi strategiche mensili</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">2 consulenze mensili (20–40 minuti)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">Tempo di risposta entro 24h lavorative</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">Presa in carico operativa entro 48h lavorative</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-[#343633]">
                  <h4 className="text-white font-semibold mb-4">Ambito operativo:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2 flex-shrink-0"></span>
                      <span className="text-[#9a9a96]">1 sola categoria alla volta (sito/landing, social, advertising, email marketing, SEO)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2 flex-shrink-0"></span>
                      <span className="text-[#9a9a96]">Attività fuori ambito come add-on o servizi one-shot</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-[#343633]"></div>

            {/* ---------------
                PACCHETTO GOLD
                --------------- */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-[#6f716d] text-sm uppercase tracking-wider mb-2 block">Pacchetto</span>
                <h2 className="text-[#c8f000] font-bold text-3xl mb-2">Gold</h2>
                <p className="text-white text-xl font-medium mb-4">Collaboratore marketing dedicato al tuo business</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">CHF 1'700</span>
                  <span className="text-[#9a9a96] ml-2">/ mese</span>
                </div>
                <p className="text-[#6f716d] text-sm mb-6">(servizio completo di consulenza e gestione)</p>
                <p className="text-[#9a9a96] leading-relaxed mb-8">
                  Il servizio più completo, pensato per chi desidera delegare il marketing a 360° 
                  con supervisione strategica continua.
                </p>
                <Link to="/checkout/gold" className="btn-secondary">
                  Attiva il pacchetto Gold
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
              <div className="bg-[#2a2c29] p-8 rounded-xl border border-[#343633]">
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-4">Include:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">Tutti i servizi del Premium</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">Gestione operativa senza limitazione di categoria</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">Supervisione strategica continua</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">Tempo di risposta entro 24h lavorative</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#c8f000] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#9a9a96]">Presa in carico lavori entro 24h lavorative</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-[#343633]">
                  <h4 className="text-white font-semibold mb-4">Limitazione fondamentale:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2 flex-shrink-0"></span>
                      <span className="text-[#9a9a96]">Servizio valido per un solo business e un solo settore</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] mt-2 flex-shrink-0"></span>
                      <span className="text-[#9a9a96]">Multi-business o multi-settore richiedono contratto separato</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          3) COMPARAZIONE TECNICA DETTAGLIATA
          ================================================== */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <h2 className="text-white font-bold text-2xl md:text-3xl mb-12 text-center">
            Comparazione tecnica
          </h2>
          
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-4 text-left text-[#9a9a96] font-medium"></th>
                  <th className="p-6 text-center">
                    <div className="bg-[#2a2c29] rounded-t-xl p-6 border border-[#343633] border-b-0">
                      <span className="text-[#c8f000] font-bold text-xl">Basic</span>
                      <p className="text-[#9a9a96] text-sm mt-1">CHF 200/mese</p>
                    </div>
                  </th>
                  <th className="p-6 text-center">
                    <div className="bg-[#2a2c29] rounded-t-xl p-6 border-2 border-[#c8f000] border-b-0 relative">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c8f000] text-[#161716] text-xs font-bold px-3 py-1 rounded-full uppercase">
                        Più scelto
                      </span>
                      <span className="text-[#c8f000] font-bold text-xl">Premium</span>
                      <p className="text-[#9a9a96] text-sm mt-1">CHF 400/mese</p>
                    </div>
                  </th>
                  <th className="p-6 text-center">
                    <div className="bg-[#2a2c29] rounded-t-xl p-6 border border-[#343633] border-b-0">
                      <span className="text-[#c8f000] font-bold text-xl">Gold</span>
                      <p className="text-[#9a9a96] text-sm mt-1">CHF 1'700/mese</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index}>
                    <td className="p-4 text-[#9a9a96] font-medium text-sm">{row.label}</td>
                    <td className="p-4">
                      <div className={`bg-[#2a2c29] p-4 border-x border-[#343633] ${index === comparisonData.length - 1 ? 'border-b rounded-b-xl' : ''}`}>
                        <span className={`text-sm ${row.basic === 'No' || row.basic === '—' ? 'text-[#6f716d]' : 'text-white'}`}>{row.basic}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`bg-[#2a2c29] p-4 border-x-2 border-[#c8f000] ${index === comparisonData.length - 1 ? 'border-b-2 rounded-b-xl' : ''}`}>
                        <span className="text-white text-sm">{row.premium}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`bg-[#2a2c29] p-4 border-x border-[#343633] ${index === comparisonData.length - 1 ? 'border-b rounded-b-xl' : ''}`}>
                        <span className="text-white text-sm">{row.gold}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-6">
            {[
              { name: 'Basic', price: 'CHF 200/mese', data: comparisonData.map(r => r.basic), highlighted: false },
              { name: 'Premium', price: 'CHF 400/mese', data: comparisonData.map(r => r.premium), highlighted: true },
              { name: 'Gold', price: 'CHF 1\'700/mese', data: comparisonData.map(r => r.gold), highlighted: false }
            ].map((pkg) => (
              <div 
                key={pkg.name} 
                className={`bg-[#2a2c29] rounded-xl p-6 border ${pkg.highlighted ? 'border-2 border-[#c8f000] relative' : 'border-[#343633]'}`}
              >
                {pkg.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c8f000] text-[#161716] text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Più scelto
                  </span>
                )}
                <h3 className="text-[#c8f000] font-bold text-xl mb-1">{pkg.name}</h3>
                <p className="text-[#9a9a96] text-sm mb-4">{pkg.price}</p>
                <div className="space-y-3">
                  {comparisonData.map((row, index) => (
                    <div key={index} className="flex justify-between items-start gap-4">
                      <span className="text-[#6f716d] text-sm">{row.label}</span>
                      <span className={`text-sm text-right ${pkg.data[index] === 'No' || pkg.data[index] === '—' ? 'text-[#6f716d]' : 'text-white'}`}>
                        {pkg.data[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          4) FAQ – DOMANDE FREQUENTI
          ================================================== */}
      <section className="py-24 bg-[#2a2c29]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#c8f000] font-bold text-2xl md:text-3xl mb-12 text-center">
              Domande frequenti
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-[#161716] border border-[#343633] rounded-lg px-6 data-[state=open]:border-[#c8f000]"
                >
                  <AccordionTrigger className="text-white hover:text-[#c8f000] text-left py-5 text-base font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#9a9a96] pb-5 text-sm leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ==================================================
          5) CTA RIEPILOGATIVE POST-FAQ
          ================================================== */}
      <section className="py-16 bg-[#1f211f]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link to="/valutazione" className="btn-secondary w-full md:w-auto justify-center">
              Attiva il pacchetto Basic
            </Link>
            <Link to="/valutazione" className="btn-primary w-full md:w-auto justify-center">
              Attiva il pacchetto Premium
            </Link>
            <Link to="/valutazione" className="btn-secondary w-full md:w-auto justify-center">
              Attiva il pacchetto Gold
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          6) CTA FINALE ALTERNATIVA
          ================================================== */}
      <section className="py-24 bg-[#161716]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 text-center">
          <p className="text-white text-xl md:text-2xl font-medium mb-8">
            Non sei sicuro di quale pacchetto fa per te?
          </p>
          <Link to="/valutazione" className="btn-primary text-base px-10 py-4">
            Richiedi una valutazione gratuita
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Servizi;
