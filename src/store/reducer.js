import {
  ADD_ITEM,
  SAVING_END,
  SAVING_START,
  SET_ERROR,
  SET_ITEMS,
  SET_SELECTED,
} from "./actions";

const initialState = {
  savingData: false,
  items: {},
  selectedItem: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      /**
       * We are getting items here as sorted array,
       * so parsing it back to object
       */
      return {
        ...state,
        items: action.items.reduce((obj, item) => {
          obj[item.videoId] = item;

          return obj;
        }, {}),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.item.videoId]: action.item,
        },
      };
    case SET_SELECTED:
      return {
        ...state,
        selectedItem: action.item,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case SAVING_START:
      return {
        ...state,
        savingData: true,
      };
    case SAVING_END:
      return {
        ...state,
        savingData: false,
      };
    default:
      return state;
  }
};

export default reducer;
