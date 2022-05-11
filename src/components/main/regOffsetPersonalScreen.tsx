import { Form, Input } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";

interface RegOffsetPersonalScreenPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: User) => void;
  // eslint-disable-next-line no-unused-vars
  googleCall: () => void;
}

const RegOffsetPersonalScreen: NextPage<RegOffsetPersonalScreenPropType> = ({
  onSubmit,
  googleCall,
}) => {
  const onError = (err: any) => {
    console.log(err);
  };
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
          Sign Up With Google
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
            label="First Name"
            name="firstname"
            rules={[
              { required: true, message: "Kindly input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[
              { required: true, message: "Kindly input your last name!" },
            ]}
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
            <Input type="email" />
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
          <a className="text-tertiary-high">Sign In</a>
        </Link>
      </p>
    </div>
  );
};

export default RegOffsetPersonalScreen;
