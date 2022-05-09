import { Form, Input, Select } from "antd";
import PhoneInput from "react-phone-input-2";

import { NextPage } from "next";
import { useState } from "react";

// import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";

const { Option } = Select;

// interface LoginPropType {
//   // eslint-disable-next-line no-unused-vars
//   onSubmit: (param: User) => void;
//   // eslint-disable-next-line no-unused-vars
//   onError: (param: any) => void;
//   googleCall: () => void;
// }

const BankInformationScreen: NextPage<any> = ({ onSubmit, onError }) => {
  const onFilter = (input: any, option: any) => {
    console.log(input);
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const [options, setOptions] = useState([
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
  ]);

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
          name="phone"
          rules={[{ required: true, message: "Kindly input your phone!" }]}
        >
          <PhoneInput country="us" containerClass="w-40px" />
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
            onChange={setOptions}
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
          <Input type="tel" pattern="^[0-9]$" />
        </Form.Item>
        <Form.Item
          label="Account Name"
          name="accountName"
          rules={[
            {
              required: true,
              message: "Kindly input your organisation account name!",
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item className="mt-4 text-right">
          <ButtonUI disabled={false} htmlType="submit" className="px-8 ">
            Proceed
          </ButtonUI>
        </Form.Item>
      </Form>
    </div>
  );
};
export default BankInformationScreen;
