import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

import BYTouchable from './BYTouchable';
import BYButton from './BYButton';

import { SCREENS } from '../common/constants';

import { RED_COLOR, BORDER_COLOR, PRIMARY_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL } from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 3) / 2;
const paddingInerval = SIDEINTERVAL / 2;

const styles = StyleSheet.create({
  priceButton: {
    paddingLeft: SIDEINTERVAL,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    marginRight: SIDEINTERVAL,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    fontSize: 14,
    color: '#666'
  },
  itemActive: {
    color: '#fff',
    backgroundColor: PRIMARY_COLOR
  }
});

class PrepaidBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexActive: 0
    };
  }

  handleOnPress(val, key) {
    const {
      callback = () => {},
    } = this.props;
    this.setState({
      indexActive: key
    });
    callback(val, key);
  }
  
  render() {
    const { indexActive } = this.state;

    const {
      data,
      style,
      styleItem,
      navigation: { navigate },
      ...restProps
    } = this.props;

    return (
      <View style={[styles.priceButton, style]} {...restProps}>
        {data.map((val, key) => (
          <Text 
            style={[styles.item, styleItem, key === indexActive && styles.itemActive]} 
            key={key}
            onPress={() => this.handleOnPress(val, key)}
          >
            {val.text}
          </Text>
        ))}
      </View>
    );
  }
}

export default withNavigation(PrepaidBrand);
