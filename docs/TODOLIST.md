# Reste à faire — Éditeur SVG React

## 1. Structure des types et du store

- [x] Définir les types TypeScript pour toutes les formes SVG (ellipse, cercle,
      ligne, polygone, texte…)
- [x] Structurer le store Zustand pour :
  - L’undo/redo (état d’historique)
  - Les actions liées au document (import/export/new)

---

## 2. Rendu du canevas SVG

- [x] Afficher la grille de fond (optionnelle, toggle)
- [x] Ajouter le zoom et le pan (déplacement du canevas)
- [ ] Afficher le niveau de zoom dans la barre d'outils

---

## 3. Ajout et gestion des formes

- [ ] Ajouter les boutons d’ajout pour ellipse, cercle, ligne, polygone, texte
- [ ] Permettre la sélection multiple (Maj+clic, rectangle de sélection)
- [ ] Permettre l’ordre d’empilement (monter/descendre dans la pile)
- [ ] Permettre la manipulation directe (drag, resize, rotate) :
  - Poignées de redimensionnement
  - Rotation avec poignée dédiée
  - Déplacement par drag
  - Déplacement au clavier (flèches)
- [ ] Regroupement/dégroupement de formes

---

## 4. Panneau de propriétés

- [ ] Affichage dynamique des propriétés selon le type de forme (ellipse,
      cercle, ligne, polygone, texte…)
- [ ] Édition des propriétés avancées : opacité, bordure, texte/mise en forme
      pour le texte SVG, etc.

---

## 5. Gestion du document SVG

- [ ] Nouveau document (vider)
- [ ] Importer SVG (parser complet, transformer en objets internes)
- [ ] Exporter SVG (générer le code, proposer download et copier-coller)
- [ ] Sauvegarde/restauration locale (localStorage)
- [ ] Afficher une liste des formes (calques) :
  - Glisser-déposer pour réordonner
  - Sélection via la liste
  - Affichage/masquage/lock de calques

---

## 6. Undo/Redo

- [ ] Implémenter undo/redo global :
  - Sur toutes les actions impactant le store
  - Indicateur d’état (actions disponibles/désactivées)
  - Raccourcis clavier (Ctrl+Z, Ctrl+Y/Ctrl+Shift+Z)
  - Affichage optionnel d’un historique détaillé

---

## 7. Copier/Coller et duplication

- [ ] Copier/coller interne (Ctrl+C/Ctrl+V sur les formes)
- [ ] Copier/coller SVG (exporter code SVG d’une forme/canevas, import par
      collage)
- [ ] Duplication rapide d’une forme

---

## 8. Fonctions avancées de mise en page

- [ ] Alignement et distribution des formes sélectionnées (gauche, droite,
      centre, haut, bas, espacement égal, etc.)
- [ ] Guides et grille magnétique :
  - Affichage optionnel des guides
  - Snap sur grille/guides
- [ ] Groupement/dégroupe de formes

---

## 9. Accessibilité et expérience utilisateur

- [ ] Navigation clavier complète (tab, focus, flèches, raccourcis claviers)
- [ ] Annonces ARIA et labels sur toutes les actions
- [ ] Mode sombre (switch, support Tailwind)
- [ ] Responsive pour tablette/mobile
- [ ] Affichage d’aides contextuelles (tooltips, raccourcis claviers)

---

## 10. Tests et qualité

- [ ] Mise en place de tests unitaires (Vitest + RTL)
- [ ] Couverture des stores, des composants clés, des fonctions critiques
- [ ] Tests d’intégration (actions complexes, undo/redo, import/export)
- [ ] Lint et format sur CI

---

## 11. Documentation et démo

- [ ] Documentation utilisateur (markdown, ou dans l’UI)
- [ ] Ajout de GIF ou vidéos de démo
- [ ] Ajout d’un mode “Exemple” (chargement d’un SVG de démo)
- [ ] Documentation développeur (structure, conventions, bonnes pratiques)

---

## 12. (Optionnel) Extensions futures

- [ ] Authentification utilisateur (si mode cloud)
- [ ] Sauvegarde cloud (Firebase, Supabase…)
- [ ] Collaboration temps réel (WebSocket, Yjs…)
- [ ] Export PNG/PDF/JPEG (via canvas ou serveur)
- [ ] Publication directe (GitHub Pages, partage de lien)
- [ ] PWA / mode déconnecté

## 13. Misc

- [ ] Eviter les Cumulative Layout Shift pour les boutons. Faire que les boutons
      dans le header soit a largeur fixe.
- [x] Quand on zoom avec la souris, le point sous le curseur ne devrait pas
      bouger. Actuellement il y a une sorte de translation qui accompagne le
      zoom et dérange l'utilisateur. Le centre du zoom devrait être la souris.
      Si on zoome avec le bouton, le centre du zoom devrait etre le centre du
      canvas.
- [ ] Faire un bouton pour remettre le Zoom a 100% (avec raccourci clavier
      Ctrl+0). Faire un deuxieme bouton pour mettre le zoom le plus élevé mais
      de facon a ce que l'utilisateur voit tous les objets dans le canvas (Zoom
      to fit) (avec raccourci clavier Shift+1). Faire un troisieme bouton pour
      que le zoom soit le plus élevé mais que l'utilisateur voit sa selection
      courante (zoom to fit selection) (Shift+2).
