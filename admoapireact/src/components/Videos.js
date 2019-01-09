import React from "react";
import Video from "./Video";

function VideoList(props) {
  return (
    <div>
        {props.videos.map(v => <Video id={v.id} key={v.id} name={v.name} />)}
    </div>
  );
}



export default VideoList;