import { Form, Input, Select } from "antd";
import { NextPage } from "next";
import { useEffect, useState } from "react";
// import Image from "next/image";
// import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";
import { AccountInformation } from "../../models/user";
import { useLoading } from "../../context/loadingCtx";
import { Industry } from "../../models/industry";
import DropFile from "../utilities/DropFile";
// import imageLoader from "../../lib/helperFunctions/loader";
// import ImageViewer from "./imageViewer";

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

interface BusinessInfoPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: AccountInformation) => void;
  goBack: () => void;
}

const BusinessInfoScreen: NextPage<BusinessInfoPropType> = ({
  onSubmit,
  goBack,
}) => {
  const { setLoadingStatus } = useLoading();
  const [files, setFiles] = useState<File[]>([]);
  const onError = (err: any) => {
    console.log(err);
  };
  const onFilter = (input: any, option: any) => {
    console.log(input);
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const [options, setOptions] = useState<Industry[]>([]);

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
      <p className="text-sm my-4">Let us know more about your business</p>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ bank: "zenith", phone: "+2349035108713" }}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Registered Business Name"
          name="businessName"
          rules={[
            { required: true, message: "Kindly input your business name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Business Email"
          name="businessEmail"
          rules={[
            { required: true, message: "Kindly input your business email!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Business Address"
          name="businessAddress"
          rules={[
            { required: true, message: "Kindly input your business address!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="RC Number"
          name="rcNumber"
          rules={[
            {
              required: true,
              message: "Kindly input your business RC Number!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
          rules={[
            { required: true, message: "Kindly input your business Website!" },
          ]}
        >
          <Input />
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
          label="Summary"
          name="summary"
          rules={[
            {
              required: true,
              message: "Kindly fill in a summary of your company!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <div>
          <DropFile
            title="Certificate of Incorporation"
            acceptedFileTypes={["pdf", "jpeg", "jpg", "png"]}
            files={files}
            setFiles={setFiles}
            allowMultiple={false}
          />
        </div>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Kindly input a password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Password do not match!",
            },
          ]}
        >
          <Input.Password />
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
export default BusinessInfoScreen;

// const reader = new FileReader();
//     reader.addEventListener("load", (e: any) => {
//       setImage(e.target.result);
//       // if (reader && reader.result && typeof reader.result === 'string') {
//       const { result } = e.target;

//       // }
//     });
//     reader.readAsDataURL(certOfInc);

// <PhotoView src={image}>
//        </PhotoView>
