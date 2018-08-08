import React, { Component } from 'react';
import { Text, Dimensions, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { withNavigation } from 'react-navigation';

import BYTouchable from '../components/BYTouchable';

import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, SCREENS } from '../common/constants';

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    backgroundColor: '#fff',
  },
  child: {
    height: WINDOW_WIDTH / 2.25,
    width: WINDOW_WIDTH,
    justifyContent: 'center',
  },
  text: {
    fontSize: 49,
    textAlign: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 10,
    left: 0,
    right: WINDOW_WIDTH * 0.03,
  },
  pagination: {
    width: 10,
    height: 3,
    borderRadius: 0,
    marginHorizontal: WINDOW_WIDTH * 0.010
  }
});

let stylePaginationContainerparam;

const Pagination = ({ data, paginationIndex, scrollToIndex, paginationDefaultColor, paginationActiveColor }) => {
  return (
    <View style={[styles.paginationContainer, stylePaginationContainerparam]}>
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
  )
}

class App extends Component {

  render() {
    const { 
      data,
      styleWrap,
      style,
      stylePaginationContainer,
      navigation: { navigate },
      ...restProps
    } = this.props;
    stylePaginationContainerparam = stylePaginationContainer;
    return (
      <View style={[styles.container, styleWrap]}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          index={0}
          paginationActiveColor="rgba(255,255,255,1)"
          paginationDefaultColor="rgba(255,255,255,.5)"
          showPagination
          PaginationComponent={Pagination}
          {...restProps}
        >
            {
              data && data.map((val, key) => {
                return (
                <BYTouchable 
                  key={key} 
                  backgroundColor="transparent" 
                  onPress={() => navigate(SCREENS.ProductDetail, { brandId: val.brandId, })}
                >
                  <Image
                    source={{uri: `${val.imageUrl}?x-oss-process=image/quality,Q_70`}}
                    style={ [
                      styles.child,
                      style
                    ]}
                  />
                </BYTouchable>
                )
              })
            }
        </SwiperFlatList>
      </View>
    );
  }
}

export default withNavigation(App);