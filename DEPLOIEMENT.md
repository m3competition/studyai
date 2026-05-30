 # StudyAI — Guide de déploiement Vercel

## Structure du projet
```
studyai-vercel/
├── api/
│   └── ai.js          ← Backend qui cache ta clé API
├── public/
│   └── index.html     ← Ton app StudyAI
└── vercel.json        ← Configuration Vercel
```

---

## Étape 1 — Créer un compte GitHub (si pas déjà fait)
1. Va sur **github.com** → "Sign up"
2. Crée ton compte gratuitement

---

## Étape 2 — Créer un compte Vercel
1. Va sur **vercel.com** → "Sign up"
2. Connecte-toi avec GitHub

---

## Étape 3 — Uploader le projet
1. Sur Vercel, clique **"Add New Project"**
2. Clique **"Upload"** (pas besoin de GitHub pour ça)
3. Glisse le dossier **studyai-vercel** entier dans la zone d'upload
4. Clique **"Deploy"**

---

## Étape 4 — Ajouter ta clé API (IMPORTANT)
1. Une fois déployé, va dans **Settings → Environment Variables**
2. Clique **"Add New"**
3. Name: `GROQ_API_KEY`
4. Value: ta clé Groq (commence par `gsk_...`)
5. Clique **"Save"**
6. Va dans **Deployments** → clique les 3 points → **"Redeploy"**

---

## Étape 5 — Ton app est en ligne! 🎉
Vercel te donne une URL comme : `studyai-xxxx.vercel.app`

---

## Étape 6 — Domaine personnalisé (optionnel, ~15$/an)
1. Achète `studyai.ca` sur **namecheap.com**
2. Dans Vercel → Settings → Domains → "Add Domain"
3. Entre `studyai.ca` et suis les instructions DNS

---

## Notes importantes
- Ta clé Groq est **invisible** pour les utilisateurs — elle est seulement dans les variables d'environnement Vercel
- L'hébergement Vercel est **gratuit** pour ce type de projet
- Si tu as des problèmes, écris à support@vercel.com
