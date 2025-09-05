import { databasePool } from "../config/db.js";
import type { Recharge } from "../protocols/recharge.js";
import type { QueryResult } from "pg";

export async function insertRecharge(phoneId: number, amount: number): Promise<Recharge> {
  const result: QueryResult<Recharge> = await databasePool.query(
    `INSERT INTO recharges (phone_id, amount)
     VALUES ($1, $2) RETURNING *`,
    [phoneId, amount]
  );

  if (result.rows.length === 0) {
    throw new Error("Erro ao inserir recarga");
  }

  return result.rows[0]!; 
}

export async function findRechargesByPhoneId(phoneId: number): Promise<Recharge[]> {
  const result: QueryResult<Recharge> = await databasePool.query(
    "SELECT * FROM recharges WHERE phone_id = $1 ORDER BY created_at DESC",
    [phoneId]
  );

  return result.rows;
}
