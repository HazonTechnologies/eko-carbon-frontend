/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { InfoCircleOutlined } from "@ant-design/icons";
import { Divider, Form, InputNumber, Tooltip } from "antd";
import { NextPage } from "next";
import { useState } from "react";
// import Link from "next/link";
import { PaystackConfig } from "../../models/utilities";
import ButtonUI from "../utilities/ButtonUI";
import PaystackPaymentButton from "./paystackPayment";

interface EnergyPhotovolaticPropType {
  intiateTrans: PaystackConfig;
  paymentButton: string;
}

const EnergyPhotovolatic: NextPage<EnergyPhotovolaticPropType> = ({
  intiateTrans,
  paymentButton,
}) => {
  const [formValues, setFormValues] = useState<any>(null);

  const onChange = (val: any) => {
    console.log(val);
  };

  const onClose = () => {
    console.warn("Clossed");
  };
  const onSuccess = (ref: any) => {
    console.warn(formValues, ref);
  };

  const cancel = () => {
    console.warn("cancel");
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onValuesChange={(_, values) => setFormValues(values)}
      autoComplete="off"
    >
      <Divider type="horizontal" />
      <h2 className="my-4 text-base flex items-center gap-x-2">
        <span>Type I</span>
        <Tooltip title="Baseline consumers that is not previously on grid; consume less than 500kwh per year">
          <InfoCircleOutlined className="text-primary-low" />
        </Tooltip>
      </h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item
          className="w-[250px]"
          label="Number of type I consumers"
          name="panel"
        >
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
      <h2 className="my-4 text-base flex items-center gap-x-2">
        <span>Type II</span>
        <Tooltip title="Baseline consumers that consume less than 500kWh / yr and previously had FF generator">
          <InfoCircleOutlined className="text-primary-low" />
        </Tooltip>
      </h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item label="Number of type II consumers" name="battery" className="w-[250px]">
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
      <h2 className="my-4 text-base flex items-center gap-x-2">
        <span>Type III</span>
        <Tooltip title="Baseline consumers that were previously connected to a mini grid">
          <InfoCircleOutlined className="text-primary-low" />
        </Tooltip>
      </h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item label="Number of type II consumers" name="cloudCover" className="w-[250px]">
          <InputNumber className="w-[100%]" onChange={onChange} />
        </Form.Item>
      </div>
      <Divider type="horizontal" />
      <h2 className="my-4 text-base flex items-center gap-x-2">
        <span>Type IV</span>
        <Tooltip title="Water pumping, public lighting regardless of previous supply of electricity">
          <InfoCircleOutlined className="text-primary-low" />
        </Tooltip>
      </h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item label="Number of type IV consumer" name="inverter" className="w-[250px]">
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
      <Form.Item className="mt-10 text-right gap-x-8">
        <ButtonUI
          onClickTrigger={cancel}
          disabled={false}
          htmlType="button"
          className="!sm:px-10 px-10 border border-primary-mid !text-primary-high !bg-secondary-high mr-2 "
        >
          Cancel
        </ButtonUI>
        <PaystackPaymentButton
          config={intiateTrans}
          buttonTitle={paymentButton}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </Form.Item>
    </Form>
  );
};

export default EnergyPhotovolatic;
