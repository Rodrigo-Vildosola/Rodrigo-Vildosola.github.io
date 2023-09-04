import { types, API_URL } from "./types";
import Axios from "axios";
import { setNotification } from "./notifications";



export const getQuestions = (data) =>
{
  const url = `${API_URL}/api/questions/`;

  return (dispatch) =>
  {
    let outputData = {};
    Axios.get(url, { params: data })
      .then(({ data }) =>
      {
        outputData["data"] = data;
        outputData["status"] = 200;
        dispatch(setGetQuestions(outputData));
      })
      .catch((err) =>
      {
        console.error(err);
      });
  };
};

export const setGetQuestions = (data) => ({
  type: types.setGetQuestions,
  payload: data,
});

export const updateQuestion = (params) =>
{
  const url = `${API_URL}/api/questions/update/`;

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
          message: "La pregunta actualizado correctamente!",
          title: "Update Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setUpdateQuestion(outputData));
      })
      .catch((err) =>
      {
        outputData["status"] = "danger";
        outputData["message"] = "Error actualizando el La pregunta!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error actualizando el La pregunta!",
          title: "Update Error",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        // Handle error
        console.error(err);
      });
  };
};

export const setUpdateQuestion = (data) => ({
  type: types.setUpdateQuestion,
  payload: data,
});

export const createQuestion = (params) =>
{
  const url = `${API_URL}/api/questions/create/`;

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
          message: "La pregunta se ha creado correctamente!",
          title: "Creation Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setCreateQuestion(outputData));
      })
      .catch((err) =>
      {
        outputData["status"] = "danger";
        outputData["message"] = "Error creando La pregunta!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error creando La pregunta!",
          title: "Creation Error",
          time: new Date(),
        };
        console.log(err);
        dispatch(setNotification(notification));
      });
  };
};

export const setCreateQuestion = (data) => ({
  type: types.setCreateQuestion,
  payload: data,
});

export const deleteQuestion = (params) =>
{
  const url = `${API_URL}/api/questions/delete/`;

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
          message: "La pregunta se ha eliminado correctamente!",
          title: "Deletion Successful",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        dispatch(setDeleteQuestion(outputData));
      })
      .catch((err) =>
      {
        outputData["status"] = "danger";
        outputData["message"] = "Error eliminando La pregunta!";
        outputData["time"] = new Date();
        let notification = {
          status: "error",
          message: "Error eliminando La pregunta!",
          title: "Deletion Error",
          time: new Date(),
        };
        dispatch(setNotification(notification));
        console.error(err);
      });
  };
};

export const setDeleteQuestion = (data) => ({
  type: types.setDeleteQuestion,
  payload: data,
});


