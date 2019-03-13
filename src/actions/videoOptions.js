
export function fetchVideoOptions() {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/videos/", {headers, })
        .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        let videosFromApi = res.data.map(dropdownVideo => { return {value: dropdownVideo.id, display: dropdownVideo.name} })
        let video_data = [{value: '', display: '(Select the video)'}].concat(videosFromApi);
        console.log(video_data);

        if (res.status === 200) {
            return dispatch({type: 'FETCH_VIDEO_OPTIONS', video_options: video_data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: video_data});
          throw video_data;
        }
      })
  }
}