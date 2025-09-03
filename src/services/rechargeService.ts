import { databasePool } from "../config/db.js";
import type { NewRecharge } from "../protocols/recharge.js";

export async function createRecharge(recharge: NewRecharge) {
  const phoneCheck = await databasePool.query(
    "SELECT * FROM phones WHERE id=$1",
    [recharge.phoneId]
  );
  if (phoneCheck.rows.length === 0) {
    const error = new Error("Telefone não encontrado.");
    (error as any).status = 404;
    throw error;
  }

  if (recharge.amount < 10 || recharge.amount > 1000) {
    const error = new Error("Valor da recarga deve ser entre R$10 e R$1000.");
    (error as any).status = 422;
    throw error;
  }

  const result = await databasePool.query(
    "INSERT INTO recharges (phone_id, amount) VALUES ($1, $2) RETURNING *",
    [recharge.phoneId, recharge.amount]
  );
  return result.rows[0];
}

export async function listRechargesByNumber(phoneNumber: string) {
  const result = await databasePool.query(
    `SELECT r.id, r.amount, r.created_at 
     FROM recharges r
     JOIN phones p ON r.phone_id = p.id
     WHERE p.number = $1
     ORDER BY r.created_at DESC`,
    [phoneNumber]
  );
  return result.rows;
}
