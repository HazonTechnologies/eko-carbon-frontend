/* eslint-disable react/jsx-one-expression-per-line */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ResetPassword from "../components/main/resetPassword";

import DefaultLayout from "../layouts/defaultLayout";
import { ResetPasswordUrl } from "../lib/common/endpoints";

interface QueryParamType {
  token: string;
  email: string;
}

const ResetPasswordPage = () => {
  const router = useRouter();

  const [queryParams, setQueryParams] = useState<QueryParamType | null>(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("c");
    const email = urlSearchParams.get("email");
    console.warn(token, email, urlSearchParams);
    console.warn(token, email, urlSearchParams);
    console.warn(token, email, urlSearchParams);
    if (!token || !email) {
      router.push("login");
      return;
    }
    const queryP = {
      token,
      email,
    };
    setQueryParams(queryP);
  }, []);

  if (!queryParams) return undefined;

  return (
    <ResetPassword
      resetPasswordLink={ResetPasswordUrl}
      reRouteLink="login"
      extraParams={queryParams}
    />
  );
};
ResetPasswordPage.getLayout = (page: any) => (
  <DefaultLayout>{page}</DefaultLayout>
);
export default ResetPasswordPage;
