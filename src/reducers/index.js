import auth from "./auth";
import videos from "./videos";
import playlists from "./playlists";
import impressions from "./impressions";
import { combineReducers } from 'redux';

const admoapi = combineReducers({
  videos, auth, impressions, playlists
})

export default admoapi;