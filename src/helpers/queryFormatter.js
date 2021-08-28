import {BASE_URL} from '../API/API';
import config from '../config/config';

const queryFormatter = (
  {latitude, longitude},
  isNewLocation,
  nextPageToken
) => {
  const location = `${latitude},${longitude}`;

  let queries = '';

  for (const key in config) {
    queries = queries + (key + '=' + config[key] + '&');
  }

  queries = queries.slice(0, -1);

  queries += `&location=${location}`;

  if (!isNewLocation) {
    queries += `&pageToken=${nextPageToken}`;
  }

  return `${BASE_URL}${queries}`;
};

export default queryFormatter;
