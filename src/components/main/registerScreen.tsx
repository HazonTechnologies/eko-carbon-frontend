import { Form, Input } from "antd";
import { NextPage } from "next";

import CustomButton from "../utilities/ButtonUI";
import { User } from "../../models/user";

interface RegisterPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: User) => void;
  googleCall: () => void;
  initialValues: { email: string } | null;
}

const RegisterScreen: NextPage<RegisterPropType> = ({
  onSubmit,
  googleCall,
  initialValues,
}) => {
  const onError = (err: any) => {
    console.log(err);
  };
  return (
    <div className="flex flex-col justify-start">
      <div className="w-[350px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-6 my-2">
        <h2 className="text-3xl text-bond font-header">Sign Up</h2>
        <p className="text-sm my-4">Create your own secure account</p>
        <CustomButton
          onClickTrigger={googleCall}
          disabled={false}
          bg="primary-high"
          color="primary-medium"
          htmlType="button"
          width="100%"
          icon="googleIcon.svg"
        >
          Sign Up With Google
        </CustomButton>

        <div className="w-[100%] my-6 opacity-30 items-center flex justify-evenly">
          <span className="border-b w-[45%]" />
          <span className="w-[10%] text-center">OR</span>
          <span className="border-b w-[45%]" />
        </div>
        <Form
          name="basic"
          layout="vertical"
          initialValues={initialValues ?? {}}
          onFinish={onSubmit}
          onFinishFailed={onError}
          autoComplete="off"
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item className="mt-4">
            <CustomButton disabled={false} htmlType="submit" width="100%">
              Submit
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterScreen;
