// Bilingual content (IT default, FR translation).
// Product naming: "Donapp" (rebrand of Donna 2.0).

export const translations = {
  it: {
    nav: {
      architettura: "Architettura",
      valore: "Valore",
      pilastri: "13 Pilastri",
      strategia: "Strategia",
      cta: "Consultazione",
    },
    hero: {
      overline: "ARXEON · AI FACTORY",
      title: "L'Azienda che si gestisce da sola.",
      subtitle:
        "Architettura d'impresa autonoma, guidata dall'Intelligenza Artificiale. Precisione svizzera, efficienza assoluta.",
      ctaPrimary: "Richiedi Consultazione Strategica",
      ctaSecondary: "Esplora l'Architettura",
      meta: [
        { k: "13", v: "Pilastri AI" },
        { k: "1+5", v: "CEO · Dirigenti AI" },
        { k: "15", v: "Giorni · Custom Apps" },
        { k: "24/7", v: "Operatività" },
      ],
    },
    valueLadder: {
      overline: "La Scala del Valore",
      title: "Tre porte. Un'unica visione.",
      subtitle:
        "Dalla soluzione puntuale all'azienda completamente autonoma. Scegli il livello di trasformazione adatto al tuo momento strategico.",
      tiers: [
        {
          tag: "Entry",
          name: "Custom AI Apps",
          tagline: "Sblocco operativo.",
          description:
            "Sviluppo rapido in 15 giorni di strumenti IA dedicati per eliminare i colli di bottiglia operativi più critici della tua azienda.",
          features: [
            "Delivery garantita in 15 giorni",
            "Integrazione con stack esistente",
            "Specifico per il tuo bottleneck",
          ],
        },
        {
          tag: "Core",
          name: "Donapp",
          tagline: "Il tuo Chief of Staff IA.",
          description:
            "L'Assistente IA definitiva. Donapp coordina ogni task aziendale, libera il tempo del founder e orchestra l'operatività quotidiana.",
          features: [
            "Coordinamento multi-canale 24/7",
            "Memoria contestuale aziendale",
            "Esecuzione autonoma dei task",
          ],
        },
        {
          tag: "High-Ticket",
          name: "Arxeon Elite 2.0",
          tagline: "L'AI Factory completa.",
          description:
            "L'architettura autonoma totale. 13 pilastri interconnessi, 1 CEO AI e 5 Dirigenti AI che dirigono l'impresa con precisione svizzera.",
          features: [
            "Architettura completa 13 pilastri",
            "1 CEO AI + 5 Dirigenti AI",
            "Governance e reporting executive",
          ],
        },
      ],
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
      overline: "Modello Strategico",
      title: "High-Ticket. Volume automatizzato. Equilibrio svizzero.",
      subtitle:
        "Arxeon non è solo automazione. È un modello strategico che bilancia l'esclusività high-ticket con l'efficienza dei volumi gestiti dall'IA.",
      points: [
        {
          k: "01",
          title: "Esclusività High-Ticket",
          desc: "Posizionamento premium, margini protetti, clienti selezionati con criteri di qualità.",
        },
        {
          k: "02",
          title: "Volume Automatizzato",
          desc: "L'IA gestisce le quantità che un team umano non potrebbe mai sostenere senza degradare la qualità.",
        },
        {
          k: "03",
          title: "Precisione Svizzera",
          desc: "Processi standardizzati, governance rigorosa, output costante e prevedibile.",
        },
        {
          k: "04",
          title: "Tempo Recuperato",
          desc: "Il founder torna a fare il founder: visione, alleanze, capitale. L'IA esegue.",
        },
      ],
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
      tierOptions: ["Custom AI Apps", "Donapp", "Arxeon Elite 2.0", "Da definire"],
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
      products: ["Custom AI Apps", "Donapp", "Arxeon Elite 2.0"],
      company: ["Architettura", "Strategia", "Consultazione"],
    },
  },

  fr: {
    nav: {
      architettura: "Architecture",
      valore: "Valeur",
      pilastri: "13 Piliers",
      strategia: "Stratégie",
      cta: "Consultation",
    },
    hero: {
      overline: "ARXEON · USINE IA",
      title: "L'entreprise qui se gère toute seule.",
      subtitle:
        "Architecture d'entreprise autonome, pilotée par l'Intelligence Artificielle. Précision suisse, efficacité absolue.",
      ctaPrimary: "Demander une Consultation Stratégique",
      ctaSecondary: "Explorer l'Architecture",
      meta: [
        { k: "13", v: "Piliers IA" },
        { k: "1+5", v: "CEO · Dirigeants IA" },
        { k: "15", v: "Jours · Custom Apps" },
        { k: "24/7", v: "Opérationnel" },
      ],
    },
    valueLadder: {
      overline: "L'Échelle de Valeur",
      title: "Trois portes. Une vision.",
      subtitle:
        "De la solution ponctuelle à l'entreprise entièrement autonome. Choisissez le niveau de transformation adapté à votre moment stratégique.",
      tiers: [
        {
          tag: "Entry",
          name: "Custom AI Apps",
          tagline: "Déblocage opérationnel.",
          description:
            "Développement rapide en 15 jours d'outils IA dédiés pour éliminer les goulots d'étranglement opérationnels les plus critiques de votre entreprise.",
          features: [
            "Livraison garantie en 15 jours",
            "Intégration au stack existant",
            "Spécifique à votre goulot",
          ],
        },
        {
          tag: "Core",
          name: "Donapp",
          tagline: "Votre Chief of Staff IA.",
          description:
            "L'Assistant IA ultime. Donapp coordonne chaque tâche de l'entreprise, libère le temps du fondateur et orchestre l'opérationnel quotidien.",
          features: [
            "Coordination multi-canal 24/7",
            "Mémoire contextuelle de l'entreprise",
            "Exécution autonome des tâches",
          ],
        },
        {
          tag: "High-Ticket",
          name: "Arxeon Elite 2.0",
          tagline: "L'Usine IA complète.",
          description:
            "L'architecture autonome totale. 13 piliers interconnectés, 1 CEO IA et 5 Dirigeants IA qui dirigent l'entreprise avec une précision suisse.",
          features: [
            "Architecture complète 13 piliers",
            "1 CEO IA + 5 Dirigeants IA",
            "Gouvernance et reporting executive",
          ],
        },
      ],
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
      overline: "Modèle Stratégique",
      title: "High-Ticket. Volume automatisé. Équilibre suisse.",
      subtitle:
        "Arxeon n'est pas seulement de l'automatisation. C'est un modèle stratégique qui équilibre l'exclusivité high-ticket avec l'efficacité des volumes gérés par l'IA.",
      points: [
        {
          k: "01",
          title: "Exclusivité High-Ticket",
          desc: "Positionnement premium, marges protégées, clients sélectionnés selon des critères de qualité.",
        },
        {
          k: "02",
          title: "Volume Automatisé",
          desc: "L'IA gère les volumes qu'une équipe humaine ne pourrait jamais soutenir sans dégrader la qualité.",
        },
        {
          k: "03",
          title: "Précision Suisse",
          desc: "Processus standardisés, gouvernance rigoureuse, sortie constante et prévisible.",
        },
        {
          k: "04",
          title: "Temps Récupéré",
          desc: "Le fondateur redevient fondateur : vision, alliances, capital. L'IA exécute.",
        },
      ],
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
      tierOptions: ["Custom AI Apps", "Donapp", "Arxeon Elite 2.0", "À définir"],
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
      products: ["Custom AI Apps", "Donapp", "Arxeon Elite 2.0"],
      company: ["Architecture", "Stratégie", "Consultation"],
    },
  },
};
