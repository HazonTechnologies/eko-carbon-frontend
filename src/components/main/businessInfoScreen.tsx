/* eslint-disable implicit-arrow-linebreak */
import { Form, Input, Select } from "antd";
import { NextPage } from "next";
// import Image from "next/image";
// import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";
import { emailPattern, urlPattern } from "../../lib/common/regex";
import { BusinessInfo } from "../../models/listers";
import { Dependencies } from "../../models/dependencies";
// import imageLoader from "../../lib/helperFunctions/loader";
// import ImageViewer from "./imageViewer";

const { Option } = Select;

interface BusinessInfoPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: BusinessInfo) => void;
  goBack: () => void;
  businessInfo: BusinessInfo | undefined;
  dependencies: Dependencies | null;
}

const BusinessInfoScreen: NextPage<BusinessInfoPropType> = ({
  onSubmit,
  goBack,
  businessInfo,
  dependencies,
}) => {
  const [form] = Form.useForm();
  const onError = (err: any) => {
    console.log(err);
  };
  const onFilter = (input: any, option: any) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
    <div className="sm:w-[400px] w-[320px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-10 my-2">
      <p className="text-sm my-4">Let us know more about your business</p>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        initialValues={businessInfo ?? {}}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Registered Business Name"
          name="BusinessName"
          rules={[
            { required: true, message: "Kindly input your business name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Business Email"
          name="BusinessEmail"
          rules={[
            { required: true, message: "Kindly input your business email!" },
            { pattern: emailPattern, message: "Invalid email!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Business Address"
          name="BusinessAddress"
          rules={[
            { required: true, message: "Kindly input your business address!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Website"
          name="Website"
          rules={[
            { required: true, message: "Kindly input your business Website!" },
            { pattern: urlPattern, message: "Invalid Web Url!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Industry"
          name="Industry"
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
            {dependencies &&
              dependencies.industries &&
              dependencies.industries.map((option) => (
                <Option key={option.key} value={option.key}>
                  <span className="capitalize">{option.value}</span>
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Summary"
          name="Summary"
          rules={[
            {
              required: true,
              message: "Kindly fill in a summary of your company!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
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
