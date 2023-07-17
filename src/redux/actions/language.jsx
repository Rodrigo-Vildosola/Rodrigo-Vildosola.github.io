import { types } from './types';

export const changeLang = (lang) => ({
  type: types.changeLanguage,
  payload: lang
});
