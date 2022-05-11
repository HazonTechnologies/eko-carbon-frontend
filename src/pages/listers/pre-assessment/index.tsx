// import { useRouter } from "next/router";
// import { useId, useState } from "react";
// import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListerLayout from "../../../layouts/listerLayout";

const PreAssessment = () => {
  const [home, setHome] = useState("Here is your pre-assessment component");
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setHome("Just Changed the component, YEA!!!");
    }, 2000);
  }, []);

  return (
    <div>
      {home}

      <button type="button" onClick={() => push("/listers")}>
        Go to Listers
      </button>
    </div>
  );
};
PreAssessment.getLayout = (page: any) => <ListerLayout>{page}</ListerLayout>;
export default PreAssessment;
