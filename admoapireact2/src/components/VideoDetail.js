import React, { Component } from 'react';
import axios from 'axios';


class VideoDetail extends Component {
    state = {};
    componentDidMount() {
        axios
        .get("http://127.0.0.1:8000/videos/" + this.props.match.params.videoId)
        .then(response => {
            const video = response.data;
            // store the new state object in the component's state
            this.setState(video);
        })
        .catch(error => console.log(error));
    };
  render() {
      return (
        <div><p>Name: {this.state.name}</p>

            <p>URL: {this.state.url}</p>

            <p>PlaylistID: {this.state.playlist}</p>
        </div>
      );
  }
}

export default VideoDetail;

