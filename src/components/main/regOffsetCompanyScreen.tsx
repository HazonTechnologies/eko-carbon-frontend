import { Form, Input, Select } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLoading } from "../../context/loadingCtx";
import { Industry } from "../../models/industry";
import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";

interface RegOffsetCompanyScreenPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: User) => void;
  // eslint-disable-next-line no-unused-vars
  googleCall: () => void;
}
const { Option } = Select;

const mockOptions: Industry[] = [
  {
    name: "Manufacturing",
    value: "manufacturing",
  },
  {
    name: "Finance",
    value: "finance",
  },
  {
    name: "Transportation",
    value: "transportation",
  },
];

const RegOffsetCompanyScreen: NextPage<RegOffsetCompanyScreenPropType> = ({
  onSubmit,
  googleCall,
}) => {
  const { setLoadingStatus } = useLoading();
  const [options, setOptions] = useState<Industry[]>([]);
  const onError = (err: any) => {
    console.log(err);
  };

  const onFilter = (input: any, option: any) => {
    console.log(input);
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  //   call API
  useEffect(() => {
    setLoadingStatus(true);
    setTimeout(() => {
      setOptions(mockOptions);
      setLoadingStatus(false);
    }, 1000);
  }, []);

  return (
    <div>
      <div className="w-[350px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-6 my-2">
        <h2 className="text-3xl text-bond font-header">Sign Up</h2>
        <p className="text-sm my-4">Create your own secure account</p>
        <ButtonUI
          onClickTrigger={googleCall}
          disabled={false}
          bg="primary-high"
          color="primary-medium"
          htmlType="button"
          width="100%"
          icon="googleIcon.svg"
        >
          Sign In With Google
        </ButtonUI>

        <div className="w-[100%] my-6 opacity-30 items-center flex justify-evenly">
          <span className="border-b  w-[45%]" />
          <span className="w-[10%] text-center">OR</span>
          <span className="border-b w-[45%]" />
        </div>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={onError}
          autoComplete="off"
        >
          <Form.Item
            label="Business Name"
            name="businessName"
            rules={[
              { required: true, message: "Kindly input your business name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Business Email Address"
            name="businessEmail"
            rules={[
              {
                required: true,
                message: "Kindly input your business email address!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Business Address"
            name="businessAddress"
            rules={[
              {
                required: true,
                message: "Kindly input your business address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="RC Number"
            name="rcNumber"
            rules={[
              { required: true, message: "Kindly input your RC number!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Industry"
            name="industry"
            rules={[
              {
                required: true,
                message: "Kindly select your business industry type!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select an industry"
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
            label="Password"
            name="password"
            rules={[{ required: true, message: "Kindly input your password!" }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            rules={[{ required: true, message: "Password do not match!" }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item className="mt-4">
            <ButtonUI disabled={false} htmlType="submit" width="100%">
              Submit
            </ButtonUI>
          </Form.Item>
        </Form>
      </div>
      <p className="gap-2 flex justify-center">
        <span>Already have an account?</span>
        <Link href="/register">
          <a className="text-tertiary-high">Create an account</a>
        </Link>
      </p>
    </div>
  );
};
export default RegOffsetCompanyScreen;
