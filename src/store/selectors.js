import { sortItemsByDate } from "../utils";

const getState = (state) => state || {};
export const getItems = (state) => getState(state).items;
export const getSelectedItem = (state) => getState(state).selectedItem;
export const getIsSavingData = (state) => getState(state).savingData;
export const getError = (state) => getState(state).error;
