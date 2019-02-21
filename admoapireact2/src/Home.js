import React, { Component } from "react";
import {connect} from 'react-redux';
import {videos, auth} from "./actions/index";


class Home extends Component {

    componentDidMount() {
        this.props.fetchVideos();
        fetch("http://127.0.0.1:8000/api/playlists/")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let playlistsFromApi = data.map(dropdownPlaylist => { return {value: dropdownPlaylist.id, display: dropdownPlaylist.name} })
        this.setState({ dropdownPlaylists: [{value: '', display: '(Select the playlist)'}].concat(playlistsFromApi) });
      }).catch(error => {
        console.log(error);
      });
    }

    resetForm = () => {
        this.setState({name: "", url: "", playlist: "", updateVideoId: null});
    }

    selectForEdit = (id) => {
        let video = this.props.videos[id];
        this.setState({name: video.name, url: video.url, playlist: video.playlist, updateVideoId: id});
    }

    submitVideo = (e) => {
        e.preventDefault();
        if (this.state.updateVideoId === null) {
            this.props.addVideo(this.state.name, this.state.url, this.state.selectedPlaylist).then(this.resetForm)
        } else {
            this.props.updateVideo(this.state.updateVideoId, this.state.name, this.state.url, this.state.selectedPlaylist).then(this.resetForm);
        }
    }

    state = {
        name: "",
        url: "",
        playlist: "",
        updateVideoId: null,
        dropdownPlaylists: [],
        selectedPlaylist: "",
        validationError: ""
    }

  render() {
    return (
      <div>
        <div className="col-md-6"><h2>Welcome to AdmoVisual</h2>
        <p>Use the tabs above to navigate to the section you wish to use.</p>

        <p>In case of any issues, email us at help@admovisual.com.</p></div>

        <div className="col-md-2">
        <div style={{textAlign: "right"}}>
          {this.props.user.username} <a onClick={this.props.logout}>logout</a>
        </div></div>

        <h3>Add video</h3>
            <form onSubmit={this.submitVideo}>
                <input
                    value={this.state.name}
                    placeholder="Enter name here..."
                    onChange={(e) => this.setState({name: e.target.value})}
                    required />
                <input
                    value={this.state.url}
                    placeholder="Enter url here..."
                    onChange={(e) => this.setState({url: e.target.value})}
                    required />

               <select value={this.state.selectedPlaylist}
                onChange={(e) => this.setState({selectedPlaylist: e.target.value, validationError: e.target.value === "" ? "You must select the playlist" : ""})}>
          {this.state.dropdownPlaylists.map((dropdownPlaylist) => <option key={dropdownPlaylist.value} value={dropdownPlaylist.value}>{dropdownPlaylist.display}</option>)}
        </select>
                <button onClick={this.resetForm}>Reset</button>
                <input type="submit" value="Save Video" />
            </form>

            <h2>Videos</h2>
            <div className="ui card">
            <div className="content">
            <table className="ui celled striped table">
            <thead>
            <tr>
            <th className="left aligned">Video Name</th>
            <th>Video Url</th>
            <th>Playlist ID</th>
            </tr>
            </thead>
              <tbody>
                {this.props.videos.map((video, id) => (
                  <tr key={`video_${video.id}`}>
                    <td>{video.name}</td>
                    <td>{video.url}</td>
                    <td>{video.playlist}</td>
                    <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                    <td><button onClick={() => this.props.deleteVideo(id)}>delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div></div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    videos: state.videos,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchVideos: () => {
      dispatch(videos.fetchVideos());
    },
    addVideo: (name, url, playlist) => {
      return dispatch(videos.addVideo(name, url, playlist));
    },
    updateVideo: (id, name, url, playlist) => {
      return dispatch(videos.updateVideo(id, name, url, playlist));
    },
    deleteVideo: (id) => {
      dispatch(videos.deleteVideo(id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

