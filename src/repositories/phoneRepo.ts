import type { NewPhone } from "../protocols/phone.js";
import { databasePool } from "../config/db.js";

export async function findPhoneByNumber(number: string) {
  const result = await databasePool.query(
    "SELECT * FROM phones WHERE number=$1",
    [number]
  );
  return result.rows[0];
}

export async function findPhonesByCpf(cpf: string) {
  const result = await databasePool.query(
    "SELECT * FROM phones WHERE cpf=$1",
    [cpf]
  );
  return result.rows;
}

export async function createPhoneRepo(phone: NewPhone) {
  const result = await databasePool.query(
    `INSERT INTO phones (number, carrier_id, name, description, cpf) 
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [phone.number, phone.carrierId, phone.name, phone.description, phone.cpf]
  );
  return result.rows[0];
}
