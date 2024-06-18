import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRoutes from "./routes/products.routes.js";
import swaggerJsDoc  from'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { PORT } from "./config/config.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API',
      version: '1.0.0',
      description: 'A simple API for managing products'
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// Routes
app.use("/api", productRoutes);

export default app;