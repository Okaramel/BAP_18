# Bourse au Projet

## Description
Projet en équipe avec un client IFT (Institute for Future Technologies) qui a pour but de développer une galerie virtuel pour des innovations technologiques avec un système d'étiquette digitalisés.
<br/>

## Critères
- Demander une adresse email pour accéder à un projet
- Rechercher rapidement un projet (+ tag/personnes/année/thématique)

## Fonctionnalités
- UX/UI attractif
- Création de base de données
- Etiquette claires
- Responsive (SOON)

## Technologies utilisés
- EJS
- Javascript
- SASS

## Ouvrir le site
- Ecrire npm i pour installer les modules
- Modifier le DATABASE_URL dans le .env
- Ouvrir MAMP/Laragon
- Créer une base de données 'ift'
- Créer une nouvelle migration npx prisma migrate dev
- Faire npx prisma generate
- Ecrire dans la console VS CODE "npm run create-innovations" pour créer les innovations

## Créer Etiquettes/Créateurs/Tags
- Dans le terminal écrire npm run dev pour lancer le serveur
- Sur Postman, créer un identifiant POST sur l'url http://localhost:3000/admin et avec le corps suivant: <br>
  ```
    {
    "email": "bonjour@gmail.fr" ,
    "password": "123"
    }
  ```
-   Sur un navigateur, se rendre à l'url http://localhost:3000/consolelogin
-   Se connecter avec les logins
-   Créer les etiquettes/créateurs/tags
