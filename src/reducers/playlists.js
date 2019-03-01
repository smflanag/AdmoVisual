const initialState = [

];

export default function playlists(state=initialState, action) {
  let playlistList = state.slice();

  switch (action.type) {

    case 'FETCH_PLAYLISTS':
        return [...state, ...action.playlists];

    case 'ADD_PLAYLIST':
      return [...state, action.playlist];

    case 'UPDATE_PLAYLIST':
      let playlistToUpdate = playlistList[action.index]
      playlistToUpdate.list_name = action.playlist.list_name;
      playlistList.splice(action.index, 1, playlistToUpdate);
      return playlistList;

    case 'DELETE_PLAYLIST':
      playlistList.splice(action.index, 1);
      return playlistList;

    default:
      return state;
  }
}