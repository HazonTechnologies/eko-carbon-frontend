/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { Divider, Form, InputNumber } from "antd";
import { NextPage } from "next";
// import Link from "next/link";
import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";

interface RecyclePreAssessmentPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: User) => void;
  // eslint-disable-next-line no-unused-vars
  onError: (param: any) => void;
}

const RecyclePreAssessment: NextPage<RecyclePreAssessmentPropType> = ({
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
    <>
      <Divider type="horizontal" />

      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <div className="flex justify-between flex-wrap">
          <Form.Item
            className="w-[250px]"
            label="Books (kg)"
            name="books"
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
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
            label="Cardboards (kg)"
            name="cardboards"
            className="w-[250px]"
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
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
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
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
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
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
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
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
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
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
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
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
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
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
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
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
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
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
            label="Glass (kg)"
            name="glass"
            className="w-[250px]"
            rules={[
              { required: true, message: "Kindly input your email address!" },
            ]}
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
        <Form.Item className="mt-10 text-right gap-x-8">
          <ButtonUI
            onClickTrigger={cancel}
            disabled={false}
            htmlType="button"
            className="!sm:px-10 px-10 border border-primary-mid !text-primary-high !bg-secondary-high mr-2 "
          >
            Cancel
          </ButtonUI>
          <ButtonUI
            disabled={false}
            htmlType="submit"
            className="!sm:px-10 px-7"
          >
            Pay $50 to calculate
          </ButtonUI>
        </Form.Item>
      </Form>
    </>
  );
};

export default RecyclePreAssessment;
