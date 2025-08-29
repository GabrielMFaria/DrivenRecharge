import type { NewPhone } from "../protocols/phone.js";
import { databasePool } from "../config/db.js";

export async function registerPhone(phone: NewPhone) {
 
  const existingNumber = await databasePool.query(
    "SELECT * FROM phones WHERE number = $1",
    [phone.number]
  );

  if (existingNumber.rows.length > 0) {
    const error = new Error("Número de telefone já cadastrado.");
    (error as any).status = 409; 
    throw error;
  }

  const cpfCount = await databasePool.query(
    "SELECT COUNT(*) FROM phones WHERE cpf = $1",
    [phone.cpf]
  );

  if (Number(cpfCount.rows[0].count) >= 3) {
    const error = new Error("Este cliente já possui 3 números cadastrados.");
    (error as any).status = 409;
    throw error;
  }

  const result = await databasePool.query(
    `INSERT INTO phones (number, carrier_id, name, description, cpf)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [phone.number, phone.carrierId, phone.name, phone.description, phone.cpf]
  );

  return result.rows[0];
}
