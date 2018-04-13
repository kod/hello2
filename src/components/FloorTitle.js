import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BYTouchable from './BYTouchable';
import { globalStyleVariables } from '../styles';
import CustomIcon from '../components/CustomIcon';
import { connectLocalization } from "../components/Localization";

const styles = StyleSheet.create({
  component: {
    height: 45,
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative'
  },
  componentText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333'
  },
  componentMore: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: globalStyleVariables.WINDOW_WIDTH * 0.04,
    paddingRight: globalStyleVariables.WINDOW_WIDTH * 0.04
  },
  componentMoreText: {
    fontSize: 11,
    color: '#ccc',
    marginRight: 2
  },
  componentMoreIcon: {
    fontSize: 8,
    color: '#ccc',
    paddingTop: 2
  }
});

const HeaderShareButton = ({ title, isMore, i18n, ...restProps }) => {
  return (
    <BYTouchable {...restProps}>
      <View style={styles.component}>
        <Text style={styles.componentText}>{title}</Text>
        {isMore && <View style={styles.componentMore}>
          <Text style={styles.componentMoreText}>{i18n.more}</Text>
          <CustomIcon name="arrowright" style={styles.componentMoreIcon} />
        </View>}
      </View>
    </BYTouchable>
  );
}

export default connectLocalization(HeaderShareButton);
