import React, { useState } from "react";
import Header from "../components/main/header";
import SideNav from "../components/main/sideNav";
// import { useHeader } from "../context/headerCtx";

const ListerLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

  return (
    <div className="layout">
      <Header type="list" toggleSideNav={setIsSideNavOpen} isSideNavOpen={isSideNavOpen} />

      <div
        className={`fixed ${
          isSideNavOpen ? "-translate-x-96" : "translate-x-0"
        } transition-all duration-200  z-10 `}
      >
        <SideNav isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} type="lister" />
      </div>

      <div style={{ width: "100%", height: "100%" }} className="pt-[6vh] lg:pt-[8vh] px-2 sm:px-8 sm:pl-[29vw] md:pl-[30vw] lg:pl-[23vw] xl:pl-[17vw]">
        {children}
      </div>
    </div>
  );
};

export default ListerLayout;
