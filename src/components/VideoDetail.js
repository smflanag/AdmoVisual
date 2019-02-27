import React, { Component } from 'react';
import axios from 'axios';


class VideoDetail extends Component {
    state = {};
    componentDidMount() {
        axios
        .get("/api/videos/" + this.props.match.params.videoId+"/")
        .then(response => {
            const video = response.data;
            this.setState(video);
        })
        .catch(error => console.log(error));
    };
  render() {
      return (
        <div className="ui card">
            <div className="content">
                <p className="header">
                    <b>Name: </b>
                    {this.state.name}</p>
                <p><b>URL:</b> <a href={this.state.url}>{this.state.url}</a></p>
                <p><b>PlaylistID:</b> {this.state.playlist}</p>
            </div>
        </div>
      );
  }
}

export default VideoDetail;

