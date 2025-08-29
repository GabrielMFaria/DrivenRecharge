import type { Request, Response, NextFunction } from "express";
import type { ObjectSchema } from "joi";

export default function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).send({ errors: error.details.map(d => d.message) });
    }
    next();
  };
}
