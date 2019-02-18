import auth from "./auth";
import videos from "./videos";
import { combineReducers } from 'redux';

const admoapi = combineReducers({
  videos, auth,
})

export default admoapi;