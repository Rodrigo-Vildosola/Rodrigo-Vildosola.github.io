import { types, API_URL } from "./types";
import Axios from "axios";
import { setNotification } from "./notifications";

export const getProjects = () => {
  const url = `${API_URL}/api/clients/formats/projects/`;
  
  return (dispatch) => {
    let outputData = {};
    Axios.get(url).then(({ data }) => {
      outputData["data"] = data;
      outputData["status"] = 200;
      dispatch(setGetProjects(outputData));
    });
  };
};

export const setGetProjects = (data) => ({
  type: types.setGetProjects,
  payload: data,
});


export const createProject = (params) => {
  const url = `${API_URL}/api/clients/formats/projects/create/`;

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
          message: "Proyecto creado correctamente!",
          title: "Creación exitosa",
          time: new Date(),
        };

        dispatch(setNotification(notification));
        dispatch(setCreateProject(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error al crear el proyecto!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error al crear el proyecto!",
          title: "Error de creación",
          time: new Date(),
        };
        dispatch(setNotification(notification));
      });
  };
};

export const setCreateProject = (data) => ({
  type: types.setCreateProject,
  payload: data,
});


export const updateProject = (params) => {
  const url = `${API_URL}/api/clients/formats/projects/update/`;

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
          message: "Proyecto actualizado correctamente!",
          title: "Actualización exitosa",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setUpdateProject(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error al actualizar el proyecto!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error al actualizar el proyecto!",
          title: "Error de actualización",
          time: new Date(),
        };
        dispatch(setNotification(notification));
      });
  };
};

export const setUpdateProject = (data) => ({
  type: types.setUpdateProject,
  payload: data,
});


export const deleteProject = (params) => {
  const url = `${API_URL}/api/clients/formats/projects/delete/`;

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
          message: "Proyecto eliminado correctamente!",
          title: "Eliminación exitosa",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setDeleteProject(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error al eliminar el proyecto!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error al eliminar el proyecto!",
          title: "Error de eliminación",
          time: new Date(),
        };
        dispatch(setNotification(notification));
      });
  };
};

export const setDeleteProject = (data) => ({
  type: types.setDeleteProject,
  payload: data,
});
