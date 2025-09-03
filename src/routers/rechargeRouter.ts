import { Router } from "express";
import { createRechargeController, getRechargesByNumberController } from "../controllers/rechargeController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { createRechargeSchema } from "../protocols/schemas/rechargeSchema.js";

const router = Router();

router.post("/", validateSchema(createRechargeSchema), createRechargeController);
router.get("/:number", getRechargesByNumberController);

export default router;
