import { Form, Input, Select } from "antd";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import PhoneInput from "react-phone-input-2";

// import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";
import { AccountInformation } from "../../models/user";
import { useLoading } from "../../context/loadingCtx";

import DropFile from "../utilities/DropFile";

const { Option } = Select;

interface BooleanType {
  name: string;
  value: string;
}
const mockOptions: BooleanType[] = [
  {
    name: "Yes",
    value: "yes",
  },
  {
    name: "No",
    value: "no",
  },
];
const country: BooleanType[] = [
  {
    name: "Nigeria",
    value: "ng",
  },
  {
    name: "United States of America",
    value: "us",
  },
];
const state: BooleanType[] = [
  {
    name: "Austin",
    value: "as",
  },
  {
    name: "Connecticut",
    value: "cn",
  },
];
const city: BooleanType[] = [
  {
    name: "Las Vegas",
    value: "lv",
  },
  {
    name: "Houston",
    value: "hs",
  },
];
const idType: BooleanType[] = [
  {
    name: "Voters Card",
    value: "votersCard",
  },
  {
    name: "National Identity Card",
    value: "nic",
  },
];

interface BusinessRepPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: AccountInformation) => void;
  goBack: () => void;
}

const BusinessRepScreen: NextPage<BusinessRepPropType> = ({
  onSubmit,
  goBack,
}) => {
  const onError = (err: any) => {
    console.log(err);
  };

  const [options, setOptions] = useState<BooleanType[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const { setLoadingStatus } = useLoading();
  //   call API
  useEffect(() => {
    setLoadingStatus(true);
    setTimeout(() => {
      setOptions(mockOptions);
      setLoadingStatus(false);
    }, 1000);
  }, []);

  return (
    <div className="sm:w-[400px] w-[320px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-10 my-2">
      <p className="text-sm my-4">
        “To ensure we keep with regulatory requirements, this stall needs to be
        activated by someone with significant management responsibility or
        control
      </p>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ bank: "zenith", phone: "+2349035108713" }}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Are you a business owner at  [ company name ]"
          name="businessOwner"
          rules={[{ required: true, message: "Kindly select an option!" }]}
        >
          <Select placeholder="Select an option" defaultValue="yes">
            {options.length &&
              options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Do you own more than 25% at  [ company name ]"
          name="ownAbove25"
          rules={[{ required: true, message: "Kindly select an option!" }]}
        >
          <Select placeholder="Select an option" defaultValue="yes">
            {options.length &&
              options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Kindly input your full name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Kindly input your email address!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="BVN"
          name="bvn"
          rules={[
            {
              required: true,
              message: "Kindly input your Bank Verification Number!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Kindly input your phone number!" },
          ]}
        >
          <PhoneInput country="ng" containerClass="w-40px" />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Kindly select your country!" }]}
        >
          <Select placeholder="Select an option">
            {country.length &&
              country.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Kindly select your state!" }]}
        >
          <Select placeholder="Select an option">
            {state.length &&
              state.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Kindly select your city!" }]}
        >
          <Select placeholder="Select an option">
            {city.length &&
              city.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Select ID to Upload"
          name="idType"
          rules={[{ required: true, message: "Kindly select your id type!" }]}
        >
          <Select placeholder="Select an option">
            {idType.length &&
              idType.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <div>
          <DropFile
            title="Upload ID"
            acceptedFileTypes={["pdf", "jpeg", "jpg", "png"]}
            files={files}
            setFiles={setFiles}
            allowMultiple={false}
          />
        </div>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Kindly input your password!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Passwords do not match!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item className="mt-10 text-right gap-x-8">
          <ButtonUI
            onClickTrigger={goBack}
            disabled={false}
            htmlType="button"
            className="!sm:px-10 px-7 border border-primary-mid !text-primary-high !bg-secondary-high mr-2 "
          >
            Back
          </ButtonUI>
          <ButtonUI
            disabled={false}
            htmlType="submit"
            className="!sm:px-10 px-7"
          >
            Submit
          </ButtonUI>
        </Form.Item>
      </Form>
    </div>
  );
};
export default BusinessRepScreen;
