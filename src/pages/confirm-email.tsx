import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import DefaultLayout from "../layouts/defaultLayout";
import { fetcher } from "../lib/helperFunctions/fetcher";

interface QueryType {
  code: string;
  userId: string;
}

const ConfirmEmail = () => {
  const router = useRouter();

  const confirmAccount = (query: QueryType) => {
    router.push("/login");
    fetcher(
      `Account/confirm-email?userId=${query.userId}&code=${query.code}`
    ).then((res) => {
      if (!res.successful) return;
      toast.success(res.message);
    });
  };

  useEffect(() => {
    const query: any = { ...router.query };
    if (query.code) {
      confirmAccount(query);
    } else {
      router.push("/login");
    }
  }, [router]);

  return undefined;
};
ConfirmEmail.getLayout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;
export default ConfirmEmail;
