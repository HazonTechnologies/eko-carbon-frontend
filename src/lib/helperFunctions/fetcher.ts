import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";


const customAxios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})



const requestHandler = (request:AxiosRequestConfig<any>) => {
    

    console.log(request)
    return request
}


const responseHandler = (response:AxiosResponse<any, any>) => {
    console.log(response)
    return response
}

const errorHandler = (error:any)=>{
    return Promise.reject(error)
}


customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
)
customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
)

export default async function fetcher(url: string) {
   
   try {
    const res = await customAxios.get(url);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
}
