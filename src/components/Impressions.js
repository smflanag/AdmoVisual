import React from "react";
import Impression from "./Impression";

function ImpressionList(props) {
  return (
    <div>
    {props.impressions.map(i =>
    <Impression key={i.id} timestamp={i.timestamp} player={i.player.name} video = {i.video.name} playlist={i.playlist} />)}
    </div>
  );
}

export default ImpressionList;