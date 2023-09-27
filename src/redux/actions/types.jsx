export const types = {
  changeLanguage: '[Lang] Change',
  setExampleActionAxios: "[Example] Set Request Axios",
  setExampleAction: "[Example] Set Request",
  
  setNotification: "[Notification] Set",

  setSignIn: "[Auth] Set SignIn",
  setSignOut: "[Auth] Set SignOut",


  setGetUsers: "[Users] Set Get Users",
  setCreateUser: "[Users] Set Create User",
  setUpdateUser: "[Users] Set Update User",
  setDeleteUser: "[Users] Set Delete User",
  setGetUser: "[Users] Set Get User",

  setGetRatingsProgress: "[Ratings] Set Get Progress",



  setGetJob: "[Job] Set Get Job",
  setUpdateUserRating: "[Job] Set Update User Rating",

  setGetQuestions: "[Questions] Set Get Questions",
  setCreateQuestion: "[Questions] Set Create Question",
  setUpdateQuestion: "[Questions] Set Update Question",
  setDeleteQuestion: "[Questions] Set Delete Question",

  setGetTemplates: "[Templates] Set Get Templates",
  setCreateTemplate: "[Templates] Set Create Template",
  setUpdateTemplate: "[Templates] Set Update Template",
  setDeleteTemplate: "[Templates] Set Delete Template",
};

export const API_URL = process.env.REACT_APP_ENV_API_URL;
