/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { Form, Input, Select } from "antd";
import PhoneInput from "react-phone-input-2";

import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

// import { User } from "../../models/user";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import ButtonUI from "../utilities/ButtonUI";
import { useLoading } from "../../context/loadingCtx";
import { BankInfo } from "../../models/listers";
import { fetcher, postApi } from "../../lib/helperFunctions/fetcher";
import { AntFormValidatingProps } from "../../models/utilities";
import { phonePattern } from "../../lib/common/regex";

const { Option } = Select;

interface Bank {
  name: string;
  code: number;
}
interface AccountType {
  name: string;
  value: string;
}

const defaultAcctType: AccountType[] = [
  { name: "Savings", value: "savings" },
  { name: "Current", value: "current" },
];

interface BankInfoPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: BankInfo) => void;
  bankInfo: BankInfo | undefined;
  // eslint-disable-next-line no-unused-vars
}

const BankInfoScreen: NextPage<BankInfoPropType> = ({ onSubmit, bankInfo }) => {
  const [formValues, setFormValues] = useState<BankInfo | null>(null);
  const [validateStatus, setValidateStatus] =
    useState<AntFormValidatingProps>("");
  const [form] = Form.useForm();

  const onError = (err: any) => {
    console.log(err);
  };
  const onFilter = (input: any, option: any) => {
    console.log(input);
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const [options, setOptions] = useState<Bank[]>([]);
  const [accountTypeOptions, setAccountTypeOptions] = useState<AccountType[]>(
    []
  );
  const { setLoadingStatus } = useLoading();
  const [disableAcctNum, setDisableAcctNum] = useState(false);

  //   call API

  const fetchBanks = () => {
    setLoadingStatus(true);
    fetcher("Account/all-banks")
      .then((res) => {
        if (res.successful) {
          setOptions(res.data);
        }
      })
      .finally(() => setLoadingStatus(false));
  };
  const validatingAccount = (accountNumber: string, bankCode: string) => {
    setValidateStatus("validating");
    setDisableAcctNum(true);
    postApi(`Account/validate-account`, { accountNumber, bankCode })
      .then((res) => {
        if (!res.successful) return;
        form.setFields([
          { name: "CorporateAccountName", value: res.data.account_Name },
        ]);
        setValidateStatus("success");
      })
      .catch(() => {
        setValidateStatus("error");
        toast.error("Invalid Account");
      })
      .finally(() => setDisableAcctNum(false));
  };
  const debouncedSave = useCallback(
    debounce(
      (acctNum: string, bankCode: string) =>
        validatingAccount(acctNum, bankCode),
      800
    ),
    []
  );

  const validateAccount = (acctNum: string) => {
    setValidateStatus("");
    form.setFields([{ name: "CorporateAccountName", value: "" }]);
    if (Number.isNaN(Number(acctNum))) {
      setValidateStatus("error");
      return;
    }
    if (acctNum.length !== 10) return;
    if (!formValues) return;
    if (!formValues.BankCode) {
      toast.error("Kindly select a bank");
      return;
    }
    setValidateStatus("");
    debouncedSave(acctNum, formValues.BankCode);
  };

  useEffect(() => {
    fetchBanks();
    setAccountTypeOptions(defaultAcctType);
  }, []);

  return (
    <div className="sm:w-[400px] w-[320px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-10 my-2">
      <p className="text-sm my-4">Please input your account details</p>
      <Form
        name="basic"
        form={form}
        layout="vertical"
        initialValues={bankInfo}
        onValuesChange={(_, values) => setFormValues(values)}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Phone number"
          name="PhoneNumber"
          rules={[
            { required: true, message: "Kindly input your phone number!" },
            { pattern: phonePattern, message: "Invalid phone number!" },
          ]}
        >
          <PhoneInput country="ng" containerClass="w-40px" />
        </Form.Item>

        <Form.Item
          label="Bank Name"
          name="BankCode"
          rules={[{ required: true, message: "Kindly select a bank!" }]}
        >
          <Select
            showSearch
            placeholder="Select a bank"
            optionFilterProp="children"
            filterOption={onFilter}
          >
            {options.length &&
              options.map((option) => (
                <Option key={option.code} value={option.code}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Bank Type"
          name="accountType"
          rules={[
            { required: true, message: "Kindly select an account Type!" },
          ]}
        >
          <Select
            showSearch
            placeholder="Select an account Type"
            optionFilterProp="children"
            filterOption={onFilter}
          >
            {accountTypeOptions.length &&
              accountTypeOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          shouldUpdate
          label="Corporate Account Number"
          name="CorporateAccountNumber"
          rules={[
            {
              required: true,
              message: "Kindly input your organisation account number!",
            },
            {
              max: 10,
              min: 10,
              message: "Account Number must be exactly 10 digits!",
            },
          ]}
          validateStatus={validateStatus}
          hasFeedback
        >
          <Input
            disabled={disableAcctNum}
            onChange={(e) => validateAccount(e.target.value)}
            maxLength={10}
            type="tel"
          />
        </Form.Item>
        <Form.Item
          label="Account Name"
          name="CorporateAccountName"
          rules={[
            {
              required: true,
              message: "No organisation account name found!",
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item className="mt-4 text-right">
          <ButtonUI htmlType="submit" className="px-8 ">
            Proceed
          </ButtonUI>
        </Form.Item>
      </Form>
    </div>
  );
};
export default BankInfoScreen;
