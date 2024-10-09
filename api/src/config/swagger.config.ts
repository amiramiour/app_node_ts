import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Tp docker",
      version: "0.1.0",
      description: "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Mohamed Lamine",
        email: "mohamedlamineremini@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/docs/*.ts", "./src/controllers/*.ts"], // Add paths to your Swagger documentation files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;