import { getToken } from "core/auth/handlerJWT";
import axios from "axios";
import { func } from "prop-types";

export function configInterceptor(){
    axios.interceptors.request.use(
        function (config){
            const token =  getToken();
            if(token){
                config.headers.Authorization = `bearer ${token}`;
            }
            return config
        },
        function (error){
            return Promise.reject(error);
        }
    )
}