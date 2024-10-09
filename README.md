# F1 Reaction Timer

## **Description**

Le projet **F1 Reaction Timer** est une application complète permettant de mesurer le temps de réaction des utilisateurs dans le contexte d'une simulation de départ de Formule 1. L'application comprend un backend (API) basé sur Node.js/Express et un frontend (UI) utilisant une technologie frontend moderne (comme React ou Vue.js). Le backend utilise MongoDB comme base de données, et l’ensemble est orchestré avec Docker.

## **Table des Matières**

1. [Prérequis](#prérequis)
2. [Commandes d'Installation des Dépendances](#commandes-dinstallation-des-dépendances)
3. [Installation et Configuration](#installation-et-configuration)
4. [Démarrage de l’Application](#démarrage-de-lapplication)
5. [Documentation de l'API](#documentation-de-lapi)
6. [Tests](#tests)
7. [Déploiement](#déploiement)
8. [Contributeurs](#contributeurs)

## **Prérequis**

Avant de démarrer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 16.x ou supérieure)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB](https://www.mongodb.com/), si vous ne souhaitez pas l'utiliser via Docker.

## **Commandes d'Installation des Dépendances**

### **Backend**

1. Initialisation du projet et installation des dépendances de base :  
   `npm install express mongoose argon2 jsonwebtoken`  
   `npm install --save-dev typescript @types/node @types/express ts-node nodemon`

### **Frontend**

1. Création de l'application React et installation des dépendances :  
   `npx create-react-app ui --template typescript`  
   `cd ui`  
   `npm install axios react-router-dom @types/react-router-dom`

### **Tests**

1. Installation des dépendances de test :  
   `npm install --save-dev jest ts-jest @types/jest mongodb-memory-server`

## **Installation et Configuration**

### **1. Backend (API)**

1. **Naviguez dans le dossier API :**  
   `cd api`

2. **Installez les dépendances :**  
   `npm install`

3. **Configurez les variables d'environnement :**  
   Créez un fichier `.env` depuis `.env.sample` dans le dossier `api` et ajuster les valeurs des variables selon vos besoins.:  
   `PORT=port`  
   `MONGO_URI=mongodb://mongo:27017/f1-reaction-timer`  
   `JWT_SECRET=your_secret_key`  
   Vous pouvez ensuite renommer ce fichier en `.env` et ajuster les valeurs des variables selon vos besoins.

### **2. Frontend (UI)**

1. **Naviguez dans le dossier UI :**  
   `cd ui`

2. **Installez les dépendances :**  
   `npm install`

## **Démarrage de l’Application**

### **Utilisation de Docker**

Assurez-vous que Docker est installé et en cours d'exécution.

À la racine du projet, exécutez la commande suivante pour démarrer l'application backend avec MongoDB :  
`docker-compose up --build`  
Cela va construire et démarrer les conteneurs pour le backend (Node.js) et MongoDB.

Accédez à l'application dans votre navigateur :

- **API :** http://localhost:portapi
- **Frontend :** http://localhost:portfront

## **Documentation de l'API**

L'API backend contient plusieurs points de terminaison, chacun avec ses fonctionnalités spécifiques :

### **Authentification**
- POST /api/auth/register : Enregistre un nouvel utilisateur.
- POST /api/auth/login : Connecte un utilisateur.
- POST /api/auth/logout : Déconnecte un utilisateur.

### **Temps de Réaction**
- POST /api/reaction-time/submit-reaction-time : Soumet un temps de réaction pour l’utilisateur connecté.
- GET /api/reaction-time/get-reaction-times : Récupère les temps de réaction de l’utilisateur connecté.

## **Tests**

Les tests sont situés dans le dossier `tests` du dossier `src` de l’API. Vous pouvez exécuter les tests en utilisant la commande suivante :  
`npm test`

## **Déploiement**

Le projet utilise Docker pour simplifier le déploiement. Vous pouvez facilement déployer l'application en utilisant Docker Compose.

### **Déployer sur un Serveur**
1. **Construisez les images Docker Lancez les services:**  
   `docker-compose up --build`
## **Contributeurs**

- AMIOUR Amir Tahar 
- REMENI Mohammed Lamine 

### Remarques
- Vous pouvez personnaliser la section "Contributeurs" avec les noms et rôles appropriés.
- Vérifiez également que le fichier `.env.sample` existe bien dans votre dossier `api` avec le contenu proposé.
