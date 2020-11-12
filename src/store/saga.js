import { getTimestamp } from "../fbConfig";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  addDocumentToDb,
  getVideoData,
  getVideoId,
  removeDocumentFromDb,
} from "../utils";
import {
  savingStart,
  ON_SAVING_START,
  setError,
  savingEnd,
  ON_VIDEO_END,
  setSelected,
} from "./actions";

function* saveVideo(action) {
  const { text } = action;
  const videoId = getVideoId(text);
  const state = yield select();

  yield put(savingStart());

  /**
   * Dont save existing video
   */
  if (state.items[videoId]) {
    yield put(savingEnd());
    yield put(setError("Duplicated video"));
    return;
  }

  const videoData = yield call(getVideoData, text);
  if (!videoData) {
    yield put(savingEnd());
    yield put(setError("Invalid link or video ID"));
    return;
  }

  const createdAt = getTimestamp();
  const insertResult = yield call(addDocumentToDb, {
    ...videoData,
    createdAt,
  });

  if (!insertResult) {
    yield put(setError("Failed to add video"));
  }

  yield put(savingEnd());
}

function* onVideoEnd(action) {
  const { selectedItem } = yield select();

  const removedDoc = yield call(removeDocumentFromDb, selectedItem);

  if (removedDoc) {
    yield put(setSelected(null));
  } else {
    yield put(setError("Failed to remove video"));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(ON_SAVING_START, saveVideo),
    takeLatest(ON_VIDEO_END, onVideoEnd),
  ]);
}
