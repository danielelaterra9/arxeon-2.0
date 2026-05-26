// Bilingual content (IT default, FR translation).
// Product naming: "Zane" (AI Chief of Staff, rebranded from Donna 2.0 / Donapp).

export const translations = {
  it: {
    nav: {
      architettura: "Architettura",
      valore: "Valore",
      pilastri: "13 Pilastri",
      strategia: "Strategia",
      blueprint: "Blueprint",
      cta: "Consultazione",
      backToMain: "arxeon.ch",
      eliteBadge: "Elite",
    },
    hero: {
      overline: "ARXEON ELITE · AI FACTORY",
      title: "L'Azienda che si gestisce da sola.",
      subtitle:
        "Più tempo per il founder. Più margine per l'azienda. Meno costi fissi sulle attività ripetitive. L'IA non è un esperimento: è il tuo nuovo conto economico.",
      ctaPrimary: "Richiedi Consultazione Strategica",
      ctaSecondary: "Esplora le Soluzioni",
      meta: [
        { k: "15", v: "Giorni · ROI Custom AI Apps" },
        { k: "30+", v: "Ore/Settimana recuperate con Zane" },
        { k: "−40%", v: "Costi operativi · Elite 2.0" },
        { k: "24/7", v: "Operatività senza stipendi" },
      ],
    },
    valueLadder: {
      overline: "Le Soluzioni",
      title: "Due acceleratori. Un'unica architettura.",
      subtitle:
        "Inizia con un risultato concreto in 15 giorni. Scala con un Chief of Staff IA. Poi, quando sei pronto, accedi all'AI Factory completa.",
      featuredOverline: "Conversione Rapida",
      featuredHeading: "I due ingressi più veloci.",
      tiers: [
        {
          tag: "Livello 1 · Entry",
          name: "Custom AI Apps",
          tagline: "ROI in 15 giorni. Contrattuale.",
          description:
            "Hai un processo che ti costa migliaia di franchi al mese in tempo umano? Lo eliminiamo. App IA su misura, live in 15 giorni, payback medio in 60 giorni. Niente consulenti, niente fatture infinite: un risultato misurabile, un prezzo definito.",
          features: [
            "Delivery contrattuale in 15 giorni o rimborso",
            "Payback medio entro 60 giorni dal go-live",
            "Integrazione diretta col tuo stack attuale",
            "Codice di proprietà del cliente · zero lock-in",
          ],
          cta: "Calcola il tuo ROI",
          highlight: "ROI 60 GIORNI",
        },
        {
          tag: "Livello 2 · Core",
          name: "Zane",
          tagline: "3 dipendenti in un solo abbonamento.",
          description:
            "Zane sostituisce il lavoro di Outreach, Assistenza e Operations. Costa quanto un junior, esegue come un team senior, lavora 24/7 senza ferie né TFR. Tre piani da CHF 78 a CHF 5.000/mese in base alla taglia del business.",
          features: [
            "Da CHF 78/mese · Setup da CHF 450",
            "Sostituisce 3 ruoli operativi (Business plan)",
            "Recupero di 30+ ore/settimana al founder",
            "Onboarding completo in 7 giorni",
          ],
          cta: "Vedi i piani Zane",
          highlight: "PIÙ RICHIESTO",
        },
      ],
      premiumOverline: "L'Upgrade Definitivo",
      premium: {
        tag: "Livello Premium",
        name: "Arxeon Elite 2.0",
        tagline: "L'azienda intera in un sistema.",
        description:
          "Per founder che vogliono ridurre del 40% i costi operativi senza ridurre il fatturato. 13 pilastri, 1 CEO AI e 5 Dirigenti AI gestiscono marketing, vendite, operations, finanza e customer care. Scalabilità senza nuove assunzioni.",
        features: [
          "−40% costi operativi nei primi 12 mesi",
          "Scala il fatturato senza nuove assunzioni",
          "Reporting executive consolidato in tempo reale",
          "Implementazione phased (3-6 mesi)",
        ],
        cta: "Esplora l'AI Factory",
      },
    },
    eliteIntro: {
      overline: "Livello Premium · Arxeon Elite 2.0",
      title: "Per chi è pronto all'AI Factory completa.",
      subtitle:
        "Hai già stabilizzato Custom Apps e Zane? Sei pronto a ridurre i costi operativi del 40% senza ridurre il fatturato. Quello che segue è l'architettura completa: 13 pilastri, 1 CEO AI, 5 Dirigenti AI.",
      cta: "Continua a esplorare",
    },
    zanePricing: {
      overline: "Piani Zane",
      title: "Tre piani. Tre conti economici diversi.",
      subtitle:
        "Zane scala con la tua azienda. Da assistente personale a sostituto di un intero team operativo, fino a partner strategico con analisi predittiva. Tutti i prezzi sono in CHF, IVA esclusa.",
      currency: "CHF",
      setupLabel: "Setup",
      monthlyLabel: "/mese",
      plans: [
        {
          name: "Zane Lite",
          setup: 450,
          monthly: 78,
          tagline: "Organizzazione personale d'élite.",
          target: "Founder · Liberi professionisti · Solopreneur",
          description:
            "Il tuo assistente personale IA. Email, calendario, follow-up, ricerche, brief. Recuperi il controllo della tua giornata in 7 giorni.",
          features: [
            "Gestione email e priorità inbox",
            "Calendario e scheduling intelligente",
            "Briefing giornalieri e settimanali",
            "Memoria personale persistente",
            "Onboarding in 7 giorni",
          ],
          highlight: null,
        },
        {
          name: "Zane Business",
          setup: 2500,
          monthly: 780,
          tagline: "Sostituisce 3 dipendenti.",
          target: "PMI · Studi professionali · Aziende 10-50 persone",
          description:
            "Outreach, Assistenza Clienti, Operations. Tre ruoli operativi gestiti da un solo abbonamento. Costa quanto un junior, esegue come un team senior.",
          features: [
            "Outreach commerciale automatizzato",
            "Customer Care 24/7 multilingua",
            "Operations e workflow management",
            "Integrazioni CRM / ERP / Email",
            "Dashboard performance team",
          ],
          highlight: "PIÙ SCELTO",
        },
        {
          name: "Zane Elite",
          setup: 5000,
          monthly: 5000,
          tagline: "Intelligenza strategica + analisi predittiva.",
          target: "Aziende strutturate · Holding · CEO d'élite",
          description:
            "Oltre l'operatività. Zane Elite analizza dati, predice scenari, simula decisioni e prepara executive briefing. Il tuo nuovo Chief of Staff con accesso ai numeri.",
          features: [
            "Analisi predittiva su KPI aziendali",
            "Executive briefing settimanali",
            "Simulazione scenari decisionali",
            "Integrazione data warehouse e BI",
            "Account dedicato Arxeon",
          ],
          highlight: null,
        },
      ],
      footnote:
        "Tutti i piani includono fatturazione mensile, possibilità di upgrade in qualsiasi momento e cancellazione con 30 giorni di preavviso.",
      cta: "Parla con un esperto Zane",
    },
    savingsCalculator: {
      overline: "Calcolatore ROI",
      title: "Quanto ti costa l'ineffizienza, oggi?",
      subtitle:
        "Inserisci due numeri. Calcoliamo il costo annuo dei task ripetitivi nella tua azienda, usando la media salariale di mercato (CHF 55/ora fully loaded, 220 giornate lavorative).",
      employeesLabel: "Numero di dipendenti operativi",
      hoursLabel: "Ore al giorno perse in task ripetitivi (per persona)",
      employeesPlaceholder: "es. 8",
      hoursPlaceholder: "es. 2",
      resultLabel: "Risparmio annuo potenziale",
      resultSubtitle: "Tempo recuperato dal team operativo",
      hoursPerYearLabel: "Ore/anno recuperate",
      fteLabel: "Equivalente in FTE liberati",
      assumption: "Ipotesi: costo orario fully loaded CHF 55, 220 giornate/anno.",
      disclaimer:
        "Stima indicativa. Il risparmio reale dipende dalla profondità dell'integrazione e dal mix di task automatizzabili. Una consultazione strategica produce una valutazione personalizzata.",
      cta: "Trasforma questo risparmio in risultato",
    },
    architecture: {
      overline: "Architettura Decisionale",
      title: "1 CEO AI. 5 Dirigenti AI. Zero attriti.",
      subtitle:
        "Una costellazione di intelligenze coordinate. Il CEO AI orchestra le decisioni strategiche; i cinque Dirigenti AI eseguono con autonomia totale nei rispettivi dipartimenti.",
      center: "CEO AI",
      centerSub: "Orchestrazione · Strategia",
      dirigenti: [
        { name: "Direttore Marketing AI", short: "Marketing" },
        { name: "Direttore Vendite AI", short: "Vendite" },
        { name: "Direttore Operations AI", short: "Operations" },
        { name: "Direttore Finanza AI", short: "Finanza" },
        { name: "Direttore Customer Care AI", short: "Customer Care" },
      ],
    },
    pillars: {
      overline: "Fondamenta",
      title: "I 13 Pilastri dell'AI Factory.",
      subtitle:
        "Ogni pilastro è un sotto-sistema autonomo. Insieme, formano l'architettura di un'azienda che opera senza intervento umano sui processi ripetibili.",
      items: [
        { name: "Vendite Autonome", desc: "Pipeline gestita end-to-end dall'IA." },
        { name: "Marketing Predittivo", desc: "Campagne ottimizzate in tempo reale." },
        { name: "Customer Care 24/7", desc: "Supporto multilingua sempre attivo." },
        { name: "Operations Automatizzate", desc: "Workflow eseguiti senza supervisione." },
        { name: "Finanza Intelligente", desc: "Controllo, budget, forecast automatico." },
        { name: "Data Intelligence", desc: "Insight strategici da ogni dato aziendale." },
        { name: "Lead Generation", desc: "Acquisizione qualificata in continuo." },
        { name: "Content Factory", desc: "Produzione di contenuto su scala industriale." },
        { name: "CRM Autonomo", desc: "Relazioni cliente coltivate dall'IA." },
        { name: "Reporting Real-time", desc: "Dashboard executive sempre aggiornata." },
        { name: "Quality Assurance AI", desc: "Controllo qualità su ogni output." },
        { name: "Procurement AI", desc: "Approvvigionamento ottimizzato in autonomia." },
        { name: "HR & Talent AI", desc: "Selezione e onboarding automatizzati." },
      ],
    },
    strategy: {
      overline: "Modello Economico",
      title: "High-Ticket. Volume automatizzato. Margini protetti.",
      subtitle:
        "Arxeon non è automazione fine a sé stessa. È un modello economico che protegge il margine, scala i volumi senza nuove assunzioni e libera tempo per le decisioni che contano davvero.",
      points: [
        {
          k: "01",
          title: "Margini Protetti",
          desc: "Posizionamento premium, prezzi difesi, clienti selezionati. L'IA non comprime i ricavi: difende il margine unitario.",
        },
        {
          k: "02",
          title: "Volume Senza Assunzioni",
          desc: "L'IA gestisce le quantità che un team umano non potrebbe sostenere. Scali il fatturato senza far esplodere il costo del personale.",
        },
        {
          k: "03",
          title: "Output Costante",
          desc: "Processi standardizzati, governance rigorosa, qualità prevedibile su ogni transazione. Niente giornate storte, niente errori per stanchezza.",
        },
        {
          k: "04",
          title: "Tempo Recuperato",
          desc: "Il founder torna a fare il founder: visione, alleanze, capitale. L'IA esegue. 30+ ore alla settimana restituite al ruolo che ha il maggior impatto sul P&L.",
        },
      ],
    },
    caseHistory: null,
    testimonials: null,
    blueprint: {
      overline: "Blueprint Tecnico",
      title: "L'anatomia di un'AI Factory.",
      subtitle:
        "Niente case study patinati. Niente testimonianze. Qui mostriamo l'architettura tecnica che costruiamo per ogni cliente. Un sistema reale, non una promessa.",
      layers: [
        {
          k: "L1",
          name: "Acquisition Layer",
          subtitle: "Pipeline di acquisizione autonoma",
          desc: "Identificazione, qualifica e routing dei lead in tempo reale. L'IA filtra il rumore prima che arrivi a un essere umano.",
          nodes: [
            "Lead Capture multicanale",
            "Enrichment & Scoring IA",
            "Qualifica conversazionale",
            "Routing automatico al canale corretto",
            "Scheduling e first-touch",
          ],
          stats: [
            { v: "< 60s", l: "Time to first response" },
            { v: "94%", l: "Lead qualificati correttamente" },
          ],
        },
        {
          k: "L2",
          name: "Orchestration Layer · Zane",
          subtitle: "Il Chief of Staff IA",
          desc: "Zane è il sistema operativo dell'azienda. Riceve, prioritizza e dispatcha ogni task ai sotto-sistemi corretti. Memoria contestuale, decision logic, escalation rules.",
          nodes: [
            "Context Memory persistente",
            "Task router multi-agente",
            "Priority queue dinamica",
            "Escalation logic configurabile",
            "Executive reporting in tempo reale",
          ],
          stats: [
            { v: "24/7", l: "Operatività" },
            { v: "n+1", l: "Agenti coordinati" },
          ],
        },
        {
          k: "L3",
          name: "Execution Layer · 13 Pilastri",
          subtitle: "I sotto-sistemi specializzati",
          desc: "Ogni pilastro è un servizio autonomo con API, monitoring e fallback. Vendite, Marketing, Finanza, Operations: tutto disaccoppiato, tutto osservabile.",
          nodes: [
            "Microservizi specializzati per dominio",
            "API contract & observability",
            "Quality Assurance IA su ogni output",
            "Fallback umano configurabile",
            "Dashboard executive consolidata",
          ],
          stats: [
            { v: "13", l: "Sotto-sistemi attivi" },
            { v: "99.5%", l: "Uptime garantito" },
          ],
        },
      ],
      stackOverline: "Stack tecnologico",
      stack: [
        "LLM frontier · GPT / Claude / Gemini",
        "Vector DB · Memoria contestuale",
        "Orchestration · Agent framework proprietario",
        "Observability · Logging + tracing end-to-end",
        "Infrastructure · Cloud privato EU compliant",
        "Security · SOC2-ready, GDPR-native",
      ],
      principle: {
        overline: "Principio operativo",
        quote:
          "Mostriamo come è costruito. Non chiediamo di crederci sulla parola.",
      },
    },
    cta: {
      overline: "Consultazione Strategica",
      title: "Inizia la trasformazione.",
      subtitle:
        "Una conversazione riservata di 45 minuti con il team Arxeon. Valutiamo il fit, mappiamo il bottleneck principale, definiamo il percorso.",
      formLabels: {
        company: "Azienda",
        email: "Email",
        phone: "Telefono",
        tier: "Livello di interesse",
        message: "Contesto (opzionale)",
      },
      formPlaceholders: {
        company: "La tua società",
        email: "tu@azienda.com",
        phone: "+39 ...",
        message: "Cosa vorresti automatizzare per primo?",
      },
      tierOptions: ["Custom AI Apps", "Zane Lite", "Zane Business", "Zane Elite", "Arxeon Elite 2.0", "Da definire"],
      submit: "Prenota Consultazione",
      submitting: "Invio in corso...",
      successTitle: "Richiesta ricevuta.",
      successBody:
        "Il team Arxeon ti contatterà entro 24 ore lavorative per programmare la consultazione strategica.",
      error: "Si è verificato un errore. Riprova o scrivici direttamente.",
      required: "Campo obbligatorio.",
      emailInvalid: "Email non valida.",
    },
    footer: {
      tagline: "L'Azienda che si gestisce da sola.",
      rights: "Tutti i diritti riservati.",
      sections: {
        product: "Prodotti",
        company: "Azienda",
        contact: "Contatti",
      },
      products: ["Custom AI Apps", "Zane", "Arxeon Elite 2.0"],
      company: ["Architettura", "Blueprint Tecnico", "Strategia", "Consultazione"],
      mainSite: "arxeon.ch (sito principale)",
    },
  },

  fr: {
    nav: {
      architettura: "Architecture",
      valore: "Valeur",
      pilastri: "13 Piliers",
      strategia: "Stratégie",
      blueprint: "Blueprint",
      cta: "Consultation",
      backToMain: "arxeon.ch",
      eliteBadge: "Elite",
    },
    hero: {
      overline: "ARXEON ELITE · USINE IA",
      title: "L'entreprise qui se gère toute seule.",
      subtitle:
        "Plus de temps pour le fondateur. Plus de marge pour l'entreprise. Moins de coûts fixes sur les tâches répétitives. L'IA n'est pas une expérimentation : c'est votre nouveau compte de résultat.",
      ctaPrimary: "Demander une Consultation Stratégique",
      ctaSecondary: "Explorer les Solutions",
      meta: [
        { k: "15", v: "Jours · ROI Custom AI Apps" },
        { k: "30+", v: "Heures/semaine récupérées avec Zane" },
        { k: "−40%", v: "Coûts opérationnels · Elite 2.0" },
        { k: "24/7", v: "Opérationnel sans salaires" },
      ],
    },
    valueLadder: {
      overline: "Les Solutions",
      title: "Deux accélérateurs. Une seule architecture.",
      subtitle:
        "Commencez par un résultat concret en 15 jours. Passez à l'échelle avec un Chief of Staff IA. Puis, quand vous êtes prêt, accédez à l'Usine IA complète.",
      featuredOverline: "Conversion Rapide",
      featuredHeading: "Les deux entrées les plus rapides.",
      tiers: [
        {
          tag: "Niveau 1 · Entry",
          name: "Custom AI Apps",
          tagline: "ROI en 15 jours. Contractuel.",
          description:
            "Vous avez un processus qui vous coûte des milliers de francs par mois en temps humain ? Nous l'éliminons. App IA sur mesure, live en 15 jours, payback moyen en 60 jours. Pas de consultants, pas de factures sans fin : un résultat mesurable, un prix défini.",
          features: [
            "Livraison contractuelle en 15 jours ou remboursement",
            "Payback moyen sous 60 jours après go-live",
            "Intégration directe à votre stack actuel",
            "Code propriété du client · zero lock-in",
          ],
          cta: "Calculez votre ROI",
          highlight: "ROI 60 JOURS",
        },
        {
          tag: "Niveau 2 · Core",
          name: "Zane",
          tagline: "3 employés en un seul abonnement.",
          description:
            "Zane remplace le travail d'Outreach, Service Client et Operations. Coûte comme un junior, exécute comme une équipe senior, travaille 24/7 sans vacances ni 13e mois. Trois plans de CHF 78 à CHF 5'000/mois selon la taille du business.",
          features: [
            "Dès CHF 78/mois · Setup dès CHF 450",
            "Remplace 3 rôles opérationnels (plan Business)",
            "30+ heures/semaine récupérées pour le fondateur",
            "Onboarding complet en 7 jours",
          ],
          cta: "Voir les plans Zane",
          highlight: "PLUS DEMANDÉ",
        },
      ],
      premiumOverline: "L'Upgrade Ultime",
      premium: {
        tag: "Niveau Premium",
        name: "Arxeon Elite 2.0",
        tagline: "L'entreprise entière dans un système.",
        description:
          "Pour les fondateurs qui veulent réduire de 40% les coûts opérationnels sans réduire le chiffre d'affaires. 13 piliers, 1 CEO IA et 5 Dirigeants IA gèrent marketing, ventes, operations, finance et customer care. Scalabilité sans nouvelles embauches.",
        features: [
          "−40% coûts opérationnels sur 12 mois",
          "Scalez le CA sans nouvelles embauches",
          "Reporting executive consolidé temps réel",
          "Implémentation phasée (3-6 mois)",
        ],
        cta: "Explorer l'Usine IA",
      },
    },
    eliteIntro: {
      overline: "Niveau Premium · Arxeon Elite 2.0",
      title: "Pour ceux qui sont prêts à l'Usine IA complète.",
      subtitle:
        "Vous avez déjà stabilisé Custom Apps et Zane ? Vous êtes prêt à réduire les coûts opérationnels de 40% sans réduire le chiffre d'affaires. Ce qui suit est l'architecture complète : 13 piliers, 1 CEO IA, 5 Dirigeants IA.",
      cta: "Continuer l'exploration",
    },
    zanePricing: {
      overline: "Plans Zane",
      title: "Trois plans. Trois comptes de résultat différents.",
      subtitle:
        "Zane évolue avec votre entreprise. De l'assistant personnel au remplaçant d'une équipe opérationnelle entière, jusqu'au partenaire stratégique avec analyse prédictive. Tous les prix sont en CHF, HT.",
      currency: "CHF",
      setupLabel: "Setup",
      monthlyLabel: "/mois",
      plans: [
        {
          name: "Zane Lite",
          setup: 450,
          monthly: 78,
          tagline: "Organisation personnelle d'élite.",
          target: "Fondateurs · Indépendants · Solopreneurs",
          description:
            "Votre assistant personnel IA. Email, calendrier, follow-up, recherches, briefings. Vous reprenez le contrôle de votre journée en 7 jours.",
          features: [
            "Gestion email et priorités inbox",
            "Calendrier et scheduling intelligent",
            "Briefings quotidiens et hebdomadaires",
            "Mémoire personnelle persistante",
            "Onboarding en 7 jours",
          ],
          highlight: null,
        },
        {
          name: "Zane Business",
          setup: 2500,
          monthly: 780,
          tagline: "Remplace 3 employés.",
          target: "PME · Cabinets professionnels · 10-50 personnes",
          description:
            "Outreach, Service Client, Operations. Trois rôles opérationnels gérés par un seul abonnement. Coûte comme un junior, exécute comme une équipe senior.",
          features: [
            "Outreach commercial automatisé",
            "Customer Care 24/7 multilingue",
            "Operations et workflow management",
            "Intégrations CRM / ERP / Email",
            "Dashboard performance équipe",
          ],
          highlight: "PLUS CHOISI",
        },
        {
          name: "Zane Elite",
          setup: 5000,
          monthly: 5000,
          tagline: "Intelligence stratégique + analyse prédictive.",
          target: "Entreprises structurées · Holdings · CEO d'élite",
          description:
            "Au-delà de l'opérationnel. Zane Elite analyse les données, prédit les scénarios, simule les décisions et prépare des executive briefings. Votre nouveau Chief of Staff avec accès aux chiffres.",
          features: [
            "Analyse prédictive sur KPI",
            "Executive briefings hebdomadaires",
            "Simulation de scénarios décisionnels",
            "Intégration data warehouse et BI",
            "Account dédié Arxeon",
          ],
          highlight: null,
        },
      ],
      footnote:
        "Tous les plans incluent une facturation mensuelle, la possibilité d'upgrade à tout moment et une résiliation avec 30 jours de préavis.",
      cta: "Parler à un expert Zane",
    },
    savingsCalculator: {
      overline: "Calculateur ROI",
      title: "Combien vous coûte l'inefficacité, aujourd'hui ?",
      subtitle:
        "Saisissez deux chiffres. Nous calculons le coût annuel des tâches répétitives dans votre entreprise, sur la base du salaire moyen du marché (CHF 55/h fully loaded, 220 jours ouvrés).",
      employeesLabel: "Nombre d'employés opérationnels",
      hoursLabel: "Heures par jour perdues en tâches répétitives (par personne)",
      employeesPlaceholder: "ex. 8",
      hoursPlaceholder: "ex. 2",
      resultLabel: "Économies annuelles potentielles",
      resultSubtitle: "Temps récupéré par l'équipe opérationnelle",
      hoursPerYearLabel: "Heures/an récupérées",
      fteLabel: "Équivalent en FTE libérés",
      assumption: "Hypothèse : coût horaire fully loaded CHF 55, 220 jours/an.",
      disclaimer:
        "Estimation indicative. Les économies réelles dépendent de la profondeur de l'intégration et du mix de tâches automatisables. Une consultation stratégique produit une évaluation personnalisée.",
      cta: "Transformer cette économie en résultat",
    },
    architecture: {
      overline: "Architecture Décisionnelle",
      title: "1 CEO IA. 5 Dirigeants IA. Zéro friction.",
      subtitle:
        "Une constellation d'intelligences coordonnées. Le CEO IA orchestre les décisions stratégiques; les cinq Dirigeants IA exécutent en pleine autonomie dans leurs départements respectifs.",
      center: "CEO IA",
      centerSub: "Orchestration · Stratégie",
      dirigenti: [
        { name: "Directeur Marketing IA", short: "Marketing" },
        { name: "Directeur Ventes IA", short: "Ventes" },
        { name: "Directeur Operations IA", short: "Operations" },
        { name: "Directeur Finance IA", short: "Finance" },
        { name: "Directeur Customer Care IA", short: "Customer Care" },
      ],
    },
    pillars: {
      overline: "Fondations",
      title: "Les 13 Piliers de l'Usine IA.",
      subtitle:
        "Chaque pilier est un sous-système autonome. Ensemble, ils forment l'architecture d'une entreprise qui opère sans intervention humaine sur les processus répétables.",
      items: [
        { name: "Ventes Autonomes", desc: "Pipeline gérée de bout en bout par l'IA." },
        { name: "Marketing Prédictif", desc: "Campagnes optimisées en temps réel." },
        { name: "Customer Care 24/7", desc: "Support multilingue toujours actif." },
        { name: "Operations Automatisées", desc: "Workflows exécutés sans supervision." },
        { name: "Finance Intelligente", desc: "Contrôle, budget, forecast automatique." },
        { name: "Data Intelligence", desc: "Insights stratégiques de chaque donnée." },
        { name: "Lead Generation", desc: "Acquisition qualifiée en continu." },
        { name: "Content Factory", desc: "Production de contenu à l'échelle industrielle." },
        { name: "CRM Autonome", desc: "Relations clients cultivées par l'IA." },
        { name: "Reporting Temps Réel", desc: "Dashboard executive toujours à jour." },
        { name: "Quality Assurance IA", desc: "Contrôle qualité sur chaque sortie." },
        { name: "Procurement IA", desc: "Approvisionnement optimisé en autonomie." },
        { name: "HR & Talent IA", desc: "Sélection et onboarding automatisés." },
      ],
    },
    strategy: {
      overline: "Modèle Économique",
      title: "High-Ticket. Volume automatisé. Marges protégées.",
      subtitle:
        "Arxeon n'est pas de l'automatisation gratuite. C'est un modèle économique qui protège la marge, scale les volumes sans nouvelles embauches et libère du temps pour les décisions qui comptent vraiment.",
      points: [
        {
          k: "01",
          title: "Marges Protégées",
          desc: "Positionnement premium, prix défendus, clients sélectionnés. L'IA ne comprime pas les revenus : elle défend la marge unitaire.",
        },
        {
          k: "02",
          title: "Volume Sans Embauches",
          desc: "L'IA gère les volumes qu'une équipe humaine ne pourrait pas soutenir. Vous scalez le CA sans faire exploser le coût du personnel.",
        },
        {
          k: "03",
          title: "Output Constant",
          desc: "Processus standardisés, gouvernance rigoureuse, qualité prévisible à chaque transaction. Pas de mauvais jours, pas d'erreurs par fatigue.",
        },
        {
          k: "04",
          title: "Temps Récupéré",
          desc: "Le fondateur redevient fondateur : vision, alliances, capital. L'IA exécute. 30+ heures/semaine rendues au rôle qui a le plus d'impact sur le P&L.",
        },
      ],
    },
    caseHistory: null,
    testimonials: null,
    blueprint: {
      overline: "Blueprint Technique",
      title: "L'anatomie d'une Usine IA.",
      subtitle:
        "Pas de case studies lustrés. Pas de témoignages. Ici nous montrons l'architecture technique que nous construisons pour chaque client. Un système réel, pas une promesse.",
      layers: [
        {
          k: "L1",
          name: "Acquisition Layer",
          subtitle: "Pipeline d'acquisition autonome",
          desc: "Identification, qualification et routing des leads en temps réel. L'IA filtre le bruit avant qu'il n'atteigne un humain.",
          nodes: [
            "Lead Capture multicanal",
            "Enrichment & Scoring IA",
            "Qualification conversationnelle",
            "Routing automatique vers le bon canal",
            "Scheduling et first-touch",
          ],
          stats: [
            { v: "< 60s", l: "Temps de première réponse" },
            { v: "94%", l: "Leads qualifiés correctement" },
          ],
        },
        {
          k: "L2",
          name: "Orchestration Layer · Zane",
          subtitle: "Le Chief of Staff IA",
          desc: "Zane est le système d'exploitation de l'entreprise. Il reçoit, priorise et dispatche chaque tâche aux sous-systèmes corrects. Mémoire contextuelle, logique de décision, règles d'escalade.",
          nodes: [
            "Context Memory persistante",
            "Task router multi-agent",
            "Priority queue dynamique",
            "Logique d'escalade configurable",
            "Executive reporting en temps réel",
          ],
          stats: [
            { v: "24/7", l: "Opérationnel" },
            { v: "n+1", l: "Agents coordonnés" },
          ],
        },
        {
          k: "L3",
          name: "Execution Layer · 13 Piliers",
          subtitle: "Les sous-systèmes spécialisés",
          desc: "Chaque pilier est un service autonome avec API, monitoring et fallback. Ventes, Marketing, Finance, Operations : tout est découplé, tout est observable.",
          nodes: [
            "Microservices spécialisés par domaine",
            "API contract & observability",
            "Quality Assurance IA sur chaque sortie",
            "Fallback humain configurable",
            "Dashboard executive consolidé",
          ],
          stats: [
            { v: "13", l: "Sous-systèmes actifs" },
            { v: "99.5%", l: "Uptime garanti" },
          ],
        },
      ],
      stackOverline: "Stack technologique",
      stack: [
        "LLM frontier · GPT / Claude / Gemini",
        "Vector DB · Mémoire contextuelle",
        "Orchestration · Framework d'agents propriétaire",
        "Observability · Logging + tracing de bout en bout",
        "Infrastructure · Cloud privé EU compliant",
        "Security · SOC2-ready, GDPR-native",
      ],
      principle: {
        overline: "Principe opérationnel",
        quote:
          "Nous montrons comment c'est construit. Nous ne demandons pas de nous croire sur parole.",
      },
    },
    cta: {
      overline: "Consultation Stratégique",
      title: "Commencez la transformation.",
      subtitle:
        "Une conversation confidentielle de 45 minutes avec l'équipe Arxeon. Nous évaluons le fit, cartographions le goulot principal, définissons le parcours.",
      formLabels: {
        company: "Société",
        email: "Email",
        phone: "Téléphone",
        tier: "Niveau d'intérêt",
        message: "Contexte (optionnel)",
      },
      formPlaceholders: {
        company: "Votre société",
        email: "vous@societe.com",
        phone: "+33 ...",
        message: "Qu'aimeriez-vous automatiser en premier ?",
      },
      tierOptions: ["Custom AI Apps", "Zane Lite", "Zane Business", "Zane Elite", "Arxeon Elite 2.0", "À définir"],
      submit: "Réserver la Consultation",
      submitting: "Envoi en cours...",
      successTitle: "Demande reçue.",
      successBody:
        "L'équipe Arxeon vous contactera sous 24 heures ouvrées pour programmer la consultation stratégique.",
      error: "Une erreur est survenue. Réessayez ou contactez-nous directement.",
      required: "Champ obligatoire.",
      emailInvalid: "Email invalide.",
    },
    footer: {
      tagline: "L'entreprise qui se gère toute seule.",
      rights: "Tous droits réservés.",
      sections: {
        product: "Produits",
        company: "Société",
        contact: "Contact",
      },
      products: ["Custom AI Apps", "Zane", "Arxeon Elite 2.0"],
      company: ["Architecture", "Blueprint Technique", "Stratégie", "Consultation"],
      mainSite: "arxeon.ch (site principal)",
    },
  },
};
