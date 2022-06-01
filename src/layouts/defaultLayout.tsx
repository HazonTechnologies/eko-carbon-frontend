import React, { useEffect } from "react";
import Header from "../components/main/header";
import { useUser } from "../context/userCtx";


const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const { state } = useUser();

  useEffect(() => {
    if (!state.userData) {
      const userData = localStorage.getItem("eko_user");
      console.warn(userData);
      // call user data from local storage and redirect based on user type
      // dispatch({
      //   type: Types.SetUser,
      //   payload: {
      //     value: null,
      //   },
      // });
    }
  }, []);

  return (
    <div className="layout">
      <Header type="entry" />
      <div
        style={{ width: "100%", height: "100%" }}
        className="pt-[10vh] pb-[20px]"
      >
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;

// const {
//   state: { isShown },
// } = useHeader();
