import Joi from "joi";

export const summarySchema = Joi.object({
  cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required()
});
