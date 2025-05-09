import { Router } from "express";
import { createPublication, getAllPublications } from "./publication-controller.js";
import { createPublicationValidator, getAllPublicationsValidator } from "../middlewares/publication-validators.js";
import { uploadPublicationPictures } from "../middlewares/multer-upload.js";

const router = Router()

/**
 * @openapi
 * /blog/v1/publication/post:
 *   post:
 *     summary: Crear una nueva publicación
 *     description: Crea una publicación y permite subir una imagen usando multipart/form-data.
 *     tags:
 *       - Publicaciones
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - class
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la publicación
 *                 example: Proyecto de Redes
 *               description:
 *                 type: string
 *                 description: Descripción del trabajo
 *                 example: Configuración de topología en Packet Tracer
 *               class:
 *                 type: string
 *                 description: Curso al que pertenece
 *                 enum: [TICS, TALLER, TECNO]
 *                 example: TECNO
 *               publicationPicture:
 *                 type: string
 *                 format: binary
 *                 description: Imagen relacionada (jpg/png)
 *     responses:
 *       201:
 *         description: Publicación creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Publicación creada con éxito
 *                 publication:
 *                   $ref: '#/components/schemas/Publication'
 *       400:
 *         description: Error en los datos enviados o tipo de archivo inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post(
    "/post",
    uploadPublicationPictures.single("publicationPicture"),
    createPublicationValidator,
    createPublication
  );
  

router.post("/post",uploadPublicationPictures.single("publicationPicture"),createPublicationValidator,createPublication)

/**
 * @openapi
 * /blog/v1/publication/getPost:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     description: Devuelve una lista de todas las publicaciones, con opción de filtrar por curso y estado.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: query
 *         name: class
 *         schema:
 *           type: string
 *           enum: [TICS, TALLER, TECNO]
 *         description: Filtrar por curso (opcional)
 *         example: TECNO
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *         description: Filtrar por estado (opcional)
 *         example: true
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publication'
 *       400:
 *         description: Error en los parámetros de consulta
 *       500:
 *         description: Error del servidor
 */
router.get("/getPost", getAllPublicationsValidator, getAllPublications);

export default router