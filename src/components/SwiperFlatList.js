import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import { globalStyleVariables } from "../styles";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: '#ff0',
  },
  child: {
    height: globalStyleVariables.WINDOW_WIDTH / 2.25,
    width: globalStyleVariables.WINDOW_WIDTH,
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
    justifyContent: 'flex-end',
    bottom: 15,
    left: 0,
    // right: 10,
    right: globalStyleVariables.WINDOW_WIDTH * 0.04,
  },
  pagination: {
    width: 10,
    height: 3,
    borderRadius: 0,
    marginHorizontal: globalStyleVariables.WINDOW_WIDTH * 0.015
  }
});

class Pagination extends PureComponent {
  static defaultProps = {
    data: [],
    // paginationIndex: 0,
    paginationActiveColor: '#64615B',
    paginationDefaultColor: '#c8c2b7'
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
