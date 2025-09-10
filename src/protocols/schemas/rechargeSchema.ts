import Joi, { type ObjectSchema } from "joi";
import type { NewRecharge } from "../recharge.js";

export const createRechargeSchema: ObjectSchema<NewRecharge> = Joi.object({
  phoneNumber: Joi.string().pattern(/^\d{11}$/).required(),
  amount: Joi.number().min(10).max(1000).required(),
});
