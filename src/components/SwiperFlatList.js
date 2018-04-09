import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: '#ff0',
  },
  child: {
    height: width * 346 / 899,
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
    // marginVertical: height * 0.0125,
    justifyContent: 'center',
    bottom: 5,
    left: width * 0.25,
    right: width * 0.25
  },
  pagination: {
    width: 20,
    height: 3,
    borderRadius: 2,
    marginHorizontal: width * 0.015
  }
});

class Pagination extends PureComponent {
  static defaultProps = {
    data: [],
    // paginationIndex: 0,
    paginationActiveColor: 'white',
    paginationDefaultColor: 'rgba(255,255,255,.3)'
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
    const { 
      data: { items, loaded, loading },
      style
    } = this.props;
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
            {
              items && items.map((val, index) => {
                return (<Image
                  key={index} 
                  source={{uri: val}}
                  style={ [
                    styles.child,
                    style
                  ]}
                />)
              })
            }
        </SwiperFlatList>
      </View>
    );
  }
}
