import { UserPayload } from "../../models/listers";

export interface UserType {
  userData: UserPayload | null;
}

export const initialState: UserType = {
  userData: null,
};
