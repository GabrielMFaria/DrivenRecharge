import { Router } from "express";
import { getSummaryController } from "../controllers/summaryController.js";

const router = Router();

router.get("/:document", getSummaryController);

export default router;
