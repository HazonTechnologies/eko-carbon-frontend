/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { Divider, Form, InputNumber } from "antd";
import { NextPage } from "next";
import { useState } from "react";
import { CalculateRecyclable } from "../../lib/common/endpoints";
import { postApi } from "../../lib/helperFunctions/fetcher";
import { PaystackConfig } from "../../models/utilities";
// import Link from "next/link";
import ButtonUI from "../utilities/ButtonUI";
import PaystackPaymentButton from "./paystackPayment";

interface RecyclePreAssessmentPropType {
  // eslint-disable-next-line no-unused-vars
  intiateTrans: PaystackConfig;
  paymentButton: string;
}

const RecyclePreAssessment: NextPage<RecyclePreAssessmentPropType> = ({
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
    postApi(CalculateRecyclable, values).then((res) => {
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
    <>
      <Divider type="horizontal" />

      <Form
        name="basic"
        layout="vertical"
        onValuesChange={(_, values) => setFormValues(values)}
        autoComplete="off"
      >
        <div className="flex justify-between flex-wrap">
          <Form.Item className="w-[250px]" label="Books (kg)" name="books">
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            label="Cardboards (kg)"
            name="cardboards"
            className="w-[250px]"
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
          <Form.Item
            label="Magazines (kg)"
            name="magazines"
            className="w-[250px]"
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
          <Form.Item
            label="Newspapers (kg)"
            name="newspapers"
            className="w-[250px]"
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
          <Form.Item
            label="Plastics ADPE (kg)"
            name="plasticsADPE"
            className="w-[250px]"
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
          <Form.Item
            label="Plastics LDPE (kg)"
            name="plasticsLDE"
            className="w-[250px]"
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
          <Form.Item
            label="Plastics PVE (kg)"
            name="plasticsPVE"
            className="w-[250px]"
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
          <Form.Item
            label="Metal Scraps (kg)"
            name="metalScraps"
            className="w-[250px]"
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
          <Form.Item
            label="Metal Mixed Cans (kg)"
            name="metalMixedCans"
            className="w-[250px]"
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
          <Form.Item
            label="Electromagnetic Waste (kg)"
            name="electromagneticWaste"
            className="w-[250px]"
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
          <Form.Item label="Glass (kg)" name="glass" className="w-[250px]">
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
    </>
  );
};

export default RecyclePreAssessment;
