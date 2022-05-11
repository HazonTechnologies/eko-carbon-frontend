// import { useRouter } from "next/router";
// import { useId, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import RegisterAccountInfoScreen from "../components/main/registerAccountInfoScreen";

// import { useLoading } from "../context/loadingCtx";
import RegisterScreen from "../components/main/registerScreen";
import RegisterUserTypeScreen from "../components/main/registerUserTypeScreen";
import { Types } from "../context/actions/header.actions";
import { useHeader } from "../context/headerCtx";
import DefaultLayout from "../layouts/defaultLayout";
import {
  userTypes,
  offsetTypes,
  // eslint-disable-next-line import/named
  typeSubHeader,
  typeHeader,
} from "../lib/common/registerTypes";
import { Option } from "../models/utilities";

const Register = () => {
  // const { setLoadingStatus } = useLoading();
  // const id = useId();
  // const { push } = useRouter();

  const [step, updateStep] = useState<number>(1);
  const [userDetails, setUserDetails] = useState<{ email: string } | null>(
    null,
  );
  const [userType, setUserType] = useState<Option | null>(null);
  const [offsetType, setOffsetType] = useState<Option | null>(null);
  // const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { dispatch: headerDispatch } = useHeader();


  useEffect(() => {
    if (step === 1) {
      headerDispatch({ type: Types.Toggle, payload: { value: false } });
    }
  }, [step, headerDispatch]);

  const onSubmit = (values: any) => {
    console.log(values);
    setUserDetails(values);
    headerDispatch({ type: Types.Toggle, payload: { value: true } });

    updateStep(2);
  };
  const onRegAccount = (bankValues:any, infoValues:any, repValues:any) => {
    console.warn(bankValues, infoValues, repValues);
  };
  const selectUserType = (type: Option) => {
    setUserType(type);
    if (type.value === "offset" && step === 2) {
      updateStep(3);
      return;
    }

    updateStep(4);
  };
  const selectOffsetType = (type: Option) => {
    if (type.value === "list") {
      const listType = userTypes.find((type) => type.value === "list");
      setUserType(listType ?? null);
    }
    setOffsetType(type);
    updateStep(4);
  };

  const onError = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const googleCall = () => {
    console.log("register");
  };

  const goBack = () => {
    if (
      step === 4 &&
      (offsetType?.value === "list" || userType?.value === "list")
    ) {
      updateStep(step - 2);
      return;
    }
    updateStep(step - 1);
  };

  return (
    <div
      className={`m-[auto] ${
        step === 1 ? "py-[15vh]" : "py-[8vh]"
      } h-[90vh] p-5`}
    >
      {step !== 1 && (
        <ArrowLeftOutlined
          className="mb-10 ml-3 rounded-3xl p-2 border border-primary-low"
          onClick={goBack}
        />
      )}
      {step === 1 && (
        <RegisterScreen
          initialValues={userDetails}
          googleCall={googleCall}
          onSubmit={onSubmit}
          onError={onError}
        />
      )}
      {step === 2 && (
        <RegisterUserTypeScreen
          selected={userType}
          header={typeHeader}
          subHeader={typeSubHeader}
          options={userTypes}
          onSelect={selectUserType}
        />
      )}
      {step === 3 && (
        <RegisterUserTypeScreen
          selected={offsetType}
          header={typeHeader}
          subHeader={typeSubHeader}
          options={offsetTypes}
          onSelect={selectOffsetType}
        />
      )}
      {step === 4 && <RegisterAccountInfoScreen onSubmitReg={onRegAccount} />}
    </div>
  );
};
Register.getLayout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;
export default Register;
