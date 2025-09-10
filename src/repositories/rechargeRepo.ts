import { databasePool } from "../config/db.js";
import type { Recharge } from "../protocols/recharge.js";

export async function insertRecharge(phoneNumber: string, amount: number): Promise<Recharge> {
  const result = await databasePool.query(
    `INSERT INTO recharges (phone_number, amount)
     VALUES ($1, $2)
     RETURNING id, phone_number AS "phoneNumber", amount, created_at AS "createdAt"`,
    [phoneNumber, amount]
  );

  if (!result.rows[0]) {
    throw new Error("Erro ao inserir recarga");
  }

  return result.rows[0];
}


export async function findRechargesByPhoneNumber(phoneNumber: string): Promise<Recharge[]> {
  const result = await databasePool.query(
    `SELECT id, phone_number AS "phoneNumber", amount, created_at AS "createdAt"
     FROM recharges
     WHERE phone_number = $1
     ORDER BY created_at DESC`,
    [phoneNumber]
  );

  return result.rows;
}
