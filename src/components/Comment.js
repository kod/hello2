import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import BYTouchable from '../components/BYTouchable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  SIDEINTERVAL,
  RED_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,
} from "../styles/variables";

const styles = StyleSheet.create({
  componentWrap: {
    // paddingLeft: SIDEINTERVAL,
    // paddingRight: SIDEINTERVAL
  },
  component: {
    backgroundColor: PRIMARY_COLOR
  },
  component: {
    backgroundColor: '#fff',
    paddingLeft: SIDEINTERVAL
  },
  componentTitle: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    marginBottom: 10
  },
  componentAcount: {
    fontSize: 11,
    color: '#333',
    paddingRight: 15
  },
  componentStar: {
    flexDirection: 'row',
    flex: 1
  },
  componentStarIcon: {
    color: '#ccc',
    marginRight: 3
  },
  componentStarIconActive: {
    color: PRIMARY_COLOR,
    marginRight: 3
  },
  componentTime: {
    fontSize: 11,
    color: '#CCCCCC',
    paddingRight: SIDEINTERVAL
  },
  componentDesc: {
    color: '#999',
    fontSize: 14,
    lineHeight: 22.65,
    marginBottom: WINDOW_WIDTH * 0.03,
    paddingRight: SIDEINTERVAL,
  },
  componentimageWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  componentimageItem: {
    width: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    height: (WINDOW_WIDTH - SIDEINTERVAL * 4) / 3,
    marginRight: SIDEINTERVAL,
    marginBottom: SIDEINTERVAL,
    resizeMode: 'cover'
  }
});

export default ({ data, styleWrap, style, ...restProps }) => {
  return (
    <View style={[styles.componentWrap, styleWrap]}>
      {
        data && 
        !!data.length &&
        data.map((val, key) => 
          <View style={[styles.component, style]} key={key}>
            <View style={styles.componentTitle}>
              <Text style={styles.componentAcount}>{val.username}</Text>
              <View style={styles.componentStar}>
                {
                  [0,1,2,3,4].map((val1) => 
                    <FontAwesome style={val.score > val1 ? styles.componentStarIconActive : styles.componentStarIcon } name="star" key={val1} />
                  )
                }
                {/* <FontAwesome style={styles.componentStarIconActive} name="star" />
                <FontAwesome style={styles.componentStarIconActive} name="star" />
                <FontAwesome style={styles.componentStarIcon} name="star" />
                <FontAwesome style={styles.componentStarIcon} name="star" />
                <FontAwesome style={styles.componentStarIcon} name="star" /> */}
              </View>
              <Text style={styles.componentTime}>{val.updateTime}</Text>
            </View>
            <Text style={styles.componentDesc} numberOfLines={3} >{val.content}</Text>
            <View style={styles.componentimageWrap}>
              {
                val.imageUrls.map((val, key) => 
                  <Image style={styles.componentimageItem} source={{ uri: `${val}?x-oss-process=image/quality,Q_10` }} key={key} />
                )
              }
              {/* <Image style={styles.componentimageItem} source={require('../images/viemnam.png')} />
              <Image style={styles.componentimageItem} source={require('../images/viemnam.png')} />
              <Image style={styles.componentimageItem} source={require('../images/viemnam.png')} /> */}
            </View>
          </View>
        )
      }
    </View>
  );
};
