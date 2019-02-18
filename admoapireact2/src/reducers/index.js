import auth from "./auth";
import videos from "./videos";
import impressions from "./impressions";
import { combineReducers } from 'redux';

const admoapi = combineReducers({
  videos, auth, impressions
})

export default admoapi;