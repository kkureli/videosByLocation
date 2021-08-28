// Import the redux-saga/effects
import {put, call, takeLatest, takeEvery} from 'redux-saga/effects';
import {
  GET_VIDEOS,
  GET_MORE_VIDEOS,
  SET_LOADING,
  GET_VIDEOS_REQUESTED,
  GET_MORE_VIDEOS_REQUESTED
} from '../actions/actionTypes';

import {getVideos, getMoreVideos} from '../actions/videosActions';

function* getFirstVideos({payload}) {
  yield put({type: SET_LOADING});

  const data = yield call(getVideos, payload);

  yield put({type: GET_VIDEOS, payload: data});
}

function* getOtherVideos({payload}) {
  const data = yield call(getMoreVideos, payload);

  yield put({type: GET_MORE_VIDEOS, payload: data});
}

export default function* videosSaga() {
  yield takeLatest(GET_VIDEOS_REQUESTED, getFirstVideos);
  yield takeEvery(GET_MORE_VIDEOS_REQUESTED, getOtherVideos);
}
