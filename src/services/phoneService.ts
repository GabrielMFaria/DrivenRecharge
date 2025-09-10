import type { NewPhone, Phone } from "../protocols/phone.js";
import { insertPhone, findPhonesByCpf } from "../repositories/phoneRepo.js";

export async function registerPhone(phone: NewPhone): Promise<Phone> {
  return await insertPhone(phone);
}

export async function listPhonesByCpf(cpf: string): Promise<Phone[]> {
  return await findPhonesByCpf(cpf);
}
