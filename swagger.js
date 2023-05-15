const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "PC Managment Server API",
    version: "1.0.0",
    description: "API documentation for Your Application",
  },
  servers: [
    {
      url: "http://localhost:4000", // Replace with your actual API server URL
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to your Express.js route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
