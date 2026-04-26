# CLAUDE.md — Mémoire du Projet Voyages 21

## Identité du Projet

**Propriétaire :** Karim Zoubdane  
**Entreprise :** Voyages 21 — Agence Incoming Maroc  
**Outil :** COCKPIT V3 — Tableau de bord stratégique 2026  
**Langue principale :** Français (site web : FR/EN/ES/DE)

## Structure du Répertoire

```
/-cockpit-v3/
├── CLAUDE.md                              ← Tu es ici. Mémoire racine du projet.
├── index.html                             ← Dashboard COCKPIT V3 (app complète)
├── docs/
│   ├── voyages21-brand.md                ← Identité de marque, ton, valeurs
│   ├── voyages21-destinations.md         ← Produits, circuits, activités
│   ├── voyages21-strategy.md             ← Stratégie marketing & commerciale
│   └── voyages21-content-examples.md    ← Exemples de posts réseaux sociaux
└── .claude/
    └── commands/
        ├── marketing-research.md          ← /marketing-research (Agent Veilleur)
        ├── content-creator.md             ← /content-creator (Agent Créateur)
        ├── data-analyst.md                ← /data-analyst (Agent Analyste)
        ├── presentation-maker.md          ← /presentation-maker (Agent Présentation)
        └── marketing-team.md             ← /marketing-team (Équipe complète)
```

## À propos de Voyages 21

Voyages 21 est une agence de voyages incoming spécialisée dans le Maroc. Elle propose des circuits, activités et expériences aux Tour Opérateurs et agences partenaires en Europe (FR/EN/ES/DE) et en Chine.

### Projets Actifs
1. **Site Web Voyages21.com** — Refonte Next.js 4 langues, Sanity CMS, HubSpot
2. **Stratégie B2B** — Catalogue 78 slides, grilles tarifaires MAD/USD/EUR
3. **App Devis & Tarification** — HTML/JS standalone
4. **Stratégie Commerciale Incoming** — OTAs, affiliation influenceurs, CRM
5. **HAYDEN 21** — Complexe écotourisme Tamazouzte (financement soumis)
6. **Oliveraie Domaine Labdadz** — 2 hectares d'oliviers adultes
7. **Agence Web IA** — Création industrielle de sites clients

### Budget Marketing Annuel
~217 400 MAD/an (canaux : LinkedIn, Brevo, DMCFinder, ATTA, salons WTM/ITB)

## L'Armée des Anges — 9 Agents IA Définis

| Agent | Rôle | Skill Claude |
|-------|------|-------------|
| Agent Major | Prompt Engineering | — (méta-agent) |
| Agent Commandant | Orchestrateur / Flash IA | — (superviseur) |
| Agent Veilleur | Surveillance marché & IA | `/marketing-research` |
| Agent Académique | Base de connaissance | — |
| Agent Prospecteur | Influenceurs & partenaires B2B | `/marketing-research` |
| Agent Créateur | Contenu social media | `/content-creator` |
| Agent Architecte | Web & automatisation | — |
| Agent Archiviste | Mémoire & KPIs | `/data-analyst` |
| Agent Commandant | Chef d'orchestre | `/marketing-team` |

## Skills Claude Disponibles

| Commande | Description |
|----------|-------------|
| `/marketing-research` | Analyse concurrents, tendances, marché voyage Maroc |
| `/content-creator` | Génère posts Instagram/Facebook/LinkedIn/TikTok |
| `/data-analyst` | Analyse données, KPIs, génère tableaux de bord |
| `/presentation-maker` | Crée des decks PowerPoint/HTML structurés |
| `/marketing-team` | Lance l'équipe complète (orchestrateur) |

## Stack Technologique

| Catégorie | Outils |
|-----------|--------|
| Web | Next.js · Tailwind CSS · Sanity.io · Vercel · GitHub |
| CRM & Email | HubSpot · Brevo |
| Automation | Make.com · Google Apps Script |
| OTAs | Viator · Civitatis · Airbnb Experiences |
| Social | Instagram · Facebook · LinkedIn · TikTok · Buffer |
| Design | Midjourney · Canva · Google Stitch |
| IA | Claude API · Claude Code |
| Finance | Google Sheets · PDF.js |

## Règles de Travail

1. **Toujours lire** les fichiers `docs/` avant de produire du contenu marketing
2. **Respecter le ton** défini dans `docs/voyages21-brand.md`
3. **Cibler le B2B** en priorité (Tour Opérateurs, agences) sauf mention contraire
4. **Marchés prioritaires** : France, Espagne, Allemagne, Angleterre, Chine
5. **Devise principale** : MAD (avec conversion USD/EUR)
6. **Toujours proposer** des livrables concrets (post prêt à publier, fichier HTML, etc.)
