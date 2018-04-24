import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from 'react-native';

const PXTouchable = props => {
  if (Platform.OS === 'android') {
    const { style, children, ...otherProps } = props;
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.3)', false)}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        style={style}
        {...otherProps}
      >
        {children
          ? <View style={style}>
              {children}
            </View>
          : null}
      </TouchableNativeFeedback>
    );
  }

  return <TouchableOpacity {...props} />;
};

export default PXTouchable;
