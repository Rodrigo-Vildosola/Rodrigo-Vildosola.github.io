import { types } from "../actions/types";

export const usersReducer = (
  state = {
    getUsers: {},
    createUser: {},
    updateUser: {},
    deleteUser: {},
    toggleFormatUser: {},
    toggleClientUser: {},
  },
  action
) =>
{
  switch (action.type)
  {
    case types.setGetUsers:
      return {
        ...state,
        getUsers: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setCreateUser:
      return {
        ...state,
        createUser: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setUpdateUser:
      return {
        ...state,
        updateUser: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setDeleteUser:
      return {
        ...state,
        deleteUser: {
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
