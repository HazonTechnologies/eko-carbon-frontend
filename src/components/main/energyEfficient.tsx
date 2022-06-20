import { Divider, Form, InputNumber } from "antd";
import { NextPage } from "next";
import { useState } from "react";
import { CalculateEnergyEfficientUrl } from "../../lib/common/endpoints";
import { postApi } from "../../lib/helperFunctions/fetcher";
// import Link from "next/link";
import { PaystackConfig } from "../../models/utilities";
import ButtonUI from "../utilities/ButtonUI";
import PaystackPaymentButton from "./paystackPayment";

interface EnergyEfficientPropType {
  intiateTrans: PaystackConfig;
  paymentButton: string;
}

const EnergyEfficient: NextPage<EnergyEfficientPropType> = ({
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
  const fetchResult = (values: any) => {
    postApi(CalculateEnergyEfficientUrl, values).then((res) => {
      console.warn(res);
    });
  };

  const onSuccess = (ref: any) => {
    console.warn(formValues, ref);
    const vals = Object.keys(formValues).reduce((acc, curr) => {
      if (formValues[curr]) {
        return { ...acc, [curr]: formValues[curr] };
      }
      return acc;
    }, {});

    console.warn(vals, ref);
    fetchResult({ ...vals, referenceId: ref.reference });
  };

  const cancel = () => {
    console.warn("cancel");
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      onValuesChange={(_, values) => setFormValues(values)}
      autoComplete="off"
    >
      <Divider type="horizontal" />
      <h2 className="my-4 text-base">Number of Stoves</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item className="w-[250px]" label="Number" name="stoveNumber">
          <InputNumber className="w-[100%]" onChange={onChange} />
        </Form.Item>
      </div>
      <Divider type="horizontal" />
      <h2 className="my-4 text-base">Energy Source</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item
          label="Yearly Installation"
          name="yearlyInstallation"
          className="w-[250px]"
        >
          <InputNumber className="w-[100%]" onChange={onChange} />
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

export default EnergyEfficient;
