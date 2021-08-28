import {GET_MORE_VIDEOS, GET_VIDEOS, SET_LOADING} from '../actions/actionTypes';

const initialState = {
  loading: false,
  videos: [],
  nextPageToken: ''
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_VIDEOS:
      return {
        ...state,
        videos: payload.items,
        loading: false,
        nextPageToken: payload.nextPageToken
      };
    case GET_MORE_VIDEOS:
      return {
        ...state,
        videos: [...state.videos, ...payload.items],
        nextPageToken: payload.nextPageToken
      };

    default:
      return state;
  }
};
