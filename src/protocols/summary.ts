export type RechargeSummary = {
  id: number;
  phoneNumber: string; 
  amount: number;
  createdAt: string;
};

export type CarrierSummary = {
  id: number;
  name: string;
  code: number;
};

export type PhoneSummary = {
  id: number;
  number: string;
  name: string;
  description: string;
  cpf: string;
  carrier: CarrierSummary;
  recharges: RechargeSummary[];
};

export type Summary = {
  document: string; 
  phones: PhoneSummary[];
};
