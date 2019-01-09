import React from "react";
import Impression from "./Impression";

function ImpressionList(props) {
  return (
    <div>
    {props.impressions.map(i => <Impression key={i.id} timestamp={i.timestamp} player={i.player} video = {i.video} playlist={i.playlist} />)}

    </div>
  );
}



export default ImpressionList;