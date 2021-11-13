
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { actions } from "./login";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {

    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    // console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    console.log(error.response?.data);


    if (error.response?.data) {
        if (error.response?.data.message.indexOf('TokenExpiredError') > -1) {
            alert(error.response?.data.message);
            actions.logOut()
        }
    }

    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance) {
    // axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);

}

// export default () => {
//     axios.interceptors.response.use(
//         res => {

//             if (res.data.error) {
//                 util.show({
//                     msg: res.data.error, onClose: () => {
//                         logout()
//                     }
//                 })
//                 return false
//             }
//             return res;
//         },
//         error => {

//             if (error.response.status == '400')
//                 router.push("/");

//             try {
//                 if (error.response.status == '401')
//                     logout(error)
//             } catch (er) {
//                 logout(er)
//             }

//             return error;
//         }
//     );
// }

