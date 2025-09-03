import { databasePool } from "../config/db.js";

export async function getSummaryByCpf(cpf: string) {
  const phonesResult = await databasePool.query(
    `SELECT p.id, p.number, p.name, p.description, p.cpf, c.id AS carrier_id, c.name AS carrier_name, c.code AS carrier_code
     FROM phones p
     JOIN carriers c ON p.carrier_id = c.id
     WHERE p.cpf = $1`,
    [cpf]
  );

  const phones = phonesResult.rows.map(phone => ({
    id: phone.id,
    number: phone.number,
    name: phone.name,
    description: phone.description,
    cpf: phone.cpf,
    carrier: {
      id: phone.carrier_id,
      name: phone.carrier_name,
      code: phone.carrier_code
    },
    recharges: [] as any[]
  }));

  for (const phone of phones) {
    const rechargesResult = await databasePool.query(
      `SELECT id, phone_id, value, created_at
       FROM recharges
       WHERE phone_id = $1`,
      [phone.id]
    );
    phone.recharges = rechargesResult.rows;
  }

  return {
    document: cpf,
    phones
  };
}
