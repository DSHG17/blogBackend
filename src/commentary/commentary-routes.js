import { Router } from "express";
import { createCommentaryValidator, getCommentsByPublicationValidator } from "../middlewares/commentary-validators.js";
import { createComment, getCommentsByPublication } from "./commentary-controller.js";
;

const router = Router()


/**
 * @openapi
 * /blog/v1/comment/postCommentary:
 *   post:
 *     summary: Crear un nuevo comentario
 *     description: Crea un comentario asociado a una publicación.
 *     tags:
 *       - Comentarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - content
 *               - publicationId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de quien comenta
 *                 example: Ana Gómez
 *               content:
 *                 type: string
 *                 description: Contenido del comentario
 *                 example: Muy interesante la publicación.
 *               publicationId:
 *                 type: string
 *                 description: ID de la publicación relacionada
 *                 example: 681e167e228786d8e5597e86
 *     responses:
 *       200:
 *         description: Comentario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comentario creado con éxito
 *                 comment:
 *                   $ref: '#/components/schemas/Commentary'
 *       500:
 *         description: Error interno al crear el comentario
 */

router.post("/postCommentary",createCommentaryValidator,createComment)


/**
 * @openapi
 * /blog/v1/comment/getCommentary/{publicationId}:
 *   get:
 *     summary: Obtener comentarios por publicación
 *     description: Devuelve todos los comentarios asociados a una publicación específica.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: publicationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *         example: 681e167e228786d8e5597e86
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commentary'
 *       500:
 *         description: Error interno al obtener los comentarios
 */

router.get("/getCommentary/:publicationId",getCommentsByPublicationValidator,getCommentsByPublication)

export default router