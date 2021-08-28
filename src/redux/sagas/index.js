import {spawn} from 'redux-saga/effects';

// Sagas
import videosSaga from './videosSaga';

// Export the root saga
export default function* rootSaga() {
  console.log('Hello From Redux-Saga!');

  yield spawn(videosSaga);
}
