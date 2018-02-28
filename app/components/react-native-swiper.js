import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

export const { width, height } = Dimensions.get('window');

class Pagination extends PureComponent {
  static defaultProps = {
    data: [],
    paginationIndex: 0,
    paginationActiveColor: 'black',
    paginationDefaultColor: 'white'
  };

  render() {
    const {
      data,
      paginationIndex,
      scrollToIndex,
      paginationDefaultColor,
      paginationActiveColor
    } = this.props;
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            style={[
              styles.pagination,
              paginationIndex === index
                ? { backgroundColor: paginationActiveColor }
                : { backgroundColor: paginationDefaultColor }
            ]}
            key={index}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    );
  }
}


export default class App extends PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          index={0}
          paginationActiveColor="rgba(255,255,255,1)"
          paginationDefaultColor="rgba(255,255,255,.5)"
          showPagination
          PaginationComponent={Pagination}>
          <View style={[styles.child, { backgroundColor: 'tomato' }]}>
            <Text style={styles.text}>1</Text>
          </View>
          <View style={[styles.child, { backgroundColor: 'thistle' }]}>
            <Text style={styles.text}>2</Text>
          </View>
          <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
            <Text style={styles.text}>3</Text>
          </View>
          <View style={[styles.child, { backgroundColor: 'teal' }]}>
            <Text style={styles.text}>4</Text>
          </View>
        </SwiperFlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: '#ff0',
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
  paginationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    marginVertical: height * 0.0125,
    justifyContent: 'center',
    bottom: 5,
    left: width * 0.25,
    right: width * 0.25
  },
  pagination: {
    width: width * 0.0375,
    height: width * 0.0375,
    borderRadius: 2,
    marginHorizontal: width * 0.025
  }
});
