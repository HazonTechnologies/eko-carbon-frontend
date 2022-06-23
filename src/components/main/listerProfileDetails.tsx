import { Divider, Form, Input } from "antd";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomButton from "../utilities/ButtonUI";

import { ListerUser } from "../../models/listers";
import DropFile from "../utilities/DropFile";
import { useLoading } from "../../context/loadingCtx";
import { postApi } from "../../lib/helperFunctions/fetcher";
import { GetUserDetailsUrl } from "../../lib/common/endpoints";

interface ListerProfilePropType {
  updateProfileLink: string;
  reRouteLink?: string;
}

const ListerProfileDetails = ({
  updateProfileLink,
  reRouteLink,
}: ListerProfilePropType) => {
  const { data } = useSWR(GetUserDetailsUrl);

  const { setLoadingStatus } = useLoading();
  const [form] = Form.useForm();
  const { push } = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [userPayload, setUserPayload] = useState<ListerUser | null>(null);

  useEffect(() => {
    console.warn(data);
    console.warn(data);
    console.warn(data);
    if (data) {
      setUserPayload(data.data);
    }
  }, [data]);

  const onSubmit = (values: ListerUser) => {
    if (!values.businessName && !values.summary && !files[0]) {
      toast.error("One or more field(s) is required");
      return;
    }

    const formVal = new FormData();
    if (values.businessName) {
      formVal.append("businessName", values.businessName);
    }
    if (values.summary) {
      formVal.append("summary", values.summary);
    }
    if (files[0]) {
      formVal.append("picture", files[0]);
    }
    setLoadingStatus(true);
    postApi(updateProfileLink, formVal)
      .then((res) => {
        if (!res.successful) {
          toast.error(res.message);
          return;
        }
        toast.success(res.message);
        form.resetFields();
        mutate(GetUserDetailsUrl);
        if (reRouteLink) {
          push(reRouteLink);
        }
      })
      .finally(() => setLoadingStatus(false));
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
