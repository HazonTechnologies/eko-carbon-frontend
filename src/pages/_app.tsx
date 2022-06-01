import "../styles/globals.css";
import type { AppProps as NextAppProps } from "next/app";
import { NextComponentType } from "next";
import { SWRConfig } from "swr";
import React, { FC, useEffect } from "react";
import { PhotoProvider } from "react-photo-view";
import DismissableToast from "../components/main/dismissableToast";
import { LoadingProvider } from "../context/loadingCtx";
import LoadingComp from "../components/main/loader";
import { fetcher } from "../lib/helperFunctions/fetcher";
import { HeaderProvider } from "../context/headerCtx";
import { UserProvider } from "../context/userCtx";
// import DefaultLayout from "../layouts/defaultLayout";

type ComponentProp = NextComponentType & {
  getLayout?: () => FC<{}>;
};

type AppProps = NextAppProps & { Component: ComponentProp };

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  useEffect(() => {
    console.warn("Hello World");
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 10000,
      }}
    >
      <LoadingProvider>
        <PhotoProvider>
          <UserProvider>
            <HeaderProvider>
              <DismissableToast />
              <LoadingComp />
              <>{getLayout(<Component {...pageProps} />)}</>
            </HeaderProvider>
          </UserProvider>
        </PhotoProvider>
      </LoadingProvider>
    </SWRConfig>
  );
}

export default MyApp;
