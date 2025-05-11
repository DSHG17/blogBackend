import { Router } from "express";
import { createCommentaryValidator } from "../middlewares/commentary-validators.js";
import { createComment } from "./commentary-controller.js";

const router = Router()

router.post("/postCommentary",createCommentaryValidator,createComment)

export default router