# Location Voiture Maroc — Autoloc

Site de location de voitures (projet démo) : réservation en ligne, calendrier, fiches véhicules, offres & annonces.
HTML / CSS / JavaScript vanilla, sans framework ni build.

## Lancer le site

Ouvrir `index.html` dans un navigateur. Aucune installation n'est nécessaire.

## Fonctionnalités

- Recherche par ville, dates et catégorie, avec restitution dans une autre agence
- Flotte de 12 véhicules : filtres (boîte, carburant, places, prix), tri, favoris
- Fiche annonce par voiture : prix 1/7/30 jours, fiche technique, conditions, stock par agence, lien partageable
- Réservation en 4 étapes : dates, options et assurance, conducteur, paiement
- Calcul automatique : remise durée (−10 % dès 4 jours, −20 % dès 14 jours), offres en cours, codes promo, aller simple, jeune conducteur
- Offres & annonces avec date de fin, barre d'annonces, actualités
- « Mes réservations » avec annulation et remboursement selon le délai
- Listes déroulantes, calendrier et heures personnalisés (`controls.js`), utilisables au clavier
- Mode sombre, responsive mobile, bouton WhatsApp

## Structure

```
index.html    page et modales
style.css     styles (thème clair / sombre)
script.js     données (voitures, agences, offres) et logique
controls.js   select / date / heure personnalisés
images/       photos des modèles
```

Les données (voitures, prix, offres, agences) sont dans les constantes en haut de `script.js`.
Les réservations, favoris et inscriptions newsletter sont stockés dans le `localStorage` du navigateur ; le paiement est simulé.

## Crédits

Photos des modèles : Wikimedia Commons (CC BY-SA). Photo d'accueil : Unsplash.

---

Réalisé par [dev is your solution](https://devisyoursolution.vercel.app/) — studio digital, Oued Zem.
