export const types = {
  changeLanguage: '[Lang] Change',
  setExampleActionAxios: "[Example] Set Request Axios",
  setExampleAction: "[Example] Set Request",

  setNotification: "[Notification] Set",

  setSignIn: "[Auth] Set SignIn",
  setSignOut: "[Auth] Set SignOut",


  setGetClients: "[Clients] Set Get Clients",
  setCreateClient: "[Clients] Set Create Client",
  setUpdateClient: "[Clients] Set Update Client",
  setDeleteClient: "[Clients] Set Delete Client",

  setGetFormatsByClient: "[Formats] Set Get Formats By Client",
  setCreateFormat: "[Formats] Set Create Format",
  setUpdateFormat: "[Formats] Set Update Format",
  setDeleteFormat: "[Formats] Set Delete Format",

  setGetProjects: "[Projects] Set Get Projects",
  setCreateProject: "[Projects] Set Create Project",
  setUpdateProject: "[Projects] Set Update Project",
  setDeleteProject: "[Projects] Set Delete Project",

  setGetUsers: "[Users] Set Get Users",
  setCreateUser: "[Users] Set Create User",
  setUpdateUser: "[Users] Set Update User",
  setDeleteUser: "[Users] Set Delete User",

  setToggleClientUser: "[Users] Set Toggle Client User",
  setToggleFormatUser: "[Users] Set Toggle Format User",

  setGetElements: "[Elements] Set Get Elements",


};

export const API_URL = process.env.REACT_APP_ENV_API_URL;
