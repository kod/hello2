import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import { globalStyleVariables } from "../styles";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: '#fff',
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
    justifyContent: 'flex-end',
    bottom: 10,
    left: 0,
    right: globalStyleVariables.WINDOW_WIDTH * 0.03,
  },
  pagination: {
    width: 10,
    height: 3,
    borderRadius: 0,
    marginHorizontal: globalStyleVariables.WINDOW_WIDTH * 0.010
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

export default class App extends PureComponent {

  render() {
    const { 
      data,
      styleWrap,
      style,
      stylePaginationContainer,
      ...restProps,
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
              data && data.map((val, index) => {
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
