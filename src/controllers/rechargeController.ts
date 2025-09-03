import type { Request, Response, NextFunction } from "express";
import type { NewRecharge } from "../protocols/recharge.js";
import { createRecharge, listRechargesByNumber } from "../services/rechargeService.js";

export async function createRechargeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recharge: NewRecharge = req.body;
    const newRecharge = await createRecharge(recharge);
    res.status(201).send(newRecharge);
  } catch (err) {
    next(err);
  }
}

export async function getRechargesByNumberController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { number } = req.params;
    if (!number) return res.status(400).send({ error: "Número é obrigatório" });

    const recharges = await listRechargesByNumber(number);
    res.status(200).send(recharges);
  } catch (err) {
    next(err);
  }
}
