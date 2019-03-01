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
        if (res.status === 200) {
          return dispatch({type: 'FETCH_PLAYLISTS', playlists: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
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

//export function updatePlaylist(index, name,) {
//  return (dispatch, getState) => {
//
//    let headers = {"Content-Type": "application/json"};
//    let {token} = getState().auth;
//
//    if (token) {
//      headers["Authorization"] = `Token ${token}`;
//    }
//
//    let body = JSON.stringify({name});
//    let playlistId = getState().playlists[index].id;
//    let base_url = "/api/playlists/"+playlistId+"/";
//
//    return fetch(base_url, {headers, method: "PUT", body})
//      .then(res => {
//        if (res.status < 500) {
//          return res.json().then(data => {
//            return {status: res.status, data};
//          })
//        } else {
//          console.log("Server Error!");
//          throw res;
//        }
//      })
//      .then(res => {
//        if (res.status === 200) {
//          return dispatch({type: 'UPDATE_PLAYLIST', playlist: res.data, index});
//        } else if (res.status === 401 || res.status === 403) {
//          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
//          throw res.data;
//        }
//      })
//  }
//}
//
//export function deletePlaylist(index) {
//  return (dispatch, getState) => {
//
//    let headers = {"Content-Type": "application/json"};
//    let {token} = getState().auth;
//
//    if (token) {
//      headers["Authorization"] = `Token ${token}`;
//    }
//    console.log(getState());
//    let playlistId = getState().playlists[index].id;
//    let base_url = "/api/playlists/"+playlistId+"/";
//
//    return fetch(base_url, {headers, method: "DELETE"})
//      .then(res => {
//        if (res.status === 204) {
//          return {status: res.status, data: {}};
//        } else if (res.status < 500) {
//          return res.json().then(data => {
//            return {status: res.status, data};
//          })
//        } else {
//          console.log("Server Error!");
//          throw res;
//        }
//      })
//      .then(res => {
//        if (res.status === 204) {
//          return dispatch({type: 'DELETE_PLAYLIST', index});
//        } else if (res.status === 401 || res.status === 403) {
//          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
//          throw res.data;
//        }
//      })
//  }
//}