import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from 'react-native';

const PXTouchable = props => {
  if (Platform.OS === 'android') {
    const { style, children, backgroundColor = '#ccc', ...otherProps } = props;
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(backgroundColor, false)}
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
