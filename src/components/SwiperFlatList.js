import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { withNavigation } from 'react-navigation';

import BYTouchable from './BYTouchable';
import { analyzeUrlNavigate } from '../common/helpers';

import {
  WINDOW_WIDTH,
  SCREENS,
  OSS_IMAGE_QUALITY,
  // BRANDID_REGEX,
} from '../common/constants';

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
    marginHorizontal: WINDOW_WIDTH * 0.01,
  },
});

let stylePaginationContainerparam;

const Pagination = ({
  data,
  paginationIndex,
  scrollToIndex,
  paginationDefaultColor,
  paginationActiveColor,
}) => (
  <View style={[styles.paginationContainer, stylePaginationContainerparam]}>
    {data.map((_, index) => (
      <TouchableOpacity
        style={[
          styles.pagination,
          paginationIndex === index
            ? { backgroundColor: paginationActiveColor }
            : { backgroundColor: paginationDefaultColor },
        ]}
        key={index}
        onPress={() => scrollToIndex(index)}
      />
    ))}
  </View>
);

class App extends Component {
  onPressHandle(val) {
    const {
      navigation,
      navigation: { navigate },
    } = this.props;

    if (val.actionUrl) {
      analyzeUrlNavigate(val.actionUrl, navigation);
    } else {
      navigate(SCREENS.ProductDetail, { brandId: val.brandId });
    }
  }

  render() {
    const {
      data,
      styleWrap,
      style,
      stylePaginationContainer,
      // navigation: { navigate },
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
          {data &&
            data.map(val => (
              <BYTouchable
                key={val.imageUrl}
                backgroundColor="transparent"
                onPress={() => this.onPressHandle(val)}
              >
                <Image
                  source={{
                    uri: `${
                      val.imageUrl
                    }?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`,
                  }}
                  style={[styles.child, style]}
                />
              </BYTouchable>
            ))}
        </SwiperFlatList>
      </View>
    );
  }
}

export default withNavigation(App);
