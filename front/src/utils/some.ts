const constants = {
    ANALYZE_RESUME_PROMPT: `D'abord, détermine si ce document est réellement un CV. Recherche :
  - L'expérience professionnelle ou l'historique d'emploi
  - Le parcours éducatif, les diplômes ou informations académiques
  - Les compétences et qualifications professionnelles
  - Les coordonnées et détails personnels
  
  Si ce n'est PAS un CV (ex: facture, reçu, contrat, article, manuel, etc.), réponds exactement avec ce JSON :
  {
    "error": "Ce document ne semble pas être un CV. Veuillez télécharger un CV valide contenant les sections expérience, éducation et compétences."
  }
  
  Si c'est un CV, analyse-le en profondeur et fournis un feedback complet dans ce format JSON (RÉPONDS EXCLUSIVEMENT EN FRANÇAIS) :
  {
    "overallScore": "X/10",
    "strengths": [
      "force 1", 
      "force 2", 
      "force 3"
    ],
    "improvements": [
      "amélioration 1", 
      "amélioration 2", 
      "amélioration 3"
    ],
    "keywords": [
      "mot-clé 1", 
      "mot-clé 2", 
      "mot-clé 3"
    ],
    "summary": "Bref bilan global en français",
    "performanceMetrics": {
      "formatting": X,
      "contentQuality": X,
      "keywordUsage": X,
      "atsCompatibility": X,
      "quantifiableAchievements": X
    },
    "actionItems": [
      "action concrète immédiate 1",
      "action concrète immédiate 2", 
      "action concrète immédiate 3"
    ],
    "proTips": [
      "conseil de pro 1",
      "conseil de pro 2",
      "conseil de pro 3"
    ],
    "atsChecklist": [
      "exigence ATS 1",
      "exigence ATS 2", 
      "exigence ATS 3"
    ]
  }
  
  Pour les performanceMetrics, note chaque zone de 1 à 10 :
  - formatting : Mise en page, structure, lisibilité et cohérence visuelle.
  - contentQuality : Pertinence des accomplissements, clarté et complétude.
  - keywordUsage : Présence de termes techniques et mots-clés du secteur.
  - atsCompatibility : Structure scannable par les robots, en-têtes standards, absence de graphiques bloquants.
  - quantifiableAchievements : Utilisation de chiffres, pourcentages et métriques (très important).
  
  Document text:
  {{DOCUMENT_TEXT}}`,
  };
  
  export const METRIC_CONFIG = [
    {
      key: "formatting",
      label: "Mise en page",
      defaultValue: 7,
      colorClass: "from-emerald-400 to-emerald-500",
      shadowClass: "group-hover/item:shadow-emerald-500/30",
      icon: "🎨",
    },
    {
      key: "contentQuality",
      label: "Qualité du contenu",
      defaultValue: 6,
      colorClass: "from-blue-400 to-blue-500",
      shadowClass: "group-hover/item:shadow-blue-500/30",
      icon: "📝",
    },
    {
      key: "atsCompatibility",
      label: "Compatibilité ATS",
      defaultValue: 6,
      colorClass: "from-violet-400 to-violet-500",
      shadowClass: "group-hover/item:shadow-violet-500/30",
      icon: "🤖",
    },
    {
      key: "keywordUsage",
      label: "Mots-clés",
      defaultValue: 5,
      colorClass: "from-purple-400 to-purple-500",
      shadowClass: "group-hover/item:shadow-purple-500/30",
      icon: "🔍",
    },
    {
      key: "quantifiableAchievements",
      label: "Résultats chiffrés",
      defaultValue: 4,
      colorClass: "from-orange-400 to-orange-500",
      shadowClass: "group-hover/item:shadow-orange-500/30",
      icon: "📊",
    },
  ];
  
  // ... (Garde ta fonction buildPresenceChecklist telle quelle, car les mots-clés de CV sont souvent en anglais)
  
  export default constants;