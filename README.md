# Bourse au Projet

## Description
Projet en équipe avec pour l'IFT (Institute for Future Technologies) qui a pour but de développer une galerie virtuelle présentant des innovations technologiques avec un système d'étiquette digitalisés.
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
Il faut suivre ce guide pour préparer et voir le site sur une nouvelle machine.

### Prérequis
[Node.js](https://nodejs.org/) et [Laragon](https://laragon.org/) doivent être installés et prêts à l'usage sur un ordinateur Windows.

### Installation
- Télécharger le code du projet depuis la page d'accueil
- Extraire le projet à un endroit accessible de l'ordinateur
- Ouvrir un terminal à la racine du projet et lancer la commande ```npm i``` (installation des paquets)

### Base de Données
- Créer un fichier nommé ```.env``` à la racine du projet et y écrire les lignes suivantes:
  ```
  DATABASE_URL="mysql://*nom d'utilisateur*:*mot de passe*@localhost:3306/ift"
  JWT_SECRET = "*générer une séquence de charactères au hasard"
  ```
  Remplacer les zones entourées par des ```*``` avec les identifiants PHPMyAdmin (accès à la BDD) et une clé de sécurité
- Se connecter à PHPMyAdmin (via Laragon) et créer une nouvelle base de données nommée ```ift``` (sauvegarder et supprimer les BDD avec ce nom déjà existantes)
- Importer le fichier ```ift.sql``` (dans le dossier ```setup```) dans la base de données ```ift```
- Dans le terminal du projet, exécuter les commandes suivantes:
  ```
  npx prisma migrate dev
  npx prisma generate
  npm run create-innovations
  ```

### Images
- Extraire le fichier ```uploads_source.zip``` dans le dossier ```setup```
- Déplacer le contenu du dossier ```uploads_source``` (sous-dossier ```uploads```) dans le dossier ```public``` du projet

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
