import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View, } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

export const { width, height } = Dimensions.get('window');

export default class App extends PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop={true}
          index={0}
          showPagination
          paginationActiveColor="rgba(255,255,255,1)"
          paginationDefaultColor="rgba(255,255,255,.5)"
        >
          <View style={[styles.child, { backgroundColor: 'tomato' }]}>
            {/* <Text style={styles.text}>1</Text> */}
            <Image source={require('../img/1508482326050_bannner_smpj_Tai-nghe-Mi-Capsule.jpg')} style={{width}} />
          </View>
          <View style={[styles.child, { backgroundColor: 'thistle' }]}>
            <Text style={styles.text}>2</Text>
            <Image source={require('../img/1511872647445_bannner_sjtx_RedmiNote-4.jpg')} style={{width}} />
          </View>
          <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
            <Text style={styles.text}>3</Text>
            <Image source={require('../img/1513072187744_xmbjbAir-12.5.jpg')} style={{width}} />
          </View>
          {/* <View style={[styles.child, { backgroundColor: 'teal' }]}>
            <Text style={styles.text}>4</Text>
          </View> */}
        </SwiperFlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: '#ff0',
    // height: 120,
  },
  child: {
    height: 120,
    width,
    justifyContent: 'center',
  },
  text: {
    fontSize: 49,
    textAlign: 'center',
  },
});
