import type { Request, Response, NextFunction } from "express";
import type { NewPhone } from "../protocols/phone.js";
import { registerPhone, listPhonesByCpf } from "../services/phoneService.js";

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

export async function getPhonesByCpfController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { cpf } = req.params;
    if (!cpf) {
      return res.status(400).send({ error: "CPF is required" });
    }

    const phones = await listPhonesByCpf(cpf);
    res.status(200).send(phones); 
  } catch (err) {
    next(err);
  }
}
