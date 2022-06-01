import { Divider, Form, InputNumber } from "antd";
import { NextPage } from "next";
// import Link from "next/link";
import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";

interface EnergyEfficientPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: User) => void;
  // eslint-disable-next-line no-unused-vars
  onError: (param: any) => void;
}

const EnergyEfficient: NextPage<EnergyEfficientPropType> = ({
  onSubmit,
  onError,
}) => {
  const onChange = (val: any) => {
    console.log(val);
  };

  const cancel = () => {
    console.warn("cancel");
  };

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
      <h2 className="my-4 text-base">Number of Stoves</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item
          className="w-[250px]"
          label="Number"
          name="number"
        >
          <InputNumber
            className="w-[100%]"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          label="Briquette"
          name="briquette"
          className="w-[250px]"
        >
          <InputNumber
            className="w-[100%]"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          label="Dunghorse"
          name="dunghorse"
          className="w-[250px]"
        >
          <InputNumber
            className="w-[100%]"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          label="Risehusk"
          name="risehusk"
          className="w-[250px]"
        >
          <InputNumber
            className="w-[100%]"
            onChange={onChange}
          />
        </Form.Item>
      </div>
      <Divider type="horizontal" />
      <h2 className="my-4 text-base">Energy Source</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item
          label="Dropbox"
          name="capacity"
          className="w-[250px]"
        >
          <InputNumber
            className="w-[100%]"
            onChange={onChange}
          />
        </Form.Item>
      </div>
      <Divider type="horizontal" />
      <h2 className="my-4 text-base">Number of HH</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item
          label="Number"
          name="numberHH"
          className="w-[250px]"
        >
          <InputNumber className="w-[100%]" onChange={onChange} />
        </Form.Item>
        <Form.Item label="Dropbox" name="dropbox" className="w-[250px]">
          <InputNumber
            className="w-[100%]"
            onChange={onChange}
          />
        </Form.Item>
      </div>
      <Divider type="horizontal" />
      <h2 className="my-4 text-base">Business as Usual</h2>
      <div className="flex justify-between flex-wrap">
        <Form.Item
          label="Source of Energy"
          name="sourceOfEnergy"
          className="w-[250px]"
        >
          <InputNumber className="w-[100%]" onChange={onChange} />
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

export default EnergyEfficient;
