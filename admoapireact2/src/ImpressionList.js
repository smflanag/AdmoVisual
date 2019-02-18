import React, { Component } from "react";
//import axios from 'axios';
//import ImpressionList from './components/Impressions';
import {connect} from 'react-redux';


import {impressions, auth} from "./actions/index";

//class AllImpressionList extends Component {
//    // default State object
//    state = {
//        impressions: []
//    };
//
//    componentDidMount() {
//        axios
//        .get("http://127.0.0.1:8000/impressions")
//        .then(response => {
//        //create an array of videos only with relevant data
//            const newImpressions = response.data.map(i => {
//            return {
//                id: i.id,
//                timestamp: i.timestamp,
//                player: i.player,
//                video: i.video,
//                playlist: i.playlist
//                };
//            });
//        //create a new "State" object without mutating the original State object
//            const newState = Object.assign({}, this.state, {
//                impressions: newImpressions
//            });
//        // store the new state object in the component's state
//            this.setState(newState);
//        })
//        .catch(error => console.log(error));
//    };
//
//  render() {
//    return (
//      <div>
//        <ImpressionList impressions={this.state.impressions} />
//      </div>
//    );
//  }
//}
//
//export default AllImpressionList;
//


class AllImpressionList extends Component {
    componentDidMount() {
        this.props.fetchImpressions();
    }

    state = {
        player: "",
        video: "",
        playlist: "",
        updateImpressionId: null,
    }

    resetForm = () => {
        this.setState({player: "",video: "", playlist: "", updateImpressionId: null});
    }

    selectForEdit = (id) => {
        let impression = this.props.impressions[id];
        this.setState({player: impression.player, video: impression.video, playlist: impression.playlist, updateImpressionId: id});
    }

    submitImpression = (e) => {
        e.preventDefault();
        if (this.state.updateImpressionId === null) {
            this.props.addImpression(this.state.player, this.state.video, this.state.playlist).then(this.resetForm)
        }
//        else {
//            this.props.updateVideo(this.state.updateVideoId, this.state.name, this.state.url, this.state.playlist).then(this.resetForm);
//        } ##update above for impression
    }



  render() {
    return (
      <div>


        <div style={{textAlign: "right"}}>
          {this.props.user.username} <a onClick={this.props.logout}>logout</a>
        </div>

        <h3>Add Impression</h3>
            <form onSubmit={this.submitImpression}>
                <input
                    value={this.state.player}
                    placeholder="Enter player ID here..."
                    onChange={(e) => this.setState({player: e.target.value})}
                    required />
                <input
                    value={this.state.video}
                    placeholder="Enter video ID here..."
                    onChange={(e) => this.setState({video: e.target.value})}
                    required />
                <input
                    value={this.state.playlist}
                    placeholder="Enter playlist ID here..."
                    onChange={(e) => this.setState({playlist: e.target.value})}
                    required />
                <button onClick={this.resetForm}>Reset</button>
                <input type="submit" value="Save Impression" />
            </form>


            <h3>Impressions</h3>
            <table>
              <tbody>
                {this.props.impressions.map((impression, id) => (
                  <tr key={`impression_${impression.id}`}>
                    <td>{impression.timestamp}</td>
                    <td>{impression.player.name}</td>
                    <td>{impression.video.name}</td>
                    <td>{impression.playlist}</td>
                    <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                    <td><button onClick={() => this.props.deleteImpression(id)}>delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
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
//    updateImpression: (id, player, video, playlist) => {
//      return dispatch(impressions.updateVideo(id, player, video, playlist));
//    },
    deleteImpression: (id) => {
      dispatch(impressions.deleteImpression(id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllImpressionList);