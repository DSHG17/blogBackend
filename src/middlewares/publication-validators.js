import { validateFields} from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"
import { body } from "express-validator";

export const createPublicationValidator = [
    body("title", "Title is required").not().isEmpty(),
    body("description","description is obligatory").not().isEmpty(),   
    body("class","class is required").not().isEmpty(), 
    validateFields,
    deleteFileOnError,
    handleErrors
]
