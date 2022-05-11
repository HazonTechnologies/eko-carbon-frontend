export interface User {
  email: string;
  password?: string;
}
export interface UserType {
  type: string | null;
  offsetType?: string | null;
}

export interface AccountInformation {
  bank: string;
  phoneNumber: string;
  corporateAccountNumber: number;
  accountName: string;
}
