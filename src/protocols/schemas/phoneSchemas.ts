import Joi, { type ObjectSchema } from "joi";
import type { NewPhone } from "../phone.js";

export const createPhoneSchema: ObjectSchema<NewPhone> = Joi.object({
  number: Joi.string().pattern(/^\d{11}$/).required(),
  carrierId: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required(),
});
