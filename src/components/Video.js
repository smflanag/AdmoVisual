import React from "react";
import "./Video.css";
import PropTypes from "prop-types";
import {
  Link
} from "react-router-dom";

function Video(props) {
  return (
  <div className="video">
    <Link to={`/videos/${props.id}`}>{props.name}</Link>
  </div>
  );
}

Video.propTypes = {
name: PropTypes.string.isRequired
};


export default Video;