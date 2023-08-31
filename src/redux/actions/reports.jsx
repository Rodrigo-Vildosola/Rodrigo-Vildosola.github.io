import { types, API_URL } from "./types";
import Axios from "axios";
import { setNotification } from "./notifications";

export const getReports = (d) => {
  const url = `${API_URL}/api/clients/reports/`;

  return (dispatch) => {
    let outputData = {};
    Axios.get(url, { params: d }).then(({ data }) => {
      outputData["data"] = data;
      outputData["status"] = 200;
      dispatch(setGetReports(outputData));
    });
  };
};

export const setGetReports = (data) => ({
  type: types.setGetReports,
  payload: data,
});

export const createReport = (params) => {
  const url = `${API_URL}/api/clients/reports/create/`;

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
          message: "Reporte creado correctamente!",
          title: "Creación exitosa",
          time: new Date(),
        };

        dispatch(setNotification(notification));
        dispatch(setCreateReport(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error al crear el reporte!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error al crear el reporte!",
          title: "Error de creación",
          time: new Date(),
        };
        dispatch(setNotification(notification));
      });
  };
};

export const setCreateReport = (data) => ({
  type: types.setCreateReport,
  payload: data,
});

export const updateReport = (params) => {
  const url = `${API_URL}/api/clients/reports/update/`;

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
          message: "Reporte actualizado correctamente!",
          title: "Actualización exitosa",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setUpdateReport(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error al actualizar el reporte!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error al actualizar el reporte!",
          title: "Error de actualización",
          time: new Date(),
        };
        dispatch(setNotification(notification));
      });
  };
};

export const setUpdateReport = (data) => ({
  type: types.setUpdateReport,
  payload: data,
});

export const deleteReport = (params) => {
  const url = `${API_URL}/api/clients/reports/delete/`;

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
          message: "Reporte eliminado correctamente!",
          title: "Eliminación exitosa",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setDeleteReport(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error al eliminar el reporte!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error al eliminar el reporte!",
          title: "Error de eliminación",
          time: new Date(),
        };
        dispatch(setNotification(notification));
      });
  };
};

export const setDeleteReport = (data) => ({
  type: types.setDeleteReport,
  payload: data,
});
