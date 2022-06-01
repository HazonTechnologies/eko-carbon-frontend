/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { Divider, Form, InputNumber, Select } from "antd";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useLoading } from "../../context/loadingCtx";
import { fetcher } from "../../lib/helperFunctions/fetcher";
// import Link from "next/link";
import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";

const { Option } = Select;

interface EnergyPhotovolaticPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: User) => void;
  // eslint-disable-next-line no-unused-vars
  onError: (param: any) => void;
}

const EnergyPhotovolatic: NextPage<EnergyPhotovolaticPropType> = ({
  onSubmit,
  onError,
}) => {
  const { setLoadingStatus } = useLoading();

  const onChange = (val: any) => {
    console.log(val);
  };

  const cancel = () => {
    console.warn("cancel");
  };

  const [options, setOptions] = useState<string[]>([]);

  const onFilter = (input: any, option: any) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  const fetchDependencies = () => {
    setLoadingStatus(true);
    fetcher("Account/dependencies")
      .then((res) => {
        if (!res.successful) return;
        setOptions(res.data.industries);
      })
      .finally(() => setLoadingStatus(false));
  };
  //   call API
  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      onFinishFailed={onError}
      autoComplete="off"
    >
      <Divider type="horizontal" />
      <h2 className="my-4 text-base">Panel</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item className="w-[250px]" label="Watts (watts)" name="watts">
          <InputNumber
            className="w-[100%]"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item label="Number" name="number" className="w-[250px]">
          <InputNumber className="w-[100%]" onChange={onChange} />
        </Form.Item>
      </div>
      <Divider type="horizontal" />
      <h2 className="my-4 text-base">Battery</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item label="Capacity (V)" name="capacity" className="w-[250px]">
          <InputNumber
            className="w-[100%]"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item label="AH" name="ah" className="w-[250px]">
          <InputNumber
            className="w-[100%]"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            onChange={onChange}
          />
        </Form.Item>
      </div>
      <Divider type="horizontal" />
      <h2 className="my-4 text-base">Cloud Cover</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item label="Days" name="newspapers" className="w-[250px]">
          <InputNumber className="w-[100%]" onChange={onChange} />
        </Form.Item>
        <Form.Item label="Dropbox" name="dropbox" className="w-[250px]">
          <InputNumber className="w-[100%]" onChange={onChange} />
        </Form.Item>
      </div>
      <Divider type="horizontal" />
      <h2 className="my-4 text-base">Inverter</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item label="KVA" name="kva" className="w-[250px]">
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            className="w-[100%]"
            onChange={onChange}
          />
        </Form.Item>
      </div>
      <Divider type="horizontal" />
      <h2 className="my-4 text-base">HH Beneficiary</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item
          label="Number (Rank)"
          name="numberRank"
          className="w-[250px]"
        >
          <InputNumber className="w-[100%]" onChange={onChange} />
        </Form.Item>
      </div>
      <Divider type="horizontal" />
      <h2 className="my-4 text-base">BAU Assessment</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item
          label="Source of Power"
          name="sourceOfPower"
          className="w-[250px]"
        >
          <Select
            showSearch
            placeholder="Select a source of power"
            optionFilterProp="children"
            filterOption={onFilter}
          >
            {options.length &&
              options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="HH Cover"
          name="hhCover"
          className="w-[250px]"
          rules={[
            { required: true, message: "Kindly input your email address!" },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a source of power"
            optionFilterProp="children"
            filterOption={onFilter}
          >
            {options.length &&
              options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Installation Emission"
          name="installation"
          className="w-[250px]"
        >
          <Select
            showSearch
            placeholder="Select a source of power"
            optionFilterProp="children"
            filterOption={onFilter}
          >
            {options.length &&
              options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </div>
      <Form.Item className="mt-10 text-right gap-x-8">
        <ButtonUI
          onClickTrigger={cancel}
          disabled={false}
          htmlType="button"
          className="!sm:px-10 px-10 border border-primary-mid !text-primary-high !bg-secondary-high mr-2 "
        >
          Cancel
        </ButtonUI>
        <ButtonUI disabled={false} htmlType="submit" className="!sm:px-10 px-7">
          Pay $50 to calculate
        </ButtonUI>
      </Form.Item>
    </Form>
  );
};

export default EnergyPhotovolatic;
