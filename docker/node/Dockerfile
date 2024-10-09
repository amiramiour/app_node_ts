FROM node:16

WORKDIR /app

# Copy package.json and package-lock.json
COPY ./api/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./api/ .

# Build the TypeScript files
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]