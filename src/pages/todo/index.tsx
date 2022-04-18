import { Form, Input, Button, Checkbox } from "antd";
import { CiCircleFilled } from "@ant-design/icons";
import Image from "next/image";
// import CustomButton from "../components/utilities/Button";
import imageLoader from "../../lib/helperFunctions/loader";
import { Todo } from "../../models/todo";

import useSwr from "swr";
import DefaultLayout from "../../layouts/defaultLayout";
import { useRouter } from "next/router";
import CustomButton from "../../components/utilities/Button";
import { useLoading } from "../../context/loadingCtx";
import { useEffect } from "react";
import useWithToast from "../../components/main/useWithToast";

const path = "/posts";

const Todos = () => {
    const {setLoadingStatus, loading} = useLoading()
  const goBack = () => {
    setLoadingStatus(!loading)
  };
  const {
    query: { id },
    push,
  } = useRouter();
  const { data, error,isLoading, mutate } = useWithToast(useSwr<Todo[]>(path));

  useEffect(() => {
      console.log(isLoading)
    // if (data) {
    //   console.warn("Yes data");

    //   setLoadingStatus(true);
    // }
  }, [data, isLoading]);

//   if (error) {
//     setLoadingStatus(false);
//     return;
//   }
//   if (!data) {
//     console.warn("no data");
//     setLoadingStatus(true);
//     return;
//   }

  return (
    <>
      {JSON.stringify(loading)}
      <CustomButton htmlType="button" onClickTrigger={goBack}>
        Back
      </CustomButton>
      {JSON.stringify(data)}
    </>
  );
};
Todos.getLayout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;
export default Todos;
