import React, { Component } from "react";
import {connect} from 'react-redux';
import {videos, auth} from "./actions/index";


class Home extends Component {

  render() {
    return (
      <div>
        <div className="col-md-2">
            <div style={{textAlign: "right"}}>
              {this.props.user.username} <a href="" onClick={this.props.logout}>logout</a>
            </div>
        </div>
        <div className="col-md-6"><h2>Welcome to AdmoVisual</h2>
            <p>This application manages playlists of videos for marketing and advertising campaigns, and displays data on the impressions these videos have on consumers.</p>

             <p>Use the tabs above to navigate to the section you wish to use.</p>

            <p>In case of any issues, email us at help@admovisual.com.</p>
        </div>

       </div>
    )}
  }

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

