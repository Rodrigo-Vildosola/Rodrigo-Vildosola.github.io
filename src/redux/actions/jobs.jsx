import { types, API_URL } from "./types";
import Axios from "axios";
import { setNotification } from "./notifications";



// MOST IMPORTANT ACTION

export const getJob = (data) =>
{
    const url = `${API_URL}/api/play/`;

    return (dispatch) =>
    {
        let outputData = {};
        Axios.get(url, { params: data })
        .then(({ data }) =>
            {   
                outputData["data"] = data;
                outputData["status"] = 200;
                dispatch(setGetJob(outputData));
            })
        .catch((err) =>
        {
            outputData["status"] = "danger";
            outputData["message"] = "Error creando la tarea!";
            outputData["time"] = new Date();
            let notification = {
                status: "danger",
                message: "Error creando la tarea!",
                title: "Get Failed",
                time: new Date(),
            };
            dispatch(setNotification(notification));
            console.error(err);
        });
    }
};

export const setGetJob = (data) => ({
    type: types.setGetJob,
    payload: data,
});


export const updateUserRating = (params) =>
{
    const url = `${API_URL}/api/users/ratings/update/`;

    return (dispatch) =>
    {
        let outputData = {};
        Axios.post(url, params)
        .then(({ data }) =>
        {
            outputData["data"] = data;
            outputData["status"] = 200;
            let notification = {
                status: "info",
                message: "Ratings del usuario actualizados!",
                title: "Wavelearn",
                time: new Date(),
            };
            dispatch(setNotification(notification));
            dispatch(setUpdateUserRating(outputData));
            localStorage.setItem("profile", JSON.stringify(data));
        })
        .catch((err) =>
        {
            outputData["status"] = "danger";
            outputData["message"] = "Error actualizando ratings del usuario!";
            outputData["time"] = new Date();
            let notification = {
                status: "danger",
                message: "Error actualizando ratings del usuario!",
                title: "Get Failed",
                time: new Date(),
            };
            dispatch(setNotification(notification));
            console.error(err);
        });

    }
};


export const setUpdateUserRating = (data) => ({
    type: types.setUpdateUserRating,
    payload: data,
});
