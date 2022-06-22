import { Divider, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLoading } from "../../context/loadingCtx";
import { passwordPattern } from "../../lib/common/regex";
import { postApi } from "../../lib/helperFunctions/fetcher";
import { AntFormValidatingProps } from "../../models/utilities";
import CustomButton from "../utilities/ButtonUI";

interface ResetPass {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordPropType {
  resetPasswordLink: string;
  reRouteLink?: string;
  extraParams: any;
}

const ResetPassword = ({
  resetPasswordLink,
  reRouteLink,
  extraParams,
}: ResetPasswordPropType) => {
  const [form] = Form.useForm();
  const { setLoadingStatus } = useLoading();
  const { push } = useRouter();
  const [validateStatus, setValidateStatus] =
    useState<AntFormValidatingProps>("");
  const [resetPassVal, setResetPassVal] = useState<ResetPass | null>(null);

  const onSubmit = (values: ResetPass) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoadingStatus(true);
    postApi(resetPasswordLink, { ...values, ...extraParams })
      .then((res) => {
        if (!res.successful) {
          toast.error(res.message);
          return;
        }
        toast.success(res.message);
        form.resetFields();
        if (reRouteLink) {
          push(reRouteLink);
        }
      })
      .finally(() => setLoadingStatus(false));
  };

  const confirmPass = (value: string) => {
    const password = resetPassVal?.password;
    if (!password) return;
    if (value !== password) {
      setValidateStatus("error");
      return;
    }
    setValidateStatus("success");
  };

  return (
    <div className="flex flex-col h-[80vh] justify-center items-center">
      <div className="w-[350px] m-[auto] boxProps p-6 my-2">
        <h2 className="font-header font-medium text-2xl mb-1">Reset Password</h2>
        <p className="text-sm ">
          Kindly enter a new password to change your password
        </p>
        <Divider />
        <Form
          name="basic"
          layout="vertical"
          form={form}
          onValuesChange={(_, values) => setResetPassVal(values)}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="New password"
            name="password"
            rules={[
              {
                required: true,
                message: "Kindly input a password!",
              },
              {
                pattern: passwordPattern,
                message:
                  "Password must minimum eight characters, at least one letter, one number and one special character",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Divider />
          <Form.Item
            label="Confirm new password"
            name="confirmPassword"
            validateStatus={validateStatus}
            rules={[
              {
                required: true,
                message: "Password do not match!",
              },
            ]}
          >
            <Input.Password onChange={(e) => confirmPass(e.target.value)} />
          </Form.Item>

          <Form.Item className="mt-4 text-right">
            <CustomButton
              htmlType="submit"
              bg="secondary-high"
              color="primary-high"
              className="px-8 mx-2"
            >
              Cancel
            </CustomButton>
            <CustomButton htmlType="submit">Reset Password</CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
