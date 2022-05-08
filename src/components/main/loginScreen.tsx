import { Form, Input } from "antd";
import Image from "next/image";

import { NextPage } from "next";
import Link from "next/link";
import imageLoader from "../../lib/helperFunctions/loader";
import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";

interface LoginPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: User) => void;
  // eslint-disable-next-line no-unused-vars
  onError: (param: any) => void;
  googleCall: () => void;
}

const LoginScreen: NextPage<LoginPropType> = ({
  onSubmit,
  onError,
  googleCall,
}) => (
  <div>
    <Image
      unoptimized={true}
      loader={imageLoader}
      src="/assets/icons/logo.svg"
      alt="Icon"
      width={150}
      height={50}
    />
    <div className="w-[350px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-6 my-2">
      <h2 className="text-3xl text-bond font-header">Sign in</h2>
      <p className="text-sm my-4">Sign in now</p>
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
        <span className="-mt-10 text-xs text-tertiary-high">
          Forgot Password?
        </span>
        <Form.Item className="mt-4">
          <ButtonUI disabled={false} htmlType="submit" width="100%">
            Submit
          </ButtonUI>
        </Form.Item>
      </Form>
    </div>
    <p className="gap-2 flex justify-center">
      <span>New to Eko Carbon?</span>
      <Link href="/register">
        <a className="text-tertiary-high">Create an account</a>
      </Link>
    </p>
  </div>
);

export default LoginScreen;

