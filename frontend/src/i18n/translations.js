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
        "Più tempo per il founder. Più energia per il team. Meno attrito sulle attività ripetitive. L'IA che assorbe la complessità, lasciando le persone libere di creare valore.",
      ctaPrimary: "Richiedi Consultazione Strategica",
      ctaSecondary: "Esplora le Soluzioni",
      meta: [
        { k: "15", v: "Giorni · ROI Custom AI Apps" },
        { k: "30+", v: "Ore/Settimana restituite al team" },
        { k: "−40%", v: "Attrito operativo · Elite 2.0" },
        { k: "24/7", v: "Operatività senza burnout" },
      ],
    },
    valueLadder: {
      overline: "Le Soluzioni",
      title: "Due acceleratori. Un'unica architettura.",
      subtitle:
        "Inizia con un risultato concreto in 15 giorni. Aggiungi un partner IA che assorbe l'attrito operativo. Poi, quando sei pronto, accedi all'AI Factory completa.",
      featuredOverline: "Conversione Rapida",
      featuredHeading: "I due ingressi più veloci.",
      tiers: [
        {
          tag: "Livello 1 · Entry",
          name: "Custom AI Apps",
          tagline: "ROI in 15 giorni. Contrattuale.",
          description:
            "Hai un processo che ruba ore al tuo team ogni settimana? Lo eliminiamo. App IA su misura, live in 15 giorni, payback medio in 60 giorni. Le persone smettono di rincorrere il fastidio e tornano a fare il lavoro che hanno scelto.",
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
          tagline: "Lo scudo operativo del tuo team.",
          description:
            "Zane assorbe outreach ripetitivo, gestione lead, ticket di assistenza e coordinamento operativo. Il tuo team smette di rincorrere fastidi e torna a costruire valore strategico. Tre piani da CHF 78 a CHF 5.000/mese in base alla complessità che vuoi delegare.",
          features: [
            "Da CHF 78/mese · Setup da CHF 450",
            "Elimina i colli di bottiglia operativi del team",
            "30+ ore/settimana restituite al lavoro strategico",
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
        tagline: "L'azienda intera, senza l'attrito.",
        description:
          "Per founder che vogliono ridurre del 40% l'attrito operativo senza sacrificare il fatturato. 13 pilastri, 1 CEO AI e 5 Dirigenti AI gestiscono il rumore quotidiano. Il team umano lavora sulle decisioni che contano davvero.",
        features: [
          "−40% attrito operativo nei primi 12 mesi",
          "Scala il fatturato senza esaurire il team",
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
        "Hai già stabilizzato Custom Apps e Zane? Sei pronto a ridurre del 40% l'attrito operativo dell'intera azienda senza sacrificare il fatturato. Quello che segue è l'architettura completa: 13 pilastri, 1 CEO AI, 5 Dirigenti AI.",
      cta: "Continua a esplorare",
    },
    zanePricing: {
      overline: "Piani Zane",
      title: "Tre piani. Tre livelli di attrito eliminato.",
      subtitle:
        "Zane scala con la complessità che vuoi delegare. Da scudo personale per il founder, a partner che potenzia il team operativo, fino a bussola strategica per navigare la complessità aziendale. Tutti i prezzi sono in CHF, IVA esclusa.",
      currency: "CHF",
      setupLabel: "Setup",
      monthlyLabel: "/mese",
      plans: [
        {
          name: "Zane Lite",
          setup: 450,
          monthly: 78,
          tagline: "Recupera la tua energia, focalizzati sul tuo core business.",
          target: "Founder · Liberi professionisti · Solopreneur",
          description:
            "Il tuo scudo personale IA. Filtra email, organizza il calendario, prepara briefing, gestisce ricerche e follow-up. Recuperi lucidità mentale e tempo per il lavoro che ti ha portato fin qui.",
          features: [
            "Inbox filtrata e priorità giornaliere",
            "Calendario e scheduling senza attrito",
            "Briefing personali quotidiani e settimanali",
            "Memoria contestuale persistente",
            "Onboarding in 7 giorni",
          ],
          highlight: null,
        },
        {
          name: "Zane Business",
          setup: 2500,
          monthly: 780,
          tagline:
            "Potenzia il team eliminando i colli di bottiglia operativi.",
          target: "PMI · Studi professionali · Aziende 10-50 persone",
          description:
            "Outreach ripetitivo, gestione lead, ticket di assistenza, coordinamento operativo. Zane assorbe il rumore. Le persone tornano a fare il lavoro per cui le hai assunte: relazioni, decisioni, valore.",
          features: [
            "Outreach automatizzato e qualifica lead",
            "Customer Care 24/7 multilingua",
            "Operations e workflow senza attrito",
            "Integrazioni CRM / ERP / Email",
            "Dashboard salute del team operativo",
          ],
          highlight: "PIÙ SCELTO",
        },
        {
          name: "Zane Elite",
          setup: 5000,
          monthly: 5000,
          tagline:
            "La tua bussola strategica per navigare la complessità senza stress.",
          target: "Aziende strutturate · Holding · CEO d'élite",
          description:
            "Oltre l'operatività. Zane Elite gestisce la complessità che ti tiene sveglio la notte: analisi predittiva, simulazione scenari, executive briefing. Tu decidi con la mente libera, con i numeri già letti.",
          features: [
            "Analisi predittiva sui KPI aziendali",
            "Executive briefing settimanali sintetizzati",
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
      overline: "Calcolatore di Capacità Strategica",
      title: "Quanta energia ti sta rubando l'attrito operativo?",
      subtitle:
        "Inserisci due numeri. Calcoliamo quanto tempo e quanta capacità strategica il tuo team potrebbe restituire all'attività ad alto valore — usando il costo medio orario di mercato (CHF 55/ora fully loaded, 220 giornate lavorative).",
      employeesLabel: "Numero di persone nel team operativo",
      hoursLabel: "Ore al giorno perse in task ripetitivi (per persona)",
      employeesPlaceholder: "es. 8",
      hoursPlaceholder: "es. 2",
      resultLabel: "Capacità strategica recuperata · valore annuo",
      resultSubtitle:
        "Energia restituita al team per attività ad alto valore. Non persone rimosse: persone liberate.",
      hoursPerYearLabel: "Ore/anno restituite al lavoro strategico",
      fteLabel: "Equivalente di capacità (FTE) liberata per il valore",
      assumption: "Ipotesi: costo orario fully loaded CHF 55, 220 giornate/anno.",
      disclaimer:
        "Stima indicativa. La capacità reale dipende dalla profondità dell'integrazione e dal mix di task delegabili. Una consultazione strategica produce una valutazione personalizzata.",
      cta: "Trasforma questo tempo in valore strategico",
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
      title: "High-Ticket. Volume sostenibile. Margini protetti.",
      subtitle:
        "Arxeon non è automazione fine a sé stessa. È un modello economico che protegge il margine, scala i volumi senza esaurire il team e libera energia per le decisioni che contano davvero.",
      points: [
        {
          k: "01",
          title: "Margini Protetti",
          desc: "Posizionamento premium, prezzi difesi, clienti selezionati. L'IA non comprime i ricavi: difende il margine unitario.",
        },
        {
          k: "02",
          title: "Volume Sostenibile",
          desc: "L'IA assorbe i picchi operativi che farebbero collassare un team umano. Scali senza burnout, senza turnover, senza l'ansia delle nuove assunzioni.",
        },
        {
          k: "03",
          title: "Output Costante",
          desc: "Processi standardizzati, governance rigorosa, qualità prevedibile su ogni transazione. Niente giornate storte, niente errori per stanchezza.",
        },
        {
          k: "04",
          title: "Energia Restituita",
          desc: "Il founder e il team tornano sul lavoro che hanno scelto: relazioni, visione, decisioni strategiche. L'IA assorbe il rumore quotidiano.",
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
        "Plus de temps pour le fondateur. Plus d'énergie pour l'équipe. Moins de friction sur les tâches répétitives. L'IA qui absorbe la complexité, laissant les personnes libres de créer de la valeur.",
      ctaPrimary: "Demander une Consultation Stratégique",
      ctaSecondary: "Explorer les Solutions",
      meta: [
        { k: "15", v: "Jours · ROI Custom AI Apps" },
        { k: "30+", v: "Heures/semaine rendues à l'équipe" },
        { k: "−40%", v: "Friction opérationnelle · Elite 2.0" },
        { k: "24/7", v: "Opérationnel sans burnout" },
      ],
    },
    valueLadder: {
      overline: "Les Solutions",
      title: "Deux accélérateurs. Une seule architecture.",
      subtitle:
        "Commencez par un résultat concret en 15 jours. Ajoutez un partenaire IA qui absorbe la friction opérationnelle. Puis, quand vous êtes prêt, accédez à l'Usine IA complète.",
      featuredOverline: "Conversion Rapide",
      featuredHeading: "Les deux entrées les plus rapides.",
      tiers: [
        {
          tag: "Niveau 1 · Entry",
          name: "Custom AI Apps",
          tagline: "ROI en 15 jours. Contractuel.",
          description:
            "Vous avez un processus qui vole des heures à votre équipe chaque semaine ? Nous l'éliminons. App IA sur mesure, live en 15 jours, payback moyen en 60 jours. Les personnes arrêtent de courir après les irritants et reviennent au travail qu'elles ont choisi.",
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
          tagline: "Le bouclier opérationnel de votre équipe.",
          description:
            "Zane absorbe outreach répétitif, gestion des leads, tickets de support et coordination opérationnelle. Votre équipe arrête de courir après les irritants et revient à créer de la valeur stratégique. Trois plans de CHF 78 à CHF 5'000/mois selon la complexité que vous voulez déléguer.",
          features: [
            "Dès CHF 78/mois · Setup dès CHF 450",
            "Élimine les goulots opérationnels de l'équipe",
            "30+ heures/semaine rendues au travail stratégique",
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
        tagline: "L'entreprise entière, sans la friction.",
        description:
          "Pour les fondateurs qui veulent réduire de 40% la friction opérationnelle sans sacrifier le chiffre d'affaires. 13 piliers, 1 CEO IA et 5 Dirigeants IA gèrent le bruit quotidien. L'équipe humaine travaille sur les décisions qui comptent vraiment.",
        features: [
          "−40% friction opérationnelle sur 12 mois",
          "Scalez le CA sans épuiser l'équipe",
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
        "Vous avez déjà stabilisé Custom Apps et Zane ? Vous êtes prêt à réduire de 40% la friction opérationnelle de toute l'entreprise sans sacrifier le chiffre d'affaires. Ce qui suit est l'architecture complète : 13 piliers, 1 CEO IA, 5 Dirigeants IA.",
      cta: "Continuer l'exploration",
    },
    zanePricing: {
      overline: "Plans Zane",
      title: "Trois plans. Trois niveaux de friction éliminée.",
      subtitle:
        "Zane évolue avec la complexité que vous voulez déléguer. Du bouclier personnel pour le fondateur, au partenaire qui renforce l'équipe opérationnelle, jusqu'à la boussole stratégique pour naviguer la complexité de l'entreprise. Tous les prix sont en CHF, HT.",
      currency: "CHF",
      setupLabel: "Setup",
      monthlyLabel: "/mois",
      plans: [
        {
          name: "Zane Lite",
          setup: 450,
          monthly: 78,
          tagline:
            "Récupérez votre énergie, concentrez-vous sur votre core business.",
          target: "Fondateurs · Indépendants · Solopreneurs",
          description:
            "Votre bouclier personnel IA. Filtre les emails, organise le calendrier, prépare les briefings, gère les recherches et follow-ups. Vous retrouvez clarté mentale et temps pour le travail qui vous a porté jusqu'ici.",
          features: [
            "Inbox filtrée et priorités quotidiennes",
            "Calendrier et scheduling sans friction",
            "Briefings personnels quotidiens et hebdomadaires",
            "Mémoire contextuelle persistante",
            "Onboarding en 7 jours",
          ],
          highlight: null,
        },
        {
          name: "Zane Business",
          setup: 2500,
          monthly: 780,
          tagline:
            "Renforcez l'équipe en éliminant les goulots opérationnels.",
          target: "PME · Cabinets professionnels · 10-50 personnes",
          description:
            "Outreach répétitif, gestion des leads, tickets de support, coordination opérationnelle. Zane absorbe le bruit. Les personnes reviennent au travail pour lequel vous les avez embauchées : relations, décisions, valeur.",
          features: [
            "Outreach automatisé et qualification leads",
            "Customer Care 24/7 multilingue",
            "Operations et workflow sans friction",
            "Intégrations CRM / ERP / Email",
            "Dashboard santé de l'équipe opérationnelle",
          ],
          highlight: "PLUS CHOISI",
        },
        {
          name: "Zane Elite",
          setup: 5000,
          monthly: 5000,
          tagline:
            "Votre boussole stratégique pour naviguer la complexité sans stress.",
          target: "Entreprises structurées · Holdings · CEO d'élite",
          description:
            "Au-delà de l'opérationnel. Zane Elite gère la complexité qui vous garde éveillé la nuit : analyse prédictive, simulation de scénarios, executive briefings. Vous décidez l'esprit libre, les chiffres déjà lus.",
          features: [
            "Analyse prédictive sur KPI",
            "Executive briefings hebdomadaires synthétisés",
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
      overline: "Calculateur de Capacité Stratégique",
      title: "Combien d'énergie la friction opérationnelle vous vole-t-elle ?",
      subtitle:
        "Saisissez deux chiffres. Nous calculons combien de temps et de capacité stratégique votre équipe pourrait rendre au travail à haute valeur — sur la base du coût horaire moyen du marché (CHF 55/h fully loaded, 220 jours ouvrés).",
      employeesLabel: "Nombre de personnes dans l'équipe opérationnelle",
      hoursLabel: "Heures par jour perdues en tâches répétitives (par personne)",
      employeesPlaceholder: "ex. 8",
      hoursPlaceholder: "ex. 2",
      resultLabel: "Capacité stratégique récupérée · valeur annuelle",
      resultSubtitle:
        "Énergie rendue à l'équipe pour les activités à haute valeur. Pas des personnes supprimées : des personnes libérées.",
      hoursPerYearLabel: "Heures/an rendues au travail stratégique",
      fteLabel: "Équivalent capacité (FTE) libérée pour la valeur",
      assumption: "Hypothèse : coût horaire fully loaded CHF 55, 220 jours/an.",
      disclaimer:
        "Estimation indicative. La capacité réelle dépend de la profondeur de l'intégration et du mix de tâches déléguables. Une consultation stratégique produit une évaluation personnalisée.",
      cta: "Transformer ce temps en valeur stratégique",
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
      title: "High-Ticket. Volume soutenable. Marges protégées.",
      subtitle:
        "Arxeon n'est pas de l'automatisation gratuite. C'est un modèle économique qui protège la marge, scale les volumes sans épuiser l'équipe et libère de l'énergie pour les décisions qui comptent vraiment.",
      points: [
        {
          k: "01",
          title: "Marges Protégées",
          desc: "Positionnement premium, prix défendus, clients sélectionnés. L'IA ne comprime pas les revenus : elle défend la marge unitaire.",
        },
        {
          k: "02",
          title: "Volume Soutenable",
          desc: "L'IA absorbe les pics opérationnels qui feraient s'effondrer une équipe humaine. Vous scalez sans burnout, sans turnover, sans l'anxiété des nouvelles embauches.",
        },
        {
          k: "03",
          title: "Output Constant",
          desc: "Processus standardisés, gouvernance rigoureuse, qualité prévisible à chaque transaction. Pas de mauvais jours, pas d'erreurs par fatigue.",
        },
        {
          k: "04",
          title: "Énergie Rendue",
          desc: "Le fondateur et l'équipe reviennent au travail qu'ils ont choisi : relations, vision, décisions stratégiques. L'IA absorbe le bruit quotidien.",
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
