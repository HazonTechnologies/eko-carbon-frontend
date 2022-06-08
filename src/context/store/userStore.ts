import { ListerUser, ProjectEntryT } from "../../models/listers";

export interface UserType {
  userPayload: ListerUser | null;
  projects: ProjectEntryT[];
}

export const initialState: UserType = {
  userPayload: null,
  projects: [],
};
