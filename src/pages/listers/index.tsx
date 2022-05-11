// import { useRouter } from "next/router";
// import { useId, useState } from "react";
// import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListerLayout from "../../layouts/listerLayout";

const ListerHome = () => {
  const [home, setHome] = useState("Here is your home compoent");
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setHome("Just Changed the component, YEA!!!");
    }, 2000);
  }, []);

  return (
    <div className="mt-10">
      {home}
      <button type="button" onClick={() => push("listers/pre-assessment")}>
        Go to pre-assesment
      </button>
    </div>
  );
};
ListerHome.getLayout = (page: any) => <ListerLayout>{page}</ListerLayout>;
export default ListerHome;
