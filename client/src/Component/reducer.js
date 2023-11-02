// rootReducer.js
const initialState = {
  selectedIds: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_IDS":
      return {
        ...state,
        selectedIds: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
