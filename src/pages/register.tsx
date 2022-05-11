// import { useRouter } from "next/router";
// import { useId, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import RegisterAccountInfoScreen from "../components/main/registerAccountInfoScreen";

// import { useLoading } from "../context/loadingCtx";
import RegisterScreen from "../components/main/registerScreen";
import RegisterUserTypeScreen from "../components/main/registerUserTypeScreen";
import RegOffsetCompanyScreen from "../components/main/regOffsetCompanyScreen";
import RegOffsetPersonalScreen from "../components/main/regOffsetPersonalScreen";
import { Types } from "../context/actions/header.actions";
import { useHeader } from "../context/headerCtx";
import DefaultLayout from "../layouts/defaultLayout";
import {
  userTypes,
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
  const [offsetType] = useState<Option | null>(null);
  // const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { dispatch: headerDispatch } = useHeader();

  useEffect(() => {
    if (step === 1) {
      headerDispatch({ type: Types.Toggle, payload: { value: false } });
    }
  }, [step, headerDispatch]);

  const onRegLister = (values: any) => {
    console.log(values);
    setUserDetails(values);
    // headerDispatch({ type: Types.Toggle, payload: { value: true } });

    updateStep(3);
  };
  const onRegAccount = (bankValues: any, infoValues: any, repValues: any) => {
    console.warn(bankValues, infoValues, repValues);
  };
  const selectUserType = (type: Option) => {
    setUserType(type);
    if (type.value === "list") {
      updateStep(2);
      return;
    }
    if (type.value === "offset_personal") {
      updateStep(4);
      return;
    }

    updateStep(5);
  };

  const onRegOffsetPersonal = (values: any) => {
    console.log(values);
  };
  const onRegOffsetCompany = (values: any) => {
    console.log(values);
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
    <div className="m-[auto] p-5">
      {step !== 1 && (
        <ArrowLeftOutlined
          className="mb-10 ml-3 rounded-3xl p-2 border border-primary-low"
          onClick={goBack}
        />
      )}
      {step === 1 && (
        <RegisterUserTypeScreen
          selected={userType}
          header={typeHeader}
          subHeader={typeSubHeader}
          options={userTypes}
          onSelect={selectUserType}
        />
      )}
      {step === 2 && (
        <RegisterScreen
          initialValues={userDetails}
          googleCall={googleCall}
          onSubmit={onRegLister}
        />
      )}
      {step === 3 && <RegisterAccountInfoScreen onSubmitReg={onRegAccount} />}
      {step === 4 && (
        <RegOffsetPersonalScreen
          googleCall={googleCall}
          onSubmit={onRegOffsetPersonal}
        />
      )}
      {step === 5 && (
        <RegOffsetCompanyScreen
          googleCall={googleCall}
          onSubmit={onRegOffsetCompany}
        />
      )}
    </div>
  );
};
Register.getLayout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;
export default Register;
