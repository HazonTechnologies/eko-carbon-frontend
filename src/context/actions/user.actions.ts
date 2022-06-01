import { UserPayload } from "../../models/listers";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  // eslint-disable-next-line no-unused-vars
  SetUser = "SET_USER",
}

export type ShownPayload = {
  [Types.SetUser]: {
    value: UserPayload | null;
  };
};
export type ShownActions =
  ActionMap<ShownPayload>[keyof ActionMap<ShownPayload>];
