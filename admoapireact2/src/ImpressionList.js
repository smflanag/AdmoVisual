import React, { Component } from "react";
import axios from 'axios';
import ImpressionList from './components/Impressions';

class AllImpressionList extends Component {
    // default State object
    state = {
        impressions: []
    };

    componentDidMount() {
        axios
        .get("http://127.0.0.1:8000/impressions")
        .then(response => {
        //create an array of videos only with relevant data
            const newImpressions = response.data.map(i => {
            return {
                id: i.id,
                timestamp: i.timestamp,
                player: i.player,
                video: i.video,
                playlist: i.playlist
                };
            });
        //create a new "State" object without mutating the original State object
            const newState = Object.assign({}, this.state, {
                impressions: newImpressions
            });
        // store the new state object in the component's state
            this.setState(newState);
        })
        .catch(error => console.log(error));
    };

  render() {
    return (
      <div>
        <ImpressionList impressions={this.state.impressions} />
      </div>
    );
  }
}

export default AllImpressionList;