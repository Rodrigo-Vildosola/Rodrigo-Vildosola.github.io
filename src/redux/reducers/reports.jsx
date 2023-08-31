import { types } from "../actions/types";

export const reportsReducer = (
  state = {
    getReports: {},
    createReport: {},
    updateReport: {},
    deleteReport: {},
    getElements: {},
    createElements: {},
  },
  action
) => {
  switch (action.type) {
    case types.setGetReports:
      return {
        ...state,
        getReports: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setCreateReport:
      return {
        ...state,
        createReport: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setUpdateReport:
      return {
        ...state,
        updateReport: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setDeleteReport:
      return {
        ...state,
        deleteReport: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    default:
      return state;
  }
};
