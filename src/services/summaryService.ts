import type { Summary, PhoneSummary, RechargeSummary } from "../protocols/summary.js";
import { getPhonesByCpfFromDB, getRechargesByPhoneIdFromDB } from "../repositories/summaryRepo.js";

export async function getSummaryByCpf(cpf: string): Promise<Summary> {
  const phones: PhoneSummary[] = await getPhonesByCpfFromDB(cpf);

  for (const phone of phones) {
    const recharges: RechargeSummary[] = await getRechargesByPhoneIdFromDB(phone.id);
    phone.recharges = recharges;
  }

  return {
    document: cpf,
    phones
  };
}
