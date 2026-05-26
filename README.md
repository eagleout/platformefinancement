# Plateforme Financement — Landing Page

Landing page de conversion pour **plateformefinancement.fr**.

Site statique, sans dépendance, sans build. Un seul fichier `index.html` autonome (CSS et JS inclus).

---

## 🚀 Mise en ligne — GitHub Pages

### 1. Créer le repo GitHub

1. Aller sur [github.com/new](https://github.com/new)
2. Nom du dépôt : `plateformefinancement` (ou ce que vous voulez)
3. Visibilité : **Public** (obligatoire pour GitHub Pages gratuit) ou Private si compte Pro
4. **Ne pas** initialiser avec README (on a déjà tout)
5. Cliquer **Create repository**

### 2. Pousser les fichiers

Depuis votre terminal, dans ce dossier :

```bash
git init
git add .
git commit -m "Initial commit — landing v1"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/plateformefinancement.git
git push -u origin main
```

### 3. Activer GitHub Pages

1. Dans le repo GitHub → onglet **Settings**
2. Menu de gauche → **Pages**
3. Source : `Deploy from a branch`
4. Branch : `main` / dossier `/ (root)`
5. **Save**

Au bout de 30-60 secondes, le site est accessible à :
`https://VOTRE-USERNAME.github.io/plateformefinancement/`

### 4. Brancher le domaine `plateformefinancement.fr`

1. Dans **Settings → Pages → Custom domain**, taper : `www.plateformefinancement.fr` puis **Save**
2. Chez votre registrar (OVH, Gandi, Namecheap…), configurer le DNS :

| Type  | Nom  | Valeur                          |
|-------|------|---------------------------------|
| CNAME | www  | `VOTRE-USERNAME.github.io.`     |
| A     | @    | `185.199.108.153`               |
| A     | @    | `185.199.109.153`               |
| A     | @    | `185.199.110.153`               |
| A     | @    | `185.199.111.153`               |

3. Attendre la propagation DNS (5 min à 24h)
4. Dans GitHub Pages, cocher **Enforce HTTPS** une fois le certificat émis

---

## 📁 Structure

```
.
├── index.html      # Landing complète (HTML + CSS + JS inline)
├── CNAME           # Domaine personnalisé GitHub Pages
├── robots.txt      # Indexation SEO
├── README.md       # Ce fichier
└── .gitignore
```

---

## ✏️ Personnalisation rapide

### Changer un texte
Ouvrir `index.html` dans n'importe quel éditeur (VS Code, Sublime, même Bloc-notes). Tout est en clair.

### Changer une couleur
Tout en haut du `<style>`, dans `:root` :

```css
--ink:#0B1220;      /* fond principal bleu nuit */
--gold:#C9A35B;     /* accent doré */
--emerald:#3FB58A;  /* vert validation */
```

### Brancher le formulaire à un email / CRM
Localiser `<form class="qualifier"` dans `index.html` (vers ligne 540) et remplacer l'attribut `onsubmit` par votre endpoint :

- **Formspree** (le plus simple, gratuit jusqu'à 50 leads/mois) :
  ```html
  <form class="qualifier" id="qualifier" action="https://formspree.io/f/VOTRE-ID" method="POST">
  ```
- **HubSpot / Pipedrive / Brevo** : générer un formulaire intégré et remplacer le bloc.

### Changer le numéro de téléphone
Rechercher `09 70 70 79 19` (apparaît deux fois) et remplacer.

---

## 🔍 SEO — checklist post-déploiement

- [ ] Soumettre `https://www.plateformefinancement.fr/sitemap.xml` à Google Search Console
- [ ] Vérifier la propriété du domaine sur Search Console (balise meta ou DNS)
- [ ] Ajouter un fichier `sitemap.xml` (à générer une fois en ligne)
- [ ] Configurer un favicon (placer `favicon.ico` à la racine)
- [ ] Brancher un outil d'analytics (Plausible, Fathom, ou GA4 — ajouter le snippet dans le `<head>`)

---

## 📞 Contact technique

Repository maintenu par OMA Services pour le client Plateforme Financement.
