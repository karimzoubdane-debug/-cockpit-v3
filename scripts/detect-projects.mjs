#!/usr/bin/env node
// Robot Cockpit — detection automatique des nouveaux depots GitHub.
// Liste tous les depots du proprietaire, les compare aux fiches deja
// presentes dans index.html (tableau defaultProjects) et ajoute une fiche
// pour chaque depot manquant. Incremente DATA_VERSION si des ajouts ont lieu.
//
// Variables d'environnement :
//   GH_TOKEN  : token GitHub (PAT) avec le scope `repo` (lecture des depots prives)
//   GH_OWNER  : proprietaire des depots (defaut: karimzoubdane-debug)

import fs from 'node:fs';

const OWNER = process.env.GH_OWNER || 'karimzoubdane-debug';
const TOKEN = process.env.GH_TOKEN || '';
const FILE = 'index.html';
const SELF = `${OWNER}/-cockpit-v3`.toLowerCase();

if (!TOKEN) {
  console.error('ERREUR : aucun token GitHub fourni (GH_TOKEN vide). Verifiez le nom du secret.');
  process.exit(1);
}

let html = fs.readFileSync(FILE, 'utf8');

// 1. Slugs deja presents dans le cockpit (champ github:'owner/repo')
const existing = new Set(
  [...html.matchAll(/github:\s*'([^']+)'/g)].map((m) => m[1].toLowerCase())
);

// 2. Recuperer tous les depots du proprietaire (pagination)
async function fetchAllRepos() {
  const repos = [];
  for (let page = 1; page < 20; page++) {
    const res = await fetch(
      `https://api.github.com/user/repos?per_page=100&page=${page}&affiliation=owner&sort=created`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'cockpit-detect-bot',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`API GitHub ${res.status} : ${body.slice(0, 300)}`);
    }
    const batch = await res.json();
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

// 3. Deduire une categorie du nom du depot
function catOf(name) {
  const n = name.toLowerCase();
  if (/(compta|business|cession|devis|tarif|commercial|prospect|crm)/.test(n)) return 'business';
  if (/(agent|bot|orchestr|command|veilleur|archiviste)/.test(n)) return 'agent';
  if (/(veille|formation|python|prof|academi|revision|dictionnaire)/.test(n)) return 'veille';
  if (/(eco|hayden|oliv|maison|labdadz|tamazouzte|conciergerie)/.test(n)) return 'eco';
  if (/(site|web|next|vercel|voyages|chine|remotion|studio)/.test(n)) return 'web';
  return 'apps';
}

function esc(s) {
  return String(s || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}
function escS(s) {
  return String(s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

const repos = await fetchAllRepos();

// 4. Depots manquants (hors cockpit lui-meme et hors depots archives)
const missing = repos.filter((r) => {
  const slug = (r.full_name || '').toLowerCase();
  return slug && slug !== SELF && !r.archived && !existing.has(slug);
});

if (missing.length === 0) {
  console.log('Aucun nouveau projet detecte.');
  process.exit(0);
}

// 5. Construire les nouvelles fiches
const ids = [...html.matchAll(/id:\s*(\d+)\s*,/g)].map((m) => Number(m[1]));
let nextId = (ids.length ? Math.max(...ids) : 0) + 1;

const fiches = missing
  .map((r) => {
    const title = (r.name || r.full_name.split('/')[1] || 'Projet')
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const desc = r.description
      ? esc(r.description)
      : `Depot ${r.full_name} detecte automatiquement par le robot Cockpit. Fiche a completer (description, phases, prochaine etape).`;
    return `{ id:${nextId++}, cat:'${catOf(r.name)}', status:'actif', title:'${escS(title)} (auto)', github:'${escS(r.full_name)}', desc:"${desc}", nextStep:"Cadrer le projet et definir la prochaine etape", stack:"A definir", refs:[], promptNotes:"- Fiche generee automatiquement : completer titre, description et phases.\\n- Lire le README du depot avant toute modification.", livrables:[], comments:[], phases:[{name:"Cadrage", state:"in_progress", items:["Depot detecte automatiquement","A cadrer"]},{name:"Developpement", state:"todo", items:["A definir"]},{name:"Deploiement", state:"todo", items:["A definir"]}] }`;
  })
  .join(',\n');

// 6. Inserer avant la fin du tableau defaultProjects
const startIdx = html.indexOf('const defaultProjects = [');
if (startIdx === -1) throw new Error('Tableau defaultProjects introuvable.');
const endIdx = html.indexOf('\n];', startIdx);
if (endIdx === -1) throw new Error('Fin du tableau defaultProjects introuvable.');

html = html.slice(0, endIdx) + ',\n' + fiches + html.slice(endIdx);

// 7. Incrementer DATA_VERSION
html = html.replace(/const DATA_VERSION = (\d+);/, (_m, v) => `const DATA_VERSION = ${Number(v) + 1};`);

fs.writeFileSync(FILE, html);
console.log(`${missing.length} nouveau(x) projet(s) ajoute(s) : ${missing.map((r) => r.full_name).join(', ')}`);
