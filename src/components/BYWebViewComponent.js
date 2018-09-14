import React, { Component } from 'react';
import { View, requireNativeComponent } from 'react-native';
import PropTypes from 'prop-types';

// requireNativeComponent函数中的第一个参数就是刚刚CircleManager.getName返回的值。
const WebViewInner = requireNativeComponent('WebViewAndroid', {
  name: 'WebViewAndroid',
  propTypes: {
    source: PropTypes.string,
    url: PropTypes.string,
    shouldOverrideUrl: PropTypes.string,
    shouldOverrideIntentUrl: PropTypes.bool,
    ...View.propTypes, // 包含默认的View的属性
  },
});

class WebViewAndroid extends Component {
  constructor() {
    super();
    this.onShouldOverrideUrlLoading = this.onShouldOverrideUrlLoading.bind(
      this,
    );
  }

  onShouldOverrideUrlLoading(event) {
    const { onShouldStartLoadWithRequest } = this.props;
    if (!onShouldStartLoadWithRequest) {
      return;
    }

    onShouldStartLoadWithRequest(event.nativeEvent);
  }

  render() {
    return (
      <WebViewInner
        {...this.props}
        onShouldOverrideUrlLoading={this.onShouldOverrideUrlLoading}
      />
    );
  }
}

WebViewAndroid.propTypes = {
  onShouldStartLoadWithRequest: PropTypes.func,
};

WebViewAndroid.defaultProps = {
  onShouldStartLoadWithRequest: null,
};

module.exports = WebViewAndroid;
