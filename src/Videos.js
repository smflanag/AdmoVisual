import React, { Component } from "react";
import {connect} from 'react-redux';
import {videos, playlists, auth} from "./actions/index";



class Videos extends Component {

    componentDidMount() {
        this.props.fetchVideos();
        fetch("/api/playlists/")
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
        this.setState({name: "", url: "", selectedPlaylist: "", updateVideoId: null});
        this.setState({list_name:""});
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
    submitPlaylist = (e) => {
        e.preventDefault();
        console.log("playlist addition attempt");
        if (this.state.updatePlaylistId === null) {
            this.props.addPlaylist(this.state.list_name).then(this.resetForm)
        }
    }

    state = {
        name: "",
        url: "",
        playlist: "",
        updateVideoId: null,
        dropdownPlaylists: [],
        selectedPlaylist: "",
        validationError: "",
        list_name: ""
    }

  render() {
    return (
      <div>

        <div className="col-md-2">
        <div style={{textAlign: "right"}}>
          {this.props.user.username} <a href="" onClick={this.props.logout}>logout</a>
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
                    <td><button className="ui primary button" onClick={() => this.selectForEdit(id)}>edit</button></td>
                    <td><button onClick={() => this.props.deleteVideo(id)}>delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            <h3>Add playlist</h3>
            <form onSubmit={this.submitPlaylist}>
                <input
                    value={this.state.list_name}
                    placeholder="Enter playlist name here..."
                    onChange={(e) => this.setState({list_name: e.target.value})}
                    required />
                <button onClick={this.resetForm}>Reset</button>
                <input type="submit" value="Save Playlist" />
            </form>

        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    videos: state.videos,
    playlists: state.playlists,
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
    addPlaylist: (list_name) => {
      return dispatch(playlists.addPlaylist(list_name));
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

export default connect(mapStateToProps, mapDispatchToProps)(Videos);
