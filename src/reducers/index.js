import auth from "./auth";
import videos from "./videos";
import playlists from "./playlists";
import players from "./players";
import impressions from "./impressions";
import charts from "./charts";

import { combineReducers } from 'redux';

const admoapi = combineReducers({
  videos, auth, impressions, playlists, charts, players
})

export default admoapi;