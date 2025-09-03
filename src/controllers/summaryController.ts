import type { Request, Response, NextFunction } from "express";
import { getSummaryByCpf } from "../services/summaryService.js";

export async function getSummaryController(req: Request, res: Response, next: NextFunction) {
  try {
    const { cpf } = req.params;
    if (!cpf) return res.status(400).send({ error: "CPF is required" });

    const summary = await getSummaryByCpf(cpf);
    res.status(200).send(summary);
  } catch (err) {
    next(err);
  }
}
