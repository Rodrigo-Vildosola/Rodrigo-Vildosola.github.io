import { types, API_URL } from "./types";
import Axios from "axios";
import { setNotification } from "./notifications";


export const getUsers = (data) =>
{
  const url = `${API_URL}/api/users/`;

  return (dispatch) =>
  {
    let outputData = {};
    Axios.get(url, { params: data })
      .then(({ data }) =>
      {
        outputData["data"] = data;
        outputData["status"] = 200;
        dispatch(setGetUsers(outputData));
      })
      .catch((err) =>
      {
        console.error(err);
      });
  };
};

export const setGetUsers = (data) => ({
  type: types.setGetUsers,
  payload: data,
});

export const updateUser = (params) =>
{
  const url = `${API_URL}/api/users/update/`;

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
        let notification = {
          status: "success",
          message: "Usuario actualizado correctamente!",
          title: "Update Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setUpdateUser(outputData));
      })
      .catch((err) =>
      {
        outputData["status"] = "danger";
        outputData["message"] = "Error actualizando el usuario!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error actualizando el usuario!",
          title: "Update Error",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        // Handle error
        console.error(err);
      });
  };
};

export const setUpdateUser = (data) => ({
  type: types.setUpdateUser,
  payload: data,
});

export const createUser = (params) =>
{
  const url = `${API_URL}/api/users/create/`;

  return (dispatch) =>
  {
    let outputData = {};
    Axios.post(url, params)
      .then((data) =>
      {
        outputData["status"] = data.status;
        outputData["message"] = data.message;
        outputData["data"] = data.data;
        outputData["time"] = new Date();
        let notification = {
          status: "success",
          message: "Usuario creado correctamente!",
          title: "Creation Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setCreateUser(outputData));
      })
      .catch((err) =>
      {
        outputData["status"] = "danger";
        outputData["message"] = "Error creando usuario!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error creando usuario!",
          title: "Creation Error",
          time: new Date(),
        };
        console.log(err);
        dispatch(setNotification(notification));
      });
  };
};

export const setCreateUser = (data) => ({
  type: types.setCreateUser,
  payload: data,
});

export const deleteUser = (params) =>
{
  const url = `${API_URL}/api/users/deactivate/`;
  console.log(params);

  return (dispatch) =>
  {
    let outputData = {};
    Axios.delete(url, { data: params })
      .then((data) =>
      {
        outputData["status"] = data.status;
        outputData["message"] = data.message;
        outputData["data"] = data.data;
        outputData["time"] = new Date();
        let notification = {
          status: "success",
          message: "Usuario eliminado correctamente!",
          title: "Deletion Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setDeleteUser(outputData));
      })
      .catch((err) =>
      {
        outputData["status"] = "danger";
        outputData["message"] = "Error eliminando el usuario!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error eliminando el usuario!",
          title: "Deletion Error",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        console.error(err);
      });
  };
};

export const setDeleteUser = (data) => ({
  type: types.setDeleteUser,
  payload: data,
});


export const getRatingsProgress = (data) => 
{
  const { user_email, ...params } = data;
  const url = `${API_URL}/api/users/ratings/${user_email}/`;

  return (dispatch) =>
  {
    let outputData = {};
    Axios.get(url, { params: params })
      .then(({ data }) =>
      {
        outputData["data"] = data;
        outputData["status"] = 200;
        dispatch(setGetRatingsProgress(outputData));
      })
      .catch((err) =>
      {
        console.error(err);
      });
  };
};

export const setGetRatingsProgress = (data) => ({
  type: types.setGetRatingsProgress,
  payload: data,
});





