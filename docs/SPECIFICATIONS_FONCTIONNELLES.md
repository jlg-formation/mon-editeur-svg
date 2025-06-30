# Spécifications — Éditeur de fichiers SVG

## 1. Présentation du projet

L’objectif est de concevoir un éditeur de fichiers SVG simple, accessible via une interface web, permettant la création, la visualisation et la modification de graphismes vectoriels (SVG).  
Ce projet vise à offrir une expérience utilisateur intuitive pour manipuler des formes de base et gérer facilement des fichiers SVG.

---

## 2. Spécifications fonctionnelles

### 2.1. Fonctionnalités de base

- **Canevas SVG interactif** :  
  Affichage d’une zone de dessin SVG, redimensionnable si besoin.

- **Création de formes** :

  - Rectangle
  - Cercle
  - Ligne
  - Texte

- **Sélection et déplacement** :

  - Sélection d’un objet par clic
  - Déplacement par glisser-déposer

- **Modification des propriétés** :

  - Position (x, y)
  - Dimensions (largeur, hauteur, rayon…)
  - Couleur de remplissage et de contour
  - Épaisseur du trait

- **Suppression d’objets** :

  - Suppression via une commande ou une touche clavier

- **Import / Export** :

  - Import de fichiers SVG existants
  - Export du dessin courant au format SVG

- **Annulation / Rétablissement** :
  - Undo / redo sur les actions (ajout, déplacement, suppression…)

### 2.2. Fonctionnalités avancées (optionnelles)

- Groupement / dégrouper des objets
- Zoom / dézoom, déplacement du canevas
- Grille magnétique (snap to grid)
- Édition directe du code SVG
- Ajout d’images raster (JPG, PNG)
- Gestion des calques

---

## 3. Spécifications techniques

### 3.1. Plateforme et technologies

- **Application web** (SPA)
- **Langages** : HTML5, CSS3, JavaScript (framework à définir : React, Vue.js, ou Vanilla JS)
- **SVG natif** pour le rendu graphique
- **Gestion du projet** : Git + GitHub

### 3.2. Structure du code

- `index.html` — Point d’entrée de l’application
- `src/` — Code source principal
  - `components/` — Composants UI (ex : Toolbar, PropertiesPanel…)
  - `svg/` — Fonctions utilitaires pour manipuler le SVG
  - `styles/` — Feuilles de style CSS/SCSS
- `public/` — Ressources statiques

---

## 6. Glossaire

- **SVG** : Scalable Vector Graphics, format d’image vectoriel basé sur XML.
- **Canevas** : Surface de dessin virtuelle affichant les éléments graphiques.
- **SPA** : Single Page Application.

---

_Document rédigé le 30/06/2025._
