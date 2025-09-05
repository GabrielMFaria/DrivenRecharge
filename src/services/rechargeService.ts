import { insertRecharge, findRechargesByPhoneId } from "../repositories/rechargeRepo.js";
import { findPhoneById } from "../repositories/phoneRepo.js"; 

export async function createRecharge(phoneId: number, amount: number) {
  const phone = await findPhoneById(phoneId);
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

  return await insertRecharge(phoneId, amount);
}

export async function listRechargesByPhoneId(phoneId: number) {
  return await findRechargesByPhoneId(phoneId);
}
