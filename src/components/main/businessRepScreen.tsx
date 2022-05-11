import { Form, Input, Select } from "antd";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { CloudUploadOutlined, EyeOutlined } from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-hot-toast";

// import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";
import { AccountInformation } from "../../models/user";
import { useLoading } from "../../context/loadingCtx";
import formatFileName from "../../lib/helperFunctions/formatFileName";
import formatBytes from "../../lib/helperFunctions/formatBytes";

const { Option } = Select;

interface BooleanType {
  name: string;
  value: string;
}
const mockOptions: BooleanType[] = [
  {
    name: "Yes",
    value: "yes",
  },
  {
    name: "No",
    value: "no",
  },
];
const country: BooleanType[] = [
  {
    name: "Nigeria",
    value: "ng",
  },
  {
    name: "United States of America",
    value: "us",
  },
];
const state: BooleanType[] = [
  {
    name: "Austin",
    value: "as",
  },
  {
    name: "Connecticut",
    value: "cn",
  },
];
const city: BooleanType[] = [
  {
    name: "Las Vegas",
    value: "lv",
  },
  {
    name: "Houston",
    value: "hs",
  },
];
const idType: BooleanType[] = [
  {
    name: "Voters Card",
    value: "votersCard",
  },
  {
    name: "National Identity Card",
    value: "nic",
  },
];

interface BusinessRepPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: AccountInformation) => void;
  goBack: () => void;
}

const BusinessRepScreen: NextPage<BusinessRepPropType> = ({
  onSubmit,
  goBack,
}) => {
  const onError = (err: any) => {
    console.log(err);
  };

  const [options, setOptions] = useState<BooleanType[]>([]);
  const [certOfInc, setCertOfInc] = useState<File | null>(null);

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
  const { setLoadingStatus } = useLoading();
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
      <p className="text-sm my-4">
        “To ensure we keep with regulatory requirements, this stall needs to be
        activated by someone with significant management responsibility or
        control
      </p>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ bank: "zenith", phone: "+2349035108713" }}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Are you a business owner at  [ company name ]"
          name="businessOwner"
          rules={[{ required: true, message: "Kindly select an option!" }]}
        >
          <Select placeholder="Select an option" defaultValue="yes">
            {options.length &&
              options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Do you own more than 25% at  [ company name ]"
          name="ownAbove25"
          rules={[{ required: true, message: "Kindly select an option!" }]}
        >
          <Select placeholder="Select an option" defaultValue="yes">
            {options.length &&
              options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Kindly input your full name!" }]}
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
          <Input />
        </Form.Item>
        <Form.Item
          label="BVN"
          name="bvn"
          rules={[
            {
              required: true,
              message: "Kindly input your Bank Verification Number!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Kindly input your phone number!" },
          ]}
        >
          <PhoneInput country="ng" containerClass="w-40px" />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Kindly select your country!" }]}
        >
          <Select placeholder="Select an option">
            {country.length &&
              country.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Kindly select your state!" }]}
        >
          <Select placeholder="Select an option">
            {state.length &&
              state.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Kindly select your city!" }]}
        >
          <Select placeholder="Select an option">
            {city.length &&
              city.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Select ID to Upload"
          name="idType"
          rules={[{ required: true, message: "Kindly select your id type!" }]}
        >
          <Select placeholder="Select an option">
            {idType.length &&
              idType.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <div>
          <h2 className="pb-2">Upload ID</h2>
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
              <section className="border border-primary-lower rounded py-3 mb-4">
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
          rules={[{ required: true, message: "Kindly input your password!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Passwords do not match!" }]}
        >
          <Input type="password" />
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
export default BusinessRepScreen;
