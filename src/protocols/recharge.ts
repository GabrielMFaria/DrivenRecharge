export type NewRecharge = {
  phoneId: number;
  amount: number;
};

export type Recharge = {
  id: number;
  phoneId: number;
  amount: number;
  created_at: Date;
};
