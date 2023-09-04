import { combineReducers } from 'redux';
import { languageReducer } from './index';
import { authReducer } from './auth';
import { usersReducer } from './users';
import { notificationsReducer } from './notifications';
import { templatesReducer } from './templates';
import { jobReducer } from './jobs';
import { questionsReducer} from './questions';

export const rootReducer = combineReducers({
  lang: languageReducer,
  auth: authReducer,
  users: usersReducer,
  notifications: notificationsReducer,
  templates: templatesReducer,
  jobs: jobReducer,
  questions: questionsReducer,
});
