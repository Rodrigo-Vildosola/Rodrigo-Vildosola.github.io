import { types } from "../actions/types";

export const recordsReducer = (
  state = {
    getRecords: {},
    createRecord: {},
    updateRecord: {},
    deleteRecord: {},
  },
  action
) => {
  switch (action.type) {
    case types.setGetRecords:
      return {
        ...state,
        getRecords: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setCreateRecord:
      return {
        ...state,
        createRecord: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setUpdateRecord:
      return {
        ...state,
        updateRecord: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setDeleteRecord:
      return {
        ...state,
        deleteRecord: {
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
