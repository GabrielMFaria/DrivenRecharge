import { getSummaryByCpfFromDB } from "../repositories/summaryRepo.js";
import type { Summary } from "../protocols/summary.js";

export async function getSummaryByCpf(cpf: string): Promise<Summary> {
  return await getSummaryByCpfFromDB(cpf);
}
