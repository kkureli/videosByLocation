export const YOUTUBE_API_KEY = 'AIzaSyCmyyLPygNh2KbhU05C3b2TmZ43qZ-mTI8';

const config = {
  part: 'snippet',
  type: 'video',
  maxResults: 10,
  locationRadius: '10km',
  key: YOUTUBE_API_KEY,
  order: 'date'
};

export default config;
