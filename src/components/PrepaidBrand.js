import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

import BYTouchable from '../components/BYTouchable';
import BYButton from '../components/BYButton';

import { SCREENS } from '../common/constants';

import { RED_COLOR, BORDER_COLOR, PRIMARY_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL } from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 3) / 2;
const paddingInerval = SIDEINTERVAL / 2;

const styles = StyleSheet.create({
  wrap: {},
  main: {
    paddingLeft: SIDEINTERVAL,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    marginRight: SIDEINTERVAL,
    marginBottom: 15
  },
  itemImgWrap: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: 40,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR
  },
  itemImgActive: {
    borderColor: PRIMARY_COLOR
  },
  itemImg: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: 20,
    resizeMode: 'contain'
  },
  itemText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 10,
    lineHeight: 10 * 1.618
  },
  itemTextActive: {
    color: PRIMARY_COLOR
  },
  toggleButton: {
    backgroundColor: '#f5f5f5',
    color: '#ccc',
    fontSize: 10,
    height: 40,
    lineHeight: 40
  }
});

class PrepaidBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUnfold: false,
      indexActive: 0,
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
    const {
      isUnfold,
      indexActive,
    } = this.state;

    const {
      data,
      style,
      navigation: { navigate },
      ...restProps
    } = this.props;

    return (
      <View style={[styles.itemWrap, style]} {...restProps}>
        <View style={styles.wrap} onPress={() => {}}>
          <View style={styles.main}>
            {data.map((val, key) => {
              return (
                <BYTouchable 
                  style={styles.item} 
                  onPress={() => this.handleOnPress(val, key)}
                  backgroundColor="transparent"
                  key={key}
                >
                  <View style={[styles.itemImgWrap, key === indexActive && styles.itemImgActive]}>
                    <Image style={styles.itemImg} source={{ uri: val.providerIcon }} />
                  </View>
                  <Text style={[styles.itemText, key === indexActive && styles.itemTextActive]}>{val.providerName}</Text>
                </BYTouchable>
              );
            })}
          </View>
          {/* <BYButton text={isUnfold ? '更多' : '折叠'} styleText={styles.toggleButton} styleWrap={{ marginBottom: 15 }} /> */}
        </View>
      </View>
    );
  }
}

export default withNavigation(PrepaidBrand);
