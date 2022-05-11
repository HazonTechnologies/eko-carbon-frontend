import { Form, Input, Select } from "antd";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { CloudUploadOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
// import Image from "next/image";
// import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";
import { AccountInformation } from "../../models/user";
import { useLoading } from "../../context/loadingCtx";
import formatBytes from "../../lib/helperFunctions/formatBytes";
import formatFileName from "../../lib/helperFunctions/formatFileName";
import { Industry } from "../../models/industry";
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
  const [certOfInc, setCertOfInc] = useState<File | null>(null);
  const onError = (err: any) => {
    console.log(err);
  };
  const onFilter = (input: any, option: any) => {
    console.log(input);
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const [options, setOptions] = useState<Industry[]>([]);
  const processFile = (acceptedFile: File[], errors: any) => {
    //   toast.error("Hello")
    if (errors && errors.length) {
      console.log(errors);
      toast.error(errors[0].errors[0].message);
      return;
    }
    if (acceptedFile.length) {
      const file = acceptedFile[0];
      setCertOfInc(file);
    }
  };

  const expand = () => {
    if (!certOfInc) return;
    window.open(URL.createObjectURL(certOfInc), "_blank", "fullScreen=yes");
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
          <h2 className="pb-2">Certificate of Incorporation</h2>
          <Dropzone
            onDrop={processFile}
            accept={{
              "application/pdf": [".pdf"],
              "images/png": [".png"],
              "images/jpg": [".jpg"],
              "images/jpeg": [".jpeg"],
            }}
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="border border-primary-lower rounded py-3">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center">
                    <CloudUploadOutlined className="text-xl bg-tertiary-low rounded-3xl px-2 py-1" />
                    <p>
                      <span>Click to upload</span>
                      <span> or drag and drop</span>
                    </p>
                    <small>SVG, PNG,JPG or GIF (max. 800x400px)</small>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
          {certOfInc && (
            <p className="flex items-center justify-between bg-tertiary-low p-2 my-2 mb-6 rounded">
              <span>{formatFileName(certOfInc.name)}</span>
              <span>{formatBytes(certOfInc.size)}</span>
              <EyeOutlined onClick={expand} />
            </p>
          )}
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
