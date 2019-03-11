const initialState = [

];

export default function charts(state=initialState, action) {

  switch (action.type) {

    case 'FETCH_CHARTS':
        return action.charts;

    default:
      return state;
  }
}