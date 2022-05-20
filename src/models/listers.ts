export interface ListerBoard {
  title: string;
  value: number;
  subValue: number;
  direction: "up" | "down";
}

export interface BankInfo {
  PhoneNumber: string;
  BankCode: number;
  CorporateAccountNumber: string;
  CorporateAccountName: string;
}

export interface ProfileInfo {
  overview: {
    header: string;
    subheader: string;
    summary: string;
  };
  about: {
    header: string;
    summary: string;
    list: string[];
    pictures: string[];
  };
  target: {
    header: string;
    summary: string[];
  };
  extra: {
    header: string;
    summary: string[];
  };
}
