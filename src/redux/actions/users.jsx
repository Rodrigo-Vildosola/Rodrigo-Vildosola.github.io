import { types, API_URL } from "./types";
import Axios from "axios";
import { setNotification } from "./notifications";


export const getUsers = () => {
  const url = `${API_URL}/api/users/`;

  return (dispatch) => {
    let outputData = {};
    Axios.get(url)
      .then(({ data }) => {
        outputData["data"] = data;
        outputData["status"] = 200;
        dispatch(setGetUsers(outputData));
      })
      .catch((err) => {
        // Handle error
        console.error(err);
      });
  };
};

export const setGetUsers = (data) => ({
  type: types.setGetUsers,
  payload: data,
});

export const updateUser = (params) => {
  const url = `${API_URL}/api/users/update/`;

  return (dispatch) => {
    let outputData = {};
    Axios.put(url, params)
      .then((data) => {
        outputData["status"] = data.status;
        outputData["message"] = data.message;
        outputData["data"] = data.data;
        outputData["time"] = new Date();
        let notification = {
          status: "success",
          message: "User updated successfully!",
          title: "Update Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setUpdateUser(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error updating the user!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error updating the user!",
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

export const createUser = (params) => {
  const url = `${API_URL}/api/users/create/`;

  return (dispatch) => {
    let outputData = {};
    Axios.post(url, params)
      .then((data) => {
        console.log(data);
        outputData["status"] = data.status;
        outputData["message"] = data.message;
        outputData["data"] = data.data;
        outputData["time"] = new Date();
        let notification = {
          status: "success",
          message: "User created successfully!",
          title: "Creation Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setCreateUser(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error creating the user!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error creating the user!",
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

export const deleteUser = (params) => {
  const url = `${API_URL}/api/users/delete/`;

  return (dispatch) => {
    let outputData = {};
    Axios.delete(url, { params: params })
      .then((data) => {
        outputData["status"] = data.status;
        outputData["message"] = data.message;
        outputData["data"] = data.data;
        outputData["time"] = new Date();
        let notification = {
          status: "success",
          message: "User deleted successfully!",
          title: "Deletion Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setDeleteUser(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error deleting the user!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error deleting the user!",
          title: "Deletion Error",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        // Handle error
        console.error(err);
      });
  };
};

export const setDeleteUser = (data) => ({
  type: types.setDeleteUser,
  payload: data,
});
