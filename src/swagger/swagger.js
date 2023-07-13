import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "KNOCK KNOCK API",
      version: "1.0.0",
      description: "a Rest api using swagger and express.",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routers/*.js", "./swagger/*"],
};

const specs = swaggerJSDoc(options);

export default specs;
