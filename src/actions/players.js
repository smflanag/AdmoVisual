export function fetchPlayers() {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/players/", {headers, })
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
        let playersFromApi = res.data.map(dropdownPlayer => { return {value: dropdownPlayer.id, display: dropdownPlayer.name} })
        let player_data = [{value: '', display: '(Select the player)'}].concat(playersFromApi);

        if (res.status === 200) {
            return dispatch({type: 'FETCH_PLAYERS', players: player_data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: player_data});
          throw player_data;
        }
      })

  }
}