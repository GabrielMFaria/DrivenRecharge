import { databasePool } from "../config/db.js";
import type { Phone, NewPhone } from "../protocols/phone.js";
import type { QueryResult } from "pg";

export async function insertPhone(phone: NewPhone): Promise<Phone> {
  const result: QueryResult<Phone> = await databasePool.query(
    `INSERT INTO phones (number, carrier_id, name, description, cpf)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, number, carrier_id AS "carrierId", name, description, cpf, created_at AS "createdAt"`,
    [phone.number, phone.carrierId, phone.name, phone.description, phone.cpf]
  );

  const newPhone = result.rows[0];
  if (!newPhone) {
    throw new Error("Erro ao inserir telefone");
  }

  return newPhone;
}

export async function findPhonesByCpf(cpf: string): Promise<Phone[]> {
  const result: QueryResult<Phone> = await databasePool.query(
    `SELECT id, cpf, number, created_at AS "createdAt"
     FROM phones
     WHERE cpf = $1
     ORDER BY created_at DESC`,
    [cpf]
  );

  return result.rows;
}

export async function findPhoneByNumber(number: string): Promise<Phone | null> {
  const result: QueryResult<Phone> = await databasePool.query(
    `SELECT id, cpf, number, created_at AS "createdAt"
     FROM phones
     WHERE number = $1`,
    [number]
  );

  return result.rows[0] || null;
}

export async function findPhoneById(id: number): Promise<Phone | null> {
  const result: QueryResult<Phone> = await databasePool.query(
    "SELECT * FROM phones WHERE id = $1",
    [id]
  );

  return result.rows[0] || null;
}