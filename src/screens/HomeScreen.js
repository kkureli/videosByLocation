import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import VideoModal from '../components/VideoModal';
import queryFormatter from '../helpers/queryFormatter';
import {connect} from 'react-redux';
import {
  GET_MORE_VIDEOS_REQUESTED,
  GET_VIDEOS_REQUESTED
} from '../redux/actions/actionTypes';

const HomeScreen = ({videosState, getVideos, getMoreVideos}) => {
  const {videos, loading, nextPageToken} = videosState;
  const [showModal, setShowModal] = useState(false);
  const [lastCoordinates, setLastCoordinates] = useState();

  const locationSelect = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;

    setLastCoordinates({
      latitude,
      longitude
    });

    fetchVideos(
      {
        latitude,
        longitude
      },
      true
    );
  };

  const fetchVideos = async (coordinates, isNewLocation) => {
    if (isNewLocation) {
      const query = queryFormatter(coordinates, isNewLocation, nextPageToken);
      try {
        await getVideos(query);
        setShowModal(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      const query = queryFormatter(
        lastCoordinates,
        isNewLocation,
        nextPageToken
      );
      await getMoreVideos(query);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
      {!loading && showModal && (
        <VideoModal
          fetchVideos={fetchVideos}
          videos={videos}
          modalVisible={showModal}
          setModalVisible={setShowModal}
        />
      )}
      <MapView
        showsUserLocation={true}
        showsMyLocationButton
        onPress={locationSelect}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}>
        {lastCoordinates && (
          <Marker
            pinColor={'red'}
            style={{width: 50, height: 50}}
            coordinate={lastCoordinates}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  },
  loading: {
    position: 'absolute',
    zIndex: 9999,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  container: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  videosState: state.videosReducer
});

const mapDispatchToProps = dispatch => ({
  getVideos: query => dispatch({type: GET_VIDEOS_REQUESTED, payload: query}),
  getMoreVideos: query =>
    dispatch({type: GET_MORE_VIDEOS_REQUESTED, payload: query})
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
