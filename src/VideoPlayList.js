import React, { Component } from "react";
import axios from 'axios';
import VideoList from "./components/Videos";

class VideoPlayList extends Component {
    state = {
        videos: []
    };

    componentDidMount() {
        axios
        .get("http://127.0.0.1:8000/playlist/current")
        .then(response => {
            const newVideos = response.data;
            this.setState({videos: newVideos});
        })
        .catch(error => console.log(error));
    };


  render() {
    return (
      <div>
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

export default VideoPlayList;