# DOGFIT — Site + LMS

Site public + LMS pour DOGFIT (coaching fitness canin, Marie Demaris).
Next.js 16 (App Router, TypeScript, Tailwind v4) + Supabase (Postgres, Auth, Storage).

## Structure

- `app/(public)/…` — site public : accueil, présentation, cours, tarifs,
  témoignages, FAQ, contact, blog, événements. Contenu dynamique (cours,
  témoignages, blog, événements) lu depuis Supabase ; retombe sur
  `lib/placeholder-data.ts` tant que Supabase n'est pas configuré ou que les
  tables sont vides (voir `lib/supabase/is-configured.ts`).
- `app/(auth)/connexion`, `app/(auth)/inscription` — authentification par
  email/mot de passe (Supabase Auth).
- `app/espace/…` — espace élève (protégé) : tableau de bord, mes cours, mes
  exercices (+ soumission), mes corrections.
- `app/admin/…` — espace admin (protégé, `profiles.role = 'admin'`) : CRUD
  cours/leçons, CRUD exercices, boîte de correction, gestion des élèves et de
  leurs accès (octroi manuel, en attendant Stripe), blog, événements.
- `proxy.ts` (équivalent du `middleware.ts` historique, renommé suite à la
  dépréciation Next 16) — protège `/espace` et `/admin`, rafraîchit la
  session Supabase.
- `lib/supabase/` — clients Supabase (browser, server, proxy/middleware).
- `lib/data/` — requêtes lecture (public, élève, admin).
- `supabase/migrations/0001_init.sql` — schéma complet (tables, RLS,
  buckets de storage). À exécuter dans l'éditeur SQL du projet Supabase.

## Mettre en place Supabase (nécessaire pour activer connexion, espace élève,
## espace admin, formulaire de contact)

1. Créer un projet sur [supabase.com](https://supabase.com) (gratuit pour
   démarrer).
2. Dans l'éditeur SQL du projet, exécuter le contenu de
   `supabase/migrations/0001_init.sql`.
3. Dans **Project Settings → API**, récupérer l'URL du projet et la clé
   `anon public`.
4. Créer un fichier `.env.local` à la racine avec :
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
   ```
5. Créer le premier compte admin :
   - S'inscrire normalement via `/inscription` (crée un profil `student`).
   - Dans l'éditeur SQL Supabase, exécuter :
     `update profiles set role = 'admin' where id = '<uuid de l'utilisateur>';`
   - Le compte a alors accès à `/admin`.
6. Redémarrer le serveur de dev pour que les variables d'environnement
   soient prises en compte.

Tant que `.env.local` n'existe pas, le site public fonctionne avec du
contenu d'exemple, mais `/connexion`, `/inscription`, `/espace` et `/admin`
affichent un message indiquant que ces fonctionnalités ne sont pas encore
actives (voir `lib/supabase/is-configured.ts`).

## Lancer le projet en local

```bash
npm run dev
```

Un `.claude/launch.json` est fourni pour lancer le serveur via l'outil de
preview de Claude Code (utile car Node.js a été installé après le début de
la session — voir `.claude/run-dev.cmd` qui force le PATH vers
`C:\Program Files\nodejs`).

## Prochaines étapes (hors scope de la première passe)

- **Paiement Stripe** : le schéma (`enrollments.source`,
  `enrollments.stripe_customer_id`) est prêt. Il reste à créer les routes
  Stripe Checkout + webhook une fois que l'utilisateur a ses clés Stripe.
- **Déploiement** : héberger l'app sur Vercel, repointer le domaine OVH
  existant vers Vercel (DNS uniquement, OVH ne sert plus que le nom de
  domaine).
- **Durcissement du storage** : les buckets Supabase Storage
  (`course-files`, `submissions`, `corrections`) sont publics avec des
  chemins non devinables (uuid) — simple pour le MVP, mais à remplacer par
  des URLs signées si une confidentialité stricte est nécessaire.
- **Contenu réel** : remplacer le contenu d'exemple
  (`lib/placeholder-data.ts`) par les vrais cours, témoignages, articles de
  blog et événements de Marie, une fois Supabase configuré (via `/admin`
  pour cours/exercices/blog/événements — les témoignages doivent pour
  l'instant être ajoutés directement dans Supabase).
- **Blog/messagerie avancée** : pas de commentaires sur le blog, pas de
  messagerie interne élève ↔ admin pour cette première passe.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
