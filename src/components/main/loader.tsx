import Link from "next/link";
import { NextPage } from "next";
import Image from "next/image";
import { headerLinks } from "../../lib/common/links";
import { useState } from "react";
import { useLoading } from "../../context/loadingCtx";

const LoadingComp = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading && (
        
          <div
            style={{ backgroundColor: "#000" }}
            className="h-[100vh] w-[100vw] opacity-40 fixed top-0 z-50 flex justify-center items-center bg-black"
          >
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        
      )}
    </>
  );
};

export default LoadingComp;
