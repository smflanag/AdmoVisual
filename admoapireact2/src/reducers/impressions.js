const initialState = [

];

export default function impressions(state=initialState, action) {
  let impressionList = state.slice();

  switch (action.type) {

    case 'FETCH_IMPRESSIONS':
        return [...state, ...action.impressions];

    case 'ADD_IMPRESSION':
      return [...state, action.impression];

//    case 'UPDATE_IMPRESSION':
//      let impressionToUpdate = impressionList[action.index]
//      impressionToUpdate.name = action.impression.name;
//      impressionToUpdate.url = action.impression.url;
//      impressionToUpdate.playlist = action.impression.playlist;
//      impressionList.splice(action.index, 1, impressionToUpdate);
//      return impressionList;

    case 'DELETE_IMPRESSION':
      impressionList.splice(action.index, 1);
      return impressionList;

    default:
      return state;
  }
}