export interface Option {
  title: string;
  description?: string;
  value: string;
  icon?: string;
}
export interface Step {
  name: string;
  description: string;
  status?: "approved" | "rejected";
}

export type AntFormValidatingProps =
  | ""
  | "validating"
  | "success"
  | "warning"
  | "error"
  | undefined;

export interface BooleanType {
  name: string;
  value: boolean;
}
