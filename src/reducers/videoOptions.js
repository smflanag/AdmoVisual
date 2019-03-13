const initialState = [

];

export default function video_options(state=initialState, action) {

  switch (action.type) {

    case 'FETCH_VIDEO_OPTIONS':
        return action.video_options;

    default:
      return state;
  }
}