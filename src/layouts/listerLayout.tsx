import React, { useState } from "react";
import Header from "../components/main/header";
import SideNav from "../components/main/sideNav";
// import { useHeader } from "../context/headerCtx";

const ListerLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

  return (
    <div className="layout">
      <Header toggleSideNav={setIsSideNavOpen} isSideNavOpen={isSideNavOpen} />

      <div
        className={`fixed ${
          isSideNavOpen ? "-translate-x-96" : "translate-x-0"
        } transition-all duration-200  z-10 `}
      >
        <SideNav isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
      </div>

      <div style={{ width: "100%", height: "100%" }} className="pt-[6vh] sm:pl-[26vw] lg:pl-[15vw]">
        {children}
      </div>
    </div>
  );
};

export default ListerLayout;
