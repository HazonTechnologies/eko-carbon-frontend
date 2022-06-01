import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface ResApi {
  code: number;
  data: any;
  errors: string[];
  message: string;
  successful: boolean;
}

const customAxios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function postApi(
  url: string,
  body: any = null,
  headers: any = {}
): Promise<ResApi> {
  try {
    const res = await customAxios.post(url, body, { headers });
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw err.code;
  }
}
export async function putApi(
  url: string,
  body: any = null,
  headers: any = {}
): Promise<ResApi> {
  try {
    const res = await customAxios.put(url, body, { headers });
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw err.code;
  }
}
export async function deleteApi(
  url: string,
  headers: any = {}
): Promise<ResApi> {
  try {
    const res = await customAxios.delete(url, { headers });
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw err.code;
  }
}

export async function fetcher(url: string): Promise<ResApi> {
  try {
    const res = await customAxios.get(url);
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw err.code;
  }
}

const requestHandler = (request: AxiosRequestConfig<any>) => {
  console.log(request);
  return request;
};

const responseHandler = (response: AxiosResponse<any, any>) => {
  console.log(response);

  if (response.config.method === "get") {
    console.log("It was a get");
  }

  if (response.config.method === "post") {
    console.log("It was a get");
  }
  return response;
};

const updateToken = async () => {
  const res = await postApi("/authorization", { refreshToken: "sjjs" });
  return res.data.token;
};

const errorHandler = (error: any) => {
  if (error.config && error.response && error.response.status === 401) {
    return updateToken()
      .then((token: string) => {
        error.config.headers.token = token;
        return customAxios.request(error.config);
      })
      .catch(() => {
        // go to login page
      });
  }
  console.log(error.config);
  toast.error("Check your internet connection");
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);
customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);
