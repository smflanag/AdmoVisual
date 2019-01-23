const initialState = [

];

export default function videos(state=initialState, action) {
  let videoList = state.slice();

  switch (action.type) {

    case 'FETCH_VIDEOS':
        return [...state, ...action.videos];

    case 'ADD_VIDEO':
      return [...state, action.video];

    case 'UPDATE_VIDEO':
      let videoToUpdate = videoList[action.index]
      videoToUpdate.name = action.video.name;
      videoToUpdate.url = action.video.url;
      videoToUpdate.playlist = action.video.playlist;
      videoList.splice(action.index, 1, videoToUpdate);
      return videoList;

    case 'DELETE_VIDEO':
      videoList.splice(action.index, 1);
      return videoList;

    default:
      return state;
  }
}