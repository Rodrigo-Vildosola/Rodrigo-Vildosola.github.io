import { types, API_URL } from "./types";
import Axios from "axios";
import { setNotification } from "./notifications";

export const getClients = (data) =>
{
    const url = `${API_URL}/api/clients/`;

    return (dispatch) =>
    {
        let outputData = {};
        Axios.get(url, { params: data})
            .then(({ data }) =>
            {
                outputData["data"] = data;
                outputData["status"] = 200;
                dispatch(setGetClients(outputData));
            })
    }
}

export const setGetClients = (data) => ({
    type: types.setGetClients,
    payload: data,
});

export const updateClient = (params) =>
{
    const url = `${API_URL}/api/clients/update/`;

    return (dispatch) =>
    {
        let outputData = {};
        Axios.put(url, params)
            .then((data) =>
            {
                outputData["status"] = data.status;
                outputData["message"] = data.message;
                outputData["data"] = data.data;
                outputData["time"] = new Date();
                let notification = { status: "success", message: "Cliente actualizado correctamente!", title: "Actualización exitosa", time: new Date() };
                dispatch(setNotification(notification));
                dispatch(setUpdateClient(outputData));
            })
            .catch((err) =>
            {
                outputData["status"] = "danger";
                outputData["message"] = "Error al actualizar el cliente!";
                outputData["time"] = new Date();
                let notification = {
                    status: "error",
                    message: "Error al actualizar el cliente!",
                    title: "Error de actualización",
                    time: new Date(),
                };
                dispatch(setNotification(notification));
            }
            );
    };
};

export const setUpdateClient = (data) => ({
    type: types.setUpdateClient,
    payload: data,
});

export const createClient = (params) =>
{
    const url = `${API_URL}/api/clients/create/`;

    return (dispatch) =>
    {
        let outputData = {};
        Axios.post(url, params)
            .then((data) =>
            {
                console.log(data)
                outputData["status"] = data.status;
                outputData["message"] = data.message;
                outputData["data"] = data.data;
                outputData["time"] = new Date();
                let notification = { status: "success", message: "Cliente creado correctamente!", title: "Creación exitosa", time: new Date() };

                dispatch(setNotification(notification));
                dispatch(setCreateClient(outputData));
            })
            .catch((err) =>
            {
                outputData["status"] = "danger";
                outputData["message"] = "Error al crear el cliente!";
                outputData["time"] = new Date();
                let notification = { status: "error", message: "Error al crear el cliente!", title: "Error de creación", time: new Date() };
                dispatch(setNotification(notification));
            }
            );
    };
}

export const setCreateClient = (data) => ({
    type: types.setCreateClient,
    payload: data,
});


export const deleteClient = (params) =>
{
    const url = `${API_URL}/api/clients/delete/`;

    return (dispatch) =>
    {
        let outputData = {};
        Axios.delete(url, { params: params })
            .then((data) =>
            {
                outputData["status"] = data.status;
                outputData["message"] = data.message;
                outputData["data"] = data.data;
                outputData["time"] = new Date();

                let notification = { status: "success", message: "Cliente eliminado correctamente!", title: "Eliminación exitosa", time: new Date() };
                dispatch(setNotification(notification));
                dispatch(setDeleteClient(outputData));
            })
            .catch((err) =>
            {
                outputData["status"] = "danger";
                outputData["message"] = "Error al eliminar el cliente!";
                outputData["time"] = new Date();
                let notification = { status: "error", message: "Error al eliminar el cliente!", title: "Error de eliminación", time: new Date() };
                dispatch(setNotification(notification));
            }
            );
    };
}

export const setDeleteClient = (data) => ({
    type: types.setDeleteClient,
    payload: data,
});


export const getFormatsByClient = (data) =>
{
    const url = `${API_URL}/api/clients/${data.uuid}/formats/`;

    return (dispatch) =>
    {
        let outputData = {};
        Axios.get(url, { params: data }).then(({ data }) =>
        {
            outputData["data"] = data;
            outputData["status"] = 200;
            dispatch(setGetFormatsByClient(outputData));
        })
    }
}


export const setGetFormatsByClient = (data) => ({
    type: types.setGetFormatsByClient,
    payload: data,
});

export const createFormat = (params) =>
{
    const url = `${API_URL}/api/clients/formats/create/`;

    return (dispatch) =>
    {
        let outputData = {};
        Axios.post(url, params)
            .then((data) =>
            {
                console.log(data)
                outputData["status"] = data.status;
                outputData["message"] = data.message;
                outputData["data"] = data.data;
                outputData["time"] = new Date();
                let notification = { status: "success", message: "Formato creado correctamente!", title: "Creación exitosa", time: new Date() };

                dispatch(setNotification(notification));
                dispatch(setCreateFormat(outputData));
            })
            .catch((err) =>
            {
                outputData["status"] = "danger";
                outputData["message"] = "Error al crear el formato!";
                outputData["time"] = new Date();
                let notification = { status: "error", message: "Error al crear el formato!", title: "Error de creación", time: new Date() };
                dispatch(setNotification(notification));
            }
            );
    };
}

export const setCreateFormat = (data) => ({
    type: types.setCreateFormat,
    payload: data,
});

export const updateFormat = (params) =>
{
    const url = `${API_URL}/api/clients/formats/update/`;

    return (dispatch) =>
    {
        let outputData = {};
        Axios.put(url, params)
            .then((data) =>
            {
                outputData["status"] = data.status;
                outputData["message"] = data.message;
                outputData["data"] = data.data;
                outputData["time"] = new Date();
                let notification = { status: "success", message: "Formato actualizado correctamente!", title: "Actualización exitosa", time: new Date() };
                dispatch(setNotification(notification));
                dispatch(setUpdateFormat(outputData));
            })
            .catch((err) =>
            {
                outputData["status"] = "danger";
                outputData["message"] = "Error al actualizar el formato!";
                outputData["time"] = new Date();
                let notification = {
                    status: "error",
                    message: "Error al actualizar el formato!",
                    title: "Error de actualización",
                    time: new Date(),
                };
                dispatch(setNotification(notification));
            }
            );
    };
}

export const setUpdateFormat = (data) => ({
    type: types.setUpdateFormat,
    payload: data,
});

export const deleteFormat = (params) =>
{
    const url = `${API_URL}/api/clients/formats/delete/`;

    return (dispatch) =>
    {
        let outputData = {};
        Axios.delete(url, { params: params })
            .then((data) =>
            {
                outputData["status"] = data.status;
                outputData["message"] = data.message;
                outputData["data"] = data.data;
                outputData["time"] = new Date();

                let notification = { status: "success", message: "Formato eliminado correctamente!", title: "Eliminación exitosa", time: new Date() };
                dispatch(setNotification(notification));
                dispatch(setDeleteFormat(outputData));
            })
            .catch((err) =>
            {
                outputData["status"] = "danger";
                outputData["message"] = "Error al eliminar el formato!";
                outputData["time"] = new Date();
                let notification = { status: "error", message: "Error al eliminar el formato!", title: "Error de eliminación", time: new Date() };
                dispatch(setNotification(notification));
            }
            );
    };
}

export const setDeleteFormat = (data) => ({
    type: types.setDeleteFormat,
    payload: data,
});
