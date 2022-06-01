/* eslint-disable no-unused-vars */
import { Dispatch } from "react";

import { ShownActions, Types } from "../../context/actions/user.actions";
import { UserPayload } from "../../models/listers";


export default function checkUserData(
  userState: UserPayload | null,
  dispatch: Dispatch<ShownActions>,
  push: (url: string) => void,
  layoutType: "listers" | "offsetters",
): void {
  if (!userState) {
    const userData = localStorage.getItem("eko_user");
    if (!userData) return push("login");
    const ekoUser: UserPayload = JSON.parse(userData);
    dispatch({ type: Types.SetUser, payload: { value: ekoUser } });
    if (layoutType !== ekoUser.type) {
      push(`/${layoutType}`);
    }
  }
}

// check if userdata exists(return) or local storage exists(set user data)
// if either exists, check layout type(if it matches, return true)
// if(no match, redirect to path of layout type);
