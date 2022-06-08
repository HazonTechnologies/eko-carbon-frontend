import { useEffect } from "react";
// import { Types } from "../context/actions/user.actions";
import { useLoading } from "../context/loadingCtx";
import { useUser } from "../context/userCtx";

export default function Home() {
  const { loading, setLoadingStatus } = useLoading();
  const { state } = useUser();
  const toggle = () => {
    setLoadingStatus(!loading);
  };

  useEffect(() => {
    if (!state.userPayload) {
      const userData = localStorage.getItem('eko_user');
      console.warn(userData);
      // call user data from local storage and redirect based on user type
      // dispatch({
      //   type: Types.SetUser,
      //   payload: {
      //     value: null,
      //   },
      // });
    }
  }, [state]);

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
