import { Router } from "express";
import { createPhoneController } from "../controllers/phoneController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { createPhoneSchema } from "../protocols/schemas/phoneSchemas.js";

const router = Router();

router.post("/phones", validateSchema(createPhoneSchema), createPhoneController);

export default router;
