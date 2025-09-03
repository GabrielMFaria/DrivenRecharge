import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { createPhoneSchema } from "../protocols/schemas/phoneSchemas.js";
import { createPhoneController, getPhonesByCpfController } from "../controllers/phoneController.js";

const router = Router();

router.post("/", validateSchema(createPhoneSchema), createPhoneController);


router.get("/:cpf", getPhonesByCpfController);

export default router;
