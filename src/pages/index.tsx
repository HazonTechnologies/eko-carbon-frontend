import { Form, Input, Button, Checkbox } from "antd";
import { CiCircleFilled } from "@ant-design/icons";
import Image from "next/image";
import CustomButton from "../components/utilities/Button";
import imageLoader from "../lib/helperFunctions/loader";
import { useLoading } from "../context/loadingCtx";


export default function Home() {

  const {loading, setLoadingStatus} = useLoading();

  const toggle = ()=>{
    setLoadingStatus(!loading)
  }
    return (
      <>
        {JSON.stringify(loading)}
        <div>
          Hello World
        </div>
        <button onClick={toggle} >Hello</button>
      </>
  );
}
