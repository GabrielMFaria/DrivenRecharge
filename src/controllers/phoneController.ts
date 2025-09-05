import type { Request, Response, NextFunction } from "express";
import type { NewPhone } from "../protocols/phone.js";
import { registerPhone, listPhonesByCpf } from "../services/phoneService.js";

export async function createPhoneController(
  req: Request<{}, {}, NewPhone>,
  res: Response,
  next: NextFunction
) {
  try {
    const phone = req.body;
    const newPhone = await registerPhone(phone);
    res.status(201).send(newPhone);
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(err);
    } else {
      next(new Error("Erro desconhecido"));
    }
  }
}

export async function getPhonesByCpfController(
  req: Request<{ cpf: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { cpf } = req.params;
    if (!cpf) return res.status(400).send({ error: "CPF is required" });

    const phones = await listPhonesByCpf(cpf);
    res.status(200).send(phones);
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(err);
    } else {
      next(new Error("Erro desconhecido"));
    }
  }
}
