import Axios from "axios";


Axios.interceptors.request.use(function (config)
{
    const token = localStorage.getItem("access-token");
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
});

Axios.interceptors.response.use(undefined, (err) =>
{
    const error = err.response;
    return
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
                localStorage.removeItem("access-token");
                localStorage.removeItem("refresh-token");
                localStorage.removeItem("profile");
                window.location.reload();
            }
            else
            {
                localStorage.removeItem("access-token");
                localStorage.removeItem("refresh-token");
                localStorage.removeItem("profile");
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
});