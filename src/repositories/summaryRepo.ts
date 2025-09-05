import { databasePool } from "../config/db.js";
import type { PhoneSummary, CarrierSummary, RechargeSummary } from "../protocols/summary.js";
import type { QueryResult } from "pg";

export async function getPhonesByCpfFromDB(cpf: string): Promise<PhoneSummary[]> {
  const result: QueryResult<{
    phone_id: number;
    number: string;
    name: string;
    description: string;
    cpf: string;
    carrier_id: number;
    carrier_name: string;
    carrier_code: number;
  }> = await databasePool.query(
    `SELECT 
       p.id AS phone_id,
       p.number,
       p.name,
       p.description,
       p.cpf,
       c.id AS carrier_id,
       c.name AS carrier_name,
       c.code AS carrier_code
     FROM phones p
     JOIN carriers c ON p.carrier_id = c.id
     WHERE p.cpf = $1`,
    [cpf]
  );

  return result.rows.map(row => ({
    id: row.phone_id,
    number: row.number,
    name: row.name,
    description: row.description,
    cpf: row.cpf,
    carrier: {
      id: row.carrier_id,
      name: row.carrier_name,
      code: row.carrier_code
    } as CarrierSummary,
    recharges: [] as RechargeSummary[]
  }));
}

export async function getRechargesByPhoneIdFromDB(phoneId: number): Promise<RechargeSummary[]> {
  const result: QueryResult<{
    id: number;
    phone_id: number;
    amount: number;
    created_at: string;
  }> = await databasePool.query(
    `SELECT id, phone_id, amount, created_at FROM recharges WHERE phone_id = $1 ORDER BY created_at DESC`,
    [phoneId]
  );

  return result.rows.map(row => ({
    id: row.id,
    phoneId: row.phone_id,
    amount: row.amount,
    createdAt: row.created_at
  }));
}
