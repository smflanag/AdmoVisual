import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <div>
            <span>{this.state.name}</span>
        </div>
      );
  }
}

export default VideoDetail;

