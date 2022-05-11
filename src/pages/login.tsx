// import { useRouter } from "next/router";
// import { useId } from "react";
// import { postApi } from "../lib/helperFunctions/fetcher";
// import { useLoading } from "../context/loadingCtx";
import LoginScreen from "../components/main/loginScreen";
import DefaultLayout from "../layouts/defaultLayout";

const Login = () => {
  // const { setLoadingStatus } = useLoading();
  // const id = useId();
  // const { push } = useRouter();
  const onSubmit = (values: any) => {
    console.log("Success:", values);
  };

  const onError = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const googleCall = () => {
    console.log("login");
  };

  return (
    <div className="m-[auto] h-[90vh] flex justify-center py-[10vh] p-5">
      <LoginScreen
        onSubmit={onSubmit}
        onError={onError}
        googleCall={googleCall}
      />
    </div>
  );
};
Login.getLayout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;
export default Login;
