import { types, API_URL } from "./types";
import Axios from "axios";
import { setNotification } from "./notifications";

export const signIn = (params) =>
{
    const url = `${API_URL}/api/token/`;

    return (dispatch) =>
    {
        let outputData = {};

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(response => response.json())
            .then((data) =>
            {
                if (data.error)
                {
                    outputData["token"] = false;
                    outputData["status"] = "danger";
                    outputData["message"] = "Usuario o clave incorrecta!";
                    let notification = { status: "error", message: "Usuario o clave incorrecta!", title: "Error de credenciales" };
                    dispatch(setNotification(notification));
                    dispatch(setSignIn(outputData));
                    return
                }
                localStorage.setItem("access-token", data["access"]);
                localStorage.setItem("refresh-token", data["refresh"]);
                //localStorage.setItem("role", data["role"]);
                outputData["token"] = data["access"];
                outputData["status"] = data.status;
                outputData["message"] = data.message;
                dispatch(setSignIn(outputData));
            })
            .catch((err) =>
            {

                if (err.request)
                {
                    outputData["token"] = false;
                    outputData["status"] = "danger";
                    outputData["message"] = "Usuario o clave incorrecta!";
                    let notification = { status: "error", message: "Usuario o clave incorrecta!", title: "Error de credenciales" };
                    dispatch(setNotification(notification));
                    dispatch(setSignIn(outputData));
                }
            });
    };
};

export const logout = () =>
{
    const url = `${API_URL}/api/logout/blacklist/`;

    return (dispatch) =>
    {
        let outputData = {};
        let params = {
            refresh_token: localStorage.getItem("refresh-token"),
        };
        Axios.post(url, params)
            .then(({ data }) =>
            {
                localStorage.setItem("access-token", null);
                localStorage.setItem("refresh-token", null);
                outputData["status"] = data.status;
                outputData["message"] = data.message;
                dispatch(setSignOut(outputData));
            })
            .catch((err) =>
            {

                localStorage.setItem("access-token", null);
                localStorage.setItem("refresh-token", null);
                outputData["logout"] = true;
                outputData["status"] = "danger";
                outputData["message"] = "Usuario o clave incorrecta!";


            });
    };
};

export const setSignIn = (data) => ({
    type: types.setSignIn,
    payload: data,
});

export const setSignOut = (data) => ({
    type: types.signOut,
    payload: data,
});

export const authCheckState = () =>
{
    return (dispatch) =>
    {
        const token = localStorage.getItem("access-token");
        if (!token)
        {
            //dispatch(logout());
        }
        dispatch(setSignIn({ token: token }));
    };
};


export const changePassword = (d) =>
{
    const url = `${API_URL}/users/change-password/`;
    return (dispatch) =>
    {
        let outputData = {};
        Axios.put(url, d).then(({ data }) =>
        {
            outputData["data"] = data;
            outputData["status"] = 200;
            dispatch(setChangePassword(outputData));
            let notification = { status: "success", message: "La contraseña ha sido actualizada con éxito!", title: "Contraseña cambiada" };
            dispatch(setNotification(notification));
        })
    }
}

export const setChangePassword = (data) => ({
    type: types.setChangePassword,
    payload: data,
});


export const resetPassword = (d) =>
{
    const url = `${API_URL}/users/password-reset/`;
    return (dispatch) =>
    {
        let outputData = {};
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(d)
        }).then(({ data }) =>
        {
            outputData["data"] = data;
            outputData["status"] = 200;
            dispatch(setResetPassword(outputData));
            let notification = { status: "success", message: "Se a ingreado la solicitud", title: "Solicitud ingresada" };
            dispatch(setNotification(notification));
        })
    }
}

export const setResetPassword = (data) => ({
    type: types.setResetPassword,
    payload: data,
});


export const resetPasswordConfirm = (uuid, token, d) =>
{
    const url = `${API_URL}/users/password-change/${uuid}/${token}`;
    return (dispatch) =>
    {
        let outputData = {};
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(d)
        }).then(response => response.json())
            .then(data => 
            {
                console.log(data.errors)
                if (data.errors)
                {
                    outputData["data"] = data.errors;
                    outputData["status"] = 400;
                    let notification = { status: "error", message: data.errors.password.map((e) => e + ","), title: "Error" };
                    dispatch(setNotification(notification));
                }
                else
                {
                    outputData["data"] = data;
                    outputData["status"] = 200;
                    dispatch(setResetPasswordConfirm(outputData));
                    let notification = { status: "success", message: "La contraseña ha sido actualizada con éxito!", title: "Contraseña cambiada" };
                    dispatch(setNotification(notification));
                }

            }

            )
            .catch(error =>
            {

            }
            );
    }
}

export const setResetPasswordConfirm = (data) => ({
    type: types.setResetPasswordConfirm,
    payload: data,
});


export const editPermissions = (d) =>
{
    const url = `${API_URL}/users/edit-permissions/`;
    return (dispatch) =>
    {
        let outputData = {};
        Axios.post(url, d).then(({ data }) =>
        {
            outputData["data"] = data;
            outputData["status"] = 200;
            dispatch(setEditPermissions(outputData));
            let notification = { status: "success", message: "Los permisos han sido actualizados con éxito!", title: "Permisos actualizados" };
            dispatch(setNotification(notification));
        })
    }
}

export const setEditPermissions = (data) => ({
    type: types.setEditPermissions,
    payload: data,
});