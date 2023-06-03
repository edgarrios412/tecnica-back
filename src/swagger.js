const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express")

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Goodreads API',
    version: '1.0.0',
    description: 'Esta API REST, construida con Express, proporciona un conjunto de endpoints para acceder y manipular datos de Goodreads.',
  },
};

const options = {
  swaggerDefinition,
  apis: [
    'src/routes/*.js',
    'src/db.js',
    'src/models/*.js',
    'src/controllers/**/*.js',
    // 'src/responsesSwagger/*.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get("/docs.json", (req,res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec)
    })
    console.log(`Docs are available at http://localhost:${port}/docs`)
}

module.exports = { swaggerDocs }