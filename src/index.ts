import express, { type Request, type Response, type NextFunction } from "express";
import dotenv from "dotenv";
import { createPhoneController, getPhonesByCpfController } from "./controllers/phoneController.js";
import validateSchema from "./middlewares/validateSchema.js";
import { createPhoneSchema } from "./protocols/schemas/phoneSchemas.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());


app.post("/phones", validateSchema(createPhoneSchema), createPhoneController);
app.get("/phones/:cpf", getPhonesByCpfController);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
