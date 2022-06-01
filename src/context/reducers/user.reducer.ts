import { ShownActions, Types } from "../actions/user.actions";
// import { UserType } from "../store/userStore";

export default function userReducer(state: any, action: ShownActions) {
  if (action.type === Types.SetUser) {
    return { ...state, userData: action.payload.value };
  }
  return state;
}
