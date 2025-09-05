import type { Request, Response, NextFunction } from "express";
import type { NewRecharge } from "../protocols/recharge.js";
import { createRecharge, listRechargesByPhoneId } from "../services/rechargeService.js";

export async function createRechargeController(
  req: Request<{}, {}, NewRecharge>,
  res: Response,
  next: NextFunction
) {
  try {
    const { phoneId, amount } = req.body;
    const newRecharge = await createRecharge(phoneId, amount);
    res.status(201).send(newRecharge);
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(err);
    } else {
      next(new Error("Erro desconhecido"));
    }
  }
}

export async function getRechargesByNumberController(
  req: Request<{ number: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { number } = req.params;
    if (!number) return res.status(400).send({ error: "Número é obrigatório" });

    const recharges = await listRechargesByPhoneId(Number(number));
    res.status(200).send(recharges);
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(err);
    } else {
      next(new Error("Erro desconhecido"));
    }
  }
}
