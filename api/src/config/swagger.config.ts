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
        name: "Mohamed Lamine & Amiour Amir Tahar",
        email: "mohamedlamineremini@gmail.com, amiouramirtahar@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/docs/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;