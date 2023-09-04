import { types } from "../actions/types";

export const jobReducer = (
  state = {
    getJob: {},
  },
  action
) => {
  switch (action.type) {
    case types.setGetJob:
      return {
        ...state,
        getJob: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title ? action.payload.title : "Job Details",
          time: new Date(),
        },
      };
    case types.setUpdateUserRating:
      return {
        ...state,
        updateUserRating: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title
            ? action.payload.title
            : "Update User Rating",
          time: new Date(),
        },
      };
    default:
      return state;
  }
};
