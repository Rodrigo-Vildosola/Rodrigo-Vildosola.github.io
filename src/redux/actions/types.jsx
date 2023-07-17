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


};

export const API_URL = process.env.REACT_APP_ENV_API_URL;
