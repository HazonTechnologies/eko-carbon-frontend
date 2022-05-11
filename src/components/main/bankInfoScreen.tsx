import { Form, Input, Select } from "antd";
import PhoneInput from "react-phone-input-2";

import { NextPage } from "next";
import { useEffect, useState } from "react";

// import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";
import { AccountInformation } from "../../models/user";
import { useLoading } from "../../context/loadingCtx";

const { Option } = Select;

interface Bank {
  name: string;
  value: string;
}
const mockOptions: Bank[] = [
  {
    name: "Guaranty Trust Bank",
    value: "gt",
  },
  {
    name: "Zenith Bank",
    value: "zenith",
  },
  {
    name: "Access Bank",
    value: "access",
  },
];

interface BankInfoPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: AccountInformation) => void;
  // eslint-disable-next-line no-unused-vars
}

const BankInfoScreen: NextPage<BankInfoPropType> = ({
  onSubmit,
}) => {
  const onError = (err: any) => {
    console.log(err);
  };
  const onFilter = (input: any, option: any) => {
    console.log(input);
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const [options, setOptions] = useState<Bank[]>([]);
  const { setLoadingStatus } = useLoading();
  //   call API
  useEffect(() => {
    setLoadingStatus(true);
    setTimeout(() => {
      setOptions(mockOptions);
      setLoadingStatus(false);
    }, 5000);
  }, []);

  return (
    <div className="sm:w-[400px] w-[320px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-10 my-2">
      <p className="text-sm my-4">Please input your account details</p>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ bank: "zenith", phone: "+2349035108713" }}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[{ required: true, message: "Kindly input your phone number!" }]}
        >
          <PhoneInput country="ng" containerClass="w-40px" />
        </Form.Item>

        <Form.Item
          label="Bank Name"
          name="bank"
          rules={[{ required: true, message: "Kindly select a bank!" }]}
        >
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={onFilter}
          >
            {options.length &&
              options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Corporate Account Number"
          name="accountNumber"
          rules={[
            {
              required: true,
              message: "Kindly input your organisation account number!",
            },
          ]}
        >
          <Input type="tel" />
        </Form.Item>
        <Form.Item
          label="Account Name"
          name="accountName"
          rules={[
            {
              required: true,
              message: "No organisation account name found!",
            },
          ]}
        >
          <Input />
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
