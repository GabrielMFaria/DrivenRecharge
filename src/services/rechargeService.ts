import { databasePool } from "../config/db.js";
import type { NewRecharge } from "../protocols/recharge.js";

export async function rechargePhone(phoneId: number, amount: number) {
  const phoneResult = await databasePool.query(
    "SELECT * FROM phones WHERE id = $1",
    [phoneId]
  );

  if (phoneResult.rows.length === 0) {
    const error = new Error("Telefone não encontrado.");
    (error as any).status = 404;
    throw error;
  }

  if (amount < 10 || amount > 1000) {
    const error = new Error("Valor da recarga deve ser entre R$10 e R$1000.");
    (error as any).status = 422;
    throw error;
  }
  
  const result = await databasePool.query(
    "INSERT INTO recharges (phone_id, amount) VALUES ($1, $2) RETURNING *",
    [phoneId, amount]
  );

  return result.rows[0];
}
export async function createRecharge(recharge: NewRecharge) {
  const phoneCheck = await databasePool.query(
    "SELECT * FROM phones WHERE number=$1",
    [recharge.phoneNumber]
  );

  if (phoneCheck.rows.length === 0) {
    const error = new Error("Telefone não encontrado.");
    (error as any).status = 404;
    throw error;
  }

  const result = await databasePool.query(
    "INSERT INTO recharges (phone_number, value) VALUES ($1, $2) RETURNING *",
    [recharge.phoneNumber, recharge.value]
  );

  return result.rows[0];
}

export async function listRechargesByNumber(phoneNumber: string) {
  const result = await databasePool.query(
    "SELECT * FROM recharges WHERE phone_number=$1 ORDER BY created_at DESC",
    [phoneNumber]
  );

  return result.rows; 
}