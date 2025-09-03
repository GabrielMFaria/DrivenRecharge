import { databasePool } from "../config/db.js";

export async function getSummaryByCpf(cpf: string) {
  const phonesResult = await databasePool.query(
    `SELECT p.id, p.number, p.name, p.description,
            c.id AS carrier_id, c.name AS carrier_name, c.code AS carrier_code
     FROM phones p
     JOIN carriers c ON p.carrier_id = c.id
     WHERE p.cpf = $1`,
    [cpf]
  );
 
  const phones = await Promise.all(
    phonesResult.rows.map(async (phone) => {
      const rechargesResult = await databasePool.query(
        "SELECT id, amount, created_at FROM recharges WHERE phone_id = $1 ORDER BY created_at DESC",
        [phone.id]
      );

      return {
        id: phone.id,
        number: phone.number,
        name: phone.name,
        description: phone.description,
        carrier: {
          id: phone.carrier_id,
          name: phone.carrier_name,
          code: phone.carrier_code,
        },
        recharges: rechargesResult.rows,
      };
    })
  );

  return {
    document: cpf,
    phones,
  };
}
