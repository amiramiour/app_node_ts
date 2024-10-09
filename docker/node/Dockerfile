# Utilise une image de base node
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json dans le conteneur
COPY ./api/package*.json ./

# Installer les dépendances, y compris celles de développement
RUN npm install

# Copier le reste du code de l'application dans le conteneur
COPY ./api/ .

# Exposer le port sur lequel l'application tourne
EXPOSE 3000

# Commande par défaut pour démarrer en mode développement
CMD ["npm", "run", "dev"]
