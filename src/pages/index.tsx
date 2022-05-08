import { useLoading } from "../context/loadingCtx";

export default function Home() {
  const { loading, setLoadingStatus } = useLoading();

  const toggle = () => {
    setLoadingStatus(!loading);
  };
  return (
    <>
      {JSON.stringify(loading)}
      <div>Hello World</div>
      <button type="button" onClick={toggle}>Hello</button>
    </>
  );
}
