const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "SISTEC API",
    description: "Documentación generada automáticamente para SISTEC",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"]; // o donde defines tus rutas

swaggerAutogen(outputFile, endpointsFiles, doc);
