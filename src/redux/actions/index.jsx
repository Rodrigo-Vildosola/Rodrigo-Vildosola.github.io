import Axios from "axios";
import { types, API_URL } from "./types";


Axios.interceptors.request.use(function (config)
{
    if (config.url !== `${API_URL}/api/token/`) {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers["Authorization"] = `Token ${token}`;
        }
    }
    return config;
});

Axios.interceptors.response.use(undefined, (err) =>
{
    const error = err.response;
    // if error is 401
    if (error)
    {
        if (error.status === 401 && error.config && !error.config.__isRetryRequest)
        {
            if (err.response.data.detail === "No active account found with the given credentials")
            {
                return Promise.reject(err);
            }
            else if (err.response.data.code === "token_not_valid")
            {
                console.log("Token not valid");
                localStorage.removeItem("access-token");
                //window.location.reload();
            }
            else
            {   console.log("Token not valid 2", err.response.data);
                localStorage.removeItem("access-token");
                //window.location.reload();
            }
        }
        return Promise.reject(error);
    }
});
