export const ON_SAVING_START = "APP/SAVING/ON_START";
export const SAVING_START = "APP/SAVING/START";
export const SAVING_END = "APP/SAVING/END";
export const SET_ERROR = "APP/ERROR/SET";
export const SET_ITEMS = "APP/ITEMS/SET";
export const ADD_ITEM = "APP/ITEM/ADD";
export const SET_SELECTED = "APP/ITEMS/SELECTED/SET";
export const ON_VIDEO_END = "APP/VIDEO/ON_END";

export const onSaveStart = (text) => ({ type: ON_SAVING_START, text });
export const savingStart = () => ({ type: SAVING_START });
export const savingEnd = () => ({ type: SAVING_END });
export const setError = (error) => ({ type: SET_ERROR, error });
export const setItems = (items) => ({ type: SET_ITEMS, items });
export const addItem = (item) => ({ type: ADD_ITEM, item });
export const setSelected = (item) => ({ type: SET_SELECTED, item });
export const onVideoEnd = () => ({ type: ON_VIDEO_END });
