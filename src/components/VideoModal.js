import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import RenderItem from './RenderItem';

const VideoModal = ({modalVisible, setModalVisible, videos, fetchVideos}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}>
            <Image
              style={{width: 40, height: 40, resizeMode: 'contain'}}
              source={require('../../assets/images/closeButton.jpeg')}
            />
          </TouchableOpacity>
          <View style={styles.modalView}>
            {videos && videos.length > 0 && (
              <FlatList
                onEndReachedThreshold={0}
                onEndReached={() => fetchVideos()}
                contentContainerStyl={styles.listStyle}
                data={videos}
                renderItem={({item, index}) => <RenderItem item={item} />}
                keyExtractor={(item, index) => item.id.videoId}
                ListFooterComponent={() => (
                  <ActivityIndicator size="small" color="black" />
                )}
              />
            )}
            {videos.length === 0 && (
              <Text style={styles.textStyle}>
                No video found. Please try another location.
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 99999,
    height: '100%',
    width: '100%',
    alignSelf: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 40,
    zIndex: 9999,
    width: 30,
    height: 30,
    elevation: 99
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '90%',
    width: '95%'
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 25
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  listStyle: {
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '60%'
  }
});

export default VideoModal;
