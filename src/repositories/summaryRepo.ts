import { databasePool } from "../config/db.js";
import type { Summary, PhoneSummary, RechargeSummary, CarrierSummary } from "../protocols/summary.js";
import type { QueryResult } from "pg";

export async function getSummaryByCpfFromDB(cpf: string): Promise<Summary> {

  const phonesResult: QueryResult<any> = await databasePool.query(
    `SELECT p.id, p.number, p.name, p.description, p.cpf, 
            c.id AS carrier_id, c.name AS carrier_name, c.code AS carrier_code
     FROM phones p
     LEFT JOIN carriers c ON p.carrier_id = c.id
     WHERE p.cpf = $1`,
    [cpf]
  );

  const phones: PhoneSummary[] = [];

  for (const row of phonesResult.rows) {
    const rechargesResult: QueryResult<any> = await databasePool.query(
      `SELECT id, phone_number, amount, created_at AS "createdAt"
       FROM recharges
       WHERE phone_number = $1
       ORDER BY created_at DESC`,
      [row.number]
    );

    const recharges: RechargeSummary[] = rechargesResult.rows.map(r => ({
      id: r.id,
      phoneNumber: r.phone_number, 
      amount: Number(r.amount),
      createdAt: r.createdAt
    }));

    const phone: PhoneSummary = {
      id: row.id,
      number: row.number,
      name: row.name,
      description: row.description,
      cpf: row.cpf,
      carrier: {
        id: row.carrier_id,
        name: row.carrier_name,
        code: row.carrier_code
      },
      recharges
    };

    phones.push(phone);
  }

  return {
    document: cpf,
    phones
  };
}
