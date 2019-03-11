import React, { Component } from 'react';
import './App.css';

import AllImpressionList from "./ImpressionList";
import VideoPlayList from "./VideoPlayList";
import Home from "./Home";
import Videos from "./Videos";
import VideoDetail from "./components/VideoDetail";
import Login from "./components/Login";
import Register from "./components/Register";

import {
  Route,
  Switch,
  BrowserRouter,
  Redirect,
  NavLink,
} from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";

import { loadUser } from "./actions/auth";
import admoapi from "./reducers/index";

import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(admoapi, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));

class RootContainerComponent extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  render() {
    let {PrivateRoute} = this;
    return (
      <BrowserRouter>
      <div>

          <ul className="header">
            <li className="home"><NavLink to="/">AdmoVisual</NavLink></li>
            <li><NavLink to="/videos">Videos</NavLink></li>
            <li><NavLink to="/current_playlist">Current Playlist</NavLink></li>
            <li><NavLink to="/impressions">Impressions</NavLink></li>

          </ul>

            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/videos" component={Videos} />
              <PrivateRoute exact path="/current_playlist" component={VideoPlayList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute path="/impressions" component={AllImpressionList}/>
              <PrivateRoute exact path={`/videos/:videoId`} component={VideoDetail}/>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(loadUser());
    }
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

class App extends Component {

  render() {
    return (
    <Provider store={store}>
        <RootContainer />
    </Provider>
    );
  }
}

export default App;
