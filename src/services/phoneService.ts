import { insertPhone, findPhonesByCpf } from "../repositories/phoneRepo.js";
import type { NewPhone } from "../protocols/phone.js";

export async function registerPhone(phone: NewPhone) {
  return await insertPhone(phone);
}

export async function listPhonesByCpf(cpf: string) {
  return await findPhonesByCpf(cpf);
}
