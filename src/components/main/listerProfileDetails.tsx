import { Divider, Form, Input } from "antd";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import CustomButton from "../utilities/ButtonUI";

import { ListerProject } from "../../models/listers";
import { useUser } from "../../context/userCtx";
import DropFile from "../utilities/DropFile";
import { useLoading } from "../../context/loadingCtx";
import { postApi } from "../../lib/helperFunctions/fetcher";

interface ListerProfilePropType {
  updateProfileLink: string;
  reRouteLink?: string;
}

const ListerProfileDetails = ({
  updateProfileLink,
  reRouteLink,
}: ListerProfilePropType) => {
  const {
    state: { userPayload },
  } = useUser();

  const { setLoadingStatus } = useLoading();
  const [form] = Form.useForm();
  const { push } = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  const onSubmit = (values: ListerProject) => {
    setLoadingStatus(true);
    postApi(updateProfileLink, values)
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
    console.warn(values);
  };

  const onError = (err: any) => {
    console.log(err);
  };

  return (
    <div className="flex flex-col justify-start">
      <div className="">
        <h3 className="font-header font-medium text mb-1">Company Profile</h3>
        <p className="text-xs ">
          Please Update your public company profile here
        </p>
        <Divider />
        <Form
          name="basic"
          layout="vertical"
          form={form}
          initialValues={userPayload?.profile.company ?? {}}
          onFinish={onSubmit}
          onFinishFailed={onError}
          autoComplete="off"
        >
          <Form.Item label="Company Name" name="businessName">
            <Input className="sm:w-[50%]" />
          </Form.Item>
          <Divider />
          <Form.Item label="About the company" name="summary">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Divider />

          <div>
            <p>Upload Profile Photo</p>
            <DropFile
              files={files}
              setFiles={setFiles}
              allowMultiple={false}
              acceptedFileTypes={["jpg", "png", "svg", "jpeg"]}
            />
          </div>

          <Form.Item className="mt-4 text-right">
            <CustomButton
              htmlType="submit"
              bg="secondary-high"
              color="primary-high"
              className="px-8 mx-2"
            >
              Cancel
            </CustomButton>
            <CustomButton htmlType="submit">Update Profile</CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ListerProfileDetails;
