import axios from 'axios';
import {Alert} from 'react-native';

export const getVideos = async url => {
  // debugger;
  try {
    const {data} = await axios.get(url);
    console.log(data);
    return data;
  } catch (err) {
    Alert.alert('Error', err.response.data.error.message);
    return console.error(err);
  }
};

export const getMoreVideos = async url => {
  try {
    const {data} = await axios.get(url);

    return data;
  } catch (err) {
    return console.error(err);
  }
};
