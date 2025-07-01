# Spécifications Techniques — Editeur SVG React

## 1. Choix technologiques

| Aspect                   | Choix                           |
| ------------------------ | ------------------------------- |
| Framework JS             | React                           |
| Gestion des styles       | Tailwind CSS                    |
| State management         | Zustand                         |
| Gestion des fichiers     | API File + Copier-coller SVG    |
| Structure des composants | Feature-based                   |
| Undo/Redo                | Librairie dédiée (ex: use-undo) |
| Tests                    | Vitest                          |
| Icônes                   | Lucide                          |
| Outil de build           | Vite                            |
| Gestion des assets       | Dossier `public/`               |

---

## 2. Structure du projet

```text
/
├── public/
│   └── [assets statiques]
├── src/
│   ├── features/
│   │   └── [une fonctionnalité = un dossier]
│   ├── components/
│   ├── store/            # Zustand stores
│   ├── hooks/
│   ├── icons/            # Icons wrappers éventuels
│   ├── styles/           # (si customisation Tailwind)
│   ├── App.tsx
│   └── main.tsx
├── vite.config.ts
├── package.json
└── SPECIFICATIONS_TECHNIQUES.md
```

---

## 3. Gestion des styles

- Utilisation exclusive de **Tailwind CSS** pour la mise en forme.
- Pas de fichiers `.css` classiques ni de CSS-in-JS.
- Les utilitaires Tailwind sont utilisés dans les composants JSX.

---

## 4. State management

- Store global basé sur **Zustand**.
  - Stockage : formes SVG, propriétés, sélection, etc.
  - Stores structurés par feature
  - Hooks personnalisés pour accéder/modifier le store

---

## 5. Gestion des fichiers SVG

- **Import** : via l’API File du navigateur (`<input type="file" />`)
- **Export** :
  - Soit enregistrement local (`download`) via l’API File
  - Soit copier-coller direct du code SVG par l’utilisateur
- Pas de persistance cloud par défaut

---

## 6. Organisation des composants

- Structure **feature-based** :
  - Par exemple : `/src/features/shape`, `/src/features/history`, etc.
  - Chaque feature contient ses propres composants, hooks, store, utils…

---

## 7. Undo/Redo

- Utilisation d’une **librairie dédiée** (ex:
  [`use-undo`](https://github.com/aaronpowell/undo), `redux-undo`)
  - Historique conservé en mémoire (pas nécessairement persistant)
  - Intégration avec Zustand si possible

---

## 8. Tests

- Utilisation de **Vitest** pour les tests unitaires & d’intégration.
  - Possible intégration avec React Testing Library pour tests de composants.

---

## 9. Icônes

- Utilisation de **Lucide** via la librairie React officielle.
  - Import sélectif des icônes nécessaires.

---

## 10. Build & outillage

- Utilisation de **Vite**
  - Configuration pour React + Tailwind
  - Support TypeScript recommandé

---

## 11. Gestion des assets

- Tous les assets statiques (images, SVG d’exemple, etc.) placés dans le dossier
  `public/`
- Importés via URL absolue `/` pour compatibilité Vite

---

## 12. Contraintes et principes

- Modularité maximale et séparation nette des features
- Préférence pour les solutions simples et documentées
- Accessibilité et responsivité de l’interface
- Documentation technique (README, ce fichier) à jour

## 13. Bonnes pratiques et conventions

- Code commenté et lisible
- Utilisation de modules ES6
- Respect des standards d’accessibilité (WCAG)
- Responsive design (adaptatif aux écrans)
- Tests unitaires sur les fonctions critiques (optionnel)

### 13.1. Dépendances et outils

- Gestionnaire de paquets (npm, yarn…)
- Outils de build si framework utilisé (Webpack, Vite…)
- ESLint / Prettier pour la qualité du code

---

## 13.2. Contraintes & exigences

- Compatibilité multi-navigateurs modernes (Chrome, Firefox, Edge…)
- Pas de dépendance à une API externe pour le rendu SVG
- Licence Open Source (MIT, à confirmer)
- Documentation utilisateur minimale (README)

---

## 14. Évolutions possibles (hors scope initial)

- Persistance cloud (Firebase, Supabase…)
- Authentification utilisateur
- Collaboration temps réel
- PWA/export mobile

---

_Document généré à partir de tes choix techniques. À adapter si besoin !_
