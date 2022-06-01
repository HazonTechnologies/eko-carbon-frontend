import { Form, Input, Select } from "antd";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import PhoneInput from "react-phone-input-2";

// import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";
import { BusinessRepInfo } from "../../models/listers";
import { useLoading } from "../../context/loadingCtx";

import DropFile from "../utilities/DropFile";
import { fetcher } from "../../lib/helperFunctions/fetcher";
import { AntFormValidatingProps, BooleanType } from "../../models/utilities";
import { emailPattern, passwordPattern, phonePattern } from "../../lib/common/regex";

const { Option } = Select;

interface City {
  name: string;
}

interface State {
  name: string;
  cities: City[];
}
interface Country {
  name: string;
  phoneCode: string;
  states: State[];
}

const mockBooleanOptions: BooleanType[] = [
  {
    name: "Yes",
    value: true,
  },
  {
    name: "No",
    value: false,
  },
];
const idType: { name: string; value: string }[] = [
  {
    name: "Voters Card",
    value: "votersCard",
  },
  {
    name: "National Identity Card",
    value: "nic",
  },
];

const defaultProjectScopes: { name: string; value: string }[] = [
  {
    name: "Municipal Solid Waste",
    value: "msw",
  },
  {
    name: "Agricultural Projects",
    value: "ap",
  },
  {
    name: "Afforestation & Reforestation",
    value: "ar",
  },
  {
    name: "Water, Sanitation & Hygiene Projects",
    value: "wshp",
  },
  {
    name: "Construction Projects (CDMW)",
    value: "cp",
  },
  {
    name: "Renewable Energy & Energy Efficient Project",
    value: "reeep",
  },
];

interface BusinessRepPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: BusinessRepInfo) => void;
  goBack: () => void;
  businessName: string | undefined;
}

const BusinessRepScreen: NextPage<BusinessRepPropType> = ({
  onSubmit,
  goBack,
  businessName,
}) => {
  const onError = (err: any) => {
    console.log(err);
  };
  const [formValues, setFormValues] = useState<BusinessRepInfo | null>(null);
  const [projectScopeOptions, setProjectScopeOptions] = useState<
    { name: string; value: string }[]
  >([]);
  const [options, setOptions] = useState<BooleanType[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [validateStatus, setValidateStatus] =
    useState<AntFormValidatingProps>("");
  const [form] = Form.useForm();

  const { setLoadingStatus } = useLoading();

  const fetchDependencies = () => {
    setLoadingStatus(true);
    fetcher("Account/dependencies")
      .then((res) => {
        if (!res.successful) return;
        setCountries(res.data.countries);
      })
      .finally(() => setLoadingStatus(false));
  };
  //   call API
  useEffect(() => {
    fetchDependencies();
    setOptions(mockBooleanOptions);
    setProjectScopeOptions(defaultProjectScopes);
  }, []);

  const onCountrySelected = (val: string) => {
    setStates([]);
    setCities([]);
    const selectedCountry = countries.find((country) => country.name === val);
    if (!selectedCountry) return;
    setStates(selectedCountry.states);
  };
  const onStateSelected = (val: string) => {
    setCities([]);
    const selectedStates = states.find((state) => state.name === val);
    if (!selectedStates) return;
    setCities(selectedStates.cities);
  };

  const confirmPass = (value: string) => {
    const password = formValues?.Password;
    if (!password) return;
    if (value !== password) {
      setValidateStatus("error");
      return;
    }
    form.setFields([{ name: "ConfirmPassword", errors: [""] }]);
    setValidateStatus("success");
  };

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
        form={form}
        initialValues={{ bank: "zenith", phone: "+2349035108713" }}
        onValuesChange={(_, values) => setFormValues(values)}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Project Scope"
          name="projectScope"
          rules={[
            { required: true, message: "Kindly select a project scope!" },
          ]}
        >
          <Select placeholder="Select a peoject scope">
            {projectScopeOptions.length &&
              projectScopeOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={`Are you a business owner at ${businessName ?? ''}`}
          name="isbusinessOwner"
          rules={[{ required: true, message: "Kindly select an option!" }]}
        >
          <Select placeholder="Select an option">
            {options.length &&
              options.map((option) => (
                <Option key={option.name} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={`Do you own more than 25% at ${businessName ?? ''}`}
          name="OwnsAboveQuarter"
          rules={[{ required: true, message: "Kindly select an option!" }]}
        >
          <Select placeholder="Select an option">
            {options.length &&
              options.map((option) => (
                <Option key={option.name} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="stakeholderName"
          rules={[{ required: true, message: "Kindly input your full name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="stakeholderEmail"
          rules={[
            { required: true, message: "Kindly input your email address!" },
            { pattern: emailPattern, message: "Invalid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="BVN"
          name="stakeholderBVN"
          rules={[
            {
              required: true,
              message: "Kindly input your Bank Verification Number!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item> */}
        <Form.Item
          label="Phone number"
          name="stakeholderPhoneNumber"
          rules={[
            { required: true, message: "Kindly input your phone number!" },
            { pattern: phonePattern, message: "Invalid phone number!" },
          ]}
        >
          <PhoneInput country="ng" containerClass="w-40px" />
        </Form.Item>
        <Form.Item
          label="Country"
          name="stakeholderCountry"
          rules={[{ required: true, message: "Kindly select your country!" }]}
        >
          <Select
            onSelect={(val: string) => onCountrySelected(val)}
            placeholder="Select an option"
          >
            {countries.length &&
              countries.map((option) => (
                <Option key={option.name} value={option.name}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="State"
          name="stakeholderState"
          rules={[{ required: true, message: "Kindly select your state!" }]}
        >
          <Select
            disabled={!states.length}
            onSelect={(val: string) => onStateSelected(val)}
            placeholder="Select an option"
          >
            {states.length &&
              states.map((option) => (
                <Option key={option.name} value={option.name}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="City"
          name="stakeholderCity"
          rules={[{ required: true, message: "Kindly select your city!" }]}
        >
          <Select disabled={!cities.length} placeholder="Select an option">
            {cities.length &&
              cities.map((option) => (
                <Option key={option.name} value={option.name}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Street Address"
          name="stakeholderAddress"
          rules={[{ required: true, message: "Kindly input your street address!" }]}
        >
          <Input disabled={!cities.length} />
        </Form.Item>
        <Form.Item
          label="Select ID Type"
          name="StakeholderIdentityCardType"
          rules={[{ required: true, message: "Kindly select your id type!" }]}
        >
          <Select placeholder="Select an option">
            {idType.length &&
              idType.map((option) => (
                <Option key={option.name} value={option.value}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <div>
          <DropFile
            title="Upload ID"
            acceptedFileTypes={["pdf", "jpeg", "jpg", "png"]}
            files={files}
            setFiles={setFiles}
            allowMultiple={false}
          />
        </div>

        <Form.Item
          label="Password"
          name="Password"
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
        <Form.Item
          label="Confirm Password"
          name="ConfirmPassword"
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
