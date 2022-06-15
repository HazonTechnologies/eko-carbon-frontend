/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import { Dispatch } from "react";

import { ShownActions, Types } from "../../context/actions/user.actions";
import { ListerUser, UserPayload } from "../../models/listers";

const excludedPages = ["/register/", "/login/", "/confirm-email/"];

export default function checkUserData(
  userState: UserPayload | null | {},
  dispatch: Dispatch<ShownActions>,
  push: (url: string) => void,
  layoutType: "listers" | "offsetters" | "index",
  history: string[]
): void {
  if (!userState) {
    const userData = localStorage.getItem("eko_user");
    console.log(location.pathname);
    if (!userData) {
      if (!excludedPages.includes(location.pathname)) {
        return push("login");
      }
      return;
    }
    const ekoUser: ListerUser = JSON.parse(userData);
    dispatch({ type: Types.SetUser, payload: { value: ekoUser } });
    if (ekoUser?.profile?.company) {
      if (layoutType === 'listers') return;
      push("/listers");
    }

    // check layout type matches with the user data

    // if (layoutType !== ekoUser.type) {
    //   push(`/${layoutType}`);
    // }
  }
}

// check if userdata exists(return) or local storage exists(set user data)
// if either exists, check layout type(if it matches, return true)
// if(no match, redirect to path of layout type);
