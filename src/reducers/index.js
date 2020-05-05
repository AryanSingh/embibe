const initialState = {
  data: [],
  loading: false,
};
const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'DATA_RECEIVED':
      return { ...state, data: action.data, loading: false };
    case 'DATA_FETCHING':
      return { ...state, loading: true };
    // case 'NEWS_RECEIVED':
    // 	return { ...state, news: action.json[0], loading: false }
    default:
      return state;
  }
};
export default reducer;
