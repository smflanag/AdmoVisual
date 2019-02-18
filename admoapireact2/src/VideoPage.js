import React, { Component } from "react";
import { Switch, Route, NavLink } from 'react-router-dom';

import VideoPlayList from "./VideoPlayList";
import VideoDetail from "./components/VideoDetail";

const VideoPage = ({ match }) => (
  <div>
     <ul>
        <li><NavLink to="/videos">Current Playlist</NavLink></li>
        <li><NavLink to={`/videos/:id(d+)`}>Video Details</NavLink></li>
     </ul>
    <Route exact path={`/videos/:videoId`} render={(props) => <VideoDetail {...props} />}/>
    <Route exact path='/videos' component={VideoPlayList}/>

  </div>
);

export default VideoPage;