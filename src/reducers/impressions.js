const initialState = [

];

export default function impressions(state=initialState, action) {
  let impressionList = state.slice();

  switch (action.type) {

    case 'FETCH_IMPRESSIONS':
        return action.impressions;

    case 'ADD_IMPRESSION':
      return [...state, action.impression];

    case 'DELETE_IMPRESSION':
      impressionList.splice(action.index, 1);
      return impressionList;

    default:
      return state;
  }
}