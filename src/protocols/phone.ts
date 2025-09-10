export type NewPhone = {
  number: string;
  carrierId: number;
  name: string;
  description: string;
  cpf: string;
};

export type Phone = {
  id: number;
  number: string;
  carrierId: number;
  name: string;
  description: string;
  cpf: string;
  createdAt: Date;
};
