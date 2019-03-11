import React, { Component } from "react";
import {connect} from 'react-redux';
import { impressions, auth, charts, playlists, players } from "./actions/index";
import { Chart } from "react-google-charts";



class AllImpressionList extends Component {
    state = {
        updateImpressionId: null,
        selectedPlayer: "",
        selectedPlaylist: "",
        dropdownVideos: [],
        selectedVideo: "",
        validationError: "",
        chart_data_table:[],
        chart_options:[]
    }

    componentDidMount() {
        this.props.fetchImpressions();
        this.props.fetchChart();
        this.props.fetchPlaylists();
        this.props.fetchPlayers();


        fetch("/api/videos/")
          .then((response) => {
            return response.json();
          })
          .then(data => {
            let videosFromApi = data.map(dropdownVideo => { return {value: dropdownVideo.id, display: dropdownVideo.name} })
            this.setState({ dropdownVideos: [{value: '', display: '(Select the video)'}].concat(videosFromApi) });
          }).catch(error => {
            console.log(error);
          });
    }

    resetForm = () => {
        this.setState({selectedPlayer: "",selectedVideo: "", selectedPlaylist: "", updateImpressionId: null});
    }

    submitImpression = (e) => {
        e.preventDefault();
        if (this.state.updateImpressionId === null) {
            this.props.addImpression(this.state.selectedPlayer, this.state.selectedVideo, this.state.selectedPlaylist)
                .then(this.props.fetchImpressions)
                .then(this.resetForm)
        }
    }



  render() {
    return (
      <div>
      <div className="col-md-2">
            <div style={{textAlign: "right"}}>
              {this.props.user.username} <a href="" onClick={this.props.logout}>logout</a>
            </div>
        </div>

        <div className={"donutchart"}>
            <Chart
              chartType="PieChart"
              options={{title:'Logged impressions by video'},
                    {pieHole:0.5}}
              data={this.props.charts}
              width="80%"
              height="390px"
              legendToggle
            />
        </div>




        <h3>Add Impression</h3>
            <form onSubmit={this.submitImpression}>
                <select value={this.state.selectedPlayer}
                onChange={(e) => this.setState({selectedPlayer: e.target.value, validationError: e.target.value === "" ? "You must select the player" : ""})}>
          {this.props.players.map((dropdownPlayer) => <option key={dropdownPlayer.value} value={dropdownPlayer.value}>{dropdownPlayer.display}</option>)}
        </select>
                <select value={this.state.selectedVideo}
                onChange={(e) => this.setState({selectedVideo: e.target.value, validationError: e.target.value === "" ? "You must select the video" : ""})}>
          {this.state.dropdownVideos.map((dropdownVideo) => <option key={dropdownVideo.value} value={dropdownVideo.value}>{dropdownVideo.display}</option>)}
        </select>
                <select value={this.state.selectedPlaylist}
                onChange={(e) => this.setState({selectedPlaylist: e.target.value, validationError: e.target.value === "" ? "You must select the playlist" : ""})}>
          {this.props.playlists.map((dropdownPlaylist) => <option key={dropdownPlaylist.value} value={dropdownPlaylist.value}>{dropdownPlaylist.display}</option>)}
        </select>
                <button className="ui button" onClick={this.resetForm}>Reset</button>
                <input type="submit" value="Save Impression" />
            </form>


            <h2>Impressions</h2>
            <div>
                <table >
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Device Name</th>
                            <th>Video Name</th>
                            <th>Playlist Name</th>
                        </tr>
                    </thead>
                  <tbody>
                    {this.props.impressions.map((impression, id) => (
                      <tr key={`impression_${impression.id}`}>
                        <td>{impression.timestamp}</td>
                        <td>{impression.player.name}</td>
                        <td>{impression.video.name}</td>
                        <td>{impression.playlist.name}</td>

                        <td><button className="ui button" onClick={() => this.props.deleteImpression(id)}>delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    impressions: state.impressions,
    user: state.auth.user,
    charts: state.charts,
    playlists: state.playlists,
    players: state.players
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchImpressions: () => {
      dispatch(impressions.fetchImpressions());
    },
    fetchPlaylists: () => {
      dispatch(playlists.fetchPlaylists());
    },
    fetchPlayers: () => {
      dispatch(players.fetchPlayers());
    },
    fetchChart: () => {
      dispatch(charts.fetchChart());
    },
    addImpression: (player, video, playlist) => {
      return dispatch(impressions.addImpression(player, video, playlist));
    },

    deleteImpression: (id) => {
      dispatch(impressions.deleteImpression(id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllImpressionList);
