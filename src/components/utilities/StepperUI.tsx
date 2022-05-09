/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
import { CheckCircleOutlined } from "@ant-design/icons";
import { Steps, Popover } from "antd";

const { Step } = Steps;

const customDot = (
  dot: any,
  { status, index }: { status: any; index: any }
) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
    className="text-tertiary-high"
  >
    {status === "finish" && <CheckCircleOutlined className="step-done" />}
    {status !== "finish" && (
      <span className="text-tertiary-high bg-tertiary-high">{dot}</span>
    )}
  </Popover>
);

export default () => (
  <Steps
    progressDot={customDot}
    size="small"
    current={2}
    className="text-tertiary-high w-[80vw]"
  >
    <Step
      title="Bank Information"
      description="Please provide your account information"
    />
    <Step
      title="Business Information"
      description="A few details about your company"
    />
    <Step
      title="Business Representative Documentation"
      description="Onboard management from your team"
    />
  </Steps>
);
