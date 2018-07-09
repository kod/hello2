import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, SCREENS, } from "../common/constants";
import { withNavigation } from 'react-navigation';

import BYTouchable from "../components/BYTouchable";

const marginWidth = WINDOW_WIDTH * 0.015;
const width = (WINDOW_WIDTH - marginWidth * 2 * 4 - marginWidth * 2) / 4;

const styles = StyleSheet.create({
  itemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    paddingLeft: marginWidth,
    paddingRight: marginWidth
  },
  touchable: {
    height: width,
    width: width,
    marginLeft: marginWidth,
    marginRight: marginWidth
  },
  itemImg: {
    height: width,
    width: width,
  }
});

class BrandList extends Component {
  render() {
    const {
      data, 
      style,
      navigation: { navigate },
      ...restProps
    } = this.props;
    
    return (
      <View style={[styles.itemWrap, style]} {...restProps}>
        {data.map((val, key) => (
          <BYTouchable 
            style={styles.touchable} 
            key={key} 
            onPress={() => navigate(SCREENS.CateList, { parent_id: val.parentId, classfy_id: val.id })}
          >
            <Image source={{ uri: `${val.imageUrl}?x-oss-process=image/quality,Q_70` }} style={styles.itemImg} />
          </BYTouchable>
        ))}
      </View>
    );
  }
}

export default withNavigation(BrandList);
