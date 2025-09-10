import { insertRecharge, findRechargesByPhoneNumber } from "../repositories/rechargeRepo.js";
import { findPhoneByNumber } from "../repositories/phoneRepo.js";

export async function createRecharge(phoneNumber: string, amount: number) {
  const phone = await findPhoneByNumber(phoneNumber);
  if (!phone) {
    const error = new Error("Telefone não encontrado.");
    (error as any).status = 404;
    throw error;
  }

  if (amount < 10 || amount > 1000) {
    const error = new Error("Valor da recarga deve ser entre R$10 e R$1000.");
    (error as any).status = 422;
    throw error;
  }

  return await insertRecharge(phoneNumber, amount);
}

export async function listRechargesByPhoneNumber(phoneNumber: string) {
  return await findRechargesByPhoneNumber(phoneNumber);
}
