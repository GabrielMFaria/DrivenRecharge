export interface NewRecharge {
  phoneNumber: string; 
  amount: number;
}

export interface Recharge {
  id: number;
  phoneNumber: string; 
  amount: number;
  createdAt: string;
}
