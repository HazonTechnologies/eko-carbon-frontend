// import 'antd/dist/antd.min.css';

import "../styles/globals.css";

import "../styles/globals.css";
import type { AppProps as NextAppProps } from "next/app";
import DefaultLayout from "../layouts/defaultLayout";
import { NextComponentType } from "next";
import { FC } from "react";
import DismissableToast from "../components/main/dismissableToast";
import { LoadingProvider } from "../context/loadingCtx";
import LoadingComp from "../components/main/loader";

type ComponentProp = NextComponentType & {
  getLayout?: () => FC<{}>;
};

type AppProps = NextAppProps & { Component: ComponentProp };

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  return getLayout(
    <>
    <LoadingProvider>
      <DismissableToast />
      <LoadingComp />
      <Component {...pageProps} />
      </LoadingProvider>
    </>
  );
}

export default MyApp;
