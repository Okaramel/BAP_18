## Bourse au Projet

<br/>

## Description

<br />
Projet en équipe avec un client IFT (Institute for Future Technologies) qui a pour but de développer une galerie virtuel pour des innovations technologiques avec un système d'étiquette digitalisés.
<br/>

## Fonctionnalités

<br />
- UX/UI attractif
<br/>
- Création de base de données
<br/>
- Etiquette claires
<br/>
- Responsive (SOON)

## Outils utilisés

-   EJS
-   Javascript
-   Sass

## Ouvrir le site

-   Modifier le DATABASE_URL dans le .env
-   Faire npx prisma generate
-   Ecrire dans la console VS CODE "npm run create-innovations" pour créer les innovations

## Créer Etiquettes/Créateurs/Tags

-   Créer sur Postman un identifiant POST avec l'url http://localhost:3000/admin
    EXEMPLE :
    {
    "email": "bonjour@gmail.fr" ,
    "password": "123"
    }
-   Ecrire http://localhost:3000/consolelogin
-   Se connecter avec les logins
-   Créer les etiquettes/créateurs/tags
