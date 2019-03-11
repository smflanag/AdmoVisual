export function fetchPlaylists() {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/playlists/", {headers, })
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
        let playlistsFromApi = res.data.map(dropdownPlaylist => { return {value: dropdownPlaylist.id, display: dropdownPlaylist.name} })
        let playlist_data = [{value: '', display: '(Select the playlist)'}].concat(playlistsFromApi);

        if (res.status === 200) {
            return dispatch({type: 'FETCH_PLAYLISTS', playlists: playlist_data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: playlist_data});
          throw playlist_data;
        }
      })

  }
}

export function addPlaylist(list_name) {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({list_name});
    return fetch("/api/playlists/", {headers, method: "POST", body})
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
        if (res.status === 201) {
          return dispatch({type: 'ADD_PLAYLIST', playlist: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}
