import { types } from "../actions/types";

export const languageReducer = ( state = { lang: 'en' }, action ) => {
  switch (action.type) {
    case types.changeLanguage:
      return { lang: action.payload };

    default:
      return state;
  }
};
