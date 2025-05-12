"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import path from "path";
import morgan from "morgan"
import { fileURLToPath } from "url";
import publicationRoutes from "../src/publication/publication-routes.js"
import commentaryRoutes from "../src/commentary/commentary-routes.js"
import { swaggerUi, swaggerDocs } from "./swagger.js"
import { dbConnection } from "./mongo.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors({
        origin: "http://localhost:5173", 
        credentials: true
      }));
      app.use(helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'", "http://localhost:5173"],
            scriptSrc: ["'self'", "'unsafe-inline'", "http://localhost:5173"],
            connectSrc: ["'self'", "http://localhost:5173"],
            imgSrc: ["'self'", "data:", "http://localhost:5173"],
            styleSrc: ["'self'", "'unsafe-inline'", "http://localhost:5173"]
          }
        },
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin" }, 
        referrerPolicy: { policy: "no-referrer" }
      }));
      
      
      
    app.use(morgan("dev"))
}


const routes = (app) => {
    app.use("/blog/v1/publication", publicationRoutes)
    app.use("/blog/v1/commentary", commentaryRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    app.use(
        "/uploads/publication-pictures",
        express.static(path.join(process.cwd(), "public/uploads/publication-pictures"))
      );
      
      
}

const conectarDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        routes(app)
        conectarDB()
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}