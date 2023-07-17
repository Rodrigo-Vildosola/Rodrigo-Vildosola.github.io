import { combineReducers } from 'redux';
import { languageReducer } from './index';
import { exampleReducer } from './example';
import { authReducer } from './auth';
import { clientsReducer } from './clients';
import { notificationsReducer } from './notifications';

export const rootReducer = combineReducers({
  lang: languageReducer,
  example: exampleReducer,
  auth: authReducer,
  clients: clientsReducer,
  notifications: notificationsReducer,
});