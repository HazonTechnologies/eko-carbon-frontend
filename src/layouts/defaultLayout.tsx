import React from "react";
import Header from "../components/main/header";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
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

export default DefaultLayout;

// const {
//   state: { isShown },
// } = useHeader();
