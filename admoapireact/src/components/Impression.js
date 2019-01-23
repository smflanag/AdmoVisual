import React from "react";
import "./Impression.css";

function Impression(props) {
  return (
  <div className="impression">
     <span><ul><li>Time: {props.timestamp}</li>
    <li>Player ID: {props.player}</li>
    <li>Video ID: {props.video}</li>
    <li>PlayList ID: {props.playlist}</li>
    </ul>
    </span>
  </div>
  );
}


export default Impression;