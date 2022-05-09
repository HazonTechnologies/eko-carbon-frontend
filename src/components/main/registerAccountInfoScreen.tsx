/* eslint-disable no-unused-vars */
import { NextPage } from "next";
import Stepper from "../utilities/StepperUI";
import BankInformationScreen from "./bankInformationScreen";
// import { useState } from "react";
// import { Option } from "../../models/option";
// import { UserType } from "../../models/user";
// import OptionsUI from "../utilities/OptionsUI";

const RegisterAccountInfoScreen: NextPage<any> = ({
  onSelect,
  header,
  subHeader,
  options,
  selected,
  onSubmit,
}) => (
  <div className="flex flex-col justify-center items-center">
    <Stepper />
    <BankInformationScreen onSubmit={onSubmit} />
  </div>
);

export default RegisterAccountInfoScreen;
