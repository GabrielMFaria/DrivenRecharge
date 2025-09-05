import express from "express";
import dotenv from "dotenv";
import { createPhoneController, getPhonesByCpfController } from "./controllers/phoneController.js";
import { createRechargeController, getRechargesByNumberController } from "./controllers/rechargeController.js";
import validateSchema from "./middlewares/validateSchema.js";
import { createPhoneSchema } from "./protocols/schemas/phoneSchemas.js";
import { createRechargeSchema } from "./protocols/schemas/rechargeSchema.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { getSummaryController } from "./controllers/summaryController.js";
import { summarySchema } from "./protocols/schemas/summarySchema.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/phones", validateSchema(createPhoneSchema), createPhoneController);
app.get("/phones/:cpf", getPhonesByCpfController);

app.post("/recharges", validateSchema(createRechargeSchema), createRechargeController);
app.get("/recharges/:number", getRechargesByNumberController);

app.get("/summary/:cpf",validateSchema(summarySchema, "params"),getSummaryController);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
