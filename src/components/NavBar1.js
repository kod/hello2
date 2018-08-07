import React from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import { SIDEINTERVAL } from '../common/constants';
import CustomIcon from "../components/CustomIcon";
import BYTouchable from '../components/BYTouchable';

const styles = StyleSheet.create({
  cellItem1Wrap: {
    backgroundColor: '#fff',
  },
  cellItem1: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  cellItem1Icon: {
    marginRight: SIDEINTERVAL,
  },
  cellItem1IconImg: {
    height: 14,
    width: 14,
    marginRight: SIDEINTERVAL,
  },
  cellItem1Left: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  cellItem1Middle: {
    flex: 2,
    fontSize: 14,
    color: '#ccc',
    textAlign: 'right',
    paddingRight: 5,
  },
  cellItem1Right: {
    color: '#ccc',
    fontSize: 9,
  },
});

export default ({list, style, styleItem, styleItemLeft, styleIconImg, callback}) => {
  return (
    <View style={[styles.cellItem1Wrap, style]} >
      {list.map((val, key) => 
        <BYTouchable delayPressIn={0} style={[styles.cellItem1, styleItem]} key={key} onPress={() => callback(val)} >
          { !!val.iconName && <CustomIcon style={styles.cellItem1Icon} name={val.iconName}></CustomIcon>}
          { !!val.iconImg && <Image style={[styles.cellItem1IconImg, styleIconImg]} source={val.iconImg} />}
          <Text style={[styles.cellItem1Left, styleItemLeft]} numberOfLines={1}>{val.name}</Text>
          <Text style={styles.cellItem1Middle} numberOfLines={1} >{val.tips}</Text>
          <CustomIcon style={styles.cellItem1Right} name="arrowright"></CustomIcon>
        </BYTouchable>
      )}
    </View>
  )
};
