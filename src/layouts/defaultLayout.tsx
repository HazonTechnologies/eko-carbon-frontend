import Header from "../components/main/header";
import React from "react";
import { NextPage } from "next";
import { SWRConfig } from "swr";
import fetcher from "../lib/helperFunctions/fetcher";
import { LoadingProvider, useLoading } from "../context/loadingCtx";

const DefaultLayout = ({ children }:{children:React.ReactNode}) => {

  const {loading}  = useLoading()

  return (
    <LoadingProvider>
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 10000,
      }}
    >
        <div className="layout">
          {JSON.stringify(loading)}
          {loading && <h1>Loading......</h1>}
          <Header />
          {children}
        </div>
    </SWRConfig>
    </LoadingProvider>
  );
};

export default DefaultLayout;
