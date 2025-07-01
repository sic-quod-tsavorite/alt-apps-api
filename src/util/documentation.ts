import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Application } from "express";

/**
 * Setup Swagger documentation
 * @param app
 */
export function setupDocs(app: Application) {
  // swagger definition
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Alternative Apps API, Swagger",
      version: "1.0.0",
      description: "Description",
    },
    servers: [
      {
        url: "http://localhost:" + (process.env.PORT || 4000) + "/aa-api/",
        description: "Local development server",
      },
      {
        url: "https://alt-apps-api.onrender.com/aa-api",
        description: "On render development server",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "auth-token",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            registerDate: { type: "string" },
          },
        },
        Program: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            logo: { type: "string" },
            country: { type: "string" },
            isHidden: { type: "boolean" },
            altPrograms: { type: "array" },
            _createdBy: { type: "string" },
          },
        },
        AltProgram: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            logo: { type: "string" },
            country: { type: "string" },
            isHidden: { type: "boolean" },
            _createdBy: { type: "string" },
          },
        },
      },
    },
  };

  // swagger options
  const options = {
    swaggerDefinition,

    // Path to the files containing OpenAPI definitions
    apis: ["**/*.ts"],
  };

  // swagger specifications
  const swaggerSpec = swaggerJSDoc(options);

  // create docs route
  app.use("/aa-api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
