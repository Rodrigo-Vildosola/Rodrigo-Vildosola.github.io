import { types, API_URL } from "./types";
import Axios from "axios";
import { setNotification } from "./notifications";

// Get Records
export const getRecords = () => {
  const url = `${API_URL}/api/records/`;
  
  return (dispatch) => {
    let outputData = {};
    Axios.get(url).then(({ data }) => {
      outputData["data"] = data;
      outputData["status"] = 200;
      dispatch(setGetRecords(outputData));
    });
  };
};

export const setGetRecords = (data) => ({
  type: types.setGetRecords,
  payload: data,
});


// Create Record
export const createRecord = (params) => {
  const url = `${API_URL}/api/records/create/`;

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
          message: "Registro creado correctamente!",
          title: "Creación exitosa",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setCreateRecord(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error al crear el registro!";
        outputData["time"] = new Date();
        
        let notification = {
          status: "error",
          message: "Error al crear el registro!",
          title: "Error de creación",
          time: new Date(),
        };
        dispatch(setNotification(notification));
      });
  };
};

export const setCreateRecord = (data) => ({
  type: types.setCreateRecord,
  payload: data,
});


// Update Record
export const updateRecord = (params) => {
  const url = `${API_URL}/api/records/update/`;

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
          message: "Registro actualizado correctamente!",
          title: "Actualización exitosa",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setUpdateRecord(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error al actualizar el registro!";
        outputData["time"] = new Date();
        
        let notification = {
          status: "error",
          message: "Error al actualizar el registro!",
          title: "Error de actualización",
          time: new Date(),
        };
        dispatch(setNotification(notification));
      });
  };
};

export const setUpdateRecord = (data) => ({
  type: types.setUpdateRecord,
  payload: data,
});


// Delete Record
export const deleteRecord = (params) => {
  const url = `${API_URL}/api/records/delete/`;

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
          message: "Registro eliminado correctamente!",
          title: "Eliminación exitosa",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setDeleteRecord(outputData));
      })
      .catch((err) => {
        outputData["status"] = "danger";
        outputData["message"] = "Error al eliminar el registro!";
        outputData["time"] = new Date();
        
        let notification = {
          status: "error",
          message: "Error al eliminar el registro!",
          title: "Error de eliminación",
          time: new Date(),
        };
        dispatch(setNotification(notification));
      });
  };
};

export const setDeleteRecord = (data) => ({
  type: types.setDeleteRecord,
  payload: data,
});
