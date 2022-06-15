import { Form, Input } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import imageLoader from "../../lib/helperFunctions/loader";
import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";

interface LoginPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: User) => void;
  // eslint-disable-next-line no-unused-vars
  onError: (param: any) => void;
  googleCall: () => void;
  onAdmin: boolean
}

const LoginScreen: NextPage<LoginPropType> = ({
  onSubmit,
  onError,
  googleCall,
  onAdmin
}) => (
  <div>
    {onAdmin &&
      (
        <Image
          priority={true}
          unoptimized={true}
          loader={imageLoader}
          src="/assets/icons/logo.svg"
          alt="Icon"
          width={160}
          height={60}
        />
      )}
    <div className="w-[350px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-6 my-2">
      <h2 className="text-3xl text-bond font-header">Sign in</h2>
      {!onAdmin && <p className="text-sm my-4 mb-8">Sign in now</p>}
      {onAdmin && <p className="text-sm my-4 mb-8">Sign in to view your account details</p>}
      {!onAdmin &&
        (
          <ButtonUI
            onClickTrigger={googleCall}
            disabled={false}
            bg="secondary-high"
            color="primary-medium"
            htmlType="button"
            width="100%"
            icon="googleIcon.svg"
          >
            Sign In With Google
          </ButtonUI>
        )}
      {!onAdmin &&
        (
          <div className="w-[100%] my-6 opacity-30 items-center flex justify-evenly">
            <span className="border-b  w-[45%]" />
            <span className="w-[10%] text-center">OR</span>
            <span className="border-b w-[45%]" />
          </div>
        )}
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
          <Input.Password />
        </Form.Item>
        <span className="-mt-[20px] text-xs text-tertiary-high">
          Forgot Password?
        </span>
        <Form.Item className="mt-4">
          <ButtonUI disabled={false} htmlType="submit" width="100%">
            Submit
          </ButtonUI>
        </Form.Item>
      </Form>
    </div>
    {!onAdmin && (
      <p className="gap-2 pb-4 flex justify-center">
        <span>New to Eko Carbon?</span>
        <Link href="/register">
          <a className="text-tertiary-high">Create an account</a>
        </Link>
      </p>
    )}
  </div>
);

export default LoginScreen;

