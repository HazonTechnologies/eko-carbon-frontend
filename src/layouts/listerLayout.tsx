import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../components/main/header";
import SideNav from "../components/main/sideNav";
import { useUser } from "../context/userCtx";
import checkUserData from "../lib/helperFunctions/checkUserData";
// import { useHeader } from "../context/headerCtx";

const ListerLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const { push } = useRouter();

  const { state: UserState, dispatch: UserDispatch } = useUser();

  useEffect(() => {
    localStorage.setItem("eko_user", JSON.stringify({ name: "charles" }));
    checkUserData(UserState.userData, UserDispatch, push, "listers");
    console.log("Hello World");
  }, []);

  if (!UserState.userData) {
    return null;
  }

  return (
    <div className="layout">
      <Header
        type="list"
        toggleSideNav={setIsSideNavOpen}
        isSideNavOpen={isSideNavOpen}
      />

      <div
        className={`fixed ${
          isSideNavOpen ? "-translate-x-96" : "translate-x-0"
        } transition-all duration-200  z-10 `}
      >
        <SideNav
          isSideNavOpen={isSideNavOpen}
          setIsSideNavOpen={setIsSideNavOpen}
          type="lister"
        />
      </div>

      <div
        style={{ width: "100%", height: "100%" }}
        className="pt-[10vh] xl:pt-[12vh] lg:pt-[14vh] px-2 sm:px-8 sm:pl-[29vw] md:pl-[30vw] lg:pl-[23vw] xl:pl-[17vw]"
      >
        {children}
      </div>
    </div>
  );
};

export default ListerLayout;
