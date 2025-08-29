import type { Request, Response, NextFunction } from "express";
import type { NewPhone } from "../protocols/phone.js";
import { registerPhone } from "../services/phoneService.js";

export async function createPhoneController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const phone: NewPhone = req.body;
    const newPhone = await registerPhone(phone);
    res.status(201).send(newPhone);
  } catch (err) {
    next(err);
  }
}
