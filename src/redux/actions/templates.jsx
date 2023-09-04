import { types, API_URL } from "./types";
import Axios from "axios";
import { setNotification } from "./notifications";

export const getTemplates = (data) => {
  const url = `${API_URL}/api/templates/`;

  return (dispatch) => {
    let outputData = {};
    Axios.get(url, { params: data })
      .then(({ data }) => {
        outputData["data"] = data;
        outputData["status"] = 200;
        dispatch(setGetTemplates(outputData));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const setGetTemplates = (data) => ({
  type: types.setGetTemplates,
  payload: data,
});

export const updateTemplate = (params) => {
  const url = `${API_URL}/api/templates/update/`;

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
          message: "El template actualizado correctamente!",
          title: "Update Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setUpdateTemplate(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error actualizando el template!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error actualizando el template!",
          title: "Update Error",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        console.error(err);
      });
  };
};

export const setUpdateTemplate = (data) => ({
  type: types.setUpdateTemplate,
  payload: data,
});

export const createTemplate = (params) => {
  const url = `${API_URL}/api/templates/create/`;

  return (dispatch) => {
    let outputData = {};
    Axios.post(url, params)
      .then((data) => {
        outputData["status"] = data.status;
        outputData["message"] = data.message;
        outputData["data"] = data.data;
        outputData["time"] = new Date();
        let notification = {
          status: "success",
          message: "El template se ha creado correctamente!",
          title: "Creation Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setCreateTemplate(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error creando el template!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error creando el template!",
          title: "Creation Error",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        console.error(err);
      });
  };
};

export const setCreateTemplate = (data) => ({
  type: types.setCreateTemplate,
  payload: data,
});

export const deleteTemplate = (params) => {
  const url = `${API_URL}/api/templates/delete/`;

  return (dispatch) => {
    let outputData = {};
    Axios.delete(url, { data: params })
      .then((data) => {
        outputData["status"] = data.status;
        outputData["message"] = data.message;
        outputData["data"] = data.data;
        outputData["time"] = new Date();
        let notification = {
          status: "success",
          message: "El template se ha eliminado correctamente!",
          title: "Deletion Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setDeleteTemplate(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error eliminando el template!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error eliminando el template!",
          title: "Deletion Error",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        console.error(err);
      });
  };
};

export const setDeleteTemplate = (data) => ({
  type: types.setDeleteTemplate,
  payload: data,
});
