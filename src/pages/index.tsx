import { useEffect } from "react";
import { useRouter } from "next/router";
// import { Types } from "../context/actions/user.actions";
import { useLoading } from "../context/loadingCtx";
import { useUser } from "../context/userCtx";
import checkUserData from "../lib/helperFunctions/checkUserData";
import { useHistory } from "../context/historyCtx";

export default function Home() {
  const { loading, setLoadingStatus } = useLoading();
  const { push } = useRouter();
  const { history } = useHistory();

  const { state: UserState, dispatch: UserDispatch } = useUser();
  const toggle = () => {
    setLoadingStatus(!loading);
  };

  useEffect(() => {
    checkUserData(
      UserState.userPayload,
      UserDispatch,
      push,
      "index",
      history
    );
    console.log(UserState);
  }, []);

  if (!UserState.userPayload) {
    return null;
  }


  return (
    <>
      {JSON.stringify(loading)}
      <div>Hello World</div>
      <button type="button" onClick={toggle}>
        Hello
      </button>
    </>
  );
}
