import { Form, Input, Button, Checkbox } from "antd";
import { CiCircleFilled } from "@ant-design/icons";
import Image from "next/image";
import CustomButton from "../components/utilities/Button";
import imageLoader from "../lib/helperFunctions/loader";
import { useRouter } from "next/router";

export default function Home() {
  const {
    push,
  } = useRouter();
  const onFinish = (values: any) => {
    push('/todo')
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="m-[auto] h-[90vh] flex justify-center items-center">
      <div>
        <Image
          unoptimized={true}
          loader={imageLoader}
          src={"/assets/icons/logo.svg"}
          alt={"Icon"}
          width={150}
          height={50}
        />
        <div className="w-[400px] m-[auto] bg-secondary-high p-6 my-2">
          <h2 className="text-3xl text-bond font-header">Sign in</h2>
          <p className="text-sm my-4">Create your own secure account</p>
          <CustomButton
            disabled={false}
            bg={"primary-high"}
            color={"primary-medium"}
            htmlType={"button"}
            width={"100%"}
            icon={"googleIcon.svg"}
          >
            Sign Up With Google
          </CustomButton>

          <div className="w-[100%] my-6 items-center flex justify-evenly">
            <span className="border-b opacity-20 w-[45%]"></span>
            <span className="w-[10%] text-center">OR</span>
            <span className="border-b opacity-20 w-[45%]"></span>
          </div>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="mt-4">
              <CustomButton disabled={false} htmlType={"submit"} width={"100%"}>
                Submit
              </CustomButton>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
