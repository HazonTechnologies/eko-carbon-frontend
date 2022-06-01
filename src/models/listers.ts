export interface ListerBoard {
  title: string;
  value: number;
  subValue: number;
  direction: "up" | "down";
}

export interface BankInfo {
  PhoneNumber: string;
  BankCode: string;
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

export interface UserPayload {
  type: "listers" | "offsetters";
  token: string;
  refreshToken: string;
  Email: string;
}

export interface BusinessInfo {
  BusinessName: string;
  BusinessAddress: string;
  BusinessEmail: string;
  Website: string;
  Industry: string;
  Summary: string;
}

export interface BusinessRepInfo {
  projectScope:string;
  isbusinessOwner: boolean;
  OwnsAboveQuarter: boolean;
  stakeholderName: string;
  stakeholderEmail: string;
  stakeholderBVN: string;
  stakeholderPhoneNumber: string;
  stakeholderCountry: string;
  stakeholderState: string;
  stakeholderCity: string;
  stakeholderAddress: string;
  StakeholderIdentityCardType: string;
  StakeholderIdentityCard:File;
  Password: string;
  ConfirmPassword: string;
}

export interface ListerUser extends UserPayload {
  FullName: string;
  Email: string;
  Password?: string;
  ConfirmPassword?: string;
  CorporateAccountNumber: string;
  BankCode: string;
  PhoneNumber: string;
  CorporateAccountName: string;
  BusinessName: string;
  BusinessEmail: string;
  BusinessAddress: string;
  RcNumber: number;
  Website: string;
  CertificateOfInc: File;
  IsBusinessOwner: boolean;
  OwnsAboveQuarter: boolean;
  stakeholderName: string;
  stakeholderEmail: string;
  stakeholderBVN: string;
  stakeholderPhoneNumber: string;
  stakeholderCountry: string;
  stakeholderState: string;
  stakeholderCity: string;
  stakeholderAddress: string;
  StakeholderIdentityCard: File;
  StakeholderIdentityCardType: number;
}
