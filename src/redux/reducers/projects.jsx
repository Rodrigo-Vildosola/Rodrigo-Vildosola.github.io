import { types } from "../actions/types";

export const projectsReducer = (
  state = {
    getProjects: {},
    createProject: {},
    updateProject: {},
    deleteProject: {},
  },
  action
) => {
  switch (action.type) {
    case types.setGetProjects:
      return {
        ...state,
        getProjects: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setCreateProject:
      return {
        ...state,
        createProject: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setUpdateProject:
      return {
        ...state,
        updateProject: {
          status: action.payload.status,
          data: action.payload.data,
          title: action.payload.title,
          time: new Date(),
        },
      };
    case types.setDeleteProject:
      return {
        ...state,
        deleteProject: {
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
