import { Router } from "express";
import { createPublication } from "./publication-controller.js";
import { createPublicationValidator } from "../middlewares/publication-validators.js";
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

export default router