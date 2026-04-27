# L'ecomax

Boutique e‑commerce de démonstration (style Adidas), construite avec **Next.js 15 (App Router)**, **React 19**, **TypeScript** et **Tailwind CSS**. Toutes les données produits sont mockées localement, le panier est persisté en `localStorage`.

## Lancer le projet

```powershell
npm install
npm run dev
```

Puis ouvrez http://localhost:3000.

## Pages

- `/` — Accueil (hero, nouveautés, catégories, bestsellers, promo, adiClub)
- `/homme`, `/femme`, `/enfants`, `/chaussures`, `/accessoires` — Listes catégories
- `/promotions` — Articles en promo
- `/produit/[slug]` — Fiche produit (galerie, sélection pointure, ajout panier)
- `/panier` — Panier avec récapitulatif

## Personnalisation

- Données produits : `lib/products.ts`
- Couleurs / police : `tailwind.config.js`
- Composants UI : `components/`

> Les images sont des placeholders Unsplash / Picsum. Aucune marque tierce n'est utilisée.
