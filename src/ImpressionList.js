import React, { Component } from "react";
import {connect} from 'react-redux';
import { impressions, auth} from "./actions/index";
import { Chart } from "react-google-charts";



class AllImpressionList extends Component {
    state = {
//        player: "",
//        video: "",
//        playlist: "",
        updateImpressionId: null,
        dropdownPlayers: [],
        selectedPlayer: "",
        dropdownPlaylists: [],
        selectedPlaylist: "",
        dropdownVideos: [],
        selectedVideo: "",
        validationError: "",
        chart_data_table:[],
        chart_options:[]
    }

    componentDidMount() {
        this.props.fetchImpressions();

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

        fetch("/api/players/")
          .then((response) => {
            return response.json();
          })
          .then(data => {
            let playersFromApi = data.map(dropdownPlayer => { return {value: dropdownPlayer.id, display: dropdownPlayer.name} })
            this.setState({ dropdownPlayers: [{value: '', display: '(Select the player device name)'}].concat(playersFromApi) });
          }).catch(error => {
            console.log(error);
          });

        fetch("/impression_list")
            .then((response) => {
              return response.json();
            })
            .then(data => {
              let impressionsFromApi = data.map(Imp => { return Imp.video.name })
              var imp = new Set()
              var index;
              for (index = 0; index < impressionsFromApi.length; ++index) {
                  imp.add(impressionsFromApi[index])
                  }
              var imp_arr = Array.from(imp);
              var index2;
              var impression_list = [];
              for (index2 = 0; index2 < imp_arr.length; ++index2) {
                  var result = impressionsFromApi.filter(index3 => index3 === imp_arr[index2]).length;
                  impression_list.push((imp[index2], result))
                  }
              var imp_dict = {};
              var index3;
              for (index3 = 0; index3 < imp_arr.length; ++index3) {
                  imp_dict[imp_arr[index3]]=impression_list[index3]
                }

              var data_table = [["Video", "Number of logged impressions"]];
              for(var key in imp_dict) {
                  var value = imp_dict[key];
                  data_table.push([key,value])
                  };
              console.log(data_table);
              var options = {title:'Logged impressions by video',
                    pieHole:0.5};
              this.setState({chart_data_table:data_table, chart_options:options});

                })
    }



    resetForm = () => {
        this.setState({selectedPlayer: "",selectedVideo: "", selectedPlaylist: "", updateImpressionId: null});
    }

//    selectForEdit = (id) => {
//        let impression = this.props.impressions[id];
//        this.setState({player: impression.player, video: impression.video, playlist: impression.playlist, updateImpressionId: id});
//    }

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
              options={this.state.chart_options}
              data={this.state.chart_data_table}
              width="100%"
              height="400px"
              legendToggle
            />
        </div>




        <h3>Add Impression</h3>
            <form onSubmit={this.submitImpression}>
                <select value={this.state.selectedPlayer}
                onChange={(e) => this.setState({selectedPlayer: e.target.value, validationError: e.target.value === "" ? "You must select the player" : ""})}>
          {this.state.dropdownPlayers.map((dropdownPlayer) => <option key={dropdownPlayer.value} value={dropdownPlayer.value}>{dropdownPlayer.display}</option>)}
        </select>
                <select value={this.state.selectedVideo}
                onChange={(e) => this.setState({selectedVideo: e.target.value, validationError: e.target.value === "" ? "You must select the video" : ""})}>
          {this.state.dropdownVideos.map((dropdownVideo) => <option key={dropdownVideo.value} value={dropdownVideo.value}>{dropdownVideo.display}</option>)}
        </select>
                <select value={this.state.selectedPlaylist}
                onChange={(e) => this.setState({selectedPlaylist: e.target.value, validationError: e.target.value === "" ? "You must select the playlist" : ""})}>
          {this.state.dropdownPlaylists.map((dropdownPlaylist) => <option key={dropdownPlaylist.value} value={dropdownPlaylist.value}>{dropdownPlaylist.display}</option>)}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchImpressions: () => {
      dispatch(impressions.fetchImpressions());
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
