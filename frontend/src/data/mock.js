// Mock data for Arxéon website

export const packages = [
  {
    id: 'basic',
    name: 'Basic',
    subtitle: 'Setup & Ordine',
    price: '490',
    period: '/mese',
    description: 'Perfetto per chi parte da zero o vuole mettere ordine nella propria presenza digitale.',
    features: [
      'Audit iniziale del marketing attuale',
      'Setup profili social (2 piattaforme)',
      'Ottimizzazione Google Business Profile',
      'Piano editoriale mensile base',
      '4 post/mese con grafiche professionali',
      'Report mensile performance',
      'Supporto email entro 48h'
    ],
    notIncluded: [
      'Gestione advertising',
      'Automazioni email',
      'CRM setup'
    ],
    highlighted: false,
    cta: 'Attiva Basic'
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'Gestione Continuativa',
    price: '990',
    period: '/mese',
    description: 'Per aziende che vogliono una gestione marketing professionale e continuativa.',
    features: [
      'Tutto incluso in Basic, più:',
      'Gestione 3 piattaforme social',
      '12 post/mese con contenuti strategici',
      'Setup CRM base (HubSpot/Pipedrive)',
      'Email marketing: 2 campagne/mese',
      'Automazioni email welcome + follow-up',
      'Analisi competitor trimestrale',
      'Report settimanale + call mensile',
      'Supporto prioritario entro 24h'
    ],
    notIncluded: [
      'Gestione Google/Meta Ads',
      'Strategia SEO avanzata'
    ],
    highlighted: true,
    cta: 'Attiva Premium'
  },
  {
    id: 'gold',
    name: 'Gold',
    subtitle: 'Strategia Avanzata',
    price: '1.890',
    period: '/mese',
    description: 'Soluzione completa per chi vuole dominare il proprio mercato con strategia e advertising.',
    features: [
      'Tutto incluso in Premium, più:',
      'Strategia marketing personalizzata',
      'Gestione Google Ads (budget escluso)',
      'Gestione Meta Ads (budget escluso)',
      'SEO on-page + contenuti ottimizzati',
      'Landing page dedicate per campagne',
      'Dashboard KPI personalizzata',
      'A/B testing continuo',
      'Report settimanale + 2 call/mese',
      'Account manager dedicato',
      'Supporto prioritario entro 12h'
    ],
    notIncluded: [],
    highlighted: false,
    cta: 'Attiva Gold'
  }
];

export const sectors = [
  'E-commerce',
  'Ristorazione & Hospitality',
  'Servizi professionali',
  'Salute & Benessere',
  'Immobiliare',
  'Retail & Negozi',
  'B2B / Industria',
  'Formazione & Coaching',
  'Turismo',
  'Altro'
];

export const geoAreas = [
  'Svizzera Romandia',
  'Ticino',
  'Altra'
];

export const channels = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'google_ads', label: 'Google Ads' },
  { id: 'seo', label: 'SEO' },
  { id: 'email', label: 'Email Marketing' },
  { id: 'altro', label: 'Altro' }
];

export const objectives = [
  'Più contatti (lead generation)',
  'Più vendite',
  'Più prenotazioni',
  'Più traffico al sito',
  'Altro'
];

export const budgets = [
  '0 – 300 CHF',
  '300 – 800 CHF',
  '800 – 2.000 CHF',
  '2.000+ CHF'
];

export const methodSteps = [
  {
    number: '01',
    title: 'Analisi',
    description: 'Studiamo il tuo business, i tuoi competitor e il tuo mercato. Identifichiamo opportunità concrete e punti critici.'
  },
  {
    number: '02',
    title: 'Strategia',
    description: 'Definiamo obiettivi misurabili e un piano d\'azione personalizzato. Niente teoria, solo azioni concrete.'
  },
  {
    number: '03',
    title: 'Esecuzione',
    description: 'Implementiamo le strategie con precisione. Contenuti, campagne, automazioni: tutto ottimizzato per i tuoi obiettivi.'
  },
  {
    number: '04',
    title: 'Ottimizzazione',
    description: 'Monitoriamo i risultati e ottimizziamo continuamente. Ogni decisione è guidata dai dati, non dalle supposizioni.'
  }
];

export const stats = [
  { value: '150+', label: 'Clienti attivi' },
  { value: '3.2M', label: 'Budget gestito/anno' },
  { value: '847%', label: 'ROI medio clienti' },
  { value: '98%', label: 'Retention rate' }
];

export const testimonials = [
  {
    quote: 'In 6 mesi abbiamo triplicato i lead qualificati. Arxéon ha trasformato il nostro approccio al marketing.',
    author: 'Marco R.',
    role: 'CEO, TechSolutions SA',
    result: '+312% lead'
  },
  {
    quote: 'Finalmente un\'agenzia che parla di risultati concreti, non di vanity metrics. ROI misurabile dal primo mese.',
    author: 'Laura B.',
    role: 'Founder, Wellness Studio',
    result: '+180% prenotazioni'
  },
  {
    quote: 'Professionalità e trasparenza. Sappiamo sempre dove vanno i nostri soldi e che risultati portano.',
    author: 'Andrea M.',
    role: 'Direttore, Hotel Bellavista',
    result: '+95% revenue online'
  }
];

export const faqs = [
  {
    question: 'Quanto tempo serve per vedere i primi risultati?',
    answer: 'Dipende dal punto di partenza e dagli obiettivi. Per attività di content e social, i primi segnali arrivano in 4-6 settimane. Per campagne ads, i risultati sono più rapidi (2-4 settimane). Per SEO, servono 3-6 mesi per risultati significativi.'
  },
  {
    question: 'Posso cambiare pacchetto dopo aver iniziato?',
    answer: 'Sì, puoi fare upgrade o downgrade con un preavviso di 30 giorni. Consigliamo di partire con il pacchetto più adatto alle tue esigenze attuali.'
  },
  {
    question: 'Il budget advertising è incluso nei prezzi?',
    answer: 'No, i prezzi indicati sono per la gestione e strategia. Il budget pubblicitario (Google Ads, Meta Ads) è separato e lo definisci tu in base ai tuoi obiettivi.'
  },
  {
    question: 'Come funziona la valutazione gratuita?',
    answer: 'Compili il form, analizziamo le tue informazioni e ti inviamo un report con opportunità e raccomandazioni. Nessun impegno, nessun costo.'
  },
  {
    question: 'Lavorate solo con aziende svizzere?',
    answer: 'Il nostro focus è Svizzera (Romandia e Ticino), ma lavoriamo anche con clienti internazionali che operano nel mercato svizzero.'
  }
];
