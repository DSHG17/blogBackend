import { body } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validateFields } from "./validate-fields.js";
import { publicationExist } from "../helppers/db-validators.js";

export const  createCommentaryValidator = [
    body("name", "Name is a most").not().isEmpty(),
    body("content", "Name is a most").not().isEmpty(),
    body("publicationId").custom(publicationExist),
    validateFields,
    handleErrors

]