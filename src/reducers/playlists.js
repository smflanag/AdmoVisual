const initialState = [

];

export default function playlists(state=initialState, action) {

  switch (action.type) {

    case 'FETCH_PLAYLISTS':
        return action.playlists;

    case 'ADD_PLAYLIST':
      return [...state, action.playlist];

    default:
      return state;
  }
}