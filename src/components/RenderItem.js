import moment from 'moment';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const format1 = 'YYYY-MM-DD HH:mm:ss';
const {width} = Dimensions.get('window');

const RenderItem = ({item}) => {
  return (
    <View style={styles.video}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.title}>
          {item.snippet.title}
        </Text>
        <Text style={styles.date}>
          {moment(item.snippet.publishedAt).format(format1)}
        </Text>
      </View>
      <View style={{alignSelf: 'center'}}>
        <YoutubePlayer
          height={230}
          width={width * 0.9}
          videoId={item.id.videoId}
        />
      </View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  video: {
    marginVertical: 5
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {fontWeight: 'bold', width: 200, fontSize: 20, marginLeft: 10},
  date: {color: 'gray', marginRight: 15}
});
