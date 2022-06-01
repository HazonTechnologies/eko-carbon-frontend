/* eslint-disable no-unused-vars */
import { NextPage } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import Stepper from "../utilities/StepperUI";
import BankInfoScreen from "./bankInfoScreen";
import BusinessInfoScreen from "./businessInfoScreen";
import BusinessRepScreen from "./businessRepScreen";
import accountInfoSteps from "../../lib/common/accountInfoSteps";
import { Step } from "../../models/utilities";
import { BankInfo, BusinessInfo } from "../../models/listers";

// import { useState } from "react";
// import { Option } from "../../models/option";
// import { UserType } from "../../models/user";
// import OptionsUI from "../utilities/OptionsUI";

interface RegisterAccountInfoPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmitReg: (bank: BankInfo | any, info: any, rep: any) => void;
  setCurrStep: Dispatch<SetStateAction<number>>;
  currStep: number;
}
const RegisterAccountInfoScreen: NextPage<RegisterAccountInfoPropType> = ({
  onSubmitReg,
  currStep,
  setCurrStep,
}) => {
  const [bankInfo, setBankInfo] = useState<BankInfo | undefined>(undefined);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | undefined>(
    undefined
  );
  const [businessRep, setBusinessRep] = useState(null);

  const onSubmit = (type: string, formData: BankInfo | any) => {
    if (type === "bank") {
      setCurrStep(currStep + 1);
      setBankInfo(formData);
      return;
    }
    if (type === "info") {
      setCurrStep(currStep + 1);
      setBusinessInfo(formData);
      return;
    }
    setCurrStep(currStep + 1);
    setBusinessRep(formData);
    onSubmitReg(bankInfo, businessInfo, businessRep);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Stepper steps={accountInfoSteps()} currStep={currStep} />
      {currStep === 0 && (
        <BankInfoScreen
          bankInfo={bankInfo}
          onSubmit={(formData) => onSubmit("bank", formData)}
        />
      )}
      {currStep === 1 && (
        <BusinessInfoScreen
          goBack={() => setCurrStep(currStep - 1)}
          onSubmit={(formData) => onSubmit("info", formData)}
        />
      )}
      {currStep > 1 && (
        <BusinessRepScreen
          businessName={businessInfo?.BusinessName}
          goBack={() => setCurrStep(currStep - 1)}
          onSubmit={(formData) => onSubmit("rep", formData)}
        />
      )}
    </div>
  );
};

export default RegisterAccountInfoScreen;
